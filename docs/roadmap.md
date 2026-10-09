# ロードマップ

| フェーズ | 内容 | 主担当エージェント |
|---|---|---|
| 0. 基盤 | git を独立リポジトリ化、CLAUDE.md・社員エージェント整備 | — |
| 1. 移行 | `docs/migration-seo.md` の手順に従う（URL 照合 → MX 変更 → DNS 切り替え → Search Console 監視） | backend-engineer + seo-strategist |
| 2. 問い合わせ基盤 | Supabase スキーマ＋RLS、`/api/contact` 実装、メール通知、Turnstile | backend-engineer |
| 3. 計測 | tracking-plan 作成、GA4 の CV 設定、UTM・`lp_slug` 付与 | analytics-analyst |
| 4. 初回LP | 「太陽光・蓄電池 × 名取市」のキーワード調査 → 構成 → 実装 | seo-strategist → lp-builder |
| 5. 管理画面 | `/admin`：一覧・ステータス・担当・メモ | backend-engineer |
| 6. 横展開 | 岩沼・仙台南部・亘理などのエリアLP、月次分析レポート → 改善 | 全員 |

## 未決事項
- Xserver のメールサーバーのホスト名（MX の変更先）をサーバーパネルで確認する
- 補助金・施工事例・実績数値の社内確認窓口
