import 'server-only';
import { cookies } from 'next/headers';
import { createServerClient } from '@supabase/ssr';
import { createClient } from '@supabase/supabase-js';
import { readSupabaseEnv } from './env';

/**
 * ログイン中の社員として Supabase に接続する（管理画面用）。
 * publishable key ＋ ログインのクッキーで接続するので、RLS（supabase/migrations）がそのまま効く。
 */
export async function createSupabaseServerClient() {
  const env = readSupabaseEnv();
  if (!env) throw new Error('Supabase is not configured');
  const cookieStore = await cookies();
  return createServerClient(env.url, env.publishableKey, {
    cookies: {
      getAll: () => cookieStore.getAll(),
      setAll: (list) => {
        try {
          for (const { name, value, options } of list) cookieStore.set(name, value, options);
        } catch {
          // Server Component からはクッキーを書けない。セッションの更新は proxy.ts が行う
        }
      },
    },
  });
}

/**
 * secret key で接続する（RLS を通らない）。問い合わせの登録（/api/contact）だけで使う。
 * 管理画面の表示には使わないこと。
 */
export function createSupabaseSecretClient() {
  const env = readSupabaseEnv();
  const secretKey = process.env.SUPABASE_SECRET_KEY;
  if (!env || !secretKey) return null;
  return createClient(env.url, secretKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
