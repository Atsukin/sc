import type { Faq } from './types';

type Props = { faqs: Faq[] };

/** 開閉式の FAQ。JSON-LD（structuredData.ts の faqNode）には同じ配列を渡し、文を一致させる */
export default function FaqList({ faqs }: Props) {
  return (
    <div className="space-y-3">
      {faqs.map((faq) => (
        <details key={faq.question} className="group rounded-lg bg-white shadow-sm ring-1 ring-gray-200">
          <summary className="flex cursor-pointer list-none items-start gap-3 p-4 font-bold text-gray-900 [&::-webkit-details-marker]:hidden">
            <span aria-hidden="true" className="text-[#9aa52a]">Q.</span>
            <span className="flex-1">{faq.question}</span>
            <span aria-hidden="true" className="text-gray-400 transition group-open:rotate-45">＋</span>
          </summary>
          <div className="flex gap-3 border-t border-gray-100 p-4 text-gray-700">
            <span aria-hidden="true" className="font-bold text-gray-500">A.</span>
            <p className="flex-1">{faq.answer}</p>
          </div>
        </details>
      ))}
    </div>
  );
}
