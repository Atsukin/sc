// サイト全体で使う正規 URL と公開ページの一覧。
// 新しい公開ページ（/solar/<area>/ など）を足したら PUBLIC_PAGES にも追加する。
// 広告専用 LP（/lp/<slug>/）は noindex なので、ここには入れない。

export const SITE_URL = 'https://sc-14.net';

type PublicPage = {
  path: `/${string}`; // 末尾スラッシュ付きで書く
  changeFrequency: 'daily' | 'weekly' | 'monthly' | 'yearly';
  priority: number;
};

export const PUBLIC_PAGES: PublicPage[] = [
  { path: '/', changeFrequency: 'weekly', priority: 1.0 },
  { path: '/service/', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/solar/', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/solar/natori/', changeFrequency: 'weekly', priority: 0.8 },
  { path: '/greeting/', changeFrequency: 'yearly', priority: 0.6 },
  { path: '/company/', changeFrequency: 'yearly', priority: 0.6 },
  { path: '/contact/', changeFrequency: 'yearly', priority: 0.7 },
  { path: '/flow/', changeFrequency: 'yearly', priority: 0.6 },
  { path: '/privacypolicy/', changeFrequency: 'yearly', priority: 0.3 },
];
