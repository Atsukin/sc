/** '2026-10-09' → '2026年10月9日' */
export function formatJaDate(isoDate: string): string {
  const [y, m, d] = isoDate.split('-').map(Number);
  return `${y}年${m}月${d}日`;
}

/** 日本時間の今日が isoDate（YYYY-MM-DD）以前なら true。期限付きのお知らせの出し分けに使う */
export function isOnOrBeforeTodayJst(isoDate: string): boolean {
  const todayJst = new Intl.DateTimeFormat('sv-SE', { timeZone: 'Asia/Tokyo' }).format(new Date());
  return todayJst <= isoDate;
}
