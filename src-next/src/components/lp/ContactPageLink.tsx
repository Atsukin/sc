'use client';

import Link from 'next/link';
import { trackEvent, type CtaLocation } from '@/lib/tracking';

type Props = {
  ctaLocation: CtaLocation;
  /** ボタンの文言。cta_text としても送る */
  text: string;
  className?: string;
};

/** お問い合わせフォーム（/contact/）へのリンク。cta_click（cta_type: contact_page）を送る */
export default function ContactPageLink({ ctaLocation, text, className }: Props) {
  return (
    <Link
      href="/contact/"
      className={className}
      onClick={() =>
        trackEvent('cta_click', { cta_type: 'contact_page', cta_location: ctaLocation, cta_text: text })
      }
    >
      {text}
    </Link>
  );
}
