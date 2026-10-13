import Image from 'next/image';
import type { ReactNode } from 'react';
import { Clock, Mail } from 'lucide-react';
import { COMPANY } from '@/lib/company';
import type { CtaLocation } from '@/lib/tracking';
import TelLink from './TelLink';
import ContactPageLink from './ContactPageLink';
import { formButtonClass, PhoneIcon } from './CtaButtons';
import type { ImageAsset } from './types';

type Props = {
  id?: string;
  title: string;
  description?: ReactNode;
  ctaLocation: CtaLocation;
  formText?: string;
  /** h2 で出すか（ページ末尾のお問い合わせ節）、見出しなしの帯にするか（途中の CTA） */
  headingLevel?: 'h2' | 'p';
  /** 背景の写真（暗いオーバーレイを重ねる） */
  image?: ImageAsset;
};

/** 電話（大きく）とフォームへのリンクをまとめた CTA ブロック */
export default function CtaBlock({
  id,
  title,
  description,
  ctaLocation,
  formText = 'フォームで相談する',
  headingLevel = 'h2',
  image,
}: Props) {
  const Heading = headingLevel;
  return (
    <section id={id} className="relative isolate scroll-mt-28 overflow-hidden bg-gray-900 py-16 text-white md:py-24">
      {image && (
        <>
          <Image src={image.src} alt="" fill sizes="100vw" className="-z-20 object-cover" />
          <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-b from-gray-900/80 to-gray-900/90" />
        </>
      )}
      <div className="container mx-auto max-w-4xl px-4 text-center">
        <Heading className="font-zen-old-mincho text-2xl font-bold leading-snug [word-break:auto-phrase] md:text-4xl">{title}</Heading>
        {description && <div className="mt-4 text-white/85">{description}</div>}
        <div className="mt-10 grid gap-4 text-gray-900 md:grid-cols-2">
          <div className="flex flex-col items-center rounded-2xl bg-white p-6 shadow-lg">
            <p className="flex items-center gap-2 text-sm font-bold text-gray-600">
              <PhoneIcon className="h-4 w-4" />
              お電話でのご相談
            </p>
            <TelLink
              ctaLocation={ctaLocation}
              className="mt-2 text-3xl font-bold tracking-wide text-gray-900 underline-offset-4 hover:underline md:text-4xl"
            >
              {COMPANY.tel}
            </TelLink>
            <p className="mt-2 flex items-center gap-1 text-sm text-gray-600">
              <Clock aria-hidden="true" className="h-4 w-4" />
              受付 {COMPANY.hours}
            </p>
            <p className="mt-1 text-xs text-gray-500">（{COMPANY.hoursNote}）</p>
          </div>
          <div className="flex flex-col items-center justify-center rounded-2xl bg-white p-6 shadow-lg">
            <p className="flex items-center gap-2 text-sm font-bold text-gray-600">
              <Mail aria-hidden="true" className="h-4 w-4" />
              フォームでのご相談（24時間受付）
            </p>
            <ContactPageLink ctaLocation={ctaLocation} text={formText} className={formButtonClass + ' mt-4 sm:w-full'} />
          </div>
        </div>
      </div>
    </section>
  );
}
