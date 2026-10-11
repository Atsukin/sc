# 計測設計書（tracking plan）

- 対象: sc-14.net（コーポレート + `/solar/<area>/` SEO LP + `/lp/<slug>/` 広告 LP）
- 計測経路: サイト → `dataLayer` → GTM `GTM-KDJLQXS8` → GA4（測定 ID は `G-XXXXXXXXXX`。TODO(要確認): GA4 管理画面で確認して書き換える）
- 問い合わせ DB: Supabase（フェーズ2で構築）。GA4 とは `lead_id` と `ga_client_id` で突き合わせる
- 正: dataLayer のイベント名・パラメータ名はこのファイルを正とする。追加・変更したら必ずここを更新する
- 作成: 2026-10-09 analytics-analyst（フェーズ3準備）

---

## 0. 前提と用語

| 用語 | 定義 |
|---|---|
| LP | `/lp/<slug>/`（広告 LP、noindex）と `/solar/<area>/`（SEO LP）の両方を指す。`/solar/` ハブ・トップ・会社概要などは LP ではない |
| `lp_slug` | LP を識別するキー。LP 以外は `null`（GA4 上は `(not set)` と表示される） |
| CV | フォーム送信の成功（`generate_lead`）。電話は `tel_click`（タップした意図）までしか Web では取れない |
| 成約 | Supabase の問い合わせステータスが「成約」になったもの |

### `lp_slug` の決め方（コードと GTM の両方でこのルールを実装する）

| パス | `lp_slug` | `page_type` | `lp_area` |
|---|---|---|---|
| `/lp/<slug>/` | `<slug>` | `lp_ad` | slug の2番目のトークン |
| `/solar/<area>/` | `solar-<area>` | `lp_seo` | `<area>` |
| `/solar/` | `null` | `hub` | `null` |
| `/contact/` | `null` | `contact` | `null` |
| 上記以外 | `null` | `corporate` | `null` |

slug の命名規則（エリア別 CVR を正規表現だけで出せるようにするため）:

- 形式: `<事業>-<エリア>[-<訴求>]`。すべて小文字の英数字、区切りはハイフン
- 事業: `solar`（太陽光・蓄電池）/ `farm` / `house`
- エリアはハイフンを含まない1語にする: `natori` / `iwanuma` / `taihaku` / `wakabayashi` / `watari`（仙台市太白区は `taihaku`。`sendai-taihaku` にはしない）
- 広告 LP は必ず訴求サフィックスを付ける（例: `/lp/solar-natori-subsidy/`）。SEO LP の `solar-natori` と重複させない

---

## 1. イベント一覧

### 1-1. 全イベント共通パラメータ

| パラメータ | 型 | 例 | 備考 |
|---|---|---|---|
| `lp_slug` | string \| null | `solar-natori-subsidy` | 上の表のルールで決める。LP 以外は明示的に `null` を push する（GTM のデータレイヤーは前の値を引き継ぐため、省略すると LP から離れた後も古い slug が残る） |
| `page_type` | string | `lp_ad` | 同上 |
| `lp_area` | string \| null | `natori` | 同上 |

> 個人情報（氏名・電話番号・メールアドレス・問い合わせ本文）は、どのイベントにも絶対に入れない（GA4 の利用規約違反になる）。

### 1-2. イベント定義

| イベント | 発火条件 | 固有パラメータ | GA4 での扱い |
|---|---|---|---|
| `page_view_spa` | `next/link` によるクライアント遷移でパス名が変わったとき。初回表示では発火しない | `page_location`, `page_path`, `page_title` | GTM で GA4 の **`page_view`** として送る（イベント名を `page_view_spa` のまま送らない） |
| `cta_click` | 電話以外の CTA（フォームへのスクロールボタン、`/contact/` へのボタン、LINE など）をクリックしたとき | `cta_type`, `cta_location`, `cta_text` | 通常イベント |
| `tel_click` | `tel:` リンクをクリック・タップしたとき（ヘッダー・フッター・LP・お問い合わせページのすべて） | `cta_location`, `link_url`（`tel:0223548345`） | **キーイベント**（ただし Google 広告の主 CV にはしない。後述） |
| `form_start` | フォームの入力欄に初めてフォーカスまたは入力したとき。1 ページビュー・1 フォームにつき1回だけ | `form_name` | 通常イベント |
| `form_error` | 送信が失敗したとき（サーバーエラー・ネットワークエラー・ブラウザのバリデーションエラー） | `form_name`, `error_type`, `error_field` | 通常イベント |
| `generate_lead` | API が成功を返し、Supabase に保存されたとき（レスポンスの `lead_id` を受け取った後） | `form_name`, `lead_id`, `ref_lp_slug` | **キーイベント（主 CV）** |

固有パラメータの値:

| パラメータ | 取りうる値 | 備考 |
|---|---|---|
| `cta_type` | `form` / `contact_page` / `line` | 電話は `cta_click` ではなく `tel_click` で取る（二重計上を防ぐため） |
| `cta_location` | `header` / `fv` / `middle` / `bottom` / `fixed_footer` / `footer` / `contact_page` | 同じページ内のどの CTA が効いているかを見る |
| `cta_text` | ボタンの文言（最大 50 文字） | A/B テストで文言を比べるときに使う |
| `form_name` | `contact`（`/contact/`）/ `lp`（LP 埋め込みフォーム） | |
| `error_type` | `validation`（ブラウザ・クライアント側）/ `server_4xx` / `server_5xx` / `network` / `turnstile` | |
| `error_field` | `name` / `phone` / `email` / `message` / null | `validation` のときだけ入れる |
| `lead_id` | Supabase の問い合わせ ID（UUID） | DB と GA4 を突き合わせるキー。個人を特定できる情報ではない |
| `ref_lp_slug` | そのセッションで最後に見た LP の slug | `/contact/` から送信されたとき、どの LP を経由したかを残す。sessionStorage `sc_last_lp` から読む |

