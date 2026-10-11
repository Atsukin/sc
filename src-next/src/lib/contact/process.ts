import 'server-only';
import { sendContactNotification } from './mailer';
import type { ContactSubmission } from './schema';

/**
 * 検証済みの問い合わせを受け取って処理する関数。
 * 上から順に実行し、どれかが失敗したらそこで止めてエラーにする。
 */
export type ContactStep = {
  name: string; // ログ用。個人情報は入れない
  run: (submission: ContactSubmission) => Promise<void>;
};

// フェーズ2: Supabase への保存（service role）をメール送信より前に差し込む。
//   例: { name: 'save-supabase', run: saveContactToSupabase },
//   保存を先にしておけば、メール送信に失敗しても問い合わせは失われない。
//   その場合はメール失敗を致命的にしない（ログだけ残して 200 を返す）かを、あわせて検討する。
const steps: ContactStep[] = [
  { name: 'notify-email', run: sendContactNotification },
];

export class ContactStepError extends Error {
  constructor(public readonly step: string, cause: unknown) {
    super(`contact step failed: ${step}`, { cause });
  }
}

export async function processContact(submission: ContactSubmission): Promise<void> {
  for (const step of steps) {
    try {
      await step.run(submission);
    } catch (err) {
      throw new ContactStepError(step.name, err);
    }
  }
}
