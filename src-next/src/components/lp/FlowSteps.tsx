import type { FlowStep } from './types';

type Props = {
  steps: FlowStep[];
  /** list: 番号付きの縦並び / timeline: スマホは縦、PC は横に流れるステップ図 */
  variant?: 'list' | 'timeline';
};

export default function FlowSteps({ steps, variant = 'list' }: Props) {
  if (variant === 'timeline') {
    return (
      <ol className="flex flex-col gap-2 md:flex-row md:flex-wrap md:items-stretch">
        {steps.map((step, i) => (
          <li key={step.title} className="flex items-center gap-2 md:flex-col md:items-stretch">
            <div className="flex flex-1 items-center gap-3 rounded-lg bg-white px-4 py-3 shadow-sm ring-1 ring-gray-200 md:flex-col md:items-start md:gap-1">
              <span className="text-xs font-bold text-[#9aa52a]">STEP {i + 1}</span>
              <span className="font-bold text-gray-900">{step.title}</span>
              {step.description && <span className="text-xs text-gray-600">{step.description}</span>}
            </div>
            {i < steps.length - 1 && (
              <span aria-hidden="true" className="hidden text-gray-400 md:block">→</span>
            )}
          </li>
        ))}
      </ol>
    );
  }

  return (
    <ol className="relative space-y-4 border-l-2 border-[#D4E157] pl-6">
      {steps.map((step, i) => (
        <li key={step.title} className="relative">
          <span
            aria-hidden="true"
            className="absolute -left-[2.35rem] flex h-7 w-7 items-center justify-center rounded-full bg-[#D4E157] text-sm font-bold text-gray-900"
          >
            {i + 1}
          </span>
          <p className="font-bold text-gray-900">
            <span className="sr-only">ステップ{i + 1}: </span>
            {step.title}
          </p>
          {step.description && <p className="mt-1 text-gray-700">{step.description}</p>}
        </li>
      ))}
    </ol>
  );
}
