import type { ReactNode } from 'react';
import { COMPANY } from '@/lib/company';
import type { CtaLocation } from '@/lib/tracking';
import TelLink from './TelLink';
import ContactPageLink from './ContactPageLink';
import { formButtonClass } from './CtaButtons';

type Props = {
  id?: string;
  title: string;
  description?: ReactNode;
  ctaLocation: CtaLocation;
  formText?: string;
};

/**
 * ページ末尾のお問い合わせ。ページの中で濃い色（Ink）の面を使うのはここだけ。
 * 電話番号を大きく出し、フォームへのボタンを並べる。
 */
export default function CtaBlock({ id, title, description, ctaLocation, formText = 'フォームで相談する' }: Props) {
  return (
    <section
      id={id}
      aria-labelledby={id ? `${id}-title` : undefined}
      className="on-ink scroll-mt-28 bg-ink py-16 text-white md:py-24"
    >
      <div className="mx-auto max-w-6xl px-5 md:px-10">
        <h2
          id={id ? `${id}-title` : undefined}
          className="max-w-copy font-mincho text-[26px] font-bold leading-snug [word-break:auto-phrase] md:text-4xl"
        >
          {title}
        </h2>
        {description && <div className="mt-5 max-w-copy text-prose text-white">{description}</div>}

        <div className="mt-10 grid gap-10 border-t border-white/40 pt-8 md:grid-cols-2 md:gap-12">
          <div>
            <p className="text-[15px] font-bold">お電話でのご相談</p>
            <TelLink
              ctaLocation={ctaLocation}
              className="mt-1 inline-block font-mincho text-[40px] font-bold leading-tight text-lemon underline decoration-2 underline-offset-[10px] md:text-5xl"
            >
              {COMPANY.tel}
            </TelLink>
            <p className="mt-3 text-[15px]">
              受付 {COMPANY.hours}（{COMPANY.hoursNote}）
            </p>
          </div>
          <div>
            <p className="text-[15px] font-bold">フォームでのご相談（24時間受付）</p>
            <ContactPageLink ctaLocation={ctaLocation} text={formText} className={`${formButtonClass} mt-4`} />
          </div>
        </div>
      </div>
    </section>
  );
}