### 1-3. 電話 CTA とフォーム CTA の扱い（決定事項）

- `tel:` リンクのクリックは、どこにあっても `tel_click` だけを送る。`cta_click` は送らない
- KPI ツリーの「CTA クリック」は `cta_click` + `tel_click` の合計で見る
- `.claude/agents/lp-builder.md` には「電話 CTA でも `cta_click`（`cta_type: 'tel'`）を送る」と書かれており、この設計とずれている。lp-builder の指示を「電話は `tel_click`」に合わせて更新する必要がある（analytics-analyst の権限外のため、要対応として残す）

### 1-4. UTM を GA4 に送るか

- 送らない。GA4 はランディング時の URL から `utm_*` と `gclid` を自動で読み、セッションと最初のユーザーの参照元を付ける
- UTM は Supabase 側にだけ保存し、`lead_id` で GA4 と結ぶ（3章）
- lp-builder.md の「`generate_lead` に UTM を付ける」は、dataLayer に載せても害はない（GTM 側でタグに設定しなければ GA4 には送られない）が、不要である

### 1-5. dataLayer の push 例

```js
// LP の FV にある「無料見積もり」ボタン（フォームへスクロール）
dataLayer.push({ event: 'cta_click', lp_slug: 'solar-natori-subsidy', page_type: 'lp_ad', lp_area: 'natori',
  cta_type: 'form', cta_location: 'fv', cta_text: '無料で見積もりを依頼する' });

// 電話
dataLayer.push({ event: 'tel_click', lp_slug: null, page_type: 'contact', lp_area: null,
  cta_location: 'contact_page', link_url: 'tel:0223548345' });

// フォーム送信成功
dataLayer.push({ event: 'generate_lead', lp_slug: null, page_type: 'contact', lp_area: null,
  form_name: 'contact', lead_id: '6f1c...', ref_lp_slug: 'solar-natori-subsidy' });
```

実装上は `pushToDataLayer` を直接呼ばせず、`trackEvent(event, params)` のようなラッパーを `src/lib/gtm.ts` に用意し、`lp_slug` / `page_type` / `lp_area` を `location.pathname` から自動で付けるのがよい（付け忘れを防げる）。これは修正案であり、実装は担当者に依頼する（5章）。

---

## 2. GA4 の設定（管理画面で手作業）

### 2-1. データストリームの拡張計測（重要）

GA4 管理 → データストリーム → ウェブ → 拡張計測機能 → 歯車アイコン

| 項目 | 設定 | 理由 |
|---|---|---|
| ページビュー | ON | 初回表示の `page_view` は GA4 の Google タグが送る |
| └ ブラウザの履歴イベントに基づくページの変更 | **OFF** | ON のままだと、クライアント遷移で GA4 が自動で `page_view` を送り、`page_view_spa` 由来の `page_view` と二重に計上される |
| スクロール数 | ON | |
| 離脱クリック | ON | |
| サイト内検索 | OFF | サイト内検索がないため |
| フォームの操作 | **OFF** | GA4 が自動で `form_start` / `form_submit` を送る。自前の `form_start` と名前が衝突し、二重に計上される |
| 動画エンゲージメント | ON（動画を置かないなら OFF でも可） | |
| ファイルのダウンロード | ON | |

### 2-2. キーイベント

GA4 管理 → イベント（または「キーイベント」）

| イベント | キーイベント | 備考 |
|---|---|---|
| `generate_lead` | する | 主 CV。Google 広告に取り込むときも主 CV にする |
| `tel_click` | する | 電話の「意図」。実際に通話したかは分からない。Google 広告に取り込む場合は「セカンダリ」にして入札に使わない |
| その他 | しない | |

`generate_lead` と `tel_click` は、本番で1回以上発火してイベント一覧に出てからでないとキーイベントにできない。事前に設定したい場合は「キーイベント → 新しいキーイベント」で名前を手入力する。

### 2-3. カスタムディメンション（イベントスコープ）

GA4 管理 → カスタム定義 → カスタムディメンションを作成。**登録した日以降のデータにしか効かない**ので、実装をリリースする前に登録しておく。

| ディメンション名 | イベントパラメータ | 用途 |
|---|---|---|
| LP slug | `lp_slug` | LP 別 CVR |
| ページ種別 | `page_type` | 広告 LP / SEO LP / コーポレートの比較 |
| LP エリア | `lp_area` | エリア別 CVR |
| CTA 種別 | `cta_type` | |
| CTA 位置 | `cta_location` | |
| CTA 文言 | `cta_text` | |
| フォーム名 | `form_name` | |
| エラー種別 | `error_type` | |
| エラー項目 | `error_field` | |
| 経由 LP | `ref_lp_slug` | `/contact/` での CV がどの LP 経由か |
| リード ID | `lead_id` | DB との突き合わせ（探索レポートでのみ使う。値の種類が多いので標準レポートでは使わない） |

### 2-4. その他のプロパティ設定

