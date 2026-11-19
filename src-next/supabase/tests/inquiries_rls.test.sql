-- 問い合わせの権限テスト。実行: npx supabase test db
begin;
create extension if not exists pgtap with schema extensions;
select plan(16);

-- 準備: 社員 1 人、社員でないログインユーザー 1 人、問い合わせ 1 件
insert into auth.users (id, email) values
  ('11111111-1111-1111-1111-111111111111', 'staff@example.com'),
  ('22222222-2222-2222-2222-222222222222', 'outsider@example.com');
insert into public.staff (user_id, display_name) values
  ('11111111-1111-1111-1111-111111111111', '社員A');
insert into public.inquiries (id, name, phone, email, message) values
  ('33333333-3333-3333-3333-333333333333', 'テスト太郎', '022-000-0000', 'taro@example.com', '見積もりの相談');

-- ---- 匿名（ブラウザから鍵だけで来た人） ----
set local role anon;
select set_config('request.jwt.claims', '{"role":"anon"}', true);
select throws_ok($$ select * from public.inquiries $$, '42501', null, 'anon は問い合わせを読めない');
select throws_ok($$ insert into public.inquiries (name, phone, email, message) values ('x','0','a@b.c','x') $$, '42501', null, 'anon は問い合わせを登録できない');
select throws_ok($$ select * from public.staff $$, '42501', null, 'anon は社員一覧を読めない');
reset role;

-- ---- ログインしているが社員ではない人 ----
set local role authenticated;
select set_config('request.jwt.claims', '{"sub":"22222222-2222-2222-2222-222222222222","role":"authenticated"}', true);
select is((select count(*) from public.inquiries), 0::bigint, '社員でない人には問い合わせが 1 件も見えない');
select is((select count(*) from public.staff), 0::bigint, '社員でない人には社員一覧が見えない');
update public.inquiries set status = 'done' where id = '33333333-3333-3333-3333-333333333333';
select throws_ok($$ insert into public.inquiries (name, phone, email, message) values ('x','0','a@b.c','x') $$, '42501', null, '社員でない人は登録できない');
reset role;
select is((select status from public.inquiries where id = '33333333-3333-3333-3333-333333333333'), 'new', '社員でない人の更新は反映されない');

-- ---- 社員 ----
set local role authenticated;
select set_config('request.jwt.claims', '{"sub":"11111111-1111-1111-1111-111111111111","role":"authenticated"}', true);
select is((select count(*) from public.inquiries where id = '33333333-3333-3333-3333-333333333333'), 1::bigint, '社員は問い合わせを読める');
select is((select count(*) from public.staff where user_id = '11111111-1111-1111-1111-111111111111'), 1::bigint, '社員は社員一覧を読める');
select lives_ok($$ update public.inquiries set status = 'in_progress', assignee_id = '11111111-1111-1111-1111-111111111111', memo = '折り返し済み' where id = '33333333-3333-3333-3333-333333333333' $$, '社員はステータス・担当・メモを更新できる');
select throws_ok($$ update public.inquiries set name = '書き換え' where id = '33333333-3333-3333-3333-333333333333' $$, '42501', null, '社員でも名前などの入力内容は書き換えられない');
select throws_ok($$ update public.inquiries set created_at = now() - interval '1 year' where id = '33333333-3333-3333-3333-333333333333' $$, '42501', null, '社員でも受付日時は書き換えられない');
select throws_ok($$ delete from public.inquiries where id = '33333333-3333-3333-3333-333333333333' $$, '42501', null, '社員でも削除はできない');
select throws_ok($$ update public.inquiries set status = 'deleted' where id = '33333333-3333-3333-3333-333333333333' $$, '23514', null, 'ステータスは決められた値だけ');
select throws_ok($$ insert into public.staff (user_id, display_name) values ('22222222-2222-2222-2222-222222222222', '勝手に追加') $$, '42501', null, '社員でも社員を増やせない');
reset role;
select is((select memo from public.inquiries where id = '33333333-3333-3333-3333-333333333333'), '折り返し済み', '社員の更新は反映される');

select * from finish();
rollback;
