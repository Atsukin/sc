import { CalendarClock, CalendarDays } from 'lucide-react';

export type KeyDate = {
  label: string;
  /** YYYY-MM-DD */
  date: string;
  note?: string;
  /** 一番大事な期限。濃い色で強調する */
  emphasis?: boolean;
};

type Props = { dates: KeyDate[] };

/** 期限を大きな日付で見せるカード */
export default function KeyDates({ dates }: Props) {
  return (
    <div className={`grid gap-4 ${dates.length >= 2 ? 'md:grid-cols-2' : ''}`}>
      {dates.map((d) => {
        const [y, m, day] = d.date.split('-').map(Number);
        const Icon = d.emphasis ? CalendarClock : CalendarDays;
        return (
          <div
            key={d.label}
            className={`flex items-center gap-5 rounded-2xl p-5 md:p-6 ${
              d.emphasis ? 'bg-gray-900 text-white shadow-lg ring-4 ring-amber-400' : 'bg-white text-gray-900 shadow-sm ring-1 ring-gray-200'
            }`}
          >
            <Icon aria-hidden="true" className={`h-10 w-10 flex-none ${d.emphasis ? 'text-amber-400' : 'text-[#7f8a1f]'}`} />
            <div>
              <p className={`text-sm font-bold ${d.emphasis ? 'text-white/85' : 'text-gray-600'}`}>{d.label}</p>
              <p className="mt-1 flex items-baseline gap-2">
                <time dateTime={d.date} className="flex items-baseline gap-2">
                  <span className="text-base font-bold">{y}年</span>
                  <span
                    className={`font-zen-old-mincho text-5xl font-bold leading-none md:text-6xl ${d.emphasis ? 'text-amber-400' : 'text-gray-900'}`}
                  >
                    {m}/{day}
                  </span>
                </time>
              </p>
              {d.note && <p className={`mt-2 text-xs leading-relaxed ${d.emphasis ? 'text-white/75' : 'text-gray-500'}`}>{d.note}</p>}
            </div>
          </div>
        );
      })}
    </div>
  );
}
