export default function Footer() {
  return (
    <footer className="relative z-10 grid shrink-0 items-center gap-3 border-t border-cream/25 py-5 text-xs text-cream/75 sm:grid-cols-3">
      <span>蔵 Kura · built by Taksh</span>
      <span className="text-left italic sm:text-center">
        Keep what matters.
      </span>
      <a
        className="text-left underline underline-offset-4 transition-colors hover:text-amber sm:text-right"
        href="https://github.com"
        rel="noreferrer"
        target="_blank"
      >
        GitHub
      </a>
    </footer>
  );
}
