// JSON-LD のビルダー。設計は docs/seo/site-structure-solar.md §5。
import { SITE_URL } from '@/lib/site';
import { COMPANY } from '@/lib/company';
import type { BreadcrumbItem, Faq } from './types';

export const ORGANIZATION_ID = `${SITE_URL}/#organization`;

type Node = Record<string, unknown>;

export function absoluteUrl(path: string): string {
  return `${SITE_URL}${path}`;
}

export function breadcrumbNode(items: BreadcrumbItem[]): Node {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function faqNode(faqs: Faq[]): Node {
  return {
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  };
}

export function serviceNode({
  path,
  areaServed,
}: {
  path: `/${string}`;
  areaServed: { '@type': 'City' | 'AdministrativeArea'; name: string }[];
}): Node {
  return {
    '@type': 'Service',
    serviceType: '住宅用太陽光発電・蓄電池の販売・設置',
    provider: { '@id': ORGANIZATION_ID },
    areaServed: areaServed.length === 1 ? areaServed[0] : areaServed,
    url: absoluteUrl(path),
    // offers（価格）は社内確認が取れるまで入れない。TODO(要確認) 価格帯の公開可否
  };
}

/**
 * LocalBusiness。本来は layout.tsx に1回だけ置き、各ページは @id で参照する。
 * layout に入るまでの暫定として /solar/ 配下のページに入れている。layout に入ったら各ページから外すこと。
 */
export function localBusinessNode(): Node {
  return {
    '@type': 'LocalBusiness',
    '@id': ORGANIZATION_ID,
    name: COMPANY.name,
    url: `${SITE_URL}/`,
    telephone: COMPANY.telE164,
    email: COMPANY.email,
    address: {
      '@type': 'PostalAddress',
      postalCode: COMPANY.postalCode,
      addressRegion: COMPANY.region,
      addressLocality: COMPANY.locality,
      streetAddress: COMPANY.street,
      addressCountry: 'JP',
    },
    geo: { '@type': 'GeoCoordinates', latitude: 38.1688631, longitude: 140.8745005 },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        opens: '09:00',
        closes: '21:00',
      },
    ],
    // TODO(要確認) 実際の施工対応エリア。確認できるまでは本社所在地の名取市のみ
    areaServed: { '@type': 'City', name: '名取市' },
    // TODO(要確認) Google ビジネスプロフィールの URL があれば sameAs に入れ、NAP を一致させる
  };
}

export function graph(nodes: Node[]): Node {
  return { '@context': 'https://schema.org', '@graph': nodes };
}
