import { Noto_Sans_JP, Zen_Old_Mincho } from 'next/font/google';

// /solar/ 配下の書体（docs/design/solar-natori-design-plan.md）。
// 見出し（h1・h2）と金額・日付は Zen Old Mincho、本文と UI は Noto Sans JP。
// 日本語の字形は unicode-range で分割された CSS から必要な分だけ読み込まれる。
const mincho = Zen_Old_Mincho({
  weight: ['600', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-zen-old-mincho',
});

const gothic = Noto_Sans_JP({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-noto-sans-jp',
});

export default function SolarLayout({ children }: { children: React.ReactNode }) {
  return <div className={`solar-page ${mincho.variable} ${gothic.variable} font-gothic`}>{children}</div>;
}
