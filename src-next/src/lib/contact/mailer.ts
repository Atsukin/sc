import 'server-only';
import nodemailer from 'nodemailer';
import type { ContactSubmission } from './schema';

const FROM_NAME = '株式会社SC';

function readSmtpConfig() {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, CONTACT_TO, SMTP_FROM } = process.env;
  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS || !CONTACT_TO) {
    throw new Error('SMTP is not configured');
  }
  const port = Number(SMTP_PORT);
  if (!Number.isInteger(port)) throw new Error('SMTP_PORT is invalid');
  return {
    host: SMTP_HOST,
    port,
    user: SMTP_USER,
    pass: SMTP_PASS,
    to: CONTACT_TO,
    // From は SMTP 認証したアドレスに揃える（SPF/DMARC で弾かれないように）
    from: SMTP_FROM || SMTP_USER,
  };
}

function formatJst(date: Date) {
  return date.toLocaleString('ja-JP', { timeZone: 'Asia/Tokyo' });
}

function buildBody(s: ContactSubmission) {
  const lines = [
    `名前: ${s.name}`,
    `電話番号: ${s.phone}`,
    `メールアドレス: ${s.email}`,
    `メッセージ:`,
    s.message,
    '',
    '---',
    `送信日時: ${formatJst(s.submittedAt)}`,
  ];
  if (s.lp_slug) lines.push(`LP: ${s.lp_slug}`);
  const utm = (['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'] as const)
    .filter((k) => s[k])
    .map((k) => `${k}=${s[k]}`);
  if (utm.length) lines.push(`UTM: ${utm.join(' ')}`);
  if (s.referrer) lines.push(`参照元: ${s.referrer}`);
  return lines.join('\n') + '\n';
}

/** info@sc-14.net（CONTACT_TO）に通知メールを送る。旧 _archive/api/contact.php と同じ宛先・Reply-To。 */
export async function sendContactNotification(s: ContactSubmission): Promise<void> {
  const cfg = readSmtpConfig();
  const transporter = nodemailer.createTransport({
    host: cfg.host,
    port: cfg.port,
    secure: cfg.port === 465, // 465 は SSL/TLS、587 は STARTTLS
    auth: { user: cfg.user, pass: cfg.pass },
    // Vercel の関数の実行時間内に収める
    connectionTimeout: 10_000,
    greetingTimeout: 10_000,
    socketTimeout: 15_000,
  });

  await transporter.sendMail({
    from: { name: FROM_NAME, address: cfg.from },
    to: cfg.to,
    replyTo: { name: s.name, address: s.email },
    subject: '新しいお問い合わせ',
    text: buildBody(s),
  });
}
