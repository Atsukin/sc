import Image from 'next/image';
import type { ReactNode } from 'react';
import type { ImageAsset, LucideIcon } from './types';

type Tone = 'white' | 'gray' | 'lime' | 'dark';

type Props = {
  id: string;
  title: string;
  /** 見出しの上の小さな英字ラベル（装飾。aria-hidden） */
  eyebrow?: string;
  lead?: ReactNode;
  tone?: Tone;
  /** 中身の最大幅。narrow は文章中心、wide はカードやタイムライン向け */
  width?: 'narrow' | 'default' | 'wide';
  /** 背景に敷く写真（暗いオーバーレイを重ね、tone は dark 扱いになる） */
  backgroundImage?: ImageAsset;
  children: ReactNode;
};

const toneClass: Record<Tone, string> = {
  white: 'bg-white text-gray-700',
  gray: 'bg-stone-50 text-gray-700',
  lime: 'bg-[#f6f8e4] text-gray-700',
  dark: 'bg-gray-900 text-gray-200',
};

const widthClass = { narrow: 'max-w-3xl', default: 'max-w-5xl', wide: 'max-w-6xl' };

/** LP の1節（h2 つき）。id はページ内アンカーに使う */
export default function LpSection({
  id,
  title,
  eyebrow,
  lead,
  tone = 'white',
  width = 'default',
  backgroundImage,
  children,
}: Props) {
  const effectiveTone: Tone = backgroundImage ? 'dark' : tone;
  const isDark = effectiveTone === 'dark';
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className={`relative isolate scroll-mt-28 overflow-hidden py-16 md:py-24 ${toneClass[effectiveTone]}`}
    >
      {backgroundImage && (
        <>
          <Image src={backgroundImage.src} alt="" fill sizes="100vw" className="-z-20 object-cover" />
          <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gray-900/75" />
        </>
      )}
      <div className={`container mx-auto px-4 ${widthClass[width]}`}>
        <div className="mx-auto max-w-4xl text-center">
          {eyebrow && (
            <p aria-hidden="true" className="text-xs font-bold uppercase tracking-[0.3em] text-[#9aa52a] md:text-sm">
              {eyebrow}
            </p>
          )}
          <h2
            id={`${id}-title`}
            className={`font-zen-old-mincho mt-2 text-2xl font-bold leading-snug [word-break:auto-phrase] md:text-3xl lg:text-4xl lg:leading-snug ${isDark ? 'text-white' : 'text-gray-900'}`}
          >
            {title}
          </h2>
          <span aria-hidden="true" className="mx-auto mt-4 block h-1 w-12 rounded-full bg-[#D4E157]" />
          {lead && (
            <div className={`mt-5 leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>{lead}</div>
          )}
        </div>
        <div className="mt-10 space-y-6 leading-relaxed md:mt-14">{children}</div>
      </div>
    </section>
  );
}

/** 節の中の h3。アイコンを付けると左に丸いアイコンを出す */
export function LpSubheading({
  children,
  icon: Icon,
  tone = 'light',
}: {
  children: ReactNode;
  icon?: LucideIcon;
  /** dark: 濃い背景の節（tone="dark"）の中で使うとき */
  tone?: 'light' | 'dark';
}) {
  return (
    <h3
      className={`font-zen-old-mincho flex items-center gap-3 pt-6 text-xl font-bold leading-snug [word-break:auto-phrase] first:pt-0 md:text-2xl ${
        tone === 'dark' ? 'text-white' : 'text-gray-900'
      }`}
    >
      {Icon ? (
        <span className="flex h-10 w-10 flex-none items-center justify-center rounded-full bg-[#D4E157] text-gray-900">
          <Icon aria-hidden="true" className="h-5 w-5" />
        </span>
      ) : (
        <span aria-hidden="true" className="h-7 w-1.5 flex-none rounded-full bg-[#D4E157]" />
      )}
      <span>{children}</span>
    </h3>
  );
}
