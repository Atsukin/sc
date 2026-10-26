type Group = { title: string; items: string[] };

type Props = { ok: Group; ng: Group };

/** 補助の対象になる / ならないを、罫線の2列で並べる。○×は色に頼らず記号で示す */
export default function EligibilityCompare({ ok, ng }: Props) {
  return (
    <div className="grid max-w-4xl gap-8 md:grid-cols-2 md:gap-10">
      <EligibilityList group={ok} mark="○" />
      <EligibilityList group={ng} mark="×" />
    </div>
  );
}

function EligibilityList({ group, mark }: { group: Group; mark: string }) {
  return (
    <div>
      <p className="flex items-baseline gap-2 border-b-2 border-ink pb-2 font-bold text-ink">
        <span aria-hidden="true" className="text-xl">
          {mark}
        </span>
        {group.title}
      </p>
      <ul>
        {group.items.map((item) => (
          <li key={item} className="flex gap-2 border-b border-body/30 py-3 leading-relaxed">
            <span aria-hidden="true" className="flex-none font-bold text-ink">
              {mark}
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
