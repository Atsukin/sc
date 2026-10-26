// /solar/natori/ の地域固有データ。構成の正は docs/seo/page-solar-natori.md。
// 制度情報は毎月1日に見直し、CHECKED_AT を更新する（§6）。
import type {
  BreadcrumbItem,
  Condition,
  Faq,
  FlowStep,
  ImageAsset,
  Source,
  SubsidyRow,
  WorkCase,
} from '@/components/lp/types';

export const PATH = '/solar/natori/' as const;

/** 補助金などの制度情報を確認した日 */
export const CHECKED_AT = '2026-10-09';

export const BREADCRUMBS: BreadcrumbItem[] = [
  { name: 'ホーム', path: '/' },
  { name: '太陽光発電・蓄電池', path: '/solar/' },
  { name: '名取市', path: PATH },
];

/** 期限のお知らせ（§3-1）。until を過ぎたら afterText に切り替わる */
export const DEADLINE_NOTICE = {
  until: '2026-12-31',
  text: '名取市の令和8年度の補助金は、2026年12月31日までに設置（太陽光は電力受給開始）が完了したものが対象です。今からのご契約で間に合うかは、お早めにご相談ください。',
  afterText: '名取市の令和9年度の補助金の制度は、公表され次第このページに掲載します。',
};

export const WORRIES = [
  '電気代が上がり続けていて、家計を見直したい',
  '震災のときの停電を思い出すと、電気の備えをしておきたい',
  '名取市の補助金が使えるのか、条件がよくわからない',
  '太陽光は付けているが、売電の買取期間が終わった（卒FIT）ので蓄電池を後付けしたい',
  '訪問販売で受け取った見積もりが妥当なのか判断できない',
];

// ---- 名取市の補助金（§3-3） -------------------------------------------------

export const NATORI_SUBSIDY_ROWS: SubsidyRow[] = [
  {
    target: '太陽光発電設備と定置用蓄電池を同時に設置',
    // TODO(要確認) 同時設置で受け取れる「総額」（10万円か、10万円＋6万円か）を名取市 環境共創課（022-724-7159）に確認する。
    // 確認できるまでは手引きの原文どおりに書き、合計額の表現は使わない（§4 TODO 2）
    amount: '1件あたり10万円',
  },
  { target: '定置用蓄電池（太陽光発電設備と接続）', amount: '1件あたり6万円' },
];

// TODO(要確認) SC でエネファームを扱うか（§4 TODO 5）。扱わない前提で、表には入れず注記だけにしている
export const NATORI_SUBSIDY_OTHER = 'ほか、家庭用燃料電池（エネファーム）は1件あたり12万円が対象です。';

export const NATORI_SUBSIDY_SOURCES: Source[] = [
  {
    label: '名取市「5月から受付開始！住宅用再生可能エネルギー等設備導入補助金のお知らせ」',
    url: 'https://www.city.natori.miyagi.jp/page/19096.html',
  },
  {
    label: '名取市「令和8年度 申請の手引き」（PDF）',
    url: 'https://www.city.natori.miyagi.jp/uploaded/attachment/24217.pdf',
  },
];

export const NATORI_CONDITIONS: Condition[] = [
  {
    title: '太陽光発電だけを設置した場合は対象外',
    kind: 'ng',
    body: '蓄電池との同時設置、または既存の太陽光パネルへの増設と定置用蓄電池の新規設置が条件です。',
  },
  {
    title: '設置が終わってから申請する（事後申請）',
    kind: 'must',
    body: '太陽光の「設置日」は、電力会社の電力受給契約確認書に書かれた電力受給開始日です。確認書が届くまで申請できません。',
  },
  {
    title: '2026年1月1日〜12月31日に設置したものが対象',
    kind: 'date',
    body: '申請の締切は2027年2月1日ですが、先着順で、予算に達した時点で受付が終わります。',
  },
  {
    title: 'リース・PPA（初期費用ゼロ型）は対象外',
    kind: 'ng',
    body: 'リースなど、所有権が期間満了後に移る契約は対象外です。購入した設備が対象です。',
  },
  {
    title: '書類の名義をすべて同じ人にする',
    kind: 'must',
    body: '契約書・領収書・申請書の名義をそろえます。また、5年以内に設備を処分する場合は市への届出が必要です。',
  },
];

