import type { Metadata } from 'next';
import Link from 'next/link';
import { requireStaff } from '@/lib/admin/auth';
import { STATUSES, STATUS_LABELS, describeSource, formatJst, isInquiryStatus, type InquiryStatus } from '@/lib/admin/inquiries';
import StatusBadge from './StatusBadge';

export const metadata: Metadata = { title: '問い合わせ一覧' };

const PAGE_SIZE = 50;

type Row = {
  id: string;
  created_at: string;
  name: string;
  phone: string;
  message: string;
  status: InquiryStatus;
  lp_slug: string | null;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  referrer: string | null;
  assignee: { display_name: string } | null;
};

function listHref(status: InquiryStatus | 'all', page = 1) {
  const params = new URLSearchParams();
  if (status !== 'all') params.set('status', status);
  if (page > 1) params.set('page', String(page));
  const q = params.toString();
  return `/admin/${q ? `?${q}` : ''}`;
}

export default async function InquiryListPage({ searchParams }: { searchParams: Promise<{ status?: string; page?: string }> }) {
  const { supabase, staff } = await requireStaff();
  if (!staff) return null;

  const sp = await searchParams;
  const status: InquiryStatus | 'all' = isInquiryStatus(sp.status) ? sp.status : 'all';
  const page = Math.max(1, Number.parseInt(sp.page ?? '1', 10) || 1);
  const from = (page - 1) * PAGE_SIZE;

  let query = supabase
    .from('inquiries')
    .select('id, created_at, name, phone, message, status, lp_slug, utm_source, utm_medium, utm_campaign, referrer, assignee:staff(display_name)', { count: 'exact' })
    .order('created_at', { ascending: false })
    .range(from, from + PAGE_SIZE - 1);
  if (status !== 'all') query = query.eq('status', status);

  // タブの件数（迷惑以外の合計を「すべて」とする）
  const countFor = (s: InquiryStatus) =>
    supabase.from('inquiries').select('id', { count: 'exact', head: true }).eq('status', s);
  const [{ data, count, error }, ...counts] = await Promise.all([query.returns<Row[]>(), ...STATUSES.map(countFor)]);
  const countByStatus = Object.fromEntries(STATUSES.map((s, i) => [s, counts[i].count ?? 0])) as Record<InquiryStatus, number>;

  const rows = data ?? [];
  const total = count ?? 0;
  const lastPage = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const tabs: { key: InquiryStatus | 'all'; label: string; count?: number }[] = [
    { key: 'all', label: 'すべて' },
    ...STATUSES.map((s) => ({ key: s, label: STATUS_LABELS[s], count: countByStatus[s] })),
  ];

  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="text-2xl font-bold">問い合わせ一覧</h1>

      <nav aria-label="ステータスで絞り込む" className="mt-6 flex flex-wrap gap-1 border-b border-[#DADCDF]">
        {tabs.map((t) => (
          <Link
            key={t.key}
            href={listHref(t.key)}
            aria-current={status === t.key ? 'page' : undefined}
            className={`-mb-px border-b-2 px-4 py-2.5 text-sm font-medium ${status === t.key ? 'border-[#040000] text-[#040000]' : 'border-transparent text-[#555B63] hover:text-[#040000]'}`}
          >
            {t.label}
            {t.count !== undefined && <span className={`ml-1.5 ${t.key === 'new' && t.count > 0 ? 'bg-[#F5E528] px-1.5 font-bold text-[#040000]' : ''}`}>{t.count}</span>}
          </Link>
        ))}
      </nav>

      {error ? (
        <p role="alert" className="mt-8 text-[#8E1B1B]">一覧を読み込めませんでした。ページを再読み込みしてください。</p>
      ) : rows.length === 0 ? (
        <p className="mt-12 text-center text-[#555B63]">
          {status === 'all' ? 'まだ問い合わせはありません。' : `「${STATUS_LABELS[status]}」の問い合わせはありません。`}
        </p>
      ) : (
        <div className="mt-4 overflow-x-auto bg-white">
          <table className="w-full min-w-[860px] text-left text-sm">
            <thead className="border-b border-[#040000] text-xs text-[#555B63]">
              <tr>
                <th scope="col" className="px-4 py-3 font-medium">受付日時</th>
                <th scope="col" className="px-4 py-3 font-medium">ステータス</th>
                <th scope="col" className="px-4 py-3 font-medium">お名前</th>
                <th scope="col" className="px-4 py-3 font-medium">電話番号</th>
                <th scope="col" className="px-4 py-3 font-medium">内容</th>
                <th scope="col" className="px-4 py-3 font-medium">流入元</th>
                <th scope="col" className="px-4 py-3 font-medium">担当</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.id} className="border-b border-[#ECEDEF] hover:bg-[#FBFBF4]">
                  <td className="whitespace-nowrap px-4 py-3 tabular-nums">{formatJst(r.created_at)}</td>
                  <td className="px-4 py-3"><StatusBadge status={r.status} /></td>
                  <td className="px-4 py-3 font-bold">
                    <Link href={`/admin/inquiries/${r.id}/`} className="underline-offset-4 hover:underline">{r.name}</Link>
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 tabular-nums">{r.phone}</td>
                  <td className="max-w-[280px] truncate px-4 py-3 text-[#555B63]">{r.message}</td>
                  <td className="max-w-[180px] truncate px-4 py-3 text-[#555B63]">{describeSource(r) || '－'}</td>
                  <td className="whitespace-nowrap px-4 py-3">{r.assignee?.display_name ?? '－'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {lastPage > 1 && (
        <nav aria-label="ページ" className="mt-6 flex items-center justify-between text-sm">
          {page > 1 ? <Link href={listHref(status, page - 1)} className="underline underline-offset-4">前の{PAGE_SIZE}件</Link> : <span />}
          <span className="text-[#555B63]">{page} / {lastPage} ページ（{total}件）</span>
          {page < lastPage ? <Link href={listHref(status, page + 1)} className="underline underline-offset-4">次の{PAGE_SIZE}件</Link> : <span />}
        </nav>
      )}
    </main>
  );
}
