import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { COMPANY } from '@/lib/company';
import CtaBlock from '@/components/lp/CtaBlock';
import DeadlineStripe from '@/components/lp/DeadlineStripe';
import FixedCtaBar from '@/components/lp/FixedCtaBar';
import FlowSteps from '@/components/lp/FlowSteps';
import JsonLd from '@/components/lp/JsonLd';
import LpHero from '@/components/lp/LpHero';
import LpSection, { Copy, LpSubheading } from '@/components/lp/LpSection';
import SubsidyTable from '@/components/lp/SubsidyTable';
import { formatJaDate, isOnOrBeforeTodayJst } from '@/components/lp/format';
import { absoluteUrl, breadcrumbNode, graph, localBusinessNode, serviceNode } from '@/components/lp/structuredData';
import type { BreadcrumbItem, FlowStep } from '@/components/lp/types';
import {
  CHECKED_AT,
  DEADLINE_NOTICE,
  IMAGES,
  MIYAGI_NEXT_ROUND,
  MIYAGI_SUBSIDY_ROWS,
  MIYAGI_SUBSIDY_SOURCES,
} from './natori/content';

// /solar/ ハブ。設計は docs/seo/site-structure-solar.md §3-1（最小構成）。見た目は docs/design/solar-natori-design-plan.md に合わせる。
// 施工事例（/solar/works/）と FAQ 抜粋（/solar/faq/）の節は、各ページの公開後に追加する。

// 期限の帯を日付で切り替えるため、1日1回再生成する
export const revalidate = 86400;

const PATH = '/solar/' as const;

const BREADCRUMBS: BreadcrumbItem[] = [
  { name: 'ホーム', path: '/' },
  { name: '太陽光発電・蓄電池', path: PATH },
];

/** 公開済みのエリアLPだけを並べる（未公開ページへのリンクを作らない） */
const AREAS: { name: string; path: `/${string}`; description: string }[] = [
  {
    name: '名取市',
    path: '/solar/natori/',
    description: '名取市の補助金の条件（太陽光と蓄電池の同時設置が対象）、沿岸部での設置、停電への備え。',
  },
];

