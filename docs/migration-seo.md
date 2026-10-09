# Vercel 移行チェックリスト（ドメイン評価とメールを守る）

ドメインの評価は sc-14.net というドメインと各ページの URL に付いている。サーバーには付いていない。
同じドメインで同じ URL を同じ内容で返し続ければ、ホスティングを変えても評価は引き継がれる。

## 現状調査（2026-10-08）
| 項目 | 状態 | 対応 |
|---|---|---|
| URL 形式 | `/service` → 301 → `/service/`（末尾スラッシュ付きが正） | `trailingSlash: true` を維持する |
| www | `www.sc-14.net` も 200 を返す（重複） | 移行時に www → apex への 301 を設定する |
| http | `http://` も 200 を返す（https へリダイレクトしていない） | Vercel では自動で https へリダイレクトされる |
| robots.txt | 404 | `app/robots.ts` で作り、sitemap を指定する |
| sitemap.xml | 末尾スラッシュなしの URL が載っており、301 経由になる | `app/sitemap.ts` で正しい URL を生成する |
| Search Console | `google891b49d70596e892.html` で所有権を確認している | `public/` に置いて残す（できれば DNS TXT での確認に切り替える） |
| DNS | ネームサーバーは Xserver | 移行後も Xserver の DNS を使い、A レコードと www だけを変更する |

## ⚠️ メールの落とし穴
- MX レコードが `0 sc-14.net.` と、apex ドメインそのものを指している
- apex の A レコードを Vercel に向けた瞬間、info@sc-14.net の受信が止まる
- **A レコードを変える前に**、MX を Xserver のメールサーバーのホスト名（例: `sv16006.xserver.jp`。サーバーパネルで要確認）に変える
- SPF の `+a:sc-14.net` は、移行後は Vercel の IP を指すことになり意味を失う。`include:spf.sender.xserver.jp` と `+a:sv16006.xserver.jp` が残っているので送信には影響しない見込みだが、移行後に送信テストを行う

## 切り替え手順
1. Vercel にデプロイし、`*.vercel.app` で全ページの表示・フォーム・GTM を確認する
2. 旧サイトの全 URL を列挙し、新サイトで 200 を返すか（変わる URL は 301 を返すか）をスクリプトで照合する
3. title / description / h1 / canonical を旧サイトと比べ、意図しない変更がないか確認する
4. 切り替えの24時間以上前に、DNS の TTL を短くしておく
5. MX を変更し、メールの受信テストを行う
6. A レコードを Vercel の IP に、www を `cname.vercel-dns.com` に変更する
7. Search Console でサイトマップを再送信し、カバレッジと 404 を2〜4週間監視する
8. 問題がなければ、Xserver 上の旧ファイルを片付ける（メール用に契約は残す）

## 新しいページを置く場所
- SEO で集客するページは、評価の高いドメインの中の**サブディレクトリ**に置く（サブドメインや別ドメインにはしない）
  - 例: `/solar/`（ハブページ）→ `/solar/natori/`、`/solar/iwanuma/`、`/solar/subsidy/`
  - トップ・サービスページからハブへ、ハブから各エリアへ内部リンクを張り、トップの評価を流す
- 広告専用の LP は `/lp/<slug>/` に置き、`noindex` にする（似た内容のページが増えて評価が薄まるのを防ぐ）
