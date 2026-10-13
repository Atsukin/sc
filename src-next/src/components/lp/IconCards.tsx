import type { ReactNode } from 'react';
import type { IconItem } from './types';

type Props = {
  items: IconItem[];
  /** グリッドの最後に置く強調カード（まとめ・次の節への誘導など） */
  summary?: ReactNode;
};

/** お悩みなどを、アイコン付きのカードで並べる（スマホ1列 → 2列 → PC 3列） */
export default function IconCards({ items, summary }: Props) {
  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map(({ icon: Icon, text }) => (
        <li key={text} className="flex items-start gap-4 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-gray-200 md:flex-col md:p-6">
          <span className="flex h-12 w-12 flex-none items-center justify-center rounded-full bg-[#eef3c4] text-[#6f7a17]">
            <Icon aria-hidden="true" className="h-6 w-6" />
          </span>
          <p className="font-bold leading-relaxed text-gray-900">{text}</p>
        </li>
      ))}
      {summary && (
        <li className="flex flex-col justify-center rounded-2xl bg-gray-900 p-5 text-white shadow-sm md:p-6">{summary}</li>
      )}
    </ul>
  );
}
