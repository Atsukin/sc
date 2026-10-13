import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import type { BreadcrumbItem } from './types';

type Props = {
  items: BreadcrumbItem[];
  /** dark: 写真の上（ファーストビューの中）に置くとき */
  tone?: 'light' | 'dark';
  className?: string;
};

/** 表示用のパンくず。JSON-LD は structuredData.ts の breadcrumbNode に同じ配列を渡す */
export default function Breadcrumbs({ items, tone = 'light', className = '' }: Props) {
  const isDark = tone === 'dark';
  return (
    <nav aria-label="パンくずリスト" className={className}>
      <ol className={`flex flex-wrap items-center gap-1 text-xs md:text-sm ${isDark ? 'text-white/75' : 'text-gray-600'}`}>
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          return (
            <li key={item.path} className="flex items-center gap-1">
              {isLast ? (
                <span aria-current="page" className={isDark ? 'text-white' : 'text-gray-900'}>
                  {item.name}
                </span>
              ) : (
                <>
                  <Link
                    href={item.path}
                    className={`underline underline-offset-2 ${isDark ? 'hover:text-white' : 'hover:text-gray-900'}`}
                  >
                    {item.name}
                  </Link>
                  <ChevronRight aria-hidden="true" className="h-3.5 w-3.5" />
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
