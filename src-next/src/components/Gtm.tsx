'use client';

import Script from 'next/script';
import { usePathname } from 'next/navigation';
import GtmPageView from './GtmPageView';

const GTM_ID = 'GTM-KDJLQXS8';

/**
 * Google Tag Manager。管理画面（/admin/）では読み込まない
 * （社員の閲覧を計測に混ぜない・問い合わせの画面を外部のタグに見せないため）。
 */
export default function Gtm() {
  const pathname = usePathname();
  if (pathname?.startsWith('/admin')) return null;

  return (
    <>
      <Script id="gtm-init" strategy="afterInteractive">
        {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`}
      </Script>
      <noscript>
        <iframe
          src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
          height="0"
          width="0"
          style={{ display: 'none', visibility: 'hidden' }}
        />
      </noscript>
      <GtmPageView />
    </>
  );
}
