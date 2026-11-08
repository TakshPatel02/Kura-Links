"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import EmptyState from "../components/EmptyState";
import VaultRow from "../components/VaultRow";
import { categoryDetails, type EntryType } from "../types";
import { useVault } from "../useVault";

const routeTypes: Record<string, EntryType> = {
  ui: "ui",
  tools: "tool",
  blogs: "blog",
  inspirations: "idea",
};

export default function TypePage() {
  const { type: routeType } = useParams<{ type: string }>();
  const entryType = routeTypes[routeType];
  const { entries, newEntryId, toggleRead, deleteEntry } = useVault();

  if (!entryType) {
    return <EmptyState message="This storehouse does not exist." />;
  }

  if (!entries) {
    return (
      <main className="hide-scrollbar min-h-0 flex-1 overflow-y-auto bg-sumi">
        <div className="space-y-4 pb-12 pt-12">
          {Array.from({ length: 4 }, (_, index) => (
            <div className="h-52 animate-pulse bg-muted/10" key={index} />
          ))}
        </div>
      </main>
    );
  }

  const category = categoryDetails[entryType];
  const categoryEntries = entries.filter((entry) => entry.type === entryType);

  return (
    <main className="hide-scrollbar min-h-0 flex-1 overflow-y-auto bg-sumi">
      <div className="pb-12 pt-8 sm:pt-12">
        <Link
          className="text-sm text-cream/50 transition-colors hover:text-amber"
          href="/vault"
        >
          ← The Vault
        </Link>
        <div className="mt-8 flex items-end justify-between">
          <div className="flex items-center gap-4">
            <span className={`text-4xl ${category.color}`}>
              {category.kanji}
            </span>
            <div>
              <h1 className="font-heading text-4xl tracking-tight text-cream sm:text-5xl">
                {category.label}
              </h1>
            </div>
          </div>
          <span className="hidden font-mono text-xs text-cream/45 sm:block">
            {categoryEntries.length} links
          </span>
        </div>

        <div className="mt-10">
          {!categoryEntries.length ? (
            <EmptyState
              message={
                entryType === "ui"
                  ? "No inspiration saved yet. Go find something beautiful."
                  : entryType === "idea"
                    ? "No seeds planted yet."
                    : "Nothing stored here yet."
              }
            />
          ) : (
            <div className="grid gap-4 sm:grid-cols-2">
              {categoryEntries.map((entry) => (
                <VaultRow
                  entry={entry}
                  isNew={entry.id === newEntryId}
                  key={entry.id}
                  onDelete={deleteEntry}
                  onToggleRead={toggleRead}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