/** 対象になる / ならないの早見（上の条件と申請の手引きの記載を言い換えたもの。金額は NATORI_SUBSIDY_ROWS を正とする） */
export const NATORI_ELIGIBILITY = {
  ok: {
    title: '補助の対象になる',
    items: [
      '太陽光発電と定置用蓄電池を同時に設置する',
      '既存の太陽光パネルに増設し、定置用蓄電池を新たに設置する',
      '太陽光発電と接続する定置用蓄電池を設置する',
      '購入した設備（契約書・領収書・申請書の名義が同じ）',
    ],
  },
  ng: {
    title: '補助の対象にならない',
    items: [
      '太陽光発電だけの設置',
      'リース・PPA など、所有権が期間満了後に移る契約',
      '設置日が2026年1月1日〜12月31日の範囲外のもの（令和8年度の場合）',
    ],
  },
};

// ---- 宮城県の補助金 -----------------------------------------------------------

export const MIYAGI_SUBSIDY_ROWS: SubsidyRow[] = [
  { target: '太陽光発電（蓄エネ設備併設タイプ）', amount: '1件あたり3万円' },
  { target: '蓄電池', amount: '1件あたり4万円' },
  { target: 'V2H（電気自動車と住宅の間で充放電する設備）', amount: '1件あたり4万円' },
];

export const MIYAGI_NEXT_ROUND = {
  name: '三次募集',
  reception: '2026年11月24日〜12月4日',
  installed: '2026年10月1日〜11月30日に導入したもの',
};

export const MIYAGI_SUBSIDY_SOURCES: Source[] = [
  {
    label: '宮城県「スマートエネルギー住宅普及促進事業」',
    url: 'https://www.pref.miyagi.jp/soshiki/kankyo-s/smart-energy.html',
  },
  {
    label: '宮城県建築住宅センター「スマートエネルギー住宅普及促進事業補助金」',
    url: 'https://www.mkj.or.jp/subsidy/smart-energy',
  },
];

export const NATIONAL_SOURCES: Source[] = [
  { label: '環境共創イニシアチブ（SII）「家庭用蓄電システム導入支援事業」', url: 'https://sii.or.jp/DRchikudenchi_katei07r/' },
  { label: '次世代自動車振興センター', url: 'https://www.cev-pc.or.jp/' },
];

export const SCHEDULE: FlowStep[] = [
  { title: 'ご相談' },
  { title: '現地調査' },
  { title: 'お見積もり・ご契約' },
  { title: '電力会社への連系申請' },
  { title: '工事' },
  { title: '電力受給開始', highlight: '2026年12月31日までに' },
  { title: '市へ申請', description: '〜2027年2月1日' },
  { title: '補助金の入金', description: '交付決定から1〜2週間が目安（市の手引きによる）' },
];

/** 期限の表（§3-3）。DEADLINE_NOTICE.until を過ぎたら出さない */
export const KEY_DATES = [
  {
    label: '設置の完了（太陽光は電力受給開始）',
    date: '2026-12-31',
    note: '名取市の令和8年度の補助金の対象になる設置の期限です。',
    emphasis: true,
  },
  {
    label: '名取市への申請の締切',
    date: '2027-02-01',
    note: '先着順で、予算に達した時点で受付が終わります。',
  },
];
// TODO(要確認) ご契約から電力受給開始までの目安期間（社内の実績）。確認できるまで表示しない（§4 TODO 7）

export const HAZARD_MAP_SOURCE: Source[] = [
  {
    label: '名取市「名取市ハザードマップ（津波、洪水・土砂災害、内水）を更新しました」',
    url: 'https://www.city.natori.miyagi.jp/site/bousai-keiiban/41622.html',
  },
];

// ---- 施工事例（§3-8） ---------------------------------------------------------
// TODO(要確認) 名取市内の施工事例を3件以上（地区名・容量・メーカー・補助金の利用・写真・掲載許可）。
// 3件そろうまで WorksSection は何も表示しない。ダミーの事例は入れないこと（§4 TODO 4）
export const WORKS: WorkCase[] = [];

// ---- 流れ（§3-11） -----------------------------------------------------------

