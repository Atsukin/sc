import Link from 'next/link';
import type { BreadcrumbItem } from './types';

type Props = {
  items: BreadcrumbItem[];
  className?: string;
};

/** 表示用のパンくず。JSON-LD は structuredData.ts の breadcrumbNode に同じ配列を渡す */
export default function Breadcrumbs({ items, className = '' }: Props) {
  return (
    <nav aria-label="パンくずリスト" className={className}>
      <ol className="flex flex-wrap items-center text-sm text-body">
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          return (
            <li key={item.path} className="flex items-center">
              {isLast ? (
                <span aria-current="page">{item.name}</span>
              ) : (
                <>
                  <Link href={item.path} className="underline underline-offset-4 hover:text-ink">
                    {item.name}
                  </Link>
                  <span aria-hidden="true" className="px-2">
                    /
                  </span>
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
