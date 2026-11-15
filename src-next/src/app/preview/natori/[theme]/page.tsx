import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Noto_Sans_JP, Shippori_Mincho } from 'next/font/google';
import NatoriLp, { type NatoriLpTheme } from '../../../solar/natori/NatoriLp';

// 名取LP のデザイン案（A/B/C）を、本番と同じ中身で見比べるためのプレビュー。
// 方向が決まったら /solar/natori/ に反映し、このルートごと消す。

const THEMES: Record<NatoriLpTheme, string> = {
  a: 'A案 昼の家',
  b: 'B案 夜の明かり',
  c: 'C案 縦書きの明朝',
};

const sans = Noto_Sans_JP({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--nlp-sans',
});

const serif = Shippori_Mincho({
  weight: ['500', '600'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--nlp-serif',
});

export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(THEMES).map((theme) => ({ theme }));
}

type Props = { params: Promise<{ theme: string }> };

function isTheme(value: string): value is NatoriLpTheme {
  return value in THEMES;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { theme } = await params;
  return {
    title: `${isTheme(theme) ? THEMES[theme] : 'デザイン案'}｜名取LP プレビュー`,
    robots: { index: false, follow: false },
  };
}

export default async function NatoriPreviewPage({ params }: Props) {
  const { theme } = await params;
  if (!isTheme(theme)) notFound();
  return <NatoriLp theme={theme} fontClassName={`${sans.variable} ${serif.variable}`} />;
}