| 項目 | 設定 | 理由 |
|---|---|---|
| データ保持 | イベントデータ **14 か月** | 初期値は2か月で、前年同月比や探索レポートが使えなくなる |
| レポート用識別子 | **デバイスベース** | Google シグナルによる「しきい値」で、少ない数値が非表示になるのを防ぐ（母数の小さいサイトでは特に効く） |
| 内部トラフィック | 本社の固定 IP を「内部トラフィック」に定義し、データフィルタを「有効」にする | 社員の閲覧・テスト送信を除く。TODO(要確認): 本社の固定 IP |
| 除外する参照 | Turnstile・決済などの外部ドメインを経由する場合は追加 | 現状は不要 |
| リンク | Search Console・Google 広告（出稿時）をリンクする | |
| チャネルグループ | カスタムチャネルグループ「SC 標準」を作る（4-4 参照） | QR・LINE を独立したチャネルとして見るため |

---

## 3. GTM の設定（管理画面で手作業）

### 3-0. 作業前

1. GTM 管理 → コンテナをエクスポート で現状をバックアップする
2. 既存のタグ・トリガーを確認する。とくに以下があれば整理する
   - 旧ユニバーサルアナリティクスのタグ（停止済みなので削除）
   - 「サンクスページの表示」を CV にしているトリガー（いまのサイトにはサンクスページがない）
   - GA4 設定タグが2つ以上ある（`page_view` の二重計上になる）
3. 新しいワークスペースを「フェーズ3 計測」という名前で作る

### 3-1. 変数

**組み込み変数**（変数 → 組み込み変数を設定）で以下を有効にする: Page Path, Page URL, Page Hostname, Referrer, Event, Click URL, Click Text

**ユーザー定義変数**

| 変数名 | 種類 | 設定 |
|---|---|---|
| `CONST - GA4 Measurement ID` | 定数 | `G-XXXXXXXXXX` |
| `DLV - page_location` | データレイヤーの変数 | `page_location`（バージョン2） |
| `DLV - page_title` | データレイヤーの変数 | `page_title` |
| `DLV - cta_type` | データレイヤーの変数 | `cta_type` |
| `DLV - cta_location` | データレイヤーの変数 | `cta_location` |
| `DLV - cta_text` | データレイヤーの変数 | `cta_text` |
| `DLV - link_url` | データレイヤーの変数 | `link_url` |
| `DLV - form_name` | データレイヤーの変数 | `form_name` |
| `DLV - error_type` | データレイヤーの変数 | `error_type` |
| `DLV - error_field` | データレイヤーの変数 | `error_field` |
| `DLV - lead_id` | データレイヤーの変数 | `lead_id` |
| `DLV - ref_lp_slug` | データレイヤーの変数 | `ref_lp_slug` |
| `RT - lp_slug` | 正規表現の表 | 入力: `{{Page Path}}`。詳細設定で「キャプチャ グループと置換を有効にする」をオン、「完全一致」をオフ。行1: `^/lp/([a-z0-9-]+)/` → `$1`、行2: `^/solar/([a-z0-9]+)/` → `solar-$1`。デフォルト値は空欄 |
| `RT - page_type` | 正規表現の表 | 入力: `{{Page Path}}`。`^/lp/[^/]+/` → `lp_ad`、`^/solar/[^/]+/` → `lp_seo`、`^/solar/$` → `hub`、`^/contact/` → `contact`。デフォルト値 `corporate` |
| `RT - lp_area` | 正規表現の表 | 入力: `{{Page Path}}`。キャプチャ有効。`^/lp/[a-z]+-([a-z]+)` → `$1`、`^/solar/([a-z]+)/` → `$1`。デフォルト値は空欄 |
| `GA4 - Shared Params` | Google タグ: イベント設定 | `lp_slug` = `{{RT - lp_slug}}`、`page_type` = `{{RT - page_type}}`、`lp_area` = `{{RT - lp_area}}` |

> `lp_slug` などの共通パラメータは、GA4 に送るときは dataLayer の値ではなく **Page Path から GTM 側で求めた値**を使う。初回の `page_view` は dataLayer に `lp_slug` が入る前に送られる可能性があり、また dataLayer の値は前のページのものが残る可能性があるため。コード側の `lp_slug` は Supabase 保存用と、GTM プレビューでの照合用として送る。両者のルールは 0章の表で一致させる。

### 3-2. トリガー

| トリガー名 | 種類 | 条件 |
|---|---|---|
| `CE - page_view_spa` | カスタムイベント | イベント名 `page_view_spa` |
| `CE - generate_lead` | カスタムイベント | イベント名 `generate_lead` |
| `CE - cta_click` | カスタムイベント | イベント名 `cta_click` |
| `CE - tel_click` | カスタムイベント | イベント名 `tel_click` |
| `CE - form_start` | カスタムイベント | イベント名 `form_start` |
| `CE - form_error` | カスタムイベント | イベント名 `form_error` |
| `Init - All Pages` | 初期化 - すべてのページ | （既定） |

`tel:` リンクのクリックは、GTM の「リンクのみ」トリガーでも取れるが、**使わない**。コード側の `tel_click` と両方で取ると二重計上になる。コード側の実装が終わるまでのつなぎとして GTM で取る場合は、実装リリースと同時に GTM 側を一時停止する。

### 3-3. タグ

イベントごとにタグを分ける（1つのタグで `{{Event}}` を使い回すと、前のイベントのパラメータが残って別のイベントに付くことがあるため）。

