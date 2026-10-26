import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/site';

// 静的書き出し（npm run build:xserver）でも出力されるように明示する
export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        // API と管理画面（フェーズ2）はクロール対象外
        disallow: ['/api/', '/admin/'],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
