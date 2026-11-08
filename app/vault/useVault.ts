"use client";

import { useEffect, useMemo, useState } from "react";
import { seedEntries, type EntryType, type VaultEntry } from "./types";

const STORAGE_KEY = "kura-links";
const NEW_ENTRY_KEY = "kura-new-entry-id";

export function useVault() {
  const [entries, setEntries] = useState<VaultEntry[] | null>(null);
  const [query, setQuery] = useState("");
  const [newEntryId, setNewEntryId] = useState<string | number | null>(null);

  useEffect(() => {
    const storedEntries = window.localStorage.getItem(STORAGE_KEY);
    const nextEntries = storedEntries
      ? (JSON.parse(storedEntries) as VaultEntry[])
      : seedEntries;
    setEntries(nextEntries);
    const storedNewEntryId = window.localStorage.getItem(NEW_ENTRY_KEY);
    if (storedNewEntryId) {
      setNewEntryId(storedNewEntryId);
      window.localStorage.removeItem(NEW_ENTRY_KEY);
    }
  }, []);

  useEffect(() => {
    if (entries) window.localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
  }, [entries]);

  const filteredEntries = useMemo(() => {
    if (!entries) return [];
    const normalizedQuery = query.trim().toLowerCase();
    return entries.filter((entry) => {
      const searchableText = `${entry.title} ${entry.note} ${entry.url}`;
      return (
        !normalizedQuery ||
        searchableText.toLowerCase().includes(normalizedQuery)
      );
    });
  }, [entries, query]);

  const toggleRead = (id: string | number) => {
    setEntries((current) =>
      current?.map((entry) =>
        entry.id === id && entry.type === "blog"
          ? { ...entry, read: !entry.read }
          : entry,
      ) ?? null,
    );
  };

  const deleteEntry = (id: string | number) => {
    setEntries((current) => current?.filter((entry) => entry.id !== id) ?? null);
  };

  const entriesByType = (type: EntryType) =>
    filteredEntries.filter((entry) => entry.type === type);

  return {
    entries,
    filteredEntries,
    entriesByType,
    query,
    setQuery,
    toggleRead,
    deleteEntry,
    newEntryId,
  };
}