export const FLOW: FlowStep[] = [
  { title: 'お問い合わせ', description: 'お電話またはフォームからご連絡ください。' },
  {
    title: '現地調査',
    description:
      '屋根の状態や日当たり、分電盤を確認します。沿岸部では塩害の条件を、あわせてハザードマップでご自宅の想定も確認します。',
  },
  { title: 'お見積もり・ご提案', description: '補助金を使えるかどうかの確認も含めてご説明します。' },
  { title: 'ご契約' },
  {
    title: '電力会社への申請・経済産業省の設備認定',
    description: '太陽光発電を電力会社の送配電網につなぐための手続きです。',
  },
  // TODO(要確認) 工事の日数（社内の実績）。確認できるまで日数は書かない（§4 TODO 7）
  { title: '工事' },
  { title: '電力受給開始', description: '電力会社から電力受給契約確認書が届きます。名取市の補助金の申請に必要です。' },
  {
    title: '名取市・宮城県への補助金の申請',
    // TODO(要確認) 申請の代行・書類作成の支援をどこまでしているか（§4 TODO 1）。確認できるまでは「ご相談ください」にとどめる
    description: '申請はご契約者さまの名義で行います。申請に必要な書類についてもご相談ください。',
  },
  // TODO(要確認) 定期点検などのアフターサービスの内容（§4 TODO 19）
  { title: 'アフターサービス', description: '設置後の気になる点やアフターのご相談にも対応します。' },
];

// ---- FAQ（§3-12）。表示と JSON-LD の両方にこの文を使う -------------------------

export const FAQS: Faq[] = [
  {
    question: '太陽光発電だけを設置しても、名取市の補助金は使えますか？',
    answer:
      '使えません。名取市の補助金は、太陽光発電と定置用蓄電池の同時設置、または既存の太陽光パネルへの増設と定置用蓄電池の新規設置が条件です。',
  },
  {
    question: '蓄電池だけを後付けしても補助金は使えますか？',
    answer:
      '太陽光発電設備と接続する定置用蓄電池であれば、名取市の補助金の1件あたり6万円の対象です。SII に登録された機器であることなどの要件があります。',
  },
  {
    question: '補助金はいつ申請しますか？ 工事の前ですか？',
    answer:
      '名取市の補助金は、設置が終わってから申請します。太陽光と一緒に申請する場合は、電力会社の電力受給契約確認書が届いてからになります。なお、仙台市の補助金は工事の前の申請が必要で、自治体によって違います。',
  },
  {
    // TODO(要確認) 2027年1月に令和9年度の内容へ差し替える（§5 公開前チェック）
    question: '今から契約しても今年度の補助金に間に合いますか？',
    answer:
      '名取市の令和8年度の補助金は、2026年12月31日までに設置（太陽光は電力受給開始）が完了している必要があります。工事と電力会社の手続きの期間によるため、早めにご相談ください。',
  },
  {
    // TODO(要確認) 宮城県と名取市の補助金の併用の可否を公募要領で確認し、確認できたら回答を書き換える（§4 TODO 6）
    question: '宮城県の補助金と一緒に使えますか？',
    answer:
      '併用できるかどうかは、宮城県の補助金の公募要領の条件によります。併用の可否はご相談ください。宮城県の補助金の窓口は宮城県建築住宅センター（022-265-3605）です。',
  },
  {
    question: '初期費用ゼロ（リース・PPA）でも補助金は出ますか？',
    answer: '名取市の補助金は、リースなど所有権が期間満了後に移る契約は対象外です。購入した設備が対象です。',
  },
  {
    // TODO(要確認) 扱うメーカーの塩害地域の基準、沿岸部での施工の可否（§4 TODO 10）。確認できたら機種の提案について書き足す
    question: '海の近く（閖上など）でも設置できますか？',
    answer:
      'メーカーごとに、海岸からの距離などによって設置できる機種や保証の条件が決まっています。現地調査で、ご自宅の場所の条件を確認します。',
  },
  // TODO(要確認) 「停電したときは自動で蓄電池に切り替わりますか？」は、扱う機種の仕様（自動/手動、全負荷・特定負荷）を確認してから追加する（§4 TODO 21）
];

// ---- 写真（§ビジュアル）。フリー素材の出典は docs/assets/image-credits.md --------------
// デザイン計画（docs/design/solar-natori-design-plan.md）により、写真はファーストビュー・設置のポイント・停電の3か所だけに使う。
// ほかの写真（panels-blue-sky など）のファイルと出典の記録は残している
// フリー素材は「イメージ」として使う。alt やキャプションで施工事例・当社施工と書かないこと

export const IMAGES = {
  // TODO(要確認) 名取市内の施工写真に差し替える（§4 TODO 4）。現在は既存サイトの /images/service01_img.jpg を WebP にしたもの
  hero: { src: '/images/solar/roof-panels.webp', alt: '住宅の屋根に設置された太陽光パネル' },
  coast: { src: '/images/solar/coast-town.webp', alt: '海沿いの住宅地（イメージ）' },
  blackout: { src: '/images/solar/blackout-candle.webp', alt: '停電した部屋でろうそくを灯したテーブル（イメージ）' },
} satisfies Record<string, ImageAsset>;
