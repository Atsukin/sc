import type { Metadata } from 'next';
import LoginForm from './LoginForm';

export const metadata: Metadata = { title: 'ログイン' };

export default function AdminLoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-sm bg-white p-8 shadow-[0_1px_0_#DADCDF]">
        {/* eslint-disable-next-line @next/next/no-img-element -- 管理画面だけで使う小さなロゴ */}
        <img src="/images/solar/sc-logo.png" alt="株式会社SC" className="h-8 w-auto" />
        <h1 className="mt-6 text-xl font-bold">問い合わせ管理</h1>
        <p className="mt-2 text-sm text-[#555B63]">社員用のアカウントでログインしてください。</p>
        <LoginForm />
      </div>
    </main>
  );
}
