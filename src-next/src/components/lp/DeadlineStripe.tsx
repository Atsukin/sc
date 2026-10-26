import type { ReactNode } from 'react';
import { formatJaDate } from './format';

type Props = {
  /** 期限（YYYY-MM-DD） */
  date: string;
  /** 日付の後に続く短い一文（例: 「までの設置が補助の対象」） */
  headline: string;
  children?: ReactNode;
};

/**
 * 期限の帯。ロゴの 45° を黄と黒のストライプにして、ページで一番目立つ帯にする。
 * 文字はストライプの上に直接置かず、Lemon の面に載せて読みやすくする。
 */
export default function DeadlineStripe({ date, headline, children }: Props) {
  return (
    <div role="note" aria-label="補助金の期限" className="stripe-caution py-3.5">
      <div className="mx-auto max-w-6xl px-3 md:px-6">
        <div className="bg-lemon px-4 py-4 text-ink md:px-6 md:py-5">
          <p className="font-bold leading-snug">
            <time dateTime={date} className="font-mincho text-[26px] md:text-[32px]">
              {formatJaDate(date)}
            </time>
            <span className="ml-1 text-lg md:text-xl">{headline}</span>
          </p>
          {children && <div className="mt-2 max-w-copy text-[15px] leading-relaxed md:text-base">{children}</div>}
        </div>
      </div>
    </div>
  );
}
