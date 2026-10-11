import TelLink from './TelLink';
import ContactPageLink from './ContactPageLink';
import { PhoneIcon } from './CtaButtons';

type Props = { formText?: string };

/**
 * スマホ用の画面下の追従 CTA（md 以上では出さない）。
 * ページ側で、このバーの高さ分（pb-20 md:pb-0）の余白を最下部に取ること。
 */
export default function FixedCtaBar({ formText = 'フォームで相談' }: Props) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-gray-200 bg-white/95 p-2 shadow-[0_-4px_12px_rgba(0,0,0,0.08)] backdrop-blur md:hidden">
      <div className="grid grid-cols-2 gap-2">
        <TelLink
          ctaLocation="fixed_footer"
          className="flex min-h-12 items-center justify-center gap-1 rounded-full bg-gray-900 text-base font-bold text-white"
        >
          <PhoneIcon />
          電話で相談
        </TelLink>
        <ContactPageLink
          ctaLocation="fixed_footer"
          text={formText}
          className="flex min-h-12 items-center justify-center rounded-full bg-[#D4E157] text-base font-bold text-gray-900"
        />
      </div>
    </div>
  );
}
