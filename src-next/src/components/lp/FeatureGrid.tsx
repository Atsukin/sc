import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { Feature } from './types';

type Props = { items: Feature[] };

/**
 * メリット・選ばれる理由などのカード（スマホ1列、PC は最大3列）。
 * image を渡すと上に写真、icon を渡すと丸いアイコンを出す。
 */
export default function FeatureGrid({ items }: Props) {
  return (
    <ul className={`grid gap-5 ${items.length >= 3 ? 'md:grid-cols-3' : 'md:grid-cols-2'}`}>
      {items.map((item, i) => {
        const Icon = item.icon;
        return (
          <li key={item.title} className="flex flex-col overflow-hidden rounded-2xl bg-white text-gray-700 shadow-sm ring-1 ring-gray-200">
            {item.image && (
              <div className="relative aspect-[16/10]">
                <Image src={item.image.src} alt={item.image.alt} fill sizes="(min-width: 768px) 360px, 100vw" className="object-cover" />
              </div>
            )}
            <div className="relative flex flex-1 flex-col p-5 md:p-6">
              <div className="flex items-center gap-3">
                {Icon && (
                  <span
                    className={`flex h-12 w-12 flex-none items-center justify-center rounded-full bg-[#D4E157] text-gray-900 ${
                      item.image ? '-mt-11 ring-4 ring-white' : ''
                    }`}
                  >
                    <Icon aria-hidden="true" className="h-6 w-6" />
                  </span>
                )}
                <span aria-hidden="true" className="font-zen-old-mincho text-sm font-bold text-[#9aa52a]">
                  {String(i + 1).padStart(2, '0')}
                </span>
              </div>
              <h3 className="mt-3 text-lg font-bold leading-snug text-gray-900">{item.title}</h3>
              <div className="mt-2 flex-1 leading-relaxed">{item.body}</div>
              {item.href && (
                <Link
                  href={item.href}
                  className="mt-4 inline-flex items-center gap-1 font-bold text-gray-900 underline underline-offset-4 hover:text-[#7f8a1f]"
                >
                  {item.linkText ?? '詳しく見る'}
                  <ArrowRight aria-hidden="true" className="h-4 w-4" />
                </Link>
              )}
            </div>
          </li>
        );
      })}
    </ul>
  );
}
