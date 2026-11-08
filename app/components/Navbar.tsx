"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="relative z-10 flex shrink-0 items-center justify-between py-5">
      <Link
        className="text-3xl font-medium tracking-[0.08em] text-cream transition-colors hover:text-amber"
        href="/"
      >
        蔵 <span className="text-base tracking-[0.2em]">Kura</span>
      </Link>

      <nav
        aria-label="Main navigation"
        className="flex items-center gap-5 text-sm sm:gap-8"
      >
        <Link
          className={`transition-colors hover:text-amber ${
            pathname === "/"
              ? "text-cream underline decoration-amber underline-offset-8"
              : "text-cream/80"
          }`}
          href="/"
        >
          Home
        </Link>
        <Link
          className={`transition-colors hover:text-cream ${
            pathname === "/vault"
              ? "text-cream underline decoration-amber underline-offset-8"
              : "text-cream/80"
          }`}
          href="/vault"
        >
          Vault
        </Link>
        <Link
          className="inline-flex items-center gap-2 border border-cream/60 px-3 py-2 text-sm text-cream transition-colors hover:border-amber hover:bg-amber hover:text-sumi sm:px-4"
          href="/add"
        >
          <span aria-hidden="true">+</span>
          <span>Save</span>
        </Link>
      </nav>
    </header>
  );
}
