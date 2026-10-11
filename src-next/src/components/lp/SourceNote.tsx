import { formatJaDate } from './format';
import type { Source } from './types';

type Props = {
  sources: Source[];
  /** 確認日（YYYY-MM-DD） */
  checkedAt: string;
};

/** 出典と確認日。補助金など変わりうる情報には必ず付ける */
export default function SourceNote({ sources, checkedAt }: Props) {
  return (
    <div className="rounded-lg bg-gray-50 p-4 text-sm text-gray-600">
      <p>
        出典（<time dateTime={checkedAt}>{formatJaDate(checkedAt)}</time> 確認）:
      </p>
      <ul className="mt-1 list-disc space-y-1 pl-5">
        {sources.map((source) => (
          <li key={source.url}>
            <a
              href={source.url}
              target="_blank"
              rel="noopener noreferrer"
              className="break-all text-gray-700 underline underline-offset-2 hover:text-gray-900"
            >
              {source.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
