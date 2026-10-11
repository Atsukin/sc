import Link from 'next/link';
import type { Feature } from './types';

type Props = { items: Feature[] };

/** メリット・選ばれる理由などのカード（スマホ1列、PC は最大3列） */
export default function FeatureGrid({ items }: Props) {
  return (
    <ul className={`grid gap-4 ${items.length >= 3 ? 'md:grid-cols-3' : 'md:grid-cols-2'}`}>
      {items.map((item, i) => (
        <li key={item.title} className="flex flex-col rounded-xl bg-white p-5 shadow-sm ring-1 ring-gray-200">
          <span className="text-sm font-bold text-[#9aa52a]">{String(i + 1).padStart(2, '0')}</span>
          <h3 className="mt-1 text-lg font-bold text-gray-900">{item.title}</h3>
          <div className="mt-2 flex-1 text-gray-700">{item.body}</div>
          {item.href && (
            <Link href={item.href} className="mt-3 font-bold text-gray-900 underline underline-offset-4 hover:text-[#9aa52a]">
              {item.linkText ?? '詳しく見る'}
            </Link>
          )}
        </li>
      ))}
    </ul>
  );
}
