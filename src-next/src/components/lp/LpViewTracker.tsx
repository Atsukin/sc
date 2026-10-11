'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { rememberLastLp } from '@/lib/tracking';

/** LP を表示したとき、sessionStorage `sc_last_lp` を更新する（/contact/ での ref_lp_slug 用。tracking-plan.md 5-2） */
export default function LpViewTracker() {
  const pathname = usePathname();
  useEffect(() => {
    rememberLastLp(pathname);
  }, [pathname]);
  return null;
}
