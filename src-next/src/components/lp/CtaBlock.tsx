import type { ReactNode } from 'react';
import { COMPANY } from '@/lib/company';
import type { CtaLocation } from '@/lib/tracking';
import TelLink from './TelLink';
import ContactPageLink from './ContactPageLink';
import { formButtonClass, PhoneIcon } from './CtaButtons';

type Props = {
  id?: string;
  title: string;
  description?: ReactNode;
  ctaLocation: CtaLocation;
  formText?: string;
  /** h2 で出すか（ページ末尾のお問い合わせ節）、見出しなしの帯にするか（途中の CTA） */
  headingLevel?: 'h2' | 'p';
};

/** 電話（大きく）とフォームへのリンクをまとめた CTA ブロック */
export default function CtaBlock({
  id,
  title,
  description,
  ctaLocation,
  formText = 'フォームで相談する',
  headingLevel = 'h2',
}: Props) {
  const Heading = headingLevel;
  return (
    <section id={id} className="scroll-mt-28 bg-gray-900 py-12 text-white md:py-16">
      <div className="container mx-auto max-w-3xl px-4 text-center">
        <Heading className="font-noto-serif-jp text-xl font-bold leading-snug md:text-3xl">{title}</Heading>
        {description && <div className="mt-3 text-gray-300">{description}</div>}
        <div className="mt-8 rounded-xl bg-white p-6 text-gray-900">
          <p className="text-sm font-bold text-gray-600">お電話でのご相談</p>
          <TelLink
            ctaLocation={ctaLocation}
            className="mt-1 inline-flex items-center gap-2 text-3xl font-bold tracking-wide text-gray-900 underline-offset-4 hover:underline md:text-4xl"
          >
            <PhoneIcon className="h-7 w-7" />
            {COMPANY.tel}
          </TelLink>
          <p className="mt-1 text-sm text-gray-600">
            受付 {COMPANY.hours}（{COMPANY.hoursNote}）
          </p>
          <div className="mx-auto mt-6 max-w-sm">
            <p className="mb-2 text-sm font-bold text-gray-600">フォームでのご相談（24時間受付）</p>
            <ContactPageLink ctaLocation={ctaLocation} text={formText} className={formButtonClass + ' sm:w-full'} />
          </div>
        </div>
      </div>
    </section>
  );
}
