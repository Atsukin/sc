import type { ReactNode } from 'react';
import { Landmark } from 'lucide-react';
import SourceNote from './SourceNote';
import type { Source, SubsidyRow } from './types';

type Props = {
  /** 制度の正式名 */
  caption: string;
  rows: SubsidyRow[];
  sources: Source[];
  checkedAt: string;
  /** カードの下の補足（任意） */
  footnote?: ReactNode;
  /** lg: 主役の制度（1枚目を濃い色で強調） / md: 併用を検討する制度など */
  size?: 'lg' | 'md';
};

/** '1件あたり10万円' → { prefix: '1件あたり', value: '10', unit: '万円' }。形が違う場合は null */
function splitAmount(amount: string): { prefix: string; value: string; unit: string } | null {
  const m = amount.match(/^(.*?)(\d[\d,.]*)(万円|円)$/);
  return m ? { prefix: m[1], value: m[2], unit: m[3] } : null;
}

/**
 * 補助金の対象と金額。金額を大きな数字のカードで見せる。
 * 金額の文字列は SubsidyRow.amount（申請の手引きの原文どおり）から分解するだけで、合計などの加工はしない。
 */
export default function SubsidyCards({ caption, rows, sources, checkedAt, footnote, size = 'lg' }: Props) {
  const isLg = size === 'lg';
  return (
    <div className="space-y-4">
      <p className="flex items-start gap-2 text-sm font-bold text-gray-600">
        <Landmark aria-hidden="true" className="mt-0.5 h-4 w-4 flex-none text-[#9aa52a]" />
        {caption}
      </p>
      <dl className={`grid gap-4 ${rows.length >= 3 ? 'sm:grid-cols-3' : 'sm:grid-cols-2'}`}>
        {rows.map((row, i) => {
          const amount = splitAmount(row.amount);
          const featured = isLg && i === 0;
          return (
            <div
              key={row.target}
              className={`flex flex-col rounded-2xl p-5 shadow-sm md:p-6 ${
                featured ? 'bg-gray-900 text-white' : 'bg-white text-gray-900 ring-1 ring-gray-200'
              }`}
            >
              <dt className={`text-sm font-bold leading-relaxed ${featured ? 'text-white/90' : 'text-gray-700'}`}>
                {row.target}
                {row.note && (
                  <span className={`mt-1 block text-xs font-normal ${featured ? 'text-white/70' : 'text-gray-500'}`}>
                    {row.note}
                  </span>
                )}
              </dt>
              <dd className="mt-auto flex items-baseline gap-1 pt-4">
                {amount ? (
                  <>
                    <span className={`text-sm font-bold ${featured ? 'text-white/80' : 'text-gray-500'}`}>
                      {amount.prefix}
                    </span>
                    <span
                      className={`font-zen-old-mincho font-bold leading-none ${
                        isLg ? 'text-6xl md:text-7xl' : 'text-5xl'
                      } ${featured ? 'text-[#D4E157]' : 'text-[#7f8a1f]'}`}
                    >
                      {amount.value}
                    </span>
                    <span className="text-xl font-bold">{amount.unit}</span>
                  </>
                ) : (
                  <span className="text-xl font-bold">{row.amount}</span>
                )}
              </dd>
            </div>
          );
        })}
      </dl>
      {footnote && <div className="text-sm leading-relaxed text-gray-600">{footnote}</div>}
      <SourceNote sources={sources} checkedAt={checkedAt} />
    </div>
  );
}
