import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { COMPANY } from '@/lib/company';
import Breadcrumbs from '@/components/lp/Breadcrumbs';
import CheckList from '@/components/lp/CheckList';
import CtaBlock from '@/components/lp/CtaBlock';
import FaqList from '@/components/lp/FaqList';
import FeatureGrid from '@/components/lp/FeatureGrid';
import FixedCtaBar from '@/components/lp/FixedCtaBar';
import FlowSteps from '@/components/lp/FlowSteps';
import JsonLd from '@/components/lp/JsonLd';
import LpHero from '@/components/lp/LpHero';
import LpSection, { LpSubheading } from '@/components/lp/LpSection';
import LpViewTracker from '@/components/lp/LpViewTracker';
import SourceNote from '@/components/lp/SourceNote';
import SubsidyTable from '@/components/lp/SubsidyTable';
import WorksSection from '@/components/lp/WorksSection';
import { formatJaDate, isOnOrBeforeTodayJst } from '@/components/lp/format';
import {
  absoluteUrl,
  breadcrumbNode,
  faqNode,
  graph,
  localBusinessNode,
  serviceNode,
} from '@/components/lp/structuredData';
import {
  BREADCRUMBS,
  CHECKED_AT,
  DEADLINE_NOTICE,
  FAQS,
  FLOW,
  HAZARD_MAP_SOURCE,
  MIYAGI_NEXT_ROUND,
  MIYAGI_SUBSIDY_ROWS,
  MIYAGI_SUBSIDY_SOURCES,
  NATIONAL_SOURCES,
  NATORI_CONDITIONS,
  NATORI_SUBSIDY_OTHER,
  NATORI_SUBSIDY_ROWS,
  NATORI_SUBSIDY_SOURCES,
  PATH,
  SCHEDULE,
  WORKS,
  WORRIES,
} from './content';

// 期限のお知らせ（2026-12-31 まで）を日付で切り替えるため、1日1回再生成する
export const revalidate = 86400;

export const metadata: Metadata = {
  title: '名取市の太陽光発電・蓄電池｜補助金の要件と申請までご案内｜株式会社SC',
  description:
    '宮城県名取市に本社を置く株式会社SCが、名取市での太陽光発電・蓄電池の導入をご案内します。名取市の補助金（太陽光と蓄電池の同時設置が対象）と宮城県の補助金の要件、停電への備え、施工事例、費用のご相談まで。',
  alternates: { canonical: absoluteUrl(PATH) },
  openGraph: {
    title: '名取市の太陽光発電・蓄電池｜株式会社SC',
    description: '名取市の補助金の要件と、停電への備え。名取市に本社を置く株式会社SCがご案内します。',
    url: absoluteUrl(PATH),
    siteName: '株式会社SC',
    type: 'website',
    locale: 'ja_JP',
    // TODO(要確認) OG 画像に使う名取市内の施工写真（1200x630）。用意できるまでは layout の設定に任せる
  },
};

const checkedAtText = formatJaDate(CHECKED_AT);

