import { categoryDetails, categoryOrder, type EntryType } from "../types";

type Props = {
  total: number;
  counts: Record<EntryType, number>;
};

export default function CategoryTabs({ total, counts }: Props) {
  return (
    <nav
      aria-label="Vault category navigation"
      className="hide-scrollbar flex gap-5 overflow-x-auto whitespace-nowrap"
    >
      <a
        className="pb-2 text-sm text-amber"
        href="#all"
      >
        All <span className="font-mono text-xs text-cream/45">({total})</span>
      </a>
      {categoryOrder.map((type) => (
        <a
          className="pb-2 text-sm text-cream/55 transition-colors hover:text-cream"
          href={`#${type}`}
          key={type}
        >
          {categoryDetails[type].kanji} {categoryDetails[type].label}{" "}
          <span className="font-mono text-xs text-cream/40">
            ({counts[type]})
          </span>
        </a>
      ))}
    </nav>
  );
}
