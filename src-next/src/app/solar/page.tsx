import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  BatteryCharging,
  Clock,
  FileText,
  Handshake,
  Info,
  Landmark,
  MapPin,
  MessageCircle,
  Receipt,
  Search,
  Send,
  Sun,
  Wrench,
} from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { COMPANY } from '@/lib/company';
import CtaBlock from '@/components/lp/CtaBlock';
import FeatureGrid from '@/components/lp/FeatureGrid';
import FixedCtaBar from '@/components/lp/FixedCtaBar';
import FlowSteps from '@/components/lp/FlowSteps';
import JsonLd from '@/components/lp/JsonLd';
import LpHero from '@/components/lp/LpHero';
import LpSection, { LpSubheading } from '@/components/lp/LpSection';
import SubsidyCards from '@/components/lp/SubsidyCards';
import { formatJaDate } from '@/components/lp/format';
import { absoluteUrl, breadcrumbNode, graph, localBusinessNode, serviceNode } from '@/components/lp/structuredData';
import type { BreadcrumbItem, FlowStep, ImageAsset } from '@/components/lp/types';
import {
  CHECKED_AT,
  IMAGES,
  MIYAGI_NEXT_ROUND,
  MIYAGI_SUBSIDY_ROWS,
  MIYAGI_SUBSIDY_SOURCES,
} from './natori/content';

// /solar/ ハブ。設計は docs/seo/site-structure-solar.md §3-1（最小構成）。
// 施工事例（/solar/works/）と FAQ 抜粋（/solar/faq/）の節は、各ページの公開後に追加する。

const PATH = '/solar/' as const;

const BREADCRUMBS: BreadcrumbItem[] = [
  { name: 'ホーム', path: '/' },
  { name: '太陽光発電・蓄電池', path: PATH },
];

/** 公開済みのエリアLPだけを並べる（未公開ページへのリンクを作らない） */
const AREAS: { name: string; path: `/${string}`; description: string; image: ImageAsset }[] = [
  {
    name: '名取市',
    path: '/solar/natori/',
    description: '名取市の補助金の条件（太陽光と蓄電池の同時設置が対象）、沿岸部での設置、停電への備え。',
    image: IMAGES.sunny,
  },
];

const FLOW: FlowStep[] = [
  { title: 'お問い合わせ', description: 'お電話またはフォームからご連絡ください。', icon: MessageCircle },
  { title: '現地調査', description: '屋根の状態や日当たり、分電盤などを確認します。', icon: Search },
  { title: 'お見積もり・ご提案', description: '補助金を使えるかどうかの確認も含めてご説明します。', icon: FileText },
  { title: 'ご契約・電力会社への申請', icon: Handshake },
  { title: '工事・電力受給開始', icon: Wrench },
  { title: '補助金の申請・アフターサービス', description: '申請に必要な書類やアフターについてもご相談ください。', icon: Send },
];

export const metadata: Metadata = {
  title: '太陽光発電・蓄電池の設置｜名取市・岩沼市・仙台南部｜株式会社SC',
  description:
    '宮城県名取市に本社を置く株式会社SCの太陽光発電・蓄電池のご案内。名取市・岩沼市・仙台市太白区/若林区・亘理町の補助金、停電への備え、施工の流れをまとめています。',
  alternates: { canonical: absoluteUrl(PATH) },
  openGraph: {
    title: '太陽光発電・蓄電池の設置｜株式会社SC',
    description: '宮城県名取市に本社を置く株式会社SCの太陽光発電・蓄電池のご案内。補助金、停電への備え、施工の流れ。',
    url: absoluteUrl(PATH),
    siteName: '株式会社SC',
    type: 'website',
    locale: 'ja_JP',
  },
};

