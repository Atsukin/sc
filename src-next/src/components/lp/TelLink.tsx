'use client';

import type { ReactNode } from 'react';
import { COMPANY } from '@/lib/company';
import { trackEvent, type CtaLocation } from '@/lib/tracking';

type Props = {
  ctaLocation: CtaLocation;
  className?: string;
  children?: ReactNode;
};

/** 電話リンク。tracking-plan.md 1-3 のとおり tel_click だけを送る（cta_click は送らない） */
export default function TelLink({ ctaLocation, className, children }: Props) {
  return (
    <a
      href={COMPANY.telHref}
      className={className}
      onClick={() => trackEvent('tel_click', { cta_location: ctaLocation, link_url: COMPANY.telHref })}
    >
      {children ?? COMPANY.tel}
    </a>
  );
}
