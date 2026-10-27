import type { Metadata } from 'next';
import { Noto_Sans_JP, Roboto_Condensed } from 'next/font/google';
import JsonLd from '@/components/lp/JsonLd';
import LpViewTracker from '@/components/lp/LpViewTracker';
import {
  absoluteUrl,
  breadcrumbNode,
  faqNode,
  graph,
  localBusinessNode,
  serviceNode,
} from '@/components/lp/structuredData';
import { BREADCRUMBS, PATH } from './content';
import { FAQS } from './lp-content';
import NatoriLp from './NatoriLp';

// LP の書体（元データの Google Fonts の @import を next/font に置き換え）
const sans = Noto_Sans_JP({
  weight: ['400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--nlp-sans',
});

const condensed = Roboto_Condensed({
  weight: '700',
  subsets: ['latin'],
  display: 'swap',
  variable: '--nlp-cond',
});

export const metadata: Metadata = {
  title: '名取市の太陽光発電・蓄電池｜補助金の要件と申請までご案内｜株式会社SC',
  description:
    '宮城県名取市に本社を置く株式会社SCが、名取市での太陽光発電・蓄電池の導入をご案内します。名取市の補助金（太陽光と蓄電池の同時設置が対象）と宮城県の補助金の要件、停電への備え、費用のご相談まで。',
  alternates: { canonical: absoluteUrl(PATH) },
  openGraph: {
    title: '名取市の太陽光発電・蓄電池｜株式会社SC',
    description: '名取市の補助金の要件と、停電への備え。名取市に本社を置く株式会社SCがご案内します。',
    url: absoluteUrl(PATH),
    siteName: '株式会社SC',
    type: 'website',
    locale: 'ja_JP',
  },
};

export default function SolarNatoriPage() {
  const jsonLd = graph([
    breadcrumbNode(BREADCRUMBS),
    serviceNode({ path: PATH, areaServed: [{ '@type': 'City', name: '名取市' }] }),
    faqNode(FAQS),
    localBusinessNode(),
  ]);

  return (
    <>
      <JsonLd data={jsonLd} />
      <LpViewTracker />
      <NatoriLp fontClassName={`${sans.variable} ${condensed.variable}`} />
    </>
  );
}