| タグ名 | 種類 | 設定 | トリガー |
|---|---|---|---|
| `GA4 - Google Tag` | Google タグ | タグ ID `{{CONST - GA4 Measurement ID}}`。イベント設定変数 `{{GA4 - Shared Params}}`。設定パラメータ `send_page_view` は既定（true）のまま | `Init - All Pages` |
| `GA4 - page_view (SPA)` | GA4 イベント | イベント名 **`page_view`**。パラメータ `page_location` = `{{DLV - page_location}}`、`page_title` = `{{DLV - page_title}}`。イベント設定変数 `{{GA4 - Shared Params}}` | `CE - page_view_spa` |
| `GA4 - generate_lead` | GA4 イベント | イベント名 `generate_lead`。`form_name`, `lead_id`, `ref_lp_slug` | `CE - generate_lead` |
| `GA4 - cta_click` | GA4 イベント | イベント名 `cta_click`。`cta_type`, `cta_location`, `cta_text` | `CE - cta_click` |
| `GA4 - tel_click` | GA4 イベント | イベント名 `tel_click`。`cta_location`, `link_url` | `CE - tel_click` |
| `GA4 - form_start` | GA4 イベント | イベント名 `form_start`。`form_name` | `CE - form_start` |
| `GA4 - form_error` | GA4 イベント | イベント名 `form_error`。`form_name`, `error_type`, `error_field` | `CE - form_error` |

すべての GA4 イベントタグで、測定 ID に `{{CONST - GA4 Measurement ID}}` を入れ、イベント設定変数に `{{GA4 - Shared Params}}` を指定する。

広告を出稿するとき（フェーズ6）に追加するもの:

| タグ | トリガー | 備考 |
|---|---|---|
| コンバージョン リンカー | `Init - All Pages` | Google 広告 |
| Google 広告 コンバージョン トラッキング | `CE - generate_lead` | 「トランザクション ID」に `{{DLV - lead_id}}` を入れて重複を防ぐ |
| Yahoo!広告 サイトジェネラルタグ / コンバージョン測定タグ | 全ページ / `CE - generate_lead` | |
| Meta ピクセル（Lead） | `CE - generate_lead` | 出稿する場合のみ |

### 3-4. 確認と公開

1. 「プレビュー」で Tag Assistant を開き、以下を確認する
   - 初回表示: `GA4 - Google Tag` が1回だけ発火し、`GA4 - page_view (SPA)` は発火しない
   - ヘッダーから別ページへ遷移: `GA4 - page_view (SPA)` が1回だけ発火し、`page_location` が遷移先の URL になっている
   - LP → `/contact/` へ遷移した後のイベントで、`lp_slug` が空（`/contact/` は LP ではない）になっている
   - 電話番号のタップで `GA4 - tel_click` が1回だけ発火する
   - フォーム送信成功で `GA4 - generate_lead` が1回だけ発火し、`lead_id` が入っている
2. GA4 の DebugView で同じ流れを見て、`page_view` が二重になっていないこと、`form_start` が二重になっていないこと（拡張計測の OFF が効いていること）を確認する
3. 「公開」→ バージョン名 `phase3-tracking-v1`、説明にこのファイルのパスを書く
4. 公開後 24〜48 時間で、GA4 のリアルタイム・イベント一覧に出てくるか確認し、2-2 のキーイベント設定を行う

---

## 4. UTM の命名規則

### 4-1. 共通ルール

- すべて小文字の半角英数字とハイフン。日本語・スペース・アンダースコアは使わない（GA4 は大文字と小文字を別の値として集計する）
- `utm_source` / `utm_medium` / `utm_campaign` の3つは必須。`utm_content` / `utm_term` は任意
- `utm_campaign` は `<事業>-<エリア>-<施策>-<yyyymm>`（例: `solar-natori-subsidy-202611`）。常設のものは年月を省く（例: `gbp-natori`）
- 発行した URL は 4-5 の台帳に必ず記録する。台帳にない UTM は使わない
- 内部リンク（自サイト内のバナーなど）には UTM を付けない（セッションが切れて参照元が上書きされる）

### 4-2. 媒体別の値

| 流入元 | `utm_source` | `utm_medium` | `utm_campaign` 例 | `utm_content` 例 | 備考 |
|---|---|---|---|---|---|
| Google 広告（検索） | `google` | `cpc` | `solar-natori-search-202611` | 広告グループ名 | 自動タグ設定（gclid）は ON のまま。トラッキングテンプレートの「最終ページ URL のサフィックス」に UTM を入れる。`utm_term={keyword}` |
| Yahoo!広告（検索） | `yahoo` | `cpc` | 同上 | 同上 | `yclid` は自動で付く |
| Google 広告（P-MAX・ディスプレイ） | `google` | `display` | `solar-natori-pmax-202611` | | |
| Meta 広告 | `facebook` / `instagram`（配信面ごと） | `paid_social` | `solar-natori-subsidy-202611` | クリエイティブ名 | 動的パラメータ `{{campaign.name}}` は命名規則とずれるので使わず、固定値を入れる |
| LINE 広告 | `line` | `paid_social` | 同上 | | |
| LINE 公式アカウント配信 | `line` | `social` | `solar-natori-oa-202611` | 配信日 `20261115` | |
| Instagram 投稿・プロフィール（無償） | `instagram` | `social` | `profile` / `post-202611` | 投稿の内容 | |
| Google ビジネスプロフィール | `google` | `organic` | `gbp-natori` | `website-button` / `post` | 地域集客で最も効くことが多い。「ウェブサイト」ボタンの URL に必ず付ける |
| 新聞折込チラシ | `orikomi` | `qr` | `solar-natori-subsidy-202611` | `a4-front` / `a4-back` | 配布エリアが分かれる場合は campaign のエリアで分ける |
| ポスティング | `posting` | `qr` | 同上 | 同上 | |
| ダイレクトメール | `dm` | `qr` | 同上 | | |
| イベント・展示会 | `event` | `qr` | `solar-natori-<イベント名>-202611` | `booth-pop` | |
| 看板・社用車 | `signboard` / `vehicle` | `qr` | `brand-natori` | 設置場所 | |
| メールマガジン・メール署名 | `newsletter` / `signature` | `email` | | | |

