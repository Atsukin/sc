type Props = { items: string[] };

/** お悩みなどのチェックリスト */
export default function CheckList({ items }: Props) {
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3 rounded-lg bg-white p-4 shadow-sm">
          <svg aria-hidden="true" viewBox="0 0 24 24" className="mt-0.5 h-5 w-5 flex-none text-[#9aa52a]" fill="none" stroke="currentColor" strokeWidth="3">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
          <span className="text-gray-800">{item}</span>
        </li>
      ))}
    </ul>
  );
}