export default function SolarHubPage() {
  const jsonLd = graph([
    breadcrumbNode(BREADCRUMBS),
    // TODO(要確認) 施工の対応エリア（名取市全域か、どこまで出張するか）。確認できるまで名取市のみ
    serviceNode({ path: PATH, areaServed: [{ '@type': 'City', name: '名取市' }] }),
    // layout.tsx に LocalBusiness が入るまでの暫定
    localBusinessNode(),
  ]);

  return (
    <div className="bg-white pb-20 text-gray-800 md:pb-0">
      <JsonLd data={jsonLd} />
      <Header variant="light" />

      <main>
        {/* TODO(要確認) h1・title の対象エリア（岩沼市・仙台南部）は施工の対応エリアの確認後に確定する */}
        <LpHero
          breadcrumbs={BREADCRUMBS}
          eyebrow="宮城県 名取市・岩沼市・仙台南部"
          title="宮城県名取市・岩沼市・仙台南部の太陽光発電・蓄電池"
          lead={
            <p>
              名取市に本社を置く株式会社SCが、太陽光発電・蓄電池の導入をご案内します。自治体ごとに違う補助金の条件、停電への備え、ご相談から設置までの流れをまとめています。
            </p>
          }
          badges={[
            { title: '名取市に本社', body: '現地調査・アフターも近くから', icon: MapPin },
            { title: '補助金のご案内', body: '自治体ごとの条件を確認', icon: Landmark },
            { title: '受付 9:00〜21:00', body: '年中無休でお電話を受付', icon: Clock },
          ]}
          // TODO(要確認) 施工写真に差し替える。現在は既存サイトの写真で仮置き
          image={IMAGES.hero}
          imagePosition="60% 50%"
        />

        <LpSection id="areas" eyebrow="Area" title="対応エリア" tone="gray">
          <ul className={`grid gap-5 ${AREAS.length > 1 ? 'md:grid-cols-2' : 'mx-auto max-w-xl'}`}>
            {AREAS.map((area) => (
              <li key={area.path}>
                <Link
                  href={area.path}
                  className="group block h-full overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-gray-200 transition hover:shadow-md hover:ring-[#D4E157]"
                >
                  <div className="relative aspect-[16/9]">
                    <Image
                      src={area.image.src}
                      alt={area.image.alt}
                      fill
                      sizes="(min-width: 768px) 480px, 100vw"
                      className="object-cover transition duration-500 group-hover:scale-105"
                    />
                    <span className="absolute left-4 top-4 inline-flex items-center gap-1 rounded-full bg-[#D4E157] px-3 py-1 text-sm font-bold text-gray-900">
                      <MapPin aria-hidden="true" className="h-4 w-4" />
                      {area.name}
                    </span>
                  </div>
                  <div className="p-5 md:p-6">
                    <p className="text-lg font-bold text-gray-900">{area.name}の太陽光発電・蓄電池</p>
                    <p className="mt-2 text-gray-700">{area.description}</p>
                    <p className="mt-4 inline-flex items-center gap-1 font-bold text-[#7f8a1f]">
                      詳しく見る
                      <ArrowRight aria-hidden="true" className="h-4 w-4 transition group-hover:translate-x-1" />
                    </p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
          {/* 岩沼市・仙台市・亘理町のエリアLPは公開後に AREAS へ追加する */}
        </LpSection>

        <LpSection
          id="subsidy"
          eyebrow="Subsidy"
          title="2026年度の補助金"
          lead={
            <p className="inline-flex items-start gap-2 rounded-full bg-stone-100 px-4 py-2 text-left text-sm">
              <Info aria-hidden="true" className="mt-0.5 h-4 w-4 flex-none text-[#7f8a1f]" />
              <span>
                <time dateTime={CHECKED_AT}>{formatJaDate(CHECKED_AT)}</time>
                時点の情報です。受付状況は変わるため、各自治体の公式ページでもご確認ください。
              </span>
            </p>
          }
        >
          <div className="space-y-6">
            <div className="space-y-4 rounded-3xl bg-gray-900 p-6 text-gray-200 md:p-8">
              <LpSubheading tone="dark">名取市</LpSubheading>
              <p>
                名取市の補助金は、太陽光発電と蓄電池の同時設置、または蓄電池の設置が対象で、太陽光発電だけの設置は対象外です。設置が終わってから申請する方式で、2026年12月31日までに設置したものが対象です。
              </p>
              <Link
                href="/solar/natori/#subsidy"
                className="inline-flex items-center gap-1 rounded-full bg-[#D4E157] px-5 py-3 font-bold text-gray-900 transition hover:bg-[#c0cc45]"
              >
                名取市の補助金の条件を詳しく見る
                <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </Link>
            </div>
            <div className="space-y-4 rounded-3xl bg-stone-50 p-6 md:p-8">
              <LpSubheading>宮城県</LpSubheading>
              <SubsidyCards
                size="md"
                caption="宮城県 スマートエネルギー住宅普及促進事業補助金（令和8年度）"
                rows={MIYAGI_SUBSIDY_ROWS}
                sources={MIYAGI_SUBSIDY_SOURCES}
                checkedAt={CHECKED_AT}
                footnote={
                  <p>
                    今年度これから受付が始まるのは{MIYAGI_NEXT_ROUND.name}です（受付 {MIYAGI_NEXT_ROUND.reception}。対象は
                    {MIYAGI_NEXT_ROUND.installed}）。
                  </p>
                }
              />
            </div>
          </div>
          {/* 早見表（/solar/subsidy/）へのリンクは公開後に追加する */}
        </LpSection>

        <LpSection id="merit" eyebrow="Merit" title="太陽光と蓄電池でできること" tone="gray" width="wide">
          <FeatureGrid
            items={[
              {
                title: '電気代',
                icon: Receipt,
                image: IMAGES.bill,
                // TODO(要確認) 電気代の削減額の試算方法。決まるまで数値は出さない
                body: '発電した電気を家で使うことで、電力会社から買う電気を減らせます。',
              },
              {
                title: '停電への備え',
                icon: BatteryCharging,
                image: IMAGES.battery,
                body: '停電中も、昼は太陽光で発電した電気を、夜は蓄電池の電気を使えます（使える範囲は機器と配線の方式によります）。',
              },
              {
                title: '卒FIT 後の活用',
                icon: Sun,
                image: IMAGES.roof,
                body: '余剰電力の買取期間が終わったご家庭は、蓄電池を後付けして、発電した電気を自分の家で使う割合を増やせます。',
              },
            ]}
          />
        </LpSection>

        <LpSection id="reason" eyebrow="Reason" title="株式会社SCが選ばれる理由" backgroundImage={IMAGES.town}>
          <FeatureGrid
            items={[
              {
                title: '名取市に本社',
                icon: MapPin,
                body: (
                  <>
                    <p>現地調査やアフターのご相談に、近くから伺えます。</p>
                    <p className="mt-2 text-sm text-gray-600">{COMPANY.addressText}</p>
                  </>
                ),
              },
              {
                title: '年中無休 9:00〜21:00 で受付',
                icon: Clock,
                body: `お電話は${COMPANY.hours}で受け付けています（${COMPANY.hoursNote}）。`,
              },
            ]}
          />
        </LpSection>

        <LpSection id="flow" eyebrow="Flow" title="ご相談の流れ" width="wide">
          <div className="grid gap-8 lg:grid-cols-[2fr_3fr] lg:gap-12">
            <div className="relative hidden aspect-[3/4] overflow-hidden rounded-2xl shadow-lg lg:sticky lg:top-32 lg:block lg:self-start">
              <Image src={IMAGES.work.src} alt={IMAGES.work.alt} fill sizes="(min-width: 1024px) 420px, 1px" className="object-cover" />
            </div>
            <FlowSteps steps={FLOW} />
          </div>
        </LpSection>

        <CtaBlock
          id="contact"
          title="太陽光発電・蓄電池のご相談はこちら"
          description={<p>補助金を使えるかなど、お気軽にご相談ください。</p>}
          ctaLocation="bottom"
          image={IMAGES.family}
        />
      </main>

      <Footer variant="light" />
      <FixedCtaBar />
    </div>
  );
}
