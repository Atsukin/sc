import { ChevronDown, Info } from 'lucide-react';
import { formatJaDate } from './format';
import type { Source } from './types';

type Props = {
  sources: Source[];
  /** 確認日（YYYY-MM-DD） */
  checkedAt: string;
  /** dark: 濃い背景の節に置くとき */
  tone?: 'light' | 'dark';
};

/**
 * 出典と確認日。補助金など変わりうる情報には必ず付ける。
 * 本文より目立たないよう、確認日だけを小さく出し、出典のリンクは開閉式にしている。
 */
export default function SourceNote({ sources, checkedAt, tone = 'light' }: Props) {
  const isDark = tone === 'dark';
  return (
    <details className={`group text-xs leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
      <summary
        className={`inline-flex cursor-pointer list-none items-center gap-1 [&::-webkit-details-marker]:hidden ${isDark ? 'hover:text-gray-200' : 'hover:text-gray-800'}`}
      >
        <Info aria-hidden="true" className="h-3.5 w-3.5" />
        出典（<time dateTime={checkedAt}>{formatJaDate(checkedAt)}</time> 確認）
        <ChevronDown aria-hidden="true" className="h-3.5 w-3.5 transition group-open:rotate-180" />
      </summary>
      <ul className="mt-2 list-disc space-y-1 pl-5">
        {sources.map((source) => (
          <li key={source.url}>
            <a
              href={source.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`break-all underline underline-offset-2 ${isDark ? 'hover:text-white' : 'hover:text-gray-900'}`}
            >
              {source.label}
            </a>
          </li>
        ))}
      </ul>
    </details>
  );
}
