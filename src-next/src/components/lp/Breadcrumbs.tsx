import Link from 'next/link';
import type { BreadcrumbItem } from './types';

type Props = { items: BreadcrumbItem[] };

/** 表示用のパンくず。JSON-LD は structuredData.ts の breadcrumbNode に同じ配列を渡す */
export default function Breadcrumbs({ items }: Props) {
  return (
    <nav aria-label="パンくずリスト" className="container mx-auto px-4 pt-24 md:pt-32">
      <ol className="flex flex-wrap items-center gap-1 text-xs text-gray-600 md:text-sm">
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          return (
            <li key={item.path} className="flex items-center gap-1">
              {isLast ? (
                <span aria-current="page" className="text-gray-900">{item.name}</span>
              ) : (
                <>
                  <Link href={item.path} className="underline underline-offset-2 hover:text-gray-900">
                    {item.name}
                  </Link>
                  <span aria-hidden="true">＞</span>
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
