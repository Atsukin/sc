import type { Metadata } from 'next';
import { Noto_Sans_JP } from 'next/font/google';

const gothic = Noto_Sans_JP({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: { default: '問い合わせ管理｜株式会社SC', template: '%s｜問い合わせ管理' },
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <div className={`${gothic.className} min-h-screen bg-[#F4F5F6] text-[#040000]`}>{children}</div>;
}