### 4-3. QR コードの作り方

- QR の行き先は広告 LP（`/lp/<slug>/`）にする。UTM 付きの長い URL は QR が細かくなり読み取りにくいので、Vercel 移行後は短い転送用 URL（例: `/q/n2611a/` → UTM 付き LP へ 302）を `next.config.ts` の `redirects` で作るとよい（backend-engineer に依頼。転送先に UTM を必ず残す）
- 印刷前に、スマホで読み取って GA4 リアルタイムに `session_source = orikomi` などで出ることを確認する

### 4-4. GA4 のカスタムチャネルグループ「SC 標準」

GA4 のデフォルトのチャネルグループでは `utm_medium=qr` は「Unassigned」になる。以下のカスタムチャネルグループを作り、上から順に判定させる。

| チャネル | 条件 |
|---|---|
| オフライン（QR） | セッションのメディア = `qr` |
| LINE | セッションの参照元 = `line` |
| ビジネスプロフィール | セッションのキャンペーン が `gbp-` で始まる |
| 有料検索 | セッションのメディア = `cpc` |
| 有料ソーシャル | セッションのメディア = `paid_social` |
| ディスプレイ | セッションのメディア = `display` |
| 以降 | デフォルトのチャネルグループと同じ条件（自然検索・ソーシャル・参照・ノーリファラー など） |

### 4-5. UTM 台帳

`docs/analytics/utm-ledger.md` に以下の列で管理する（最初の UTM を発行するときに作る）。

| 発行日 | 媒体 | 配布・配信期間 | 配布エリア・部数 | リンク先 | utm_source | utm_medium | utm_campaign | utm_content | 費用 | 発行者 |
|---|---|---|---|---|---|---|---|---|---|---|

費用と部数を残しておくと、月次レポートで「チラシ1万部あたりの問い合わせ数」「CPA」が出せる。

---

## 5. 問い合わせ DB（Supabase）に保存する計測項目

### 5-1. 方針

- **first-touch**（最初に来たときの流入元）と **session-touch**（問い合わせしたセッションの流入元）の両方を保存する。地域の住宅設備は検討期間が長く、「チラシで知る → 数日後に検索で再訪 → 問い合わせ」が多いと想定されるため、片方だけでは施策の効果を見誤る
- GA4 と結ぶキーとして `lead_id`（DB の主キー）と `ga_client_id` を保存する

### 5-2. ブラウザ側での保持方式

| 保存先 | キー | 中身 | 書き込むタイミング | 期限 |
|---|---|---|---|---|
| 1st party cookie | `sc_ft` | first-touch（下の項目） | `sc_ft` が無いときだけ、最初のページ表示で書く。上書きしない | 90 日（`Path=/; SameSite=Lax; Secure`） |
| sessionStorage | `sc_st` | session-touch（下の項目） | セッションの最初のページ表示で書く。URL に UTM・クリック ID がある場合、または外部ドメインからの参照の場合は上書きする | タブを閉じるまで |
| sessionStorage | `sc_last_lp` | 最後に見た LP の `lp_slug` | LP を表示するたび | タブを閉じるまで |

なぜ first-touch は sessionStorage ではなく cookie にするか: sessionStorage はタブを閉じると消えるため、「数日後の再訪で問い合わせ」のケースで first-touch が失われる。

保存する項目（`sc_ft` / `sc_st` 共通。JSON にして `encodeURIComponent` する）:

| キー | 内容 | 注意 |
|---|---|---|
| `utm_source` / `utm_medium` / `utm_campaign` / `utm_content` / `utm_term` | URL のクエリから | 各 100 文字で切る |
| `gclid` / `yclid` / `fbclid` | URL のクエリから | 各 200 文字で切る |
| `referrer` | `document.referrer` の origin + pathname（クエリは捨てる） | 自ドメインのときは空にする |
| `landing_path` | `location.pathname`（クエリは捨てる） | |
| `lp_slug` | ランディングページの `lp_slug` | |
| `ts` | ISO 8601 の日時 | |

制約と注意:

- Safari（ITP）は JavaScript で書いた cookie を最大 7 日（クリック ID 付きの広告経由では 24 時間になる場合あり）で消す。iPhone 比率が高いと first-touch の取りこぼしが出ることを前提に分析する。Vercel 移行後は、Middleware でサーバーから `Set-Cookie` すれば期限を延ばせる（backend-engineer の検討事項）
- 現状は `output: 'export'` の静的書き出しなので、移行前は JavaScript で書く方式しか取れない
- cookie と GA4 の利用について、プライバシーポリシー（`/privacypolicy/`）に記載を追加する。電気通信事業法の外部送信規律の対象になるかは TODO(要確認) だが、対象外でも記載しておくのが無難

