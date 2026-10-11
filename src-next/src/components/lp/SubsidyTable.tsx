import type { ReactNode } from 'react';
import SourceNote from './SourceNote';
import type { Source, SubsidyRow } from './types';

type Props = {
  caption: string;
  rows: SubsidyRow[];
  sources: Source[];
  checkedAt: string;
  /** 表の下の補足（任意） */
  footnote?: ReactNode;
};

/** 補助金の対象と金額の表。出典と確認日をセットで表示する */
export default function SubsidyTable({ caption, rows, sources, checkedAt, footnote }: Props) {
  return (
    <div className="space-y-3">
      <div className="overflow-x-auto rounded-lg ring-1 ring-gray-200">
        <table className="w-full min-w-[20rem] border-collapse bg-white text-left text-sm md:text-base">
          <caption className="bg-gray-900 px-4 py-2 text-left text-sm font-bold text-white">{caption}</caption>
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th scope="col" className="px-4 py-3 font-bold">対象</th>
              <th scope="col" className="w-2/5 px-4 py-3 font-bold">補助額</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.target} className="border-t border-gray-200 align-top">
                <th scope="row" className="px-4 py-3 font-normal text-gray-800">
                  {row.target}
                  {row.note && <span className="mt-1 block text-xs text-gray-500">{row.note}</span>}
                </th>
                <td className="px-4 py-3 font-bold text-gray-900">{row.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {footnote && <div className="text-sm text-gray-600">{footnote}</div>}
      <SourceNote sources={sources} checkedAt={checkedAt} />
    </div>
  );
}
