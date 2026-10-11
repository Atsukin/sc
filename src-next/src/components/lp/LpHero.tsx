import Image from 'next/image';
import type { ReactNode } from 'react';
import CtaButtons from './CtaButtons';

type Props = {
  title: string;
  lead: ReactNode;
  badges: { title: string; body: string }[];
  image: { src: string; alt: string };
  /** 期限付きのお知らせなど（任意） */
  notice?: ReactNode;
};

/** ファーストビュー。画像は LCP 候補なので priority を付ける */
export default function LpHero({ title, lead, badges, image, notice }: Props) {
  return (
    <section id="top" className="bg-white">
      <div className="container mx-auto grid gap-8 px-4 pb-10 pt-6 md:grid-cols-2 md:items-center md:pb-16 md:pt-10">
        <div>
          <h1 className="font-noto-serif-jp text-2xl font-bold leading-snug text-gray-900 md:text-4xl">
            {title}
          </h1>
          <div className="mt-4 text-base leading-relaxed text-gray-700 md:text-lg">{lead}</div>
          <ul className="mt-6 grid gap-3 sm:grid-cols-3">
            {badges.map((badge) => (
              <li key={badge.title} className="rounded-lg border-l-4 border-[#D4E157] bg-gray-50 p-3">
                <p className="text-sm font-bold text-gray-900">{badge.title}</p>
                <p className="mt-1 text-sm text-gray-600">{badge.body}</p>
              </li>
            ))}
          </ul>
          <div className="mt-6">
            <CtaButtons ctaLocation="fv" />
          </div>
        </div>
        <div className="relative aspect-[3/2] w-full overflow-hidden rounded-xl shadow-lg">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            priority
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
      </div>
      {notice && (
        <div className="container mx-auto px-4 pb-8">
          <div role="note" className="rounded-lg border border-amber-300 bg-amber-50 p-4 text-sm leading-relaxed text-amber-900 md:text-base">
            {notice}
          </div>
        </div>
      )}
    </section>
  );
}
