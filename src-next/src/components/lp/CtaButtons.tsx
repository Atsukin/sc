import { COMPANY } from '@/lib/company';
import type { CtaLocation } from '@/lib/tracking';
import TelLink from './TelLink';
import ContactPageLink from './ContactPageLink';

type Props = {
  ctaLocation: CtaLocation;
  /** フォームボタンの文言。「無料」は社内確認が取れるまで使わない（TODO(要確認) 相談・現地調査・見積もりが無料か） */
  formText?: string;
  showHours?: boolean;
};

// ボタンだけ 4px の角丸。電話は Ink の面、フォームは Lemon の面（どちらも文字とのコントラストを確保）
const buttonBase =
  'inline-flex min-h-14 w-full items-center justify-center gap-2 rounded-button px-6 py-3 text-lg font-bold sm:w-auto';
export const telButtonClass = `${buttonBase} bg-ink text-white hover:bg-body`;
export const formButtonClass = `${buttonBase} bg-lemon text-ink hover:bg-lemon-pale`;

/** 電話とフォームの CTA を横並び（スマホでは縦積み）で置く */
export default function CtaButtons({ ctaLocation, formText = 'フォームで相談する', showHours = true }: Props) {
  return (
    <div>
      <div className="flex flex-col gap-3 sm:flex-row">
        <TelLink ctaLocation={ctaLocation} className={telButtonClass}>
          <PhoneIcon />
          <span>
            <span className="sr-only">電話する </span>
            {COMPANY.tel}
          </span>
        </TelLink>
        <ContactPageLink ctaLocation={ctaLocation} text={formText} className={formButtonClass} />
      </div>
      {showHours && <p className="mt-3 text-[15px] text-body">電話の受付は {COMPANY.hours}</p>}
    </div>
  );
}

export function PhoneIcon({ className = 'h-5 w-5' }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1L6.6 10.8z" />
    </svg>
  );
}
