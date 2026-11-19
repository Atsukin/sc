import { NextResponse, type NextRequest } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { readSupabaseEnv } from '@/lib/supabase/env';

// 管理画面（/admin/）の入口。
// - ログインのセッション（クッキー）を更新する。Server Component はクッキーを書けないため、ここで行う
// - ログインしていなければログイン画面へ送る
// - 検索エンジンに載せない・キャッシュさせない・他サイトの枠に埋め込ませない
// 社員かどうかの判定と、データの読み書きの権限は、ページ側（requireStaff）と Supabase の RLS が担う。

const LOGIN_PATH = '/admin/login/';

function withAdminHeaders(response: NextResponse) {
  response.headers.set('X-Robots-Tag', 'noindex, nofollow');
  response.headers.set('Cache-Control', 'private, no-store');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('Referrer-Policy', 'same-origin');
  return response;
}

export async function proxy(request: NextRequest) {
  let response = NextResponse.next({ request });
  const env = readSupabaseEnv();
  if (!env) return withAdminHeaders(response); // 未設定のときはページ側で案内を出す

  const supabase = createServerClient(env.url, env.publishableKey, {
    cookies: {
      getAll: () => request.cookies.getAll(),
      setAll: (list) => {
        for (const { name, value } of list) request.cookies.set(name, value);
        response = NextResponse.next({ request });
        for (const { name, value, options } of list) response.cookies.set(name, value, options);
      },
    },
  });

  const { data } = await supabase.auth.getClaims();
  const loggedIn = Boolean(data?.claims?.sub);
  const onLoginPage = request.nextUrl.pathname.startsWith(LOGIN_PATH);

  if (loggedIn === onLoginPage) {
    const redirect = NextResponse.redirect(new URL(loggedIn ? '/admin/' : LOGIN_PATH, request.url));
    // 更新したセッションのクッキーを転送先にも引き継ぐ
    for (const cookie of response.cookies.getAll()) redirect.cookies.set(cookie);
    return withAdminHeaders(redirect);
  }
  return withAdminHeaders(response);
}

export const config = {
  matcher: ['/admin', '/admin/:path*'],
};
