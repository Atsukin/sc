'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import { requireStaff } from '@/lib/admin/auth';
import { STATUSES } from '@/lib/admin/inquiries';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { readSupabaseEnv } from '@/lib/supabase/env';

export type SignInState = { error?: string; email?: string };

const signInSchema = z.object({
  email: z.string().trim().min(1).max(254),
  password: z.string().min(1).max(200),
});

export async function signIn(_prev: SignInState, formData: FormData): Promise<SignInState> {
  const email = String(formData.get('email') ?? '');
  if (!readSupabaseEnv()) return { error: 'Supabase の接続設定がありません。docs/admin-setup.md を確認してください。', email };

  const parsed = signInSchema.safeParse({ email, password: formData.get('password') });
  if (!parsed.success) return { error: 'メールアドレスとパスワードを入力してください。', email };

  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.auth.signInWithPassword(parsed.data);
  if (error) {
    // 回数制限に当たったときだけ別の案内を出す。それ以外は、どちらが違うかを教えない
    const message = error.status === 429
      ? 'ログインの試行が多すぎます。しばらく待ってからもう一度お試しください。'
      : 'メールアドレスかパスワードが違います。';
    return { error: message, email };
  }
  redirect('/admin/');
}

export async function signOut() {
  const supabase = await createSupabaseServerClient();
  await supabase.auth.signOut();
  redirect('/admin/login/');
}

const updateSchema = z.object({
  id: z.uuid(),
  status: z.enum(STATUSES),
  assignee_id: z.union([z.literal(''), z.uuid()]),
  memo: z.string().max(5000),
});

export async function updateInquiry(formData: FormData) {
  const { supabase, staff } = await requireStaff();
  if (!staff) redirect('/admin/');

  const parsed = updateSchema.safeParse({
    id: formData.get('id'),
    status: formData.get('status'),
    assignee_id: formData.get('assignee_id') ?? '',
    memo: formData.get('memo') ?? '',
  });
  if (!parsed.success) redirect('/admin/');

  const { id, status, assignee_id, memo } = parsed.data;
  const { error } = await supabase
    .from('inquiries')
    .update({ status, assignee_id: assignee_id || null, memo })
    .eq('id', id);

  revalidatePath('/admin', 'layout');
  redirect(`/admin/inquiries/${id}/?${error ? 'error=1' : 'saved=1'}`);
}
