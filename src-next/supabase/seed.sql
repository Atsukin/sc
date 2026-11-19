-- 手元（npx supabase start / db reset）専用のテストデータ。本番には入れない。
-- ログイン: staff@example.test / local-dev-password（社員） , outsider@example.test / local-dev-password（社員でない）

insert into auth.users (
  instance_id, id, aud, role, email, encrypted_password, email_confirmed_at,
  raw_app_meta_data, raw_user_meta_data, created_at, updated_at,
  confirmation_token, email_change, email_change_token_new, recovery_token
) values
  ('00000000-0000-0000-0000-000000000000', 'aaaaaaaa-0000-4000-8000-000000000001', 'authenticated', 'authenticated',
   'staff@example.test', extensions.crypt('local-dev-password', extensions.gen_salt('bf')), now(),
   '{"provider":"email","providers":["email"]}', '{}', now(), now(), '', '', '', ''),
  ('00000000-0000-0000-0000-000000000000', 'aaaaaaaa-0000-4000-8000-000000000002', 'authenticated', 'authenticated',
   'outsider@example.test', extensions.crypt('local-dev-password', extensions.gen_salt('bf')), now(),
   '{"provider":"email","providers":["email"]}', '{}', now(), now(), '', '', '', '');

insert into auth.identities (id, user_id, provider_id, identity_data, provider, last_sign_in_at, created_at, updated_at)
select gen_random_uuid(), u.id, u.id::text, jsonb_build_object('sub', u.id::text, 'email', u.email), 'email', now(), now(), now()
from auth.users u
where u.email in ('staff@example.test', 'outsider@example.test');

insert into public.staff (user_id, display_name) values
  ('aaaaaaaa-0000-4000-8000-000000000001', 'テスト社員');

insert into public.inquiries (created_at, name, phone, email, message, lp_slug, utm_source, utm_medium, utm_campaign, status, memo) values
  (now() - interval '2 hours', '名取 花子', '090-0000-0001', 'hanako@example.test',
   '名取市の補助金を使って、太陽光と蓄電池を一緒に付けたいです。年内に間に合いますか。', 'solar-natori', 'google', 'cpc', 'natori_solar', 'new', ''),
  (now() - interval '1 day', '岩沼 一郎', '022-000-0002', 'ichiro@example.test',
   '卒FITの太陽光に蓄電池を後付けしたいので、見積もりをお願いします。', null, null, null, null, 'in_progress', '11/19 電話済み。現地調査の日程を調整中'),
  (now() - interval '3 days', '閖上 次郎', '080-0000-0003', 'jiro@example.test',
   '海に近い家でも設置できますか。', 'solar-natori', null, null, null, 'done', '現地調査済み。見積もり送付');
