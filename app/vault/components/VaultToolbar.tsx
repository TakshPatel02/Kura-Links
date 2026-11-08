"use client";

import { FiSearch } from "react-icons/fi";
import type { RefObject } from "react";

type Props = {
  query: string;
  setQuery: (value: string) => void;
  searchRef: RefObject<HTMLInputElement | null>;
};

export default function VaultToolbar({
  query,
  setQuery,
  searchRef,
}: Props) {
  return (
    <div className="sticky top-0 z-20 bg-sumi/95 py-4 backdrop-blur-sm">
      <div className="relative">
        <FiSearch className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-cream/40" />
        <input
          autoComplete="off"
          className="h-10 w-full bg-muted/10 pl-10 pr-10 text-sm text-cream outline-none transition-colors placeholder:text-cream/40 focus:bg-muted/20"
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search your kura..."
          ref={searchRef}
          type="search"
          value={query}
        />
        <kbd className="absolute right-3 top-1/2 -translate-y-1/2 px-1.5 py-0.5 font-mono text-[10px] text-cream/45">
          /
        </kbd>
      </div>
    </div>
  );
}
