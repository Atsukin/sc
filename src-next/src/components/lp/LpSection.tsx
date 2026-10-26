import type { ReactNode } from 'react';

type Props = {
  id: string;
  title: string;
  lead?: ReactNode;
  /** 背景は白と Sky を交互に使う。濃い面は CtaBlock だけ */
  tone?: 'white' | 'sky';
  children: ReactNode;
};

/**
 * LP の1節（h2 つき）。左揃え・1カラム。
 * 文章は子要素側で max-w-copy（40 字）に収め、写真と表だけを外枠（max-w-6xl）まで広げる。
 */
export default function LpSection({ id, title, lead, tone = 'white', children }: Props) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className={`scroll-mt-28 py-16 text-prose text-body md:py-24 ${tone === 'sky' ? 'bg-sky' : 'bg-white'}`}
    >
      <div className="mx-auto max-w-6xl px-5 md:px-10">
        <h2
          id={`${id}-title`}
          className="max-w-copy font-mincho text-[26px] font-bold leading-[1.45] text-ink [word-break:auto-phrase] md:text-4xl"
        >
          {title}
        </h2>
        {lead && <div className="mt-5 max-w-copy">{lead}</div>}
        <div className="mt-8 space-y-8 md:mt-10">{children}</div>
      </div>
    </section>
  );
}

/** 節の中の h3（ゴシック。明朝は h1・h2 だけに使う） */
export function LpSubheading({ children, id }: { children: ReactNode; id?: string }) {
  return (
    <h3 id={id} className="max-w-copy pt-6 text-[19px] font-bold leading-snug text-ink first:pt-0 md:text-[21px]">
      {children}
    </h3>
  );
}

/** 40 字幅の本文ブロック */
export function Copy({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`max-w-copy space-y-4 ${className}`}>{children}</div>;
}
