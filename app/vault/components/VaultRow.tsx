"use client";

import { useEffect, useState } from "react";
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
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [faviconFailed, setFaviconFailed] = useState(false);
  const category = categoryDetails[entry.type];
  const domain = formatDomain(entry.url);
  useEffect(() => {
    if (!confirmDelete) return;
    const timeout = window.setTimeout(() => setConfirmDelete(false), 3000);
    return () => window.clearTimeout(timeout);
  }, [confirmDelete]);

  return (
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
            title="Edit"
            type="button"
          >
            <FiEdit2 />
          </button>
          <button
            className={`p-1.5 text-xs transition-colors hover:text-peach ${
              confirmDelete ? "text-peach" : ""
            }`}
            onClick={() =>
              confirmDelete ? onDelete(entry.id) : setConfirmDelete(true)
            }
            title={confirmDelete ? "Confirm delete" : "Delete"}
            type="button"
          >
            {confirmDelete ? "Sure?" : <FiTrash2 />}
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
  );
}
