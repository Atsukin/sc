import Image from 'next/image';
import type { ReactNode } from 'react';
import { CalendarClock, MapPin } from 'lucide-react';
import Breadcrumbs from './Breadcrumbs';
import CtaButtons from './CtaButtons';
import type { BreadcrumbItem, ImageAsset, LucideIcon } from './types';

type Props = {
  /** h1 の上の小さなラベル（地域名など） */
  eyebrow?: string;
  title: ReactNode;
  lead: ReactNode;
  badges: { title: string; body: string; icon?: LucideIcon }[];
  image: ImageAsset;
  /** 背景写真の見せる位置（object-position） */
  imagePosition?: string;
  breadcrumbs?: BreadcrumbItem[];
  /** 期限付きのお知らせなど（任意）。ファーストビューの下端に帯で出す */
  notice?: ReactNode;
};

/**
 * ファーストビュー。全幅の背景写真に暗いオーバーレイを重ね、キャッチと CTA を前面に出す。
 * 背景写真は LCP 候補なので preload を付ける（Next.js 16 で priority は preload に置き換え）。
 */
export default function LpHero({ eyebrow, title, lead, badges, image, imagePosition, breadcrumbs, notice }: Props) {
  return (
    <section id="top" className="relative isolate overflow-hidden bg-gray-900 text-white">
      <Image
        src={image.src}
        alt={image.alt}
        fill
        preload
        sizes="100vw"
        className="-z-20 object-cover"
        style={imagePosition ? { objectPosition: imagePosition } : undefined}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-b from-black/75 via-black/60 to-black/80 md:bg-gradient-to-r md:from-black/85 md:via-black/60 md:to-black/15"
      />

      <div className="container mx-auto px-4 pb-12 pt-24 md:pb-24 md:pt-36">
        {breadcrumbs && <Breadcrumbs items={breadcrumbs} tone="dark" />}

        <div className="mt-8 max-w-2xl md:mt-14 lg:max-w-3xl">
          {eyebrow && (
            <p className="inline-flex items-center gap-1.5 rounded-full bg-[#D4E157] px-3 py-1 text-xs font-bold text-gray-900 md:text-sm">
              <MapPin aria-hidden="true" className="h-4 w-4" />
              {eyebrow}
            </p>
          )}
          <h1 className="font-zen-old-mincho mt-4 text-3xl font-bold leading-snug [word-break:auto-phrase] [text-shadow:0_2px_16px_rgba(0,0,0,0.45)] md:text-4xl lg:text-5xl lg:leading-tight">
            {title}
          </h1>
          <div className="mt-5 text-base leading-relaxed text-white/90 md:text-lg">{lead}</div>

          <ul className="mt-7 grid grid-cols-3 gap-2 sm:gap-3">
            {badges.map((badge) => {
              const Icon = badge.icon;
              return (
                <li
                  key={badge.title}
                  className="flex flex-col items-start gap-2 rounded-xl bg-white/10 p-2.5 ring-1 ring-white/25 backdrop-blur-sm sm:p-3"
                >
                  {Icon && (
                    <span className="flex h-8 w-8 flex-none items-center justify-center rounded-full bg-[#D4E157] text-gray-900 sm:h-9 sm:w-9">
                      <Icon aria-hidden="true" className="h-4 w-4 sm:h-5 sm:w-5" />
                    </span>
                  )}
                  <span>
                    <span className="block text-xs font-bold text-white sm:text-sm">{badge.title}</span>
                    <span className="mt-0.5 block text-[11px] leading-snug text-white/80 sm:text-xs md:text-sm">{badge.body}</span>
                  </span>
                </li>
              );
            })}
          </ul>

          <div className="mt-8">
            <CtaButtons ctaLocation="fv" tone="dark" />
          </div>
        </div>
      </div>

      {notice && (
        <div role="note" className="bg-amber-400 text-gray-900">
          <div className="container mx-auto flex items-start gap-3 px-4 py-4 md:items-center">
            <CalendarClock aria-hidden="true" className="mt-0.5 h-6 w-6 flex-none md:mt-0" />
            <div className="text-sm font-bold leading-relaxed md:text-base">{notice}</div>
          </div>
        </div>
      )}
    </section>
  );
}
