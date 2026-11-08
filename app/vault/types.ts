export type EntryType = "ui" | "tool" | "blog" | "idea";

export type VaultEntry = {
  id: string | number;
  type: EntryType;
  title: string;
  url: string;
  note: string;
  read: boolean;
  createdAt: string;
};

export const categoryDetails: Record<
  EntryType,
  { kanji: string; label: string; color: string }
> = {
  ui: { kanji: "美", label: "UI", color: "text-peach" },
  tool: { kanji: "具", label: "Tools", color: "text-amber" },
  blog: { kanji: "記", label: "Blogs", color: "text-muted" },
  idea: { kanji: "種", label: "Inspirations", color: "text-[#A8B58A]" },
};

export const categoryOrder: EntryType[] = ["ui", "tool", "blog", "idea"];