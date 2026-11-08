import Link from "next/link";
import { BsArrowUpRight } from "react-icons/bs";

export default function Home() {
  return (
    <main className="relative min-h-0 flex-1 bg-sumi">
      <div className="fixed inset-0 z-0 bg-[url('/bg.webp')] bg-cover bg-center" />
      <div className="fixed inset-0 z-0 bg-sumi/20" />
      <div className="fixed inset-0 z-0 bg-linear-to-b from-sumi/35 via-transparent to-sumi/65" />

      <div className="relative z-10 flex h-full flex-col">
        <section
          aria-labelledby="page-title"
          className="flex min-h-0 flex-1 flex-col items-center justify-center py-8 text-center sm:py-12"
        >
          <h1
            id="page-title"
            className="max-w-4xl text-4xl font-medium leading-[0.98] tracking-tight text-cream drop-shadow-sm sm:text-5xl lg:text-7xl"
          >
            Everything worth
            <br />
            keeping, in one place.
          </h1>
          <p className="mt-6 max-w-lg text-base leading-7 text-cream/85 sm:mt-8 sm:text-lg">
            Ideas, blogs, tools and half-read tabs. Stored quietly, found
            instantly.
          </p>

          <div className="mt-8 flex flex-col items-center gap-4 sm:mt-10 sm:flex-row">
            <Link
              className="inline-flex items-center gap-3 bg-amber px-6 py-3 text-sm font-medium text-sumi transition-colors hover:bg-cream"
              href="/vault"
            >
              Open the vault
              <BsArrowUpRight />
            </Link>
            <Link
              className="inline-flex items-center gap-3 border border-cream/60 bg-sumi/10 px-6 py-3 text-sm font-medium text-cream transition-colors hover:border-cream hover:bg-cream hover:text-sumi"
              href="/add"
            >
              Save something
              <span aria-hidden="true">+</span>
            </Link>
          </div>
        </section>

        <p className="pb-6 text-center text-md italic tracking-wide text-cream/75 sm:pb-8">
          一期一会 <span className="mx-2 not-italic text-amber"></span>{" "}
          ichi-go ichi-e: treasure every encounter.
        </p>
      </div>
    </main>
  );
}
