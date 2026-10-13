import Image from 'next/image';
import type { ReactNode } from 'react';
import type { ImageAsset, LucideIcon } from './types';

type Props = {
  image: ImageAsset;
  title: string;
  /** 見出しの上の小さなラベル（例: POINT 01） */
  eyebrow?: string;
  icon?: LucideIcon;
  /** true で写真を右に置く（PC）。交互に並べるときに使う */
  reverse?: boolean;
  children: ReactNode;
};

/** 写真と文章を左右に並べる1行（スマホは写真 → 文章の縦積み）。見出しは h3 */
export default function ImageTextRow({ image, title, eyebrow, icon: Icon, reverse = false, children }: Props) {
  return (
    <div className="grid items-center gap-6 md:grid-cols-2 md:gap-12">
      <div className={`relative aspect-[4/3] overflow-hidden rounded-2xl shadow-lg ${reverse ? 'md:order-2' : ''}`}>
        <Image src={image.src} alt={image.alt} fill sizes="(min-width: 768px) 480px, 100vw" className="object-cover" />
      </div>
      <div>
        {eyebrow && (
          <p aria-hidden="true" className="text-xs font-bold uppercase tracking-[0.25em] text-[#9aa52a]">
            {eyebrow}
          </p>
        )}
        <h3 className="font-zen-old-mincho mt-2 flex items-center gap-3 text-xl font-bold leading-snug text-gray-900 [word-break:auto-phrase] md:text-2xl">
          {Icon && (
            <span className="flex h-10 w-10 flex-none items-center justify-center rounded-full bg-[#D4E157] text-gray-900">
              <Icon aria-hidden="true" className="h-5 w-5" />
            </span>
          )}
          <span>{title}</span>
        </h3>
        <div className="mt-4 space-y-3 leading-relaxed">{children}</div>
      </div>
    </div>
  );
}
