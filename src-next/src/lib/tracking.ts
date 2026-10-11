// dataLayer へイベントを送るラッパー。イベント名・パラメータは docs/analytics/tracking-plan.md を正とする。
// lp_slug / page_type / lp_area は location.pathname から自動で付ける（付け忘れと前ページの値の残留を防ぐ）。
// 将来 src/lib/gtm.ts に trackEvent が入ったら、そちらに統合してよい。
import { pushToDataLayer } from '@/lib/gtm';

export type PageType = 'lp_ad' | 'lp_seo' | 'hub' | 'contact' | 'corporate';

export type PageContext = {
  lp_slug: string | null;
  page_type: PageType;
  lp_area: string | null;
};

/** tracking-plan.md 0章「lp_slug の決め方」と同じルール */
export function getPageContext(pathname: string): PageContext {
  const lp = pathname.match(/^\/lp\/([a-z0-9-]+)\/?/);
  if (lp) {
    const slug = lp[1];
    return { lp_slug: slug, page_type: 'lp_ad', lp_area: slug.split('-')[1] ?? null };
  }
  const solar = pathname.match(/^\/solar\/([a-z0-9]+)\/?/);
  if (solar) {
    return { lp_slug: `solar-${solar[1]}`, page_type: 'lp_seo', lp_area: solar[1] };
  }
  if (/^\/solar\/?$/.test(pathname)) return { lp_slug: null, page_type: 'hub', lp_area: null };
  if (/^\/contact\/?/.test(pathname)) return { lp_slug: null, page_type: 'contact', lp_area: null };
  return { lp_slug: null, page_type: 'corporate', lp_area: null };
}

export type CtaLocation =
  | 'header'
  | 'fv'
  | 'middle'
  | 'bottom'
  | 'fixed_footer'
  | 'footer'
  | 'contact_page';

type EventParams = {
  cta_click: {
    cta_type: 'form' | 'contact_page' | 'line';
    cta_location: CtaLocation;
    cta_text: string;
  };
  tel_click: {
    cta_location: CtaLocation;
    link_url: string;
  };
};

export function trackEvent<E extends keyof EventParams>(event: E, params: EventParams[E]) {
  if (typeof window === 'undefined') return;
  const context = getPageContext(window.location.pathname);
  const payload: Record<string, unknown> = { ...params };
  if (typeof payload.cta_text === 'string') payload.cta_text = payload.cta_text.slice(0, 50);
  pushToDataLayer({ event, ...context, ...payload });
}

/** LP を表示するたびに、最後に見た LP の slug を sessionStorage `sc_last_lp` に残す（ref_lp_slug 用） */
export function rememberLastLp(pathname: string) {
  if (typeof window === 'undefined') return;
  const { lp_slug } = getPageContext(pathname);
  if (!lp_slug) return;
  try {
    window.sessionStorage.setItem('sc_last_lp', lp_slug);
  } catch {
    // プライベートモードなどで sessionStorage が使えない場合は何もしない
  }
}
