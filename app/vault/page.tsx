"use client";

import { useEffect, useRef } from "react";
import EmptyState from "./components/EmptyState";
import VaultList from "./components/VaultList";
import VaultToolbar from "./components/VaultToolbar";
import { useVault } from "./useVault";

export default function Vault() {
  const searchRef = useRef<HTMLInputElement>(null);
  const {
    entries,
    filteredEntries,
    query,
    setQuery,
  } = useVault();

  useEffect(() => {
    const handleSlash = (event: KeyboardEvent) => {
      if (
        event.key === "/" &&
        document.activeElement?.tagName !== "INPUT" &&
        document.activeElement?.tagName !== "TEXTAREA"
      ) {
        event.preventDefault();
        searchRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handleSlash);
    return () => window.removeEventListener("keydown", handleSlash);
  }, []);

  if (!entries) {
    return (
      <main className="hide-scrollbar min-h-0 flex-1 overflow-y-auto bg-sumi">
        <div className="mx-auto w-full pb-12 pt-8 sm:pt-12">
          <div className="mb-8 h-20 animate-pulse bg-muted/10" />
          <div className="space-y-1">
            {Array.from({ length: 5 }, (_, index) => (
              <div
                className="h-16 animate-pulse bg-muted/5"
                key={index}
              />
            ))}
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="hide-scrollbar min-h-0 flex-1 overflow-y-auto bg-sumi">
      <div className="mx-auto w-full pb-12 pt-8 sm:pt-12">
        <div className="flex items-end justify-between pb-7">
          <div>
            <h1 className="font-sans text-4xl tracking-tight text-cream sm:text-5xl">
              The Vault
            </h1>
            <p className="mt-3 text-base text-cream/65">Everything you've stored.</p>
          </div>
          <span className="hidden font-mono text-md text-cream/45 sm:block">
            {entries.length} items
          </span>
        </div>

        <div className="pt-8">
          {!entries.length ? (
            <EmptyState message="The kura is empty. Store your first link." />
          ) : !filteredEntries.length ? (
            <EmptyState message="Nothing found. Maybe you never saved it." />
          ) : (
            <VaultList entries={filteredEntries} />
          )}
        </div>
      </div>
    </main>
  );
}
