import type { CSSProperties } from 'react';
import type { FlowStep } from './types';

type Props = {
  steps: FlowStep[];
  /** list: 番号付きの縦並び / timeline: スマホ・タブレットは縦、PC（lg 以上）は横一列のタイムライン */
  variant?: 'list' | 'timeline';
};

export default function FlowSteps({ steps, variant = 'list' }: Props) {
  if (variant === 'timeline') return <Timeline steps={steps} />;

  return (
    <ol>
      {steps.map((step, i) => {
        const Icon = step.icon;
        const isLast = i === steps.length - 1;
        return (
          <li key={step.title} className="relative flex gap-4 pb-4 last:pb-0">
            {!isLast && (
              <span aria-hidden="true" className="absolute bottom-0 left-5 top-10 w-0.5 -translate-x-1/2 bg-[#D4E157]" />
            )}
            <span
              aria-hidden="true"
              className="relative z-10 flex h-10 w-10 flex-none items-center justify-center rounded-full bg-[#D4E157] font-bold text-gray-900"
            >
              {i + 1}
            </span>
            <div className="flex-1 rounded-xl bg-white p-4 shadow-sm ring-1 ring-gray-200">
              <p className="flex items-start gap-2 font-bold text-gray-900">
                {Icon && <Icon aria-hidden="true" className="mt-0.5 h-5 w-5 flex-none text-[#7f8a1f]" />}
                <span className="sr-only">ステップ{i + 1}: </span>
                {step.title}
              </p>
              {step.description && <p className="mt-1 text-sm leading-relaxed text-gray-700 md:text-base">{step.description}</p>}
            </div>
          </li>
        );
      })}
    </ol>
  );
}

/** 横（PC）/ 縦（スマホ）に流れるタイムライン。highlight のあるステップは色を変えてバッジを付ける */
function Timeline({ steps }: { steps: FlowStep[] }) {
  const style = { '--steps': steps.length } as CSSProperties;
  return (
    <ol style={style} className="grid gap-0 lg:grid-cols-[repeat(var(--steps),minmax(0,1fr))]">
      {steps.map((step, i) => {
        const Icon = step.icon;
        const isLast = i === steps.length - 1;
        const isHighlight = Boolean(step.highlight);
        return (
          <li key={step.title} className="relative flex gap-4 pb-6 last:pb-0 lg:flex-col lg:items-center lg:gap-3 lg:pb-0 lg:text-center">
            {!isLast && (
              <span
                aria-hidden="true"
                className="absolute bottom-0 left-6 top-12 w-0.5 -translate-x-1/2 bg-[#c9d36a] lg:left-1/2 lg:right-0 lg:top-6 lg:h-0.5 lg:w-full lg:translate-x-0 lg:translate-y-[-50%]"
              />
            )}
            <span
              aria-hidden="true"
              className={`relative z-10 flex h-12 w-12 flex-none items-center justify-center rounded-full ring-4 ${
                isHighlight ? 'bg-amber-400 text-gray-900 ring-amber-200' : 'bg-white text-[#6f7a17] ring-[#D4E157]'
              }`}
            >
              {Icon ? <Icon className="h-5 w-5" /> : <span className="font-bold">{i + 1}</span>}
            </span>
            <div className="pt-1 lg:px-1 lg:pt-0">
              <p className="text-xs font-bold tracking-wider text-[#7f8a1f]">STEP {i + 1}</p>
              <p className={`mt-0.5 font-bold leading-snug text-gray-900 lg:text-sm ${isHighlight ? 'text-lg lg:text-base' : ''}`}>
                {step.title}
              </p>
              {step.highlight && (
                <p className="mt-1.5 inline-block rounded-full bg-amber-400 px-2.5 py-0.5 text-xs font-bold text-gray-900">
                  {step.highlight}
                </p>
              )}
              {step.description && <p className="mt-1 text-xs leading-relaxed text-gray-600">{step.description}</p>}
            </div>
          </li>
        );
      })}
    </ol>
  );
}
