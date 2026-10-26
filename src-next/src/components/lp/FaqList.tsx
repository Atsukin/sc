import type { Faq } from './types';

type Props = { faqs: Faq[] };

/**
 * 開閉式の FAQ。JSON-LD（structuredData.ts の faqNode）には同じ配列を渡し、文を一致させる。
 * 動きは、開閉の印（＋が回って×になる）だけ。prefers-reduced-motion では globals.css で止める。
 */
export default function FaqList({ faqs }: Props) {
  return (
    <div className="max-w-copy border-t border-ink">
      {faqs.map((faq) => (
        <details key={faq.question} className="group border-b border-body/30">
          <summary className="flex cursor-pointer list-none items-start gap-4 py-5 font-bold leading-snug text-ink [&::-webkit-details-marker]:hidden">
            <span className="flex-1">{faq.question}</span>
            <svg
              aria-hidden="true"
              viewBox="0 0 20 20"
              className="mt-0.5 h-5 w-5 flex-none stroke-ink transition-transform duration-200 group-open:rotate-45"
            >
              <path d="M10 3v14M3 10h14" strokeWidth="2" />
            </svg>
          </summary>
          <p className="pb-6">{faq.answer}</p>
        </details>
      ))}
    </div>
  );
}
