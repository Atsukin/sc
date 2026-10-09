import type { Metadata } from "next";
import Script from "next/script";
import GtmPageView from "@/components/GtmPageView";
import "./globals.css";

const GTM_ID = "GTM-KDJLQXS8";

export const metadata: Metadata = {
  title: "株式会社SC - 宮城県名取市のエネルギーを与える会社",
  description: "株式会社SCは宮城県名取市に本社を構え、エネルギー、農業、住宅の3つを主力事業とし、持続可能な未来に向けて暮らしを根底から支えるサービスを提供しています。",
  keywords: "エネルギー, 農業, 住宅, 宮城県, 名取市",
  robots: "index, follow",
  openGraph: {
    title: "株式会社SC - エネルギーを与える会社",
    description: "株式会社SCは宮城県名取市に本社を構え、エネルギー、農業、住宅の3つを主力事業とし、持続可能な未来に向けて暮らしを根底から支えるサービスを提供しています。",
    url: "https://sc-14.net",
    siteName: "株式会社SC",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "株式会社SC - エネルギーを与える会社",
    description: "株式会社SCは宮城県名取市に本社を構え、エネルギー、農業、住宅の3つを主力事業とし、持続可能な未来に向けて暮らしを根底から支えるサービスを提供しています。",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="256x256" type="image/x-icon" />
        <link href="https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400;700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Zen+Old+Mincho:wght@400;500;600;700;900&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Noto+Serif+JP:wght@200..900&display=swap" rel="stylesheet" />
        {/* Google Tag Manager */}
        <Script id="gtm-init" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`}
        </Script>
        {/* End Google Tag Manager */}
      </head>
      <body className="antialiased">
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        <GtmPageView />
        {children}
      </body>
    </html>
  );
}
