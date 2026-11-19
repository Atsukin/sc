import 'server-only';
import { createSupabaseSecretClient } from '@/lib/supabase/server';
import type { ContactSubmission } from './schema';

export function isSaveConfigured() {
  return createSupabaseSecretClient() !== null;
}

/** 問い合わせを Supabase の inquiries 表に保存する。管理画面（/admin/）の一覧に出る。 */
export async function saveContactToSupabase(s: ContactSubmission): Promise<void> {
  const client = createSupabaseSecretClient();
  if (!client) throw new Error('Supabase is not configured');
  const { error } = await client.from('inquiries').insert({
    created_at: s.submittedAt.toISOString(),
    name: s.name,
    phone: s.phone,
    email: s.email,
    message: s.message,
    lp_slug: s.lp_slug ?? null,
    utm_source: s.utm_source ?? null,
    utm_medium: s.utm_medium ?? null,
    utm_campaign: s.utm_campaign ?? null,
    utm_term: s.utm_term ?? null,
    utm_content: s.utm_content ?? null,
    referrer: s.referrer ?? null,
  });
  // error.details には入力値が入ることがあるので、ログに出すのはコードだけにする
  if (error) throw Object.assign(new Error('supabase insert failed'), { code: error.code });
}
