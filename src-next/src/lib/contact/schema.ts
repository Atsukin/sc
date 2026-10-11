import { z } from 'zod';

// 全角英数・全角スペースを半角に寄せてから trim する（電話番号・メールの全角入力対策）
const normalized = <T extends z.ZodType>(schema: T) =>
  z.preprocess((v) => (typeof v === 'string' ? v.normalize('NFKC').trim() : v), schema);

const optionalShort = z.string().trim().max(200).optional();

export const contactSchema = z.object({
  name: normalized(
    z.string({ error: 'お名前を入力してください。' })
      .min(1, { error: 'お名前を入力してください。' })
      .max(100, { error: 'お名前は100文字以内で入力してください。' }),
  ),
  phone: normalized(
    z.string({ error: '電話番号を入力してください。' })
      .min(1, { error: '電話番号を入力してください。' })
      .regex(/^\+?[0-9()\- ]{10,20}$/, { error: '電話番号の形式が正しくありません。' }),
  ),
  email: normalized(
    z.string({ error: 'メールアドレスを入力してください。' })
      .min(1, { error: 'メールアドレスを入力してください。' })
      .max(254)
      .pipe(z.email({ error: 'メールアドレスの形式が正しくありません。' })),
  ),
  message: z
    .string({ error: 'メッセージを入力してください。' })
    .trim()
    .min(1, { error: 'メッセージを入力してください。' })
    .max(5000, { error: 'メッセージは5000文字以内で入力してください。' }),

  // スパム対策
  website: z.string().max(500).optional(), // honeypot。人間は空のまま送る
  turnstileToken: z.string().max(2048).optional(),

  // 流入元（フェーズ2で Supabase に保存する。今はフロントから送っていなくてもよい）
  lp_slug: optionalShort,
  utm_source: optionalShort,
  utm_medium: optionalShort,
  utm_campaign: optionalShort,
  utm_term: optionalShort,
  utm_content: optionalShort,
  referrer: z.string().trim().max(2000).optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;

/** 検証済みで、スパム判定を通過した問い合わせ。保存・通知の各処理に渡す。 */
export type ContactSubmission = Omit<ContactInput, 'website' | 'turnstileToken'> & {
  submittedAt: Date;
};
