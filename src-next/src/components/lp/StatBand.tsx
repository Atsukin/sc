import type { LucideIcon } from './types';

export type Stat = {
  label: string;
  /** 数字の前に小さく出す文（例: 1件あたり） */
  prefix?: string;
  value: string;
  unit?: string;
  note?: string;
  icon?: LucideIcon;
};

type Props = { stats: Stat[]; ariaLabel: string };

/** 大きな数字を横に並べる帯。節と節の間に挟んでリズムを作る。数字は出典か社内確認が取れたものだけを入れる */
export default function StatBand({ stats, ariaLabel }: Props) {
  return (
    <section aria-label={ariaLabel} className="bg-[#D4E157] text-gray-900">
      <dl
        className={`container mx-auto grid max-w-6xl divide-y divide-gray-900/15 px-4 sm:divide-x sm:divide-y-0 ${
          stats.length >= 3 ? 'sm:grid-cols-3' : 'sm:grid-cols-2'
        }`}
      >
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="flex flex-col items-center px-4 py-5 text-center md:py-8">
              <dt className="flex items-center gap-1.5 text-sm font-bold">
                {Icon && <Icon aria-hidden="true" className="h-4 w-4" />}
                {stat.label}
              </dt>
              <dd className="mt-2 flex items-baseline gap-1">
                {stat.prefix && <span className="text-sm font-bold">{stat.prefix}</span>}
                <span className="font-zen-old-mincho text-4xl font-bold leading-none sm:text-5xl lg:text-6xl">{stat.value}</span>
                {stat.unit && <span className="text-lg font-bold">{stat.unit}</span>}
              </dd>
              {stat.note && <dd className="mt-2 text-xs text-gray-800">{stat.note}</dd>}
            </div>
          );
        })}
      </dl>
    </section>
  );
}
