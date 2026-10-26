import Image from 'next/image';
import LpSection from './LpSection';
import type { WorkCase } from './types';

type Props = {
  title: string;
  works: WorkCase[];
  /** これ未満の件数なら節ごと出さない（ダミーの事例を載せないため。docs/seo/page-solar-natori.md §3-8） */
  minCount?: number;
};

/** 施工事例。件数が足りないうちは何も描画しない */
export default function WorksSection({ title, works, minCount = 3 }: Props) {
  if (works.length < minCount) return null;
  return (
    <LpSection id="works" title={title} tone="sky">
      <ul className="grid gap-8 md:grid-cols-3">
        {works.map((work) => (
          <li key={`${work.district}-${work.house}`} className="border-t border-ink pt-4">
            {work.image && (
              <div className="relative mb-4 aspect-[4/3]">
                <Image src={work.image.src} alt={work.image.alt} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover" />
              </div>
            )}
            <dl className="space-y-1 text-base">
              <dt className="sr-only">地区</dt>
              <dd className="font-bold text-ink">{work.district}</dd>
              <dt className="sr-only">住宅</dt>
              <dd>{work.house}</dd>
              {work.solar && (<><dt className="font-bold">太陽光</dt><dd>{work.solar}</dd></>)}
              {work.battery && (<><dt className="font-bold">蓄電池</dt><dd>{work.battery}</dd></>)}
              {work.subsidy && (<><dt className="font-bold">利用した補助金</dt><dd>{work.subsidy}</dd></>)}
              {work.period && (<><dt className="font-bold">工期</dt><dd>{work.period}</dd></>)}
              {work.voice && (<><dt className="font-bold">お客様の声</dt><dd>{work.voice}</dd></>)}
            </dl>
          </li>
        ))}
      </ul>
    </LpSection>
  );
}
