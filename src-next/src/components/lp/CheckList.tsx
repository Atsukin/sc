type Props = { items: string[]; label?: string };

/** お悩みなどのチェックリスト。罫線で区切り、Lemon Pale の四角にチェックを入れる */
export default function CheckList({ items, label }: Props) {
  return (
    <ul aria-label={label} className="max-w-copy border-t border-ink">
      {items.map((text) => (
        <li key={text} className="flex gap-4 border-b border-body/30 py-4">
          <svg aria-hidden="true" viewBox="0 0 24 24" className="mt-1 h-6 w-6 flex-none">
            <rect x="1" y="1" width="22" height="22" className="fill-lemon-pale stroke-ink" strokeWidth="1.5" />
            <path d="M6 12.5l4 4 8-9" fill="none" className="stroke-ink" strokeWidth="2.25" />
          </svg>
          <span className="font-bold text-ink">{text}</span>
        </li>
      ))}
    </ul>
  );
}
