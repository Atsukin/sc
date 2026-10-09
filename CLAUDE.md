# 株式会社SC (sc-14.net) マーケティング基盤

宮城県名取市に本社を置く株式会社SC（エネルギー・農業・住宅）のコーポレートサイト。
コーポレートHPを起点に、地域SEO・訴求LP・計測・問い合わせ管理までを一体で運用する。

## ディレクトリ
- `src-next/` — 本体（Next.js 16 / React 19 / Tailwind v4 / TypeScript）
- `_archive/` — 旧ビルド成果物・旧PHP（`api/contact.php`）。参照のみ、編集しない
- `docs/` — 戦略・計画・分析レポート（社員エージェントの成果物置き場）
- `.claude/agents/` — 役割別の社員エージェント

## 方針（決定済み）
- ホスティング: Xserver の静的書き出し → **Vercel へ移行**。`next.config.ts` の `output: 'export'` は移行時に外す
- DB / 認証: **Supabase**（問い合わせ保存・管理画面ログイン）
- 最初の訴求LP: **太陽光・蓄電池 × 名取市**。その後 岩沼・仙台市太白区/若林区・亘理 などへ横展開
- URL とドメイン評価: 既存 URL（末尾スラッシュ付き）を変えない。SEO ページは `/solar/<area>/` などのサブディレクトリに置き、広告専用 LP は `/lp/<slug>/` で noindex にする。詳細は `docs/migration-seo.md`
- メール: info@sc-14.net は Xserver に残す。DNS 切り替えの前に MX の変更が必須（`docs/migration-seo.md`）
- 計測: GTM `GTM-KDJLQXS8` 経由で GA4。CV イベントは `generate_lead`（`src/lib/gtm.ts` の `pushToDataLayer`）

## 会社情報（コピーの正）
- 社名: 株式会社SC / 電話: 022-354-8345 / メール: info@sc-14.net
- 事業: エネルギー（太陽光発電・蓄電池）、農業（いちご等）、住宅（新築企画）

## 開発ルール
- コマンドは `src-next/` で実行: `npm run dev` / `npm run build` / `npm run lint`
- 変更後は `npm run build` と `npm run lint` を通す
- SEO ページは `src-next/src/app/solar/<area>/page.tsx`、広告 LP は `src-next/src/app/lp/<slug>/page.tsx` に置き、各ページで `metadata`（title/description/canonical/OG）と JSON-LD を必ず設定する
- 数値（補助金額・削減額・実績件数）は出典か社内確認が取れたものだけを載せる。推測値は `TODO(要確認)` と書いて残す
- 秘密情報は `.env.local` に置き、コミットしない
