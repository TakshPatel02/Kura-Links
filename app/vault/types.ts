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

export const seedEntries: VaultEntry[] = [
  {
    id: "linear",
    type: "ui",
    title: "Linear — The system for product development",
    url: "https://linear.app",
    note: "A thoughtful reference for interfaces that stay out of the way.",
    read: false,
    createdAt: "2026-11-08T09:00:00.000Z",
  },
  {
    id: "mobbin",
    type: "ui",
    title: "Mobbin — Mobile design inspiration",
    url: "https://mobbin.com",
    note: "A deep library of real-world patterns and flows.",
    read: false,
    createdAt: "2026-11-06T09:00:00.000Z",
  },
  {
    id: "excalidraw",
    type: "tool",
    title: "Excalidraw",
    url: "https://excalidraw.com",
    note: "Quick, friendly diagrams for getting ideas out of your head.",
    read: false,
    createdAt: "2026-11-03T09:00:00.000Z",
  },
  {
    id: "design-system",
    type: "blog",
    title: "The shape of a design system",
    url: "https://bradfrost.com",
    note: "A useful way to think about the pieces behind a good system.",
    read: false,
    createdAt: "2026-10-29T09:00:00.000Z",
  },
  {
    id: "room-of-ones-own",
    type: "idea",
    title: "A room of one’s own",
    url: "https://www.are.na",
    note: "A small collection of images and ideas to return to.",
    read: false,
    createdAt: "2026-10-24T09:00:00.000Z",
  },
];