### 5-3. フォーム送信時に API に送る項目

フォームの入力値（氏名・電話・メール・内容）に加えて、`attribution` オブジェクトとして以下を送る。

```json
{
  "form_name": "contact",
  "page_path": "/contact/",
  "lp_slug": null,
  "ref_lp_slug": "solar-natori-subsidy",
  "ga_client_id": "1234567890.1730000000",
  "first_touch": { "utm_source": "orikomi", "utm_medium": "qr", "utm_campaign": "solar-natori-subsidy-202611", "landing_path": "/lp/solar-natori-subsidy/", "referrer": "", "ts": "2026-11-03T10:12:00+09:00" },
  "session_touch": { "utm_source": "google", "utm_medium": "organic", "landing_path": "/solar/natori/", "referrer": "https://www.google.com/", "ts": "2026-11-08T21:40:00+09:00" }
}
```

- `ga_client_id` は `_ga` cookie（`GA1.1.1234567890.1730000000`）の後ろ2つを取る。取れなければ `null`
- サーバー側では、これらをすべて信頼できない入力として zod で検証する（文字数の上限、型、未知のキーは捨てる）。不正な値があってもフォーム送信自体は失敗させず、該当項目を `null` にして保存する
- API のレスポンスで `lead_id` を返し、フロントはそれを `generate_lead` に載せる

### 5-4. テーブルに持たせる列（backend-engineer への要件）

`inquiries` テーブル（名前は backend-engineer の設計に合わせる）に以下を追加する。

| 列 | 型 | 内容 |
|---|---|---|
| `id` | uuid | `lead_id` として GA4 にも送る |
| `created_at` | timestamptz | 送信日時 |
| `inquiry_channel` | text | `web_form` / `phone` / `walk_in` / `other`。電話の問い合わせを管理画面から手入力できるようにする |
| `form_name` | text | `contact` / `lp` |
| `page_path` | text | 送信したページ |
| `lp_slug` | text null | 送信したページの slug |
| `ref_lp_slug` | text null | セッション内で最後に見た LP |
| `ft_utm_source` / `ft_utm_medium` / `ft_utm_campaign` / `ft_utm_content` / `ft_utm_term` | text null | first-touch |
| `ft_referrer` / `ft_landing_path` / `ft_lp_slug` | text null | first-touch |
| `ft_at` | timestamptz null | first-touch の日時 |
| `st_utm_source` / `st_utm_medium` / `st_utm_campaign` / `st_utm_content` / `st_utm_term` | text null | session-touch |
| `st_referrer` / `st_landing_path` | text null | session-touch |
| `gclid` / `yclid` / `fbclid` | text null | 広告のオフライン CV 取り込みに使う |
| `ga_client_id` | text null | GA4 との突き合わせ |
| `heard_from` | text null | 自己申告の「何で知りましたか」（選択肢: チラシ / 検索 / Instagram / LINE / 紹介 / 看板・車 / その他）。電話でも管理画面から入れる |
| `is_spam` | boolean | 管理画面でスパム判定したもの。GA4 の `generate_lead` との差を説明するのに使う |
| `status` / `closed_at` / `contract_amount` | text / timestamptz / int | 成約の判定と成約単価。`contract_amount` は TODO(要確認): 社内で入力してもらえるか |

`heard_from` を必須にする理由: チラシを見て**電話**してきた人は Web の計測に一切残らない。オフライン施策の効果を見るには、自己申告と電話の手入力が唯一の手段になる。

---

## 6. KPI ツリーと月次レポートの指標

### 6-1. KPI ツリー

```
成約数
├─ 問い合わせ数（DB: is_spam = false）
│   ├─ フォーム CV（generate_lead）
│   │   = LP セッション × CTA クリック率 × フォーム開始率 × フォーム完了率
│   │     ├─ LP セッション = セッション × LP 到達率（チャネル別・LP 別）
│   │     ├─ CTA クリック率 = (cta_click + tel_click があったセッション) ÷ LP セッション
│   │     ├─ フォーム開始率 = form_start があったセッション ÷ LP セッション
│   │     └─ フォーム完了率 = generate_lead ÷ form_start（form_error 率も併記）
│   └─ 電話の問い合わせ（DB: inquiry_channel = phone）
│       └─ 先行指標: tel_click（意図）
└─ 成約率 = 成約数 ÷ 問い合わせ数（ft_ / st_ 別、heard_from 別）
```

注: LP にはフォームが埋め込まれるため、CTA を押さずにフォームを始める人もいる。各段階は「前の段階を通った人の割合」ではなく、「LP セッションのうち、その行動があった割合」で見る（GA4 の目標到達プロセスでは「オープンな目標到達プロセス」を使う）。

### 6-2. 月次レポート（`docs/analytics/reports/YYYY-MM.md`）で見る指標

