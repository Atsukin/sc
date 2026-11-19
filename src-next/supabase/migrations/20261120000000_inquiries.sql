-- 問い合わせ（inquiries）と、管理画面を使える社員（staff）。
--
-- 権限の考え方:
--   - 問い合わせの登録は、サーバー（/api/contact）が secret key で行う。secret key は RLS を通らない。
--   - ブラウザから来る匿名ユーザー（anon）は、どの表にも一切さわれない。
--   - ログインしたユーザーでも、staff に登録されていなければ何も読めない。
--   - staff は問い合わせを読めて、更新できるのは status / assignee_id / memo の3列だけ。削除はできない。
--   - staff の追加・削除は、Supabase のダッシュボード（SQL）で管理者が行う。

-- ---------------------------------------------------------------
-- 社員
-- ---------------------------------------------------------------
create table public.staff (
  user_id uuid primary key references auth.users (id) on delete cascade,
  display_name text not null check (char_length(display_name) between 1 and 50),
  created_at timestamptz not null default now()
);

comment on table public.staff is '管理画面（/admin）を使える社員。ここに行がある auth ユーザーだけが問い合わせを読める';

-- ログイン中のユーザーが社員かどうか。RLS の中で staff 表を読むため security definer にする
create function public.is_staff()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (select 1 from public.staff where user_id = (select auth.uid()));
$$;

revoke all on function public.is_staff() from public, anon;
grant execute on function public.is_staff() to authenticated;

-- ---------------------------------------------------------------
-- 問い合わせ
-- ---------------------------------------------------------------
create table public.inquiries (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  -- フォームの入力
  name text not null check (char_length(name) between 1 and 100),
  phone text not null check (char_length(phone) between 1 and 30),
  email text not null check (char_length(email) between 3 and 254),
  message text not null check (char_length(message) between 1 and 5000),

  -- 流入元
  lp_slug text check (char_length(lp_slug) <= 200),
  utm_source text check (char_length(utm_source) <= 200),
  utm_medium text check (char_length(utm_medium) <= 200),
  utm_campaign text check (char_length(utm_campaign) <= 200),
  utm_term text check (char_length(utm_term) <= 200),
  utm_content text check (char_length(utm_content) <= 200),
  referrer text check (char_length(referrer) <= 2000),

  -- 対応状況（管理画面で更新する）
  status text not null default 'new'
    check (status in ('new', 'in_progress', 'done', 'spam')),
  assignee_id uuid references public.staff (user_id) on delete set null,
  memo text not null default '' check (char_length(memo) <= 5000)
);

comment on column public.inquiries.status is 'new=未対応 / in_progress=対応中 / done=完了 / spam=迷惑';

create index inquiries_created_at_idx on public.inquiries (created_at desc);
create index inquiries_status_created_at_idx on public.inquiries (status, created_at desc);
create index inquiries_assignee_id_idx on public.inquiries (assignee_id);

create function public.set_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger inquiries_set_updated_at
  before update on public.inquiries
  for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------
-- 権限（表の権限で絞ったうえで、RLS で行を絞る）
-- ---------------------------------------------------------------
revoke all on public.staff from anon, authenticated;
revoke all on public.inquiries from anon, authenticated;

grant select on public.staff to authenticated;
grant select on public.inquiries to authenticated;
grant update (status, assignee_id, memo) on public.inquiries to authenticated;

alter table public.staff enable row level security;
alter table public.inquiries enable row level security;

create policy "staff can read staff"
  on public.staff for select
  to authenticated
  using ((select public.is_staff()));

create policy "staff can read inquiries"
  on public.inquiries for select
  to authenticated
  using ((select public.is_staff()));

create policy "staff can update inquiries"
  on public.inquiries for update
  to authenticated
  using ((select public.is_staff()))
  with check ((select public.is_staff()));
