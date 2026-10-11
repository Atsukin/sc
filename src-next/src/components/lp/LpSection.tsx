import type { ReactNode } from 'react';

type Props = {
  id: string;
  title: string;
  lead?: ReactNode;
  tone?: 'white' | 'gray';
  children: ReactNode;
};

/** LP の1節（h2 つき）。id はページ内アンカーに使う */
export default function LpSection({ id, title, lead, tone = 'white', children }: Props) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className={`scroll-mt-28 py-12 md:py-16 ${tone === 'gray' ? 'bg-gray-50' : 'bg-white'}`}
    >
      <div className="container mx-auto max-w-4xl px-4">
        <h2
          id={`${id}-title`}
          className="font-noto-serif-jp border-b-4 border-[#D4E157] pb-3 text-xl font-bold leading-snug text-gray-900 md:text-3xl"
        >
          {title}
        </h2>
        {lead && <div className="mt-4 leading-relaxed text-gray-700">{lead}</div>}
        <div className="mt-6 space-y-6 leading-relaxed text-gray-700">{children}</div>
      </div>
    </section>
  );
}

/** 節の中の h3 */
export function LpSubheading({ children }: { children: ReactNode }) {
  return <h3 className="mt-10 text-lg font-bold text-gray-900 first:mt-0 md:text-xl">{children}</h3>;
}
