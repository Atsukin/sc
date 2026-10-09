'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { pushToDataLayer } from '@/lib/gtm';

export default function GtmPageView() {
  const pathname = usePathname();
  const isFirstRender = useRef(true);

  useEffect(() => {
    // 初回表示分は gtm.js ロード時に GA4 設定タグが page_view を送るため、
    // ここでは next/link によるクライアント遷移だけを送って二重計測を避ける
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    pushToDataLayer({
      event: 'page_view_spa',
      page_path: pathname,
      page_location: window.location.href,
    });
  }, [pathname]);

  return null;
}
