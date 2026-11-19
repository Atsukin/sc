import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { z } from 'zod';
import { requireStaff, type Staff } from '@/lib/admin/auth';
import { STATUSES, STATUS_LABELS, formatJst, type InquiryStatus } from '@/lib/admin/inquiries';
import { updateInquiry } from '../../../actions';
import StatusBadge from '../../StatusBadge';

export const metadata: Metadata = { title: '問い合わせの詳細' };

type Inquiry = {
  id: string;
  created_at: string;
  updated_at: string;
  name: string;
  phone: string;
  email: string;
  message: string;
  lp_slug: string | null;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  utm_term: string | null;
  utm_content: string | null;
  referrer: string | null;
  status: InquiryStatus;
  assignee_id: string | null;
  memo: string;
};

const field = 'mt-1 block w-full border border-[#C9CCD0] bg-white px-3 py-2 text-base focus:border-[#040000] focus:outline-none focus:ring-2 focus:ring-[#F5E528]';

export default async function InquiryDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ saved?: string; error?: string }>;
}) {
  const { supabase, staff } = await requireStaff();
  if (!staff) return null;

  const { id } = await params;
  if (!z.uuid().safeParse(id).success) notFound();
  const sp = await searchParams;

  const [{ data: inquiry }, { data: staffList }] = await Promise.all([
    supabase.from('inquiries').select('*').eq('id', id).maybeSingle<Inquiry>(),
    supabase.from('staff').select('user_id, display_name').order('display_name').returns<Staff[]>(),
  ]);
  if (!inquiry) notFound();

  const source: [string, string | null][] = [
    ['LP', inquiry.lp_slug],
    ['utm_source', inquiry.utm_source],
    ['utm_medium', inquiry.utm_medium],
    ['utm_campaign', inquiry.utm_campaign],
    ['utm_term', inquiry.utm_term],
    ['utm_content', inquiry.utm_content],
    ['参照元', inquiry.referrer],
  ];
  const knownSource = source.filter(([, v]) => v);

  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      <Link href="/admin/" className="text-sm text-[#555B63] underline-offset-4 hover:underline">一覧に戻る</Link>
      <div className="mt-3 flex flex-wrap items-center gap-3">
        <h1 className="text-2xl font-bold">{inquiry.name} 様</h1>
        <StatusBadge status={inquiry.status} />
      </div>
      <p className="mt-1 text-sm text-[#555B63] tabular-nums">受付 {formatJst(inquiry.created_at)}</p>

      {sp.saved && <p role="status" className="mt-4 border-l-4 border-[#F5E528] bg-white px-4 py-2 text-sm">保存しました。</p>}
      {sp.error && <p role="alert" className="mt-4 border-l-4 border-[#C62828] bg-[#FDECEC] px-4 py-2 text-sm text-[#8E1B1B]">保存できませんでした。もう一度お試しください。</p>}

      <div className="mt-6 grid gap-6 lg:grid-cols-[3fr_2fr]">
        <section aria-labelledby="h-content" className="bg-white p-6">
          <h2 id="h-content" className="text-sm font-bold text-[#555B63]">お問い合わせ内容</h2>
          <dl className="mt-4 grid grid-cols-[7em_1fr] gap-y-3 text-sm">
            <dt className="text-[#555B63]">電話番号</dt>
            <dd><a href={`tel:${inquiry.phone.replace(/[^0-9+]/g, '')}`} className="font-bold underline underline-offset-4 tabular-nums">{inquiry.phone}</a></dd>
            <dt className="text-[#555B63]">メール</dt>
            <dd className="break-all"><a href={`mailto:${inquiry.email}`} className="underline underline-offset-4">{inquiry.email}</a></dd>
          </dl>
          <p className="mt-6 whitespace-pre-wrap break-words border-t border-[#ECEDEF] pt-6 leading-relaxed">{inquiry.message}</p>

          <h2 className="mt-8 text-sm font-bold text-[#555B63]">流入元</h2>
          {knownSource.length ? (
            <dl className="mt-3 grid grid-cols-[7em_1fr] gap-y-2 text-sm">
              {knownSource.map(([k, v]) => (
                <div key={k} className="contents">
                  <dt className="text-[#555B63]">{k}</dt>
                  <dd className="break-all">{v}</dd>
                </div>
              ))}
            </dl>
          ) : (
            <p className="mt-3 text-sm text-[#555B63]">記録なし</p>
          )}
        </section>

        <section aria-labelledby="h-handling" className="bg-white p-6">
          <h2 id="h-handling" className="text-sm font-bold text-[#555B63]">対応状況</h2>
          <form action={updateInquiry} className="mt-4 space-y-4">
            <input type="hidden" name="id" value={inquiry.id} />
            <label className="block text-sm font-medium">
              ステータス
              <select name="status" defaultValue={inquiry.status} className={field}>
                {STATUSES.map((s) => <option key={s} value={s}>{STATUS_LABELS[s]}</option>)}
              </select>
            </label>
            <label className="block text-sm font-medium">
              担当
              <select name="assignee_id" defaultValue={inquiry.assignee_id ?? ''} className={field}>
                <option value="">未定</option>
                {(staffList ?? []).map((s) => <option key={s.user_id} value={s.user_id}>{s.display_name}</option>)}
              </select>
            </label>
            <label className="block text-sm font-medium">
              メモ
              <textarea name="memo" defaultValue={inquiry.memo} rows={8} maxLength={5000} className={field} placeholder="折り返しの日時、話した内容など" />
            </label>
            <button type="submit" className="w-full bg-[#040000] py-3 font-bold text-white hover:bg-[#2b2727] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#040000]">
              保存する
            </button>
            <p className="text-xs text-[#555B63] tabular-nums">最終更新 {formatJst(inquiry.updated_at)}</p>
          </form>
        </section>
      </div>
    </main>
  );
}