const FLOW: FlowStep[] = [
  { title: 'お問い合わせ', description: 'お電話またはフォームからご連絡ください。' },
  { title: '現地調査', description: '屋根の状態や日当たり、分電盤などを確認します。' },
  { title: 'お見積もり・ご提案', description: '補助金を使えるかどうかの確認も含めてご説明します。' },
  { title: 'ご契約・電力会社への申請' },
  { title: '工事・電力受給開始' },
  { title: '補助金の申請・アフターサービス', description: '申請に必要な書類やアフターについてもご相談ください。' },
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
  const showDeadline = isOnOrBeforeTodayJst(DEADLINE_NOTICE.until);

  const jsonLd = graph([
    breadcrumbNode(BREADCRUMBS),
    // TODO(要確認) 施工の対応エリア（名取市全域か、どこまで出張するか）。確認できるまで名取市のみ
    serviceNode({ path: PATH, areaServed: [{ '@type': 'City', name: '名取市' }] }),
    // layout.tsx に LocalBusiness が入るまでの暫定
    localBusinessNode(),
  ]);

  return (
    <div className="bg-white pb-20 text-body md:pb-0">
      <JsonLd data={jsonLd} />
      <Header variant="light" />

      <main>
        {/* TODO(要確認) h1・title の対象エリア（岩沼市・仙台南部）は施工の対応エリアの確認後に確定する */}
        <LpHero
          breadcrumbs={BREADCRUMBS}
          title="宮城県名取市・岩沼市・仙台南部の太陽光発電・蓄電池"
          lead={
            <p>
              名取市に本社を置く株式会社SCが、太陽光発電・蓄電池の導入をご案内します。自治体ごとに違う補助金の条件、停電への備え、ご相談から設置までの流れをまとめています。
            </p>
          }
          points={[
            { title: '名取市に本社', body: '現地調査・アフターも近くから' },
            { title: '補助金のご案内', body: '自治体ごとの条件を確認' },
            { title: '受付 9:00〜21:00', body: '年中無休でお電話を受付' },
          ]}
          // TODO(要確認) 施工写真に差し替える。現在は既存サイトの写真で仮置き
          image={IMAGES.hero}
          imagePosition="60% 50%"
        />

        {showDeadline && (
          <DeadlineStripe date={DEADLINE_NOTICE.until} headline="までの設置が名取市の補助の対象">
            <p>
              名取市の令和8年度の補助金は、この日までに設置（太陽光は電力受給開始）が完了したものが対象です。
              <Link href="/solar/natori/#schedule" className="font-bold underline underline-offset-4">
                間に合うかの目安を見る
              </Link>
            </p>
          </DeadlineStripe>
        )}

        <LpSection id="areas" title="対応エリア" tone="sky">
          <ul className="max-w-copy border-t border-ink">
            {AREAS.map((area) => (
              <li key={area.path} className="border-b border-body/30 py-5">
                <Link href={area.path} className="text-[19px] font-bold text-cell underline underline-offset-4">
                  {area.name}の太陽光発電・蓄電池
                </Link>
                <p className="mt-2">{area.description}</p>
              </li>
            ))}
          </ul>
          {/* 岩沼市・仙台市・亘理町のエリアLPは公開後に AREAS へ追加する */}
        </LpSection>

        <LpSection
          id="subsidy"
          title="2026年度の補助金"
          lead={
            <p className="text-[15px]">
              <time dateTime={CHECKED_AT}>{formatJaDate(CHECKED_AT)}</time>
              時点の情報です。受付状況は変わるため、各自治体の公式ページでもご確認ください。
            </p>
          }
        >
          <LpSubheading>名取市</LpSubheading>
          <Copy>
            <p>
              名取市の補助金は、太陽光発電と蓄電池の同時設置、または蓄電池の設置が対象で、太陽光発電だけの設置は対象外です。設置が終わってから申請する方式で、2026年12月31日までに設置したものが対象です。
            </p>
            <p>
              <Link href="/solar/natori/#subsidy" className="font-bold text-cell underline underline-offset-4">
                名取市の補助金の条件を詳しく見る
              </Link>
            </p>
          </Copy>

          <LpSubheading>宮城県</LpSubheading>
          <SubsidyTable
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
          {/* 早見表（/solar/subsidy/）へのリンクは公開後に追加する */}
        </LpSection>

        <LpSection id="merit" title="太陽光と蓄電池でできること" tone="sky">
          <LpSubheading>電気代</LpSubheading>
          {/* TODO(要確認) 電気代の削減額の試算方法。決まるまで数値は出さない */}
          <Copy>
            <p>発電した電気を家で使うことで、電力会社から買う電気を減らせます。</p>
          </Copy>
          <LpSubheading>停電への備え</LpSubheading>
          <Copy>
            <p>
              停電中も、昼は太陽光で発電した電気を、夜は蓄電池の電気を使えます（使える範囲は機器と配線の方式によります）。
            </p>
          </Copy>
          <LpSubheading>卒FIT 後の活用</LpSubheading>
          <Copy>
            <p>
              余剰電力の買取期間が終わったご家庭は、蓄電池を後付けして、発電した電気を自分の家で使う割合を増やせます。
            </p>
          </Copy>
        </LpSection>

        <LpSection id="reason" title="株式会社SCが選ばれる理由">
          <dl className="max-w-copy border-t border-ink">
            <div className="border-b border-body/30 py-5">
              <dt className="font-bold text-ink">名取市に本社</dt>
              <dd className="mt-2">
                <p>現地調査やアフターのご相談に、近くから伺えます。</p>
                <p className="mt-1 text-[15px]">{COMPANY.addressText}</p>
              </dd>
            </div>
            <div className="border-b border-body/30 py-5">
              <dt className="font-bold text-ink">年中無休 9:00〜21:00 で受付</dt>
              <dd className="mt-2">
                お電話は{COMPANY.hours}で受け付けています（{COMPANY.hoursNote}）。
              </dd>
            </div>
          </dl>
        </LpSection>

        <LpSection id="flow" title="ご相談の流れ" tone="sky">
          <FlowSteps steps={FLOW} label="ご相談の流れ" />
        </LpSection>

        <CtaBlock
          id="contact"
          title="太陽光発電・蓄電池のご相談はこちら"
          description={<p>補助金を使えるかなど、お気軽にご相談ください。</p>}
          ctaLocation="bottom"
        />
      </main>

      <Footer variant="light" />
      <FixedCtaBar />
    </div>
  );
}
