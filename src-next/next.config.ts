import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 既存 URL（末尾スラッシュ付き）を維持する。docs/migration-seo.md 参照
  trailingSlash: true,
  async redirects() {
    // www → apex に正規化する（重複コンテンツの解消）。
    // permanent: true だと 308 になるため、明示的に 301 を返す。
    // ページは末尾スラッシュ付き、拡張子付きのファイル（sitemap.xml・画像など）はスラッシュなしで
    // 1回のリダイレクトで正しい URL に飛ばす（apex 側で再度 308 が起きないようにする）。
    const www = [{ type: "host" as const, value: "www.sc-14.net" }];
    return [
      {
        source: "/",
        has: www,
        destination: "https://sc-14.net/",
        statusCode: 301,
      },
      {
        // 最後のセグメントに拡張子がある = ファイル
        source: "/:path(.*\\.[^/]+)",
        has: www,
        destination: "https://sc-14.net/:path",
        statusCode: 301,
      },
      {
        source: "/:path+",
        has: www,
        destination: "https://sc-14.net/:path+/",
        statusCode: 301,
      },
      // 旧サイト（静的書き出し）は /index.html や /service/index.html も 200 で返していた
      { source: "/index.html", destination: "/", statusCode: 301 },
      { source: "/:path+/index.html", destination: "/:path+/", statusCode: 301 },
    ];
  },
};

export default nextConfig;
