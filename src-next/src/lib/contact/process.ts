import 'server-only';
import { sendContactNotification } from './mailer';
import { isSaveConfigured, saveContactToSupabase } from './save';
import type { ContactSubmission } from './schema';

export class ContactStepError extends Error {
  constructor(public readonly step: 'save-supabase' | 'notify-email', cause: unknown) {
    super(`contact step failed: ${step}`, { cause });
  }
}

export type ContactResult = {
  saved: boolean;
  mailed: boolean;
  failures: ContactStepError[];
};

/**
 * 検証済みの問い合わせを、Supabase への保存 → メール通知の順に処理する。
 * どちらか一方でも成功すれば問い合わせは失われないので、呼び出し側は成功として扱う。
 * 両方とも失敗したときだけ、お客さまにエラーを返す。
 */
export async function processContact(submission: ContactSubmission): Promise<ContactResult> {
  const result: ContactResult = { saved: false, mailed: false, failures: [] };

  if (isSaveConfigured()) {
    try {
      await saveContactToSupabase(submission);
      result.saved = true;
    } catch (err) {
      result.failures.push(new ContactStepError('save-supabase', err));
    }
  } else {
    console.warn('[contact] Supabase is not configured; skipped saving');
  }

  try {
    await sendContactNotification(submission);
    result.mailed = true;
  } catch (err) {
    result.failures.push(new ContactStepError('notify-email', err));
  }

  return result;
}
