import Link from "next/link";
import { categoryDetails, type EntryType } from "../types";

type Props = {
  type: EntryType;
  count: number;
};

const categoryPaths: Record<EntryType, string> = {
  ui: "/vault/ui",
  tool: "/vault/tools",
  blog: "/vault/blogs",
  idea: "/vault/inspirations",
};

export default function GroupHeader({ type, count }: Props) {
  const category = categoryDetails[type];

  return (
    <Link
      className="group flex w-full items-center gap-3 bg-sumi px-4 py-4 text-left transition-all duration-300 ease-out hover:translate-x-1 hover:bg-[#38302A] focus-visible:bg-[#38302A] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-amber"
      href={categoryPaths[type]}
    >
      <span
        className={`text-xl font-medium transition-transform duration-300 group-hover:scale-110 ${category.color}`}
      >
        {category.kanji}
      </span>
      <span className="text-xl text-cream/65 transition-colors duration-300 group-hover:text-cream">
        {category.label}
      </span>
      <span className="font-mono text-sm text-cream/50 transition-colors duration-300 group-hover:text-amber">
        {count} links
      </span>
    </Link>
  );
}
