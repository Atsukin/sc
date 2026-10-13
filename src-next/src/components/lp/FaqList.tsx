import { ChevronDown } from 'lucide-react';
import type { Faq } from './types';

type Props = { faqs: Faq[] };

/** 開閉式の FAQ。JSON-LD（structuredData.ts の faqNode）には同じ配列を渡し、文を一致させる */
export default function FaqList({ faqs }: Props) {
  return (
    <div className="space-y-3">
      {faqs.map((faq) => (
        <details key={faq.question} className="group overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-gray-200 open:ring-[#D4E157]">
          <summary className="flex cursor-pointer list-none items-start gap-3 p-4 font-bold text-gray-900 md:p-5 [&::-webkit-details-marker]:hidden">
            <span aria-hidden="true" className="flex h-8 w-8 flex-none items-center justify-center rounded-full bg-[#D4E157] text-sm font-black text-gray-900">
              Q
            </span>
            <span className="flex-1 pt-1 leading-snug">{faq.question}</span>
            <ChevronDown aria-hidden="true" className="mt-1.5 h-5 w-5 flex-none text-gray-400 transition group-open:rotate-180" />
          </summary>
          <div className="flex gap-3 border-t border-gray-100 bg-stone-50/60 p-4 text-gray-700 md:p-5">
            <span aria-hidden="true" className="flex h-8 w-8 flex-none items-center justify-center rounded-full bg-gray-900 text-sm font-black text-white">
              A
            </span>
            <p className="flex-1 pt-1 leading-relaxed">{faq.answer}</p>
          </div>
        </details>
      ))}
    </div>
  );
}
