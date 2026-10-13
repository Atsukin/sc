import { CircleCheck, CircleX } from 'lucide-react';

type Props = {
  ok: { title: string; items: string[] };
  ng: { title: string; items: string[] };
};

/** 補助の対象になる / ならないを、OK・NG の2枚で並べる */
export default function EligibilityCompare({ ok, ng }: Props) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <div className="rounded-2xl bg-[#f6f8e4] p-5 ring-1 ring-[#D4E157] md:p-6">
        <p className="flex items-center gap-3 text-lg font-bold text-gray-900">
          <span aria-hidden="true" className="flex h-12 w-12 flex-none items-center justify-center rounded-full bg-[#7f8a1f] text-base font-black text-white">
            OK
          </span>
          {ok.title}
        </p>
        <ul className="mt-4 space-y-3">
          {ok.items.map((item) => (
            <li key={item} className="flex items-start gap-2 text-gray-800">
              <CircleCheck aria-hidden="true" className="mt-0.5 h-5 w-5 flex-none text-[#7f8a1f]" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="rounded-2xl bg-rose-50 p-5 ring-1 ring-rose-200 md:p-6">
        <p className="flex items-center gap-3 text-lg font-bold text-gray-900">
          <span aria-hidden="true" className="flex h-12 w-12 flex-none items-center justify-center rounded-full bg-rose-600 text-base font-black text-white">
            NG
          </span>
          {ng.title}
        </p>
        <ul className="mt-4 space-y-3">
          {ng.items.map((item) => (
            <li key={item} className="flex items-start gap-2 text-gray-800">
              <CircleX aria-hidden="true" className="mt-0.5 h-5 w-5 flex-none text-rose-600" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
