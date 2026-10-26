import type { ReactNode } from 'react';
import SourceNote from './SourceNote';
import type { Source, SubsidyRow } from './types';

type Props = {
  /** 制度の正式名 */
  caption: string;
  rows: SubsidyRow[];
  sources: Source[];
  checkedAt: string;
  /** 表の下の補足（任意） */
  footnote?: ReactNode;
  /** lg: このページの主役の制度（金額を大きく、1行目を Lemon Pale で強調） / md: 併用を検討する制度など */
  size?: 'lg' | 'md';
};

/** '1件あたり10万円' → { prefix: '1件あたり', value: '10', unit: '万円' }。形が違う場合は null */
function splitAmount(amount: string): { prefix: string; value: string; unit: string } | null {
  const m = amount.match(/^(.*?)(\d[\d,.]*)(万円|円)$/);
  return m ? { prefix: m[1], value: m[2], unit: m[3] } : null;
}

/**
 * 補助金の対象と金額を、公的な通知のような罫線の表で見せる。金額は Cell Blue の明朝体。
 * 金額の文字列は SubsidyRow.amount（申請の手引きの原文どおり）から分解するだけで、合計などの加工はしない。
 */
export default function SubsidyTable({ caption, rows, sources, checkedAt, footnote, size = 'lg' }: Props) {
  const isLg = size === 'lg';
  return (
    <div className="space-y-4">
      <table className="w-full max-w-4xl border-collapse border-t-[3px] border-b border-ink text-left">
        <caption className="pb-3 text-left font-bold leading-snug text-ink">{caption}</caption>
        <thead>
          <tr className="border-b border-ink text-[15px]">
            <th scope="col" className="py-2 pr-4 font-bold">
              補助の対象
            </th>
            <th scope="col" className="w-[42%] py-2 font-bold md:w-[36%]">
              補助額
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => {
            const amount = splitAmount(row.amount);
            const featured = isLg && i === 0;
            return (
              <tr key={row.target} className={`border-b border-body/30 last:border-b-0 ${featured ? 'bg-lemon-pale' : ''}`}>
                <th scope="row" className={`py-4 pr-4 align-middle font-normal ${featured ? 'pl-3' : ''}`}>
                  {row.target}
                  {row.note && <span className="mt-1 block text-sm">{row.note}</span>}
                </th>
                <td className="py-4 align-middle">
                  {amount ? (
                    <span className="flex flex-wrap items-baseline gap-x-1">
                      <span className="text-sm">{amount.prefix}</span>
                      <span>
                        <span
                          className={`font-mincho font-bold leading-none text-cell ${
                            isLg ? 'text-[44px] md:text-[56px]' : 'text-[32px] md:text-[36px]'
                          }`}
                        >
                          {amount.value}
                        </span>
                        <span className="ml-0.5 font-bold text-cell">{amount.unit}</span>
                      </span>
                    </span>
                  ) : (
                    <span className="font-bold">{row.amount}</span>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {footnote && <div className="max-w-copy text-[15px] leading-relaxed">{footnote}</div>}
      <SourceNote sources={sources} checkedAt={checkedAt} />
    </div>
  );
}
