import { COMPANY } from '@/lib/company';
import type { CtaLocation } from '@/lib/tracking';
import TelLink from './TelLink';
import ContactPageLink from './ContactPageLink';

type Props = {
  ctaLocation: CtaLocation;
  /** フォームボタンの文言。「無料」は社内確認が取れるまで使わない（TODO(要確認) 相談・現地調査・見積もりが無料か） */
  formText?: string;
  showHours?: boolean;
  /** dark: 写真や濃い背景の上に置くとき */
  tone?: 'light' | 'dark';
};

export const telButtonClass =
  'flex min-h-14 w-full items-center justify-center gap-2 rounded-full bg-gray-900 px-6 py-3 text-lg font-bold text-white shadow-md transition hover:bg-gray-700 sm:w-auto';
export const telButtonOnDarkClass =
  'flex min-h-14 w-full items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-lg font-bold text-gray-900 shadow-md transition hover:bg-gray-100 sm:w-auto';
export const formButtonClass =
  'flex min-h-14 w-full items-center justify-center rounded-full bg-[#D4E157] px-6 py-3 text-lg font-bold text-gray-900 shadow-md transition hover:bg-[#c0cc45] sm:w-auto';

/** 電話とフォームの CTA を横並び（スマホでは縦積み）で置く */
export default function CtaButtons({
  ctaLocation,
  formText = 'フォームで相談する',
  showHours = true,
  tone = 'light',
}: Props) {
  const isDark = tone === 'dark';
  return (
    <div>
      <div className="flex flex-col gap-3 sm:flex-row">
        <TelLink ctaLocation={ctaLocation} className={isDark ? telButtonOnDarkClass : telButtonClass}>
          <PhoneIcon />
          <span>
            <span className="sr-only">電話する </span>
            {COMPANY.tel}
          </span>
        </TelLink>
        <ContactPageLink ctaLocation={ctaLocation} text={formText} className={formButtonClass} />
      </div>
      {showHours && (
        <p className={`mt-2 text-sm ${isDark ? 'text-white/80' : 'text-gray-600'}`}>電話受付 {COMPANY.hours}</p>
      )}
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
