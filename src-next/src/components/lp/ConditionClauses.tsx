import type { Condition } from './types';

type Props = { conditions: Condition[] };

const KIND_LABEL: Record<Condition['kind'], string> = { ng: '対象外', must: '必須', date: '期限' };

/**
 * 申請の条件を、条項のような番号付きの表で並べる。
 * 番号は通知の条文の参照用（「条件（3）」のように呼べるように）で、順番の意味はない。
 * 種類（対象外 / 必須 / 期限）は色ではなく文字のラベルで示す。
 */
export default function ConditionClauses({ conditions }: Props) {
  return (
    <ol className="max-w-4xl border-t-[3px] border-b border-ink">
      {conditions.map((c, i) => (
        <li
          key={c.title}
          className="grid grid-cols-[2.75rem_1fr] gap-x-3 border-b border-body/30 py-5 last:border-b-0 md:grid-cols-[3.5rem_1fr]"
        >
          <span className="pt-0.5 font-bold text-ink">（{i + 1}）</span>
          <div>
            <p className="font-bold leading-snug text-ink">
              <span className="mr-2 inline-block border border-ink px-1.5 py-px align-[2px] text-[13px] leading-normal">
                {KIND_LABEL[c.kind]}
              </span>
              {c.title}
            </p>
            <p className="mt-2 max-w-copy">{c.body}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
