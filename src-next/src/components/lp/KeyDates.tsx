import { formatJaDate } from './format';

export type KeyDate = {
  label: string;
  /** YYYY-MM-DD */
  date: string;
  note?: string;
  /** 一番大事な期限。Lemon Pale の行で示す */
  emphasis?: boolean;
};

type Props = { dates: KeyDate[]; caption: string };

/** 期限の一覧を罫線の表で出す（大きな数字の帯にはしない。期限の強調は DeadlineStripe だけ） */
export default function KeyDates({ dates, caption }: Props) {
  return (
    <table className="w-full max-w-4xl border-collapse border-t-[3px] border-b border-ink text-left">
      <caption className="pb-3 text-left font-bold text-ink">{caption}</caption>
      <tbody>
        {dates.map((d) => (
          <tr key={d.label} className={`border-b border-body/30 last:border-b-0 ${d.emphasis ? 'bg-lemon-pale' : ''}`}>
            <th scope="row" className={`py-4 pr-4 align-top font-normal md:w-1/2 ${d.emphasis ? 'pl-3' : ''}`}>
              {d.label}
            </th>
            <td className="py-4 align-top">
              <time dateTime={d.date} className="font-mincho text-[22px] font-bold leading-tight text-ink">
                {formatJaDate(d.date)}
              </time>
              {d.note && <p className="mt-1 text-[15px] leading-relaxed">{d.note}</p>}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
