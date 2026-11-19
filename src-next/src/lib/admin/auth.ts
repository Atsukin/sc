import 'server-only';
import { cache } from 'react';
import { redirect } from 'next/navigation';
import { createSupabaseServerClient } from '@/lib/supabase/server';

export type Staff = { user_id: string; display_name: string };

/**
 * 管理画面のページとサーバーアクションの先頭で呼ぶ。
 * ログインしていなければログイン画面へ送る。ログインしていても staff 表に登録がなければ staff は null。
 * （レイアウトだけで確認すると、ページ間の移動で再確認されないことがあるため、各ページで呼ぶ）
 */
export const requireStaff = cache(async () => {
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase.auth.getClaims();
  const userId = data?.claims?.sub;
  if (!userId) redirect('/admin/login/');

  const { data: staff } = await supabase
    .from('staff')
    .select('user_id, display_name')
    .eq('user_id', userId)
    .maybeSingle<Staff>();

  return { supabase, userId, staff };
});
