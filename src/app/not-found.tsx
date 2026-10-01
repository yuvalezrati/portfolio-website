import Link from "next/link";

export default function NotFound() {
  return (
    <div className="max-w-2xl pt-8">
      <p className="font-mono text-xs uppercase tracking-wider text-mark">Frame 404</p>
      {/* Blown-out type: the frame didn't come out. */}
      <h1 className="mt-4 font-display text-7xl tracking-tight text-ink/15 blur-[1px] sm:text-9xl">
        Overexposed.
      </h1>
      <p className="mt-6 font-display text-2xl font-normal">This frame didn&apos;t come out.</p>
      <Link
        href="/"
        className="group mt-10 inline-flex items-baseline gap-3 font-mono text-xs uppercase tracking-wider"
      >
        <span className="text-mark transition-transform group-hover:-translate-x-1">←</span>
        Back to the contact sheet
      </Link>
    </div>
  );
}
