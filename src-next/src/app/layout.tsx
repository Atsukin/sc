import type { Metadata } from "next";
import Gtm from "@/components/Gtm";
import { SITE_URL } from "@/lib/site";
import "./globals.css";

// canonical は各ページの metadata.alternates.canonical で設定する。
// layout に置くと、設定し忘れた子ページがすべてトップを canonical にしてしまうため、ここには書かない。
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "株式会社SC - 宮城県名取市のエネルギーを与える会社",
  description: "株式会社SCは宮城県名取市に本社を構え、エネルギー、農業、住宅の3つを主力事業とし、持続可能な未来に向けて暮らしを根底から支えるサービスを提供しています。",
  keywords: "エネルギー, 農業, 住宅, 宮城県, 名取市",
  robots: "index, follow",
  openGraph: {
    title: "株式会社SC - エネルギーを与える会社",
    description: "株式会社SCは宮城県名取市に本社を構え、エネルギー、農業、住宅の3つを主力事業とし、持続可能な未来に向けて暮らしを根底から支えるサービスを提供しています。",
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
      </head>
      <body className="antialiased">
        {/* Google Tag Manager（/admin/ では読み込まない） */}
        <Gtm />
        {children}
      </body>
    </html>
  );
}