export default function SolarNatoriPage() {
  const showDeadline = isOnOrBeforeTodayJst(DEADLINE_NOTICE.until);

  const jsonLd = graph([
    breadcrumbNode(BREADCRUMBS),
    serviceNode({ path: PATH, areaServed: [{ '@type': 'City', name: '名取市' }] }),
    faqNode(FAQS),
    // layout.tsx に LocalBusiness が入るまでの暫定（docs/seo/page-solar-natori.md §2）
    localBusinessNode(),
  ]);

  return (
    <div className="bg-white pb-20 text-gray-800 md:pb-0">
      <JsonLd data={jsonLd} />
      <LpViewTracker />
      <Header variant="light" />
      <Breadcrumbs items={BREADCRUMBS} />

      <main>
        {/* 3-1 ファーストビュー */}
        <LpHero
          title="名取市の太陽光発電・蓄電池は、名取市の株式会社SCへ"
          lead={
            <>
              <p>
                名取市の補助金は「太陽光と蓄電池の同時設置」が対象です。要件の確認から、現地調査・施工まで、名取市手倉田の当社がご案内します。
              </p>
              {/* TODO(要確認) 申請の代行・書類作成の支援の範囲（§4 TODO 1）。確認できたら「申請書類の準備まで」と書く */}
              <p className="mt-2">補助金の申請に必要な書類についてもご相談ください。</p>
            </>
          }
          badges={[
            // TODO(要確認) 同時設置で受け取れる総額（§4 TODO 2）。確認できるまで金額をバッジに出さない
            { title: '名取市の補助金', body: '太陽光と蓄電池の同時設置が対象' },
            { title: '停電に備える', body: '蓄電池で夜間も電気を使える' },
            { title: '名取市に本社', body: '現地調査・アフターも近くから' },
          ]}
          // TODO(要確認) 名取市内の施工写真に差し替える（§4 TODO 4）。現在は /service/ と同じ写真で仮置き
          image={{ src: '/images/service01_img_new.jpg', alt: '株式会社SCの太陽光発電・蓄電池の設置' }}
          notice={showDeadline ? DEADLINE_NOTICE.text : DEADLINE_NOTICE.afterText}
        />

        {/* 3-2 お悩み */}
        <LpSection id="worries" title="名取市で太陽光・蓄電池を検討している方のよくあるお悩み" tone="gray">
          <CheckList items={WORRIES} />
          <p>
            このページでは、名取市の補助金の条件、名取市の気候や沿岸部での設置のポイント、停電への備えを、名取市に本社を置く当社がまとめてご説明します。
          </p>
        </LpSection>

        {/* 3-3 名取市の補助金 ★中心 */}
        <LpSection
          id="subsidy"
          title="名取市の太陽光発電・蓄電池の補助金（令和8年度）"
          lead={
            <p className="rounded-lg bg-gray-50 p-3 text-sm">
              <time dateTime={CHECKED_AT}>{checkedAtText}</time>
              時点の情報です。最新の受付状況は名取市 環境共創課（022-724-7159）にご確認ください。
            </p>
          }
        >
          <LpSubheading>補助の対象と金額</LpSubheading>
          <SubsidyTable
            caption="名取市 住宅用再生可能エネルギー等設備導入補助金（令和8年度）"
            rows={NATORI_SUBSIDY_ROWS}
            sources={NATORI_SUBSIDY_SOURCES}
            checkedAt={CHECKED_AT}
            footnote={
              <p>
                金額は名取市の申請の手引きの記載によります。{NATORI_SUBSIDY_OTHER}
                先着順で、予算に達した時点で受付が終わります。
              </p>
            }
          />

          <LpSubheading>申請の前に知っておきたい5つの条件</LpSubheading>
          <ol className="space-y-3">
            {NATORI_CONDITIONS.map((c, i) => (
              <li key={c.title} className="flex gap-3 rounded-lg bg-white p-4 shadow-sm ring-1 ring-gray-200">
                <span className="flex h-7 w-7 flex-none items-center justify-center rounded-full bg-[#D4E157] text-sm font-bold text-gray-900">
                  {i + 1}
                </span>
                <div>
                  <p className="font-bold text-gray-900">{c.title}</p>
                  <p className="mt-1">{c.body}</p>
                </div>
              </li>
            ))}
          </ol>
          <SourceNote sources={NATORI_SUBSIDY_SOURCES.slice(1)} checkedAt={CHECKED_AT} />

          <LpSubheading>宮城県の補助金と組み合わせる</LpSubheading>
          <p>
            宮城県の「スマートエネルギー住宅普及促進事業」でも、太陽光発電・蓄電池・V2H が補助の対象です。
          </p>
          <SubsidyTable
            caption="宮城県 スマートエネルギー住宅普及促進事業補助金（令和8年度）"
            rows={MIYAGI_SUBSIDY_ROWS}
            sources={MIYAGI_SUBSIDY_SOURCES}
            checkedAt={CHECKED_AT}
            footnote={
              <>
                <p>
                  今年度これから受付が始まるのは<strong className="text-gray-900">{MIYAGI_NEXT_ROUND.name}</strong>
                  です（受付 {MIYAGI_NEXT_ROUND.reception}。対象は{MIYAGI_NEXT_ROUND.installed}）。
                </p>
                {/* TODO(要確認) 名取市の補助金との併用の可否（§4 TODO 6）。公募要領で確認できたら「併用できます」に書き換える */}
                <p className="mt-1">名取市の補助金との併用の可否はご相談ください。</p>
              </>
            }
          />

          <LpSubheading>国の補助金</LpSubheading>
          <p>
            国の家庭用蓄電池の補助金（DR 補助金）は2026年5月29日に予算に達して受付を終了し、V2H の補助金も2026年8月27日に受付を終了しています。次の公募の有無は、各事業の公式ページでご確認ください。
          </p>
          <SourceNote sources={NATIONAL_SOURCES} checkedAt={CHECKED_AT} />

          <LpSubheading>今から間に合う？ 導入までのスケジュール</LpSubheading>
          <p>名取市の補助金は事後申請のため、電力受給開始（設置の完了）が2026年12月31日に間に合うかどうかが大切です。</p>
          <FlowSteps steps={SCHEDULE} variant="timeline" />
          {/* TODO(要確認) ご契約から電力受給開始までの目安期間（§4 TODO 7）。確認できるまでこの行は出さない */}
          <p>
            工事と電力会社の手続きにかかる期間は、住宅や時期によって変わります。補助金の期限に間に合うかは、お早めにご相談ください。
          </p>
          {/* TODO(要確認) 施工会社が用意する書類（配置図・写真・配線図・保証書の写しなど）を SC で用意するか（§4 TODO 1） */}
          <p>補助金の申請に必要な書類についてもご相談ください。</p>
          {/* 内部リンク「宮城県・周辺市町の補助金一覧」→ /solar/subsidy/ は公開後に追加する */}
        </LpSection>

        <CtaBlock
          title="名取市の補助金が使えるか、まずはご相談ください"
          headingLevel="p"
          ctaLocation="middle"
        />

        {/* 3-4 名取市の気候と設置条件 */}
        <LpSection id="area" title="名取市で太陽光発電を設置するときのポイント">
          <LpSubheading>日照と雪</LpSubheading>
          {/* TODO(要確認) 名取のアメダスの年間日照時間などの数値を載せるか（§4 TODO 8）。載せる場合は気象庁の過去の気象データを出典にし、2021年以降は推計値である点に注意 */}
          <p>
            名取市は太平洋側の気候で、冬も晴れる日が比較的多く、日本海側の地域に比べて積雪は少なめです。ただし発電量は、屋根の向きや角度、周りの建物や樹木の影によって大きく変わるため、現地調査で確認します。
          </p>
          {/* TODO(要確認) 発電量シミュレーションを提供できるか（§4 TODO 9）。確認できるまで「試算します」とは書かない */}

          <LpSubheading>沿岸部（閖上・下増田・北釜など）の塩害</LpSubheading>
          <p>
            海に近い地域では、メーカーごとに、海岸からの距離などによって設置できる機種や保証の条件が決まっています。沿岸部のお住まいでは、現地調査でご自宅の場所の条件を確認します。
          </p>
          {/* TODO(要確認) 扱うメーカーの塩害の基準（海岸から何 m 以内は不可・重塩害仕様など）（§4 TODO 10）。具体的な距離は確認できるまで書かない */}

          <LpSubheading>屋根と住宅の状況</LpSubheading>
          {/* TODO(要確認) 地区名（美田園・杜せきのした・愛島台など）は施工事例のある地区だけを書く（§4 TODO 4） */}
          <p>
            新築の住宅か、築年数の経った住宅かによって、確認することが変わります。築年数の経った住宅では、パネルを載せる前に屋根の傷みや防水の状態を確認します。新築の場合は、ZEH（ネット・ゼロ・エネルギー・ハウス）に関連する制度もあわせて確認します。
          </p>
        </LpSection>

        {/* 3-5 停電・災害への備え */}
        <LpSection id="disaster" title="停電に備える ― 名取市のハザードマップも確認しましょう" tone="gray">
          {/* TODO(要確認) 2011年・2022年の地震での宮城県（名取市）の停電戸数（§4 TODO 11）。東北電力などの一次資料で確認できるまで数値は書かない */}
          <p>
            名取市は東日本大震災で大きな被害を受け、2022年3月の福島県沖地震でも広い範囲で停電が起きました。太陽光発電と蓄電池があれば、停電中も、昼は発電した電気を、夜は蓄電池にためた電気を使えます（使える範囲は機器と配線の方式によります）。
          </p>

          <LpSubheading>全負荷型と特定負荷型</LpSubheading>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-gray-200">
              <p className="font-bold text-gray-900">全負荷型</p>
              <p className="mt-1">停電時に、家全体のコンセントや照明に電気を送ります。普段に近い暮らしを続けやすい方式です。</p>
            </div>
            <div className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-gray-200">
              <p className="font-bold text-gray-900">特定負荷型</p>
              <p className="mt-1">冷蔵庫や照明など、あらかじめ決めた回路にだけ電気を送ります。必要なものに絞って長く使う方式です。</p>
            </div>
          </div>

          <LpSubheading>浸水が想定される地域での設置場所</LpSubheading>
          <p>
            名取市は2026年に、津波・洪水・土砂災害・内水のハザードマップを更新しています。浸水が想定される地域では、蓄電池を屋外に置く場合の基礎の高さや、屋内への設置などを検討する必要があります。ハザードマップの確認もご相談ください。
          </p>
          {/* TODO(要確認) 浸水想定を踏まえた設置場所の提案を SC が実際にしているか（§4 TODO 12）。している場合は「ご提案します」に書き換える */}
          <SourceNote sources={HAZARD_MAP_SOURCE} checkedAt={CHECKED_AT} />

          <LpSubheading>電気自動車をお持ちの方は V2H も</LpSubheading>
          <p>
            電気自動車（EV）をお持ちの方は、車のバッテリーを家の電気に使う V2H という選択肢もあります。V2H は宮城県の補助金（1件あたり4万円）の対象ですが、名取市の補助金の対象には含まれていません。
          </p>
          {/* 内部リンク /solar/blackout/ は公開後に追加する */}
        </LpSection>

        {/* 3-6 メリット */}
        <LpSection id="merit" title="太陽光発電と蓄電池を導入するメリット">
          <FeatureGrid
            items={[
              {
                title: '電気代',
                // TODO(要確認) 電気代の削減額の試算方法（§4 TODO 13）。決まるまで削減額の数値は出さない
                body: '発電した電気を家で使うことで、電力会社から買う電気を減らせます。どのくらい減るかは、ご家庭の電気の使い方から試算します。',
              },
              {
                title: '停電への備え',
                body: '停電中も、昼は太陽光で発電した電気を、夜は蓄電池の電気を使えます。',
                href: '#disaster',
                linkText: '停電への備えを見る',
              },
              {
                title: '補助金',
                body: '名取市では、太陽光と蓄電池の同時設置や、蓄電池の設置が補助の対象です。',
                href: '#subsidy',
                linkText: '名取市の補助金を見る',
              },
            ]}
          />
          <div className="rounded-xl bg-gray-50 p-5">
            <p className="font-bold text-gray-900">太陽光の買取期間が終わった（卒FIT）ご家庭へ</p>
            <p className="mt-2">
              余剰電力の買取期間が終わったご家庭は、蓄電池を後付けして、発電した電気を自分の家で使う割合を増やす選択肢があります。太陽光発電と接続する蓄電池は名取市の補助金の対象です。また、既存の太陽光パネルに増設し、あわせて蓄電池を新たに設置する場合も、名取市の補助金の対象になり得ます。
            </p>
          </div>
        </LpSection>

        {/* 3-7 選ばれる理由 */}
        <LpSection id="reason" title="名取市の株式会社SCにご相談いただく理由" tone="gray">
          <FeatureGrid
            items={[
              {
                title: '名取市手倉田に本社',
                // TODO(要確認) 施工の対応エリア（§4 TODO 22）。確認できるまで「名取市および周辺地域」
                body: (
                  <>
                    <p>名取市および周辺地域の現地調査やアフターのご相談に、近くから伺えます。</p>
                    <p className="mt-2 text-sm text-gray-600">{COMPANY.addressText}</p>
                  </>
                ),
              },
              {
                title: '年中無休 9:00〜21:00 で受付',
                body: `お電話は${COMPANY.hours}で受け付けています（${COMPANY.hoursNote}）。`,
              },
              {
                // TODO(要確認) 扱っている太陽光パネル・蓄電池のメーカー（§4 TODO 14）
                // TODO(要確認) 施工体制（自社施工か協力会社か）と保有資格（§4 TODO 15）
                title: '太陽光と蓄電池をまとめてご提案',
                body: '名取市の補助金の条件（太陽光と蓄電池の同時設置など）を踏まえて、太陽光発電と蓄電池をまとめてご提案します。',
              },
            ]}
          />
        </LpSection>

        {/* 3-8 施工事例（3件そろうまで非表示） */}
        <WorksSection title="名取市の施工事例" works={WORKS} />

        {/* 3-9 費用の目安 */}
        <LpSection id="price" title="費用の目安">
          {/* TODO(要確認) 価格帯を公開するか（税込・工事費込み）（§4 TODO 16） */}
          <p>
            費用は、屋根の大きさや向き、蓄電池の容量によって変わるため、現地調査のうえでお見積もりします。お見積もりでは、機器の費用、工事の費用、申請の手続きに分けて内訳をご説明します。
          </p>
          {/* TODO(要確認) ローン・リースの取り扱い（§4 TODO 17）。確認できるまで書かない */}
          <p className="rounded-lg border-l-4 border-amber-400 bg-amber-50 p-4 text-amber-900">
            リースなど、所有権が期間満了後に移る契約は、名取市の補助金の対象外です。
          </p>
        </LpSection>

        {/* 3-10 保証・アフターサービス */}
        <LpSection id="warranty" title="保証とアフターサービス" tone="gray">
          {/* TODO(要確認) SC 独自の工事保証の有無・年数、メーカー保証の内容（§4 TODO 18）。確認できるまで独自保証の表現をしない */}
          {/* TODO(要確認) 定期点検などのアフターサービスの内容（§4 TODO 19） */}
          <p>
            メーカーの保証の内容は機器ごとに異なるため、お見積もりの際にご説明します。設置後のアフターのご相談にも対応します。
          </p>
          <p>なお、名取市の補助金の申請には、蓄電池の保証書の写しが必要です。</p>
        </LpSection>

        {/* 3-11 流れ */}
        <LpSection id="flow" title="ご相談から設置・補助金の申請までの流れ">
          <FlowSteps steps={FLOW} />
        </LpSection>

        {/* 3-12 FAQ */}
        <LpSection id="faq" title="名取市の太陽光発電・蓄電池 よくある質問" tone="gray">
          <FaqList faqs={FAQS} />
        </LpSection>

        {/* 3-13 お問い合わせ */}
        <CtaBlock
          id="contact"
          title="名取市の太陽光発電・蓄電池のご相談はこちら"
          description={<p>補助金を使えるか、今から間に合うかなど、お気軽にご相談ください。</p>}
          ctaLocation="bottom"
        />

        {/* 3-14 周辺エリア。岩沼市・仙台市・亘理町のエリアLPは公開後に追加する */}
        <LpSection id="nearby" title="周辺エリアの太陽光発電・蓄電池">
          <p>
            宮城県南部での太陽光発電・蓄電池のご案内は、
            <Link href="/solar/" className="font-bold text-gray-900 underline underline-offset-4 hover:text-[#9aa52a]">
              太陽光発電・蓄電池のページ
            </Link>
            にまとめています。
          </p>
        </LpSection>
      </main>

      <Footer variant="light" />
      <FixedCtaBar />
    </div>
  );
}
