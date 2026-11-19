// 管理画面で使う、問い合わせのステータスの表示名と並び順。
// 値は supabase/migrations の inquiries.status の check 制約と一致させる。

export const STATUSES = ['new', 'in_progress', 'done', 'spam'] as const;
export type InquiryStatus = (typeof STATUSES)[number];

export const STATUS_LABELS: Record<InquiryStatus, string> = {
  new: '未対応',
  in_progress: '対応中',
  done: '完了',
  spam: '迷惑',
};

export function isInquiryStatus(value: unknown): value is InquiryStatus {
  return typeof value === 'string' && (STATUSES as readonly string[]).includes(value);
}

export function formatJst(iso: string) {
  return new Date(iso).toLocaleString('ja-JP', {
    timeZone: 'Asia/Tokyo',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });
}

/** 流入元を1行にまとめる（LP > UTM > 参照元の順に、あるものだけ） */
export function describeSource(row: {
  lp_slug: string | null;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  referrer: string | null;
}) {
  const parts: string[] = [];
  if (row.lp_slug) parts.push(row.lp_slug);
  const utm = [row.utm_source, row.utm_medium, row.utm_campaign].filter(Boolean).join(' / ');
  if (utm) parts.push(utm);
  if (!parts.length && row.referrer) {
    try {
      parts.push(new URL(row.referrer).hostname);
    } catch {
      parts.push(row.referrer);
    }
  }
  return parts.join('・');
}