| 区分 | 指標 | 出し方 | 切り口 |
|---|---|---|---|
| 集客 | セッション | GA4 | チャネル（SC 標準）、LP 別 |
| 集客 | Search Console のクリック数・表示回数・平均掲載順位 | Search Console | `/solar/` 配下のページ別・クエリ別 |
| LP | LP セッション、CTA クリック率、フォーム開始率、フォーム完了率、CVR（generate_lead ÷ LP セッション） | GA4 探索 | `lp_slug`, `lp_area`, `page_type`, デバイス |
| LP | `cta_location` 別のクリック数 | GA4 探索 | `lp_slug` |
| フォーム | `form_error` 件数と `error_type` / `error_field` の内訳 | GA4 | |
| CV | `generate_lead` 件数と DB の web_form 件数の差（差 ÷ DB 件数） | GA4 + DB | 差が 20% を超えたら計測の故障を疑う。通常は広告ブロッカー等で GA4 の方が少し少ない |
| CV | 電話の問い合わせ件数、`tel_click` 件数 | DB + GA4 | |
| 成果 | 問い合わせ数、成約数、成約率、成約単価 | DB | first-touch / session-touch / `heard_from` 別、エリア別 |
| 費用対効果 | CPA（費用 ÷ 問い合わせ数）、成約あたり費用 | DB + UTM 台帳の費用 | 媒体別 |
| 遅れ | 問い合わせから成約までの日数の中央値 | DB | 成約率は 2〜3 か月遅れで確定する前提で、前月以前の分も更新して載せる |

### 6-3. 母数が少ないときの書き方

- 月 30 CV 未満の間は、LP 別・エリア別の CVR の差を「効いた / 効かなかった」と書かない。件数と、95% 信頼区間（Wilson）を併記する
  - 例: 200 セッションで 5 CV（CVR 2.5%）の信頼区間は約 1.1%〜5.7%。別の LP が 3.5% でも、この範囲に入っていれば差があるとは言えない
- LP の比較は、各 LP のセッションが少なくとも数百、CV が各 10 件以上たまってから行う。それまでは複数月を合算して見る
- 判断は CTA クリック率やフォーム開始率など、件数の多い手前の指標を中心にし、CV は方向の確認にとどめる

---

## 7. 現状の実装のレビュー（2026-10-09 時点）

対象: `src-next/src/lib/gtm.ts`, `src-next/src/components/GtmPageView.tsx`, `src-next/src/app/contact/page.tsx`, `src-next/src/app/layout.tsx`, `src-next/src/app/api/contact/route.ts`。コードは変更していない。修正は各担当に依頼する。

### 重要度: 高

**R1. GA4 の拡張計測によって、`page_view` と `form_start` が二重に計上されるおそれ**（GA4 設定）
`GtmPageView` は「初回は GA4 設定タグが送る」前提でクライアント遷移だけを送るが、GA4 の拡張計測で「ブラウザの履歴イベントに基づくページの変更」が ON（初期値は ON）だと、GA4 も遷移ごとに `page_view` を送る。同じく「フォームの操作」が ON だと、自前の `form_start` と GA4 の自動の `form_start` が重なる。→ 2-1 のとおり OFF にする。コードの修正は不要。

**R2. `page_view_spa` を GA4 の `page_view` に変換するタグがあるか未確認**（GTM 設定）
GTM 側で `page_view_spa` を受けるタグがない、またはイベント名を `page_view_spa` のまま送っていると、クライアント遷移のページビューが GA4 のページ別レポートに出ない。→ 3-3 の `GA4 - page_view (SPA)` を作る。

**R3. 電話の計測がない。しかも電話番号がリンクになっていない**（`contact/page.tsx` 64行目、`company/page.tsx`）
`Tel. 022-354-8345` がただのテキストで、スマホでタップしても発信できず、`tel_click` も取れない。地域の住宅設備では電話の問い合わせの割合が大きいと考えられるので、計測上の最大の穴。→ 修正案:
```tsx
<a href="tel:0223548345"
   onClick={() => trackEvent('tel_click', { cta_location: 'contact_page', link_url: 'tel:0223548345' })}>
  Tel. 022-354-8345
</a>
```
ヘッダー・フッターにも電話リンクを置き、同様に `tel_click` を送る（`cta_location: 'header'` / `'footer'`）。

**R4. `generate_lead` に `lp_slug` と `lead_id` がない**（`contact/page.tsx` 39行目）
`{ event: 'generate_lead', form_name: 'contact' }` だけなので、DB と突き合わせられず、どの LP 経由の CV かも分からない。→ API のレスポンスで `lead_id` を返してもらい、`trackEvent('generate_lead', { form_name: 'contact', lead_id, ref_lp_slug })` にする。

**R5. フォームの送信先が旧 PHP のまま**（`contact/page.tsx` 25行目 `fetch('/api/contact.php')`）
Vercel 移行後は `/api/contact.php` が存在しないため、すべての送信が失敗し、`form_error` だけが記録されて CV がゼロになる。→ フェーズ2で `/api/contact/`（`trailingSlash: true` に合わせて末尾スラッシュ付き）に切り替える。backend-engineer の作業と同時にリリースする。

**R6. 流入元（UTM・referrer・first-touch）を DB に送っていない**（`contact/page.tsx`, `api/contact/route.ts`）
送信ボディは `name/phone/email/message` だけ。→ 5章の方式で `attribution` を送り、保存する。

### 重要度: 中

