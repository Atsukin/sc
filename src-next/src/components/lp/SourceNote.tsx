import { formatJaDate } from './format';
import type { Source } from './types';

type Props = {
  sources: Source[];
  /** 確認日（YYYY-MM-DD） */
  checkedAt: string;
};

/**
 * 出典と確認日。補助金など変わりうる情報には必ず付ける。
 * 公的な通知の書き方にならい、出典を隠さずに小さな文字で並べる。リンクは情報の色（Cell Blue）。
 */
export default function SourceNote({ sources, checkedAt }: Props) {
  return (
    <div className="max-w-copy text-sm leading-relaxed text-body">
      <p>
        出典（<time dateTime={checkedAt}>{formatJaDate(checkedAt)}</time> 確認）
      </p>
      <ul className="mt-1 space-y-1">
        {sources.map((source) => (
          <li key={source.url}>
            <a
              href={source.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-cell underline underline-offset-4 [overflow-wrap:anywhere] hover:decoration-2"
            >
              {source.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
