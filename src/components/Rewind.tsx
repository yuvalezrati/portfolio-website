"use client";

export default function Rewind() {
  return (
    <button
      type="button"
      onClick={() => {
        const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
      }}
      className="group inline-flex items-baseline gap-2 uppercase hover:text-ink"
    >
      Rewind
      <span className="text-mark transition-transform group-hover:-translate-y-0.5">↑</span>
    </button>
  );
}
