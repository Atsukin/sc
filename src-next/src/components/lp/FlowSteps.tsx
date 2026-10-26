import type { FlowStep } from './types';

type Props = {
  steps: FlowStep[];
  label?: string;
  /** 説明の少ない短い工程表（スケジュール）。行の間隔を詰め、PC では2列に折り返す */
  compact?: boolean;
};

/**
 * 本当に順番がある内容（流れ・スケジュール）だけに使う番号付きの縦のリスト。
 * highlight のあるステップ（期限など）は、その文に Lemon Pale のマーカーを引く。
 */
export default function FlowSteps({ steps, label, compact = false }: Props) {
  return (
    <ol
      aria-label={label}
      className={
        compact
          ? 'grid max-w-4xl border-t border-ink md:grid-flow-col md:grid-cols-2 md:gap-x-10'
          : 'max-w-copy border-t border-ink'
      }
      style={compact ? { gridTemplateRows: `repeat(${Math.ceil(steps.length / 2)}, auto)` } : undefined}
    >
      {steps.map((step, i) => (
        <li
          key={step.title}
          className={`grid grid-cols-[2.5rem_1fr] gap-x-3 border-b border-body/30 ${compact ? 'py-3' : 'py-4'}`}
        >
          <span aria-hidden="true" className="font-mincho text-[26px] font-bold leading-none text-ink">
            {i + 1}
          </span>
          <div>
            <p className="font-bold leading-snug text-ink">
              <span className="sr-only">{i + 1}. </span>
              {step.title}
            </p>
            {step.highlight && (
              <p className="mt-1 font-bold">
                <span className="bg-lemon-pale px-1 [box-decoration-break:clone]">{step.highlight}</span>
              </p>
            )}
            {step.description && <p className="mt-1 text-base leading-relaxed">{step.description}</p>}
          </div>
        </li>
      ))}
    </ol>
  );
}
