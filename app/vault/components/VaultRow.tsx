"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FiCheck, FiClock, FiEdit2, FiTrash2 } from "react-icons/fi";
import { categoryDetails, type VaultEntry } from "../types";

type Props = {
  entry: VaultEntry;
  isNew: boolean;
  onToggleRead: (id: string | number) => void;
  onDelete: (id: string | number) => void;
};

const formatDomain = (url: string) => {
  try {
    return new URL(url).hostname.replace("www.", "");
  } catch {
    return "";
  }
};

export default function VaultRow({
  entry,
  isNew,
  onToggleRead,
  onDelete,
}: Props) {
  const router = useRouter();
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [faviconFailed, setFaviconFailed] = useState(false);
  const category = categoryDetails[entry.type];
  const domain = formatDomain(entry.url);

  return (
    <>
      <article
        className={`group relative flex min-h-52 flex-col justify-between gap-6 bg-[#38302A]/60 p-5 transition-colors hover:bg-[#38302A] ${
          isNew ? "bg-amber/15" : ""
        }`}
      >
        <div className="flex items-start justify-between gap-4">
          <span className={`text-3xl ${category.color}`}>{category.kanji}</span>
          <div className="flex items-center justify-end gap-1 text-cream/45">
            {entry.type === "blog" && (
              <button
                aria-label={entry.read ? "Mark unread" : "Mark read"}
                className="p-1.5 transition-colors hover:text-amber"
                onClick={() => onToggleRead(entry.id)}
                title={entry.read ? "Mark unread" : "Mark read"}
                type="button"
              >
                {entry.read ? <FiCheck /> : <FiClock />}
              </button>
            )}
            <button
              className="p-1.5 transition-colors hover:text-cream"
              onClick={() =>
                router.push(`/add?edit=${encodeURIComponent(String(entry.id))}`)
              }
              title="Edit"
              type="button"
            >
              <FiEdit2 />
            </button>
            <button
              aria-label={`Delete ${entry.title}`}
              className="p-1.5 text-cream/55 transition-colors hover:text-peach"
              onClick={() => setConfirmDelete(true)}
              title="Delete"
              type="button"
            >
              <FiTrash2 className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div
          className={`min-w-0 ${
            entry.type === "blog" && entry.read ? "opacity-50" : ""
          }`}
        >
          <div className="flex min-w-0 items-center gap-2">
            {entry.type === "blog" && !entry.read && (
              <span className="h-1.5 w-1.5 shrink-0 bg-amber" />
            )}
            {entry.url ? (
              <a
                className="truncate text-lg text-cream transition-colors hover:text-amber"
                href={entry.url}
                rel="noreferrer"
                target="_blank"
              >
                {entry.title}
              </a>
            ) : (
              <span className="truncate text-lg text-cream">{entry.title}</span>
            )}
          </div>
          <div className="mt-1 flex items-center gap-2">
            {!faviconFailed && domain && (
              <img
                alt=""
                className="h-4 w-4"
                onError={() => setFaviconFailed(true)}
                src={`https://www.google.com/s2/favicons?domain=${domain}&sz=32`}
              />
            )}
            <span className="truncate font-mono text-xs text-cream/55">
              {domain || "seed"}
            </span>
          </div>
        </div>
        <div className="flex items-center justify-between gap-3">
          <p className="line-clamp-2 text-base leading-7 text-cream/65">
            {entry.note}
          </p>
          <time className="shrink-0 font-mono text-xs text-cream/55">
            {new Date(entry.createdAt).toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "short",
            })}
          </time>
        </div>
      </article>

      {confirmDelete && (
        <div
          aria-labelledby={`delete-title-${entry.id}`}
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/55 px-5 backdrop-blur-[2px]"
          role="dialog"
        >
          <div className="w-full max-w-md bg-[#191614] p-6 shadow-2xl">
            <h2
              className="text-xl font-medium text-cream"
              id={`delete-title-${entry.id}`}
            >
              Delete this link?
            </h2>
            <p className="mt-3 text-sm leading-6 text-cream/55">
              &ldquo;{entry.title}&rdquo; will be removed from your kura. This
              can&apos;t be undone.
            </p>
            <div className="mt-7 flex items-center justify-end gap-3">
              <button
                className="px-4 py-2.5 text-sm text-cream/65 transition-colors hover:text-cream"
                onClick={() => setConfirmDelete(false)}
                type="button"
              >
                Cancel
              </button>
              <button
                className="inline-flex items-center gap-2 bg-[#B93B32] px-4 py-2.5 text-sm font-medium text-cream transition-colors hover:bg-[#D14A3F]"
                onClick={() => onDelete(entry.id)}
                type="button"
              >
                <FiTrash2 aria-hidden="true" />
                Delete link
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
