import Link from "next/link";

export default function EmptyState({ message }: { message: string }) {
  return (
    <div className="px-6 py-16 text-center">
      <p className="text-sm text-cream/60">{message}</p>
      <Link
        className="mt-5 inline-flex bg-amber px-5 py-2.5 text-sm font-medium text-sumi transition-colors hover:bg-cream"
        href="/add"
      >
        Store something
      </Link>
    </div>
  );
}
