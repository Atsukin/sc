import { NextRequest, NextResponse } from 'next/server';
import { contactSchema } from '@/lib/contact/schema';
import { verifyTurnstile } from '@/lib/contact/turnstile';
import { ContactStepError, processContact } from '@/lib/contact/process';

// nodemailer（SMTP）を使うため Node.js ランタイムで動かす
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const MAX_BODY_BYTES = 20_000;

function json(body: Record<string, unknown>, status: number) {
  return NextResponse.json(body, { status });
}

/**
 * ログ用にエラーを要約する。問い合わせの内容やメールアドレスを含めないこと。
 * nodemailer のエラーメッセージには宛先アドレスが入ることがあるため、message は出さない。
 */
function describeError(err: unknown) {
  const step = err instanceof ContactStepError ? err.step : 'unknown';
  const cause = err instanceof ContactStepError ? err.cause : err;
  const e = (cause ?? {}) as { name?: string; code?: string; responseCode?: number; command?: string };
  const configError = cause instanceof Error && /not configured|invalid/.test(cause.message)
    ? cause.message
    : undefined;
  return { step, name: e.name, code: e.code, responseCode: e.responseCode, command: e.command, configError };
}

export async function POST(request: NextRequest) {
  const contentLength = Number(request.headers.get('content-length') ?? 0);
  if (contentLength > MAX_BODY_BYTES) {
    return json({ error: '送信内容が大きすぎます。' }, 413);
  }

  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    return json({ error: 'リクエストの形式が正しくありません。' }, 400);
  }

  const parsed = contactSchema.safeParse(raw);
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0] ?? 'form');
      fieldErrors[key] ??= issue.message;
    }
    return json({ error: '入力内容を確認してください。', fieldErrors }, 400);
  }

  const { website, turnstileToken, ...input } = parsed.data;

  // honeypot に値が入っていればボットとみなす。ボットに判定を悟られないよう成功を返し、何もしない。
  if (website) {
    console.warn('[contact] honeypot triggered');
    return json({ success: true, message: 'お問い合わせを受け付けました。' }, 200);
  }

  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? null;
  if (!(await verifyTurnstile(turnstileToken, ip))) {
    return json({ error: 'スパム対策の確認に失敗しました。ページを再読み込みしてもう一度お試しください。' }, 400);
  }

  try {
    await processContact({ ...input, submittedAt: new Date() });
  } catch (err) {
    console.error('[contact] failed', describeError(err));
    return json({ error: '送信に失敗しました。時間をおいて再度お試しいただくか、お電話でお問い合わせください。' }, 500);
  }

  return json({ success: true, message: 'お問い合わせを受け付けました。' }, 200);
}