**R7. `GtmPageView` は開発環境（StrictMode）で初回の `page_view_spa` を誤って送る**（`GtmPageView.tsx` 9〜17行目）
本番では、ルートレイアウトは遷移しても再マウントされないので、`useRef(true)` による初回除外は正しく動く。ただし開発環境では React の StrictMode が effect を「実行 → クリーンアップ → 再実行」し、ref は保持されるので、2回目の実行で `isFirstRender.current` が `false` になっており、初回表示でも `page_view_spa` が送られる。GTM プレビューを開発サーバーで確認するときに「初回で二重」と誤って判断する原因になる。→ 真偽値ではなく直前のパスを覚えておく方式にすると、何回実行されても同じ結果になる:
```tsx
const prevPath = useRef<string | null>(null);
useEffect(() => {
  if (prevPath.current === null) { prevPath.current = pathname; return; } // 初回
  if (prevPath.current === pathname) return;                              // 同じパスでの再実行
  prevPath.current = pathname;
  pushToDataLayer({ event: 'page_view_spa', page_path: pathname,
    page_location: window.location.href, page_title: document.title, lp_slug: getLpSlug(pathname) });
}, [pathname]);
```

**R8. `page_view_spa` に `lp_slug` と `page_title` がない**（`GtmPageView.tsx` 19〜23行目）
GTM のデータレイヤーは前に push した値を保持するため、LP 以外のページで `lp_slug` を送らないと古い値が残る。また `page_title` がないと、GA4 タグは発火時の `document.title` を使うが、App Router では遷移直後にタイトルがまだ前のページのままのことがある（TODO(要確認): プレビューで確認）。→ R7 の修正案のとおり両方送る。GA4 に送る `lp_slug` は GTM 側で Page Path から求める（3-1）ので、R8 が直るまでも GA4 の数値は壊れない。

**R9. `form_start` がない**
フォームを開始したのに送らなかった人（離脱）が分からない。→ `<form onFocus={...}>`（focus はバブリングしないが React の `onFocus` は子要素のフォーカスでも発火する）で、1回だけ `trackEvent('form_start', { form_name: 'contact' })` を送る。

**R10. `form_error` がエラーの種類を区別していない。ブラウザのバリデーションエラーは記録されない**（`contact/page.tsx` 43, 48行目）
`required` 属性によるブラウザのバリデーションで止まった場合は `onSubmit` が呼ばれないので、何も記録されない。→ 各 input の `onInvalid` で `error_type: 'validation', error_field: <name>` を送る（1回の送信で複数出ないよう、最初の1件だけにする）。サーバーエラーは `response.status` で `server_4xx` / `server_5xx`、例外は `network` に分ける。

**R11. CTA クリックの計測がない**（`Header.tsx` 52, 134行目、`flow/page.tsx` 63行目の `/contact` リンク）
コーポレートサイトから問い合わせページへの導線の効果が分からない。→ `trackEvent('cta_click', { cta_type: 'contact_page', cta_location: 'header' })` など。優先度は LP の CTA の方が高い。

**R12. `response.json()` を `response.ok` の判定より前に呼んでいる**（`contact/page.tsx` 33行目）
サーバーが JSON 以外（HTML の 404・502 ページなど）を返すと例外になり、`network` 扱いの `form_error` になる。R5 の移行時にこれが起きると、原因が見えにくい。→ `response.ok` を先に判定し、JSON の解析は `try` で囲む。

### 重要度: 低

**R13. GTM の読み込み前にクライアント遷移すると、ランディングページの記録がずれる**（`layout.tsx` 40行目 `strategy="afterInteractive"`）
`gtm.js` が読み込まれる前にユーザーが別のページへ遷移すると、初回の `page_view` が遷移後の URL で送られ、さらに `page_view_spa` も送られる。表示が速いサイトなので頻度は低いと見込む。気になる場合は GTM の読み込みを `beforeInteractive` 相当に早めることを検討する（パフォーマンスとのトレードオフ）。

**R14. `pushToDataLayer` が `lp_slug` を自動で付けない**（`gtm.ts`）
各呼び出し元で `lp_slug` を付ける必要があり、付け忘れが起きやすい。→ `trackEvent(event, params)` を追加し、`location.pathname` から `lp_slug` / `page_type` / `lp_area` を自動で付ける。`getLpSlug(pathname)` は 0章の表と同じルールで実装し、`sc_last_lp` の更新にも使う。

**R15. 同意管理（Consent Mode）を入れていない**
国内向けサイトで EU からのアクセスはほぼないため、現時点では必須ではない。プライバシーポリシーへの記載（5-2）を優先する。

---

## 8. 担当別の対応事項

| 担当 | 対応 | 関連 |
|---|---|---|
| ユーザー（GA4 / GTM 管理画面） | 2章・3章の設定。測定 ID と本社 IP の確認 | R1, R2 |
| backend-engineer | `inquiries` テーブルに 5-4 の列を追加、`/api/contact` で `attribution` を検証・保存し `lead_id` を返す、`heard_from`・電話の手入力を管理画面に入れる、QR 用の短縮転送 | R4, R5, R6 |
| `src-next/` の担当 | `trackEvent` / `getLpSlug` の追加、UTM の保持（`sc_ft` / `sc_st` / `sc_last_lp`）、`GtmPageView` の修正、電話リンクと `tel_click`、`form_start` / `form_error` の改善、CTA の `cta_click` | R3, R4, R7〜R12, R14 |
| lp-builder | 電話 CTA は `tel_click` だけを送るように `.claude/agents/lp-builder.md` の指示を合わせる。`cta_location` を必ず付ける | 1-3 |
| analytics-analyst | 実装後の GTM プレビューでの検証（3-4）、UTM 台帳の作成、初回の月次レポート | |

---

## 変更履歴

| 日付 | 内容 | 担当 |
|---|---|---|
| 2026-10-09 | 初版 | analytics-analyst |
