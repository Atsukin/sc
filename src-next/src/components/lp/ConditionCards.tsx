import { Ban, CalendarClock, ClipboardCheck } from 'lucide-react';
import type { Condition } from './types';

type Props = { conditions: Condition[] };

const KIND = {
  ng: { icon: Ban, label: '対象外', tile: 'bg-rose-100 text-rose-700', badge: 'bg-rose-600 text-white' },
  must: { icon: ClipboardCheck, label: '必須', tile: 'bg-[#eef3c4] text-[#6f7a17]', badge: 'bg-[#7f8a1f] text-white' },
  date: { icon: CalendarClock, label: '期限', tile: 'bg-amber-100 text-amber-800', badge: 'bg-amber-500 text-gray-900' },
} as const;

/** 申請の条件。種類（対象外 / 必須 / 期限）ごとにアイコンと色を変え、一目で分かるようにする */
export default function ConditionCards({ conditions }: Props) {
  return (
    <ol className="grid gap-4 md:grid-cols-2">
      {conditions.map((c, i) => {
        const kind = KIND[c.kind];
        const Icon = kind.icon;
        const isLastOdd = i === conditions.length - 1 && conditions.length % 2 === 1;
        return (
          <li
            key={c.title}
            className={`flex gap-4 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-gray-200 ${isLastOdd ? 'md:col-span-2' : ''}`}
          >
            <span className={`flex h-14 w-14 flex-none items-center justify-center rounded-xl ${kind.tile}`}>
              <Icon aria-hidden="true" className="h-7 w-7" />
            </span>
            <div>
              <p className="flex flex-wrap items-center gap-2 text-xs font-bold text-gray-500">
                <span>条件 {i + 1}</span>
                <span className={`rounded-full px-2 py-0.5 ${kind.badge}`}>{kind.label}</span>
              </p>
              <p className="mt-1 font-bold leading-snug text-gray-900 md:text-lg">{c.title}</p>
              <p className="mt-1 text-sm leading-relaxed text-gray-700 md:text-base">{c.body}</p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
