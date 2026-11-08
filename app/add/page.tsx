"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import type { FormEvent } from "react";
import { FiArrowLeft, FiCheck, FiLink } from "react-icons/fi";
import { useRouter } from "next/navigation";
import type { EntryType, VaultEntry } from "../vault/types";

const STORAGE_KEY = "kura-links";
const NEW_ENTRY_KEY = "kura-new-entry-id";

const typeOptions: Array<{
  value: EntryType;
  label: string;
  note: string;
  requiresUrl: boolean;
}> = [
  {
    value: "ui",
    label: "UI",
    note: "What should you learn from this?",
    requiresUrl: true,
  },
  {
    value: "tool",
    label: "Tools",
    note: "What does it do for you?",
    requiresUrl: true,
  },
  {
    value: "blog",
    label: "Blogs",
    note: "Why read this?",
    requiresUrl: true,
  },
  {
    value: "idea",
    label: "Inspirations",
    note: "Describe the idea...",
    requiresUrl: false,
  },
];

function titleFromUrl(value: string) {
  try {
    return new URL(value).hostname.replace(/^www\./, "");
  } catch {
    return "";
  }
}

function isValidUrl(value: string) {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

export default function Add() {
  const router = useRouter();
  const [type, setType] = useState<EntryType>("ui");
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [note, setNote] = useState("");
  const [error, setError] = useState("");
  const [editId, setEditId] = useState<string | null>(null);
  const [isLoadingEdit, setIsLoadingEdit] = useState(false);

  const selectedType = useMemo(
    () => typeOptions.find((option) => option.value === type) ?? typeOptions[0],
    [type],
  );

  useEffect(() => {
    const id = new URLSearchParams(window.location.search).get("edit");
    if (!id) return;

    setIsLoadingEdit(true);
    const storedEntries = window.localStorage.getItem(STORAGE_KEY);
    if (!storedEntries) {
      setError("This link could not be found.");
      setIsLoadingEdit(false);
      return;
    }

    try {
      const entry = (JSON.parse(storedEntries) as VaultEntry[]).find(
        (savedEntry) => String(savedEntry.id) === id,
      );
      if (!entry) {
        setError("This link could not be found.");
        return;
      }

      setEditId(id);
      setType(entry.type);
      setTitle(entry.title);
      setUrl(entry.url);
      setNote(entry.note);
    } catch {
      setError("Your saved links could not be read. Please try again.");
    } finally {
      setIsLoadingEdit(false);
    }
  }, []);

  const handleUrlChange = (value: string) => {
    setUrl(value);
    if (!title.trim() && isValidUrl(value)) {
      setTitle(titleFromUrl(value));
    }
    if (error) setError("");
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const cleanTitle = title.trim();
    const cleanUrl = url.trim();

    if (!cleanTitle) {
      setError("Give this find a title first.");
      return;
    }

    if (selectedType.requiresUrl && !cleanUrl) {
      setError("A URL is required for this type.");
      return;
    }

    if (cleanUrl && !isValidUrl(cleanUrl)) {
      setError("Enter a valid URL beginning with http:// or https://.");
      return;
    }

    const entry: VaultEntry = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      type,
      title: cleanTitle,
      url: cleanUrl,
      note: note.trim(),
      read: false,
      createdAt: new Date().toISOString(),
    };

    const storedEntries = window.localStorage.getItem(STORAGE_KEY);
    let existingEntries: VaultEntry[] = [];

    if (storedEntries) {
      try {
        existingEntries = JSON.parse(storedEntries) as VaultEntry[];
      } catch {
        setError("Your saved links could not be read. Please try again.");
        return;
      }
    }

    if (editId) {
      const existingEntry = existingEntries.find(
        (savedEntry) => String(savedEntry.id) === editId,
      );
      if (!existingEntry) {
        setError("This link could not be found.");
        return;
      }

      const updatedEntry: VaultEntry = {
        ...entry,
        id: existingEntry.id,
        createdAt: existingEntry.createdAt,
        read: type === "blog" ? existingEntry.read : false,
      };
      window.localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(
          existingEntries.map((savedEntry) =>
            String(savedEntry.id) === editId ? updatedEntry : savedEntry,
          ),
        ),
      );
      router.push("/vault");
      return;
    }

    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify([entry, ...existingEntries]),
    );
    window.localStorage.setItem(NEW_ENTRY_KEY, String(entry.id));
    router.push("/vault");
  };

  return (
    <main className="hide-scrollbar min-h-0 flex-1 overflow-y-auto bg-sumi">
      <div className="mx-auto w-full max-w-3xl">
        <header className="mt-10">
          <h1 className="font-heading text-4xl tracking-tight text-cream sm:text-5xl">
            {editId ? "Edit something" : "Store something"}
          </h1>
          <p className="mt-3 text-base text-cream/65">
            Link, blog, tool or a raw idea.
          </p>
        </header>

        <form className="mt-12 space-y-8" onSubmit={handleSubmit}>
          <fieldset>
            <legend className="mb-3 text-sm text-cream/65">Type</legend>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              {typeOptions.map((option) => (
                <button
                  className={`px-3 py-3 text-sm transition-colors ${
                    type === option.value
                      ? "bg-amber font-medium text-sumi"
                      : "bg-[#38302A] text-cream/65 hover:bg-[#443A32] hover:text-cream"
                  }`}
                  key={option.value}
                  onClick={() => {
                    setType(option.value);
                    setError("");
                  }}
                  type="button"
                >
                  {option.label}
                </button>
              ))}
            </div>
          </fieldset>

          <label className="block">
            <span className="mb-3 block text-sm text-cream/65">
              Title <span className="text-amber">*</span>
            </span>
            <input
              className="h-12 w-full bg-[#38302A] px-4 text-base text-cream outline-none transition-colors placeholder:text-cream/35 focus:bg-[#443A32]"
              onChange={(event) => {
                setTitle(event.target.value);
                if (error) setError("");
              }}
              placeholder="What are you saving?"
              required
              type="text"
              value={title}
            />
          </label>

          <label className="block">
            <span className="mb-3 flex items-center justify-between text-sm text-cream/65">
              <span>
                URL{" "}
                {selectedType.requiresUrl ? (
                  <span className="text-amber">*</span>
                ) : (
                  <span className="text-cream/40">(optional)</span>
                )}
              </span>
              <FiLink aria-hidden="true" className="text-cream/40" />
            </span>
            <input
              className="h-12 w-full bg-[#38302A] px-4 font-mono text-sm text-cream outline-none transition-colors placeholder:text-cream/35 focus:bg-[#443A32]"
              onChange={(event) => handleUrlChange(event.target.value)}
              placeholder="https://..."
              required={selectedType.requiresUrl}
              type="url"
              value={url}
            />
          </label>

          <label className="block">
            <span className="mb-3 block text-sm text-cream/65">Note</span>
            <input
              className="h-12 w-full bg-[#38302A] px-4 text-base text-cream outline-none transition-colors placeholder:text-cream/35 focus:bg-[#443A32]"
              onChange={(event) => setNote(event.target.value)}
              placeholder={selectedType.note}
              type="text"
              value={note}
            />
          </label>

          {error && (
            <p className="text-sm text-peach" role="alert">
              {error}
            </p>
          )}

          <div className="flex items-center justify-end gap-4 pt-2">
            <Link
              className="px-5 py-3 text-sm text-cream/60 transition-colors hover:text-cream"
              href="/vault"
            >
              Cancel
            </Link>
            <button
              className="inline-flex items-center gap-2 bg-amber px-6 py-3 text-sm font-medium text-sumi transition-colors hover:bg-cream disabled:cursor-not-allowed disabled:opacity-50"
              disabled={isLoadingEdit}
              type="submit"
            >
              <FiCheck aria-hidden="true" />
              {editId ? "Update it" : "Store it"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
