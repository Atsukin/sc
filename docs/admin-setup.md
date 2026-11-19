# 問い合わせ管理（/admin/）の準備と運用

問い合わせは Supabase に保存され、社員は `https://sc-14.net/admin/` で一覧・詳細を見て、ステータス・担当・メモを更新できる。
動くのは Vercel の上だけ（Xserver の静的書き出しには含まれない）。

## しくみ
- `/api/contact/` が問い合わせを Supabase に保存してから、メールで通知する。どちらか一方が成功すればお客さまには成功を返す（両方失敗したときだけエラー）
- 管理画面のログインは Supabase Auth（メールアドレス＋パスワード）。自分で登録はできない
- ログインできても、`staff` 表に登録された人しか問い合わせを読めない（RLS）。社員が書き換えられるのはステータス・担当・メモだけで、削除はできない
- `/admin/` は検索エンジンに載せない（noindex、robots.txt で除外）。GTM（GA4）も読み込まない
- 表と権限: `src-next/supabase/migrations/`、権限のテスト: `src-next/supabase/tests/`

## 本番の準備（初回だけ）

### 1. Supabase のプロジェクトを作る
1. https://supabase.com でプロジェクトを作る。リージョンは Tokyo（Northeast Asia）
2. **Authentication → Sign In / Providers**：「Allow new users to sign up」を **OFF**。Email の「Confirm email」は ON のまま
3. **Authentication → URL Configuration**：Site URL を `https://sc-14.net`

### 2. 表と権限を作る
`src-next/supabase/migrations/20261120000000_inquiries.sql` の中身を、**SQL Editor** に貼って実行する。
（CLI を使う場合は `cd src-next && npx supabase link --project-ref <ref> && npx supabase db push`）

### 3. Vercel に環境変数を入れる
**Project Settings → API Keys** の値を、Vercel の **Settings → Environment Variables**（Production と Preview）に入れる。

| 名前 | 値 |
|---|---|
| `SUPABASE_URL` | Project URL（`https://<ref>.supabase.co`） |
| `SUPABASE_PUBLISHABLE_KEY` | Publishable key（`sb_publishable_...`） |
| `SUPABASE_SECRET_KEY` | Secret key（`sb_secret_...`）。**ほかに貼らない・コミットしない** |

`NEXT_PUBLIC_` は付けない（ブラウザに出さないため）。メール用の `SMTP_*`・`CONTACT_TO` は従来どおり。入れたら再デプロイする。

### 4. 社員を追加する
1. **Authentication → Users → Add user → Create new user**：メールアドレスとパスワード（12文字以上）を入れ、「Auto Confirm User」を ON
2. 作ったユーザーの UID をコピーし、SQL Editor で登録する
   ```sql
   insert into public.staff (user_id, display_name) values ('<UID>', '田村');
   ```
3. 外すときは `delete from public.staff where user_id = '<UID>';`（ログインはできても何も見えなくなる）。完全に止めるなら Users からユーザーも削除する

パスワードの変更・リセットは、今は管理者が Users 画面で行う（管理画面にパスワード変更の画面はまだない）。

## 手元での開発
Docker が必要。手元の Supabase は `sc-14` という名前のコンテナで動き、他のプロジェクトのコンテナには影響しない。

```sh
cd src-next
npx supabase start -x realtime,storage-api,imgproxy,edge-runtime,logflare,vector,supavisor,studio,postgres-meta
npx supabase status -o env   # API_URL / PUBLISHABLE_KEY / SECRET_KEY を .env.local の SUPABASE_* に入れる
npm run dev                  # http://localhost:3000/admin/
npx supabase test db         # 権限のテスト
npx supabase db reset        # 表を作り直し、supabase/seed.sql のテストデータを入れる
npx supabase stop            # 使い終わったら止める
```

テスト用のログイン（手元だけ）: `staff@example.test`（社員）、`outsider@example.test`（社員でない）。パスワードは `supabase/seed.sql` を参照。

## まだやっていないこと
- 問い合わせフォームから `lp_slug`・UTM・参照元を送る（列はあるが、フォームがまだ送っていない）
- 新しい問い合わせが来たときの、管理画面への通知（今はメール通知のみ）
- 管理画面でのパスワード変更
