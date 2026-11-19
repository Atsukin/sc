import Link from 'next/link';
import { requireStaff } from '@/lib/admin/auth';
import { readSupabaseEnv } from '@/lib/supabase/env';
import { signOut } from '../actions';

export const dynamic = 'force-dynamic';

function Notice({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <main className="mx-auto max-w-xl px-4 py-24">
      <h1 className="text-xl font-bold">{title}</h1>
      <div className="mt-4 space-y-2 text-[#555B63]">{children}</div>
    </main>
  );
}

export default async function StaffLayout({ children }: { children: React.ReactNode }) {
  if (!readSupabaseEnv()) {
    return (
      <Notice title="Supabase の接続設定がありません">
        <p>環境変数 SUPABASE_URL と SUPABASE_PUBLISHABLE_KEY を設定してください。手順は docs/admin-setup.md にあります。</p>
      </Notice>
    );
  }

  const { staff } = await requireStaff();

  return (
    <>
      <header className="bg-[#040000] text-white">
        <div className="mx-auto flex h-14 max-w-6xl items-center gap-6 px-4">
          <Link href="/admin/" className="flex items-center gap-3 font-bold">
            <span aria-hidden className="block h-2.5 w-2.5 rotate-45 bg-[#F5E528]" />
            問い合わせ管理
          </Link>
          <span className="ml-auto text-sm text-white/70">{staff?.display_name}</span>
          <form action={signOut}>
            <button type="submit" className="text-sm underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-[#F5E528]">
              ログアウト
            </button>
          </form>
        </div>
      </header>
      {staff ? (
        children
      ) : (
        <Notice title="このアカウントには閲覧の権限がありません">
          <p>管理画面を使うには、管理者に社員として登録してもらう必要があります（docs/admin-setup.md の「社員を追加する」）。</p>
        </Notice>
      )}
    </>
  );
}
