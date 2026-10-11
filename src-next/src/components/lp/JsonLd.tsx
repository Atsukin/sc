type Props = { data: Record<string, unknown> };

/** 1行の <script type="application/ld+json"> を出力する。`<` はエスケープして script の早期終了を防ぐ */
export default function JsonLd({ data }: Props) {
  const json = JSON.stringify(data).replace(/</g, '\\u003c');
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}
