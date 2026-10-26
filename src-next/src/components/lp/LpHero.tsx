import Image from 'next/image';
import type { ReactNode } from 'react';
import Breadcrumbs from './Breadcrumbs';
import CtaButtons from './CtaButtons';
import type { BreadcrumbItem, ImageAsset } from './types';

type Props = {
  title: ReactNode;
  lead: ReactNode;
  /** ファーストビューで伝える要点（見出しと短い説明） */
  points?: { title: string; body: string }[];
  image: ImageAsset;
  /** 写真の見せる位置（object-position） */
  imagePosition?: string;
  breadcrumbs?: BreadcrumbItem[];
};

/**
 * ファーストビュー。左に見出しと CTA、右に写真。
 * 写真の左辺をロゴと同じ 45° で切り取る（clip-chevron。--notch を写真の高さの半分にすると 45° になる）。
 * スマホは 見出し → 写真 → ボタン → 説明 の順。写真は LCP 候補なので preload を付ける（Next.js 16 で priority は preload に置き換え）。
 */
export default function LpHero({ title, lead, points, image, imagePosition, breadcrumbs }: Props) {
  return (
    <section id="top" className="relative bg-white pt-24 pb-10 text-prose text-body md:pt-32 lg:min-h-[calc(8rem+560px)] lg:pb-0">
      <div className="mx-auto flex max-w-6xl flex-col px-5 md:px-10 lg:py-10">
        {breadcrumbs && <Breadcrumbs items={breadcrumbs} className="order-0" />}

        <h1 className="order-1 mt-6 font-mincho text-[30px] font-bold leading-[1.45] text-ink [word-break:auto-phrase] md:text-[40px] lg:mt-10 lg:max-w-[30rem]">
          {title}
        </h1>

        <div className="order-2 -mx-5 mt-8 md:-mx-10 lg:absolute lg:right-0 lg:top-32 lg:mx-0 lg:mt-0 lg:w-1/2">
          <div className="clip-chevron relative h-[240px] [--notch:120px] md:h-[360px] md:[--notch:180px] lg:h-[560px] lg:[--notch:280px]">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              preload
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
              style={imagePosition ? { objectPosition: imagePosition } : undefined}
            />
          </div>
        </div>

        <div className="order-4 mt-8 max-w-copy lg:order-2 lg:mt-6 lg:max-w-[30rem]">{lead}</div>

        {points && (
          <dl className="order-5 mt-6 max-w-copy border-t border-body/30 text-[15px] lg:order-3 lg:max-w-[30rem]">
            {points.map((p) => (
              <div key={p.title} className="flex flex-wrap gap-x-3 border-b border-body/30 py-2.5">
                <dt className="font-bold text-ink">{p.title}</dt>
                <dd>{p.body}</dd>
              </div>
            ))}
          </dl>
        )}

        <div className="order-3 mt-6 lg:order-4 lg:mt-8">
          <CtaButtons ctaLocation="fv" />
        </div>
      </div>
    </section>
  );
}
