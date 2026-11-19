// Supabase の接続情報（サーバー側だけで使う。NEXT_PUBLIC_ を付けないのでブラウザには出ない）。
// 設定方法は docs/admin-setup.md。
// proxy.ts からも読むので、ここでは 'server-only' を import しない。

export function readSupabaseEnv() {
  const url = process.env.SUPABASE_URL;
  const publishableKey = process.env.SUPABASE_PUBLISHABLE_KEY;
  if (!url || !publishableKey) return null;
  return { url, publishableKey };
}
