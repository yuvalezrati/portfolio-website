"use client";

import Image from "next/image";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { flushSync } from "react-dom";
import type { Photo } from "@/lib/content";
import DevelopingImage from "./DevelopingImage";

type Props = {
  photos: Photo[];
};

const SWIPE_THRESHOLD = 40;
const pad = (n: number) => String(n).padStart(2, "0");

/**
 * Runs a state update inside a View Transition when the browser supports it, so the
 * element sharing a `view-transition-name` morphs between the two layouts. Falls back
 * to an instant update (and respects reduced motion).
 */
export function withViewTransition(update: () => void) {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!document.startViewTransition || reduced) {
    update();
    return;
  }
  document.startViewTransition(() => flushSync(update));
}

export default function Slideshow({ photos }: Props) {
  const [index, setIndex] = useState(0);
  const [showIndex, setShowIndex] = useState(false);
  const pointerStart = useRef<number | null>(null);
  const swiped = useRef(false);
  // Desktop: a little red tag follows the cursor over the photo ("Next → 04A").
  const cursorTag = useRef<HTMLSpanElement>(null);
  const [cursorSide, setCursorSide] = useState<"prev" | "next" | null>(null);
  // The current photo carries this name in both views, so it morphs between them.
  const morphName = `photo-${useId().replace(/[^a-zA-Z0-9]/g, "")}`;
  const count = photos.length;

  const go = useCallback((step: number) => setIndex((i) => (i + step + count) % count), [count]);
  const openIndex = useCallback(() => withViewTransition(() => setShowIndex(true)), []);
  const closeIndex = useCallback(() => withViewTransition(() => setShowIndex(false)), []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (showIndex) {
        if (e.key === "Escape") closeIndex();
        return;
      }
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go, showIndex, closeIndex]);

  // Only the current photo and its neighbours are mounted: they cross-fade, and the
  // neighbours preload so the next step is instant.
  const mounted = new Set([index, (index + 1) % count, (index - 1 + count) % count]);

  return (
    <div>
      {showIndex ? (
        <ol className="grid grid-cols-3 gap-x-4 gap-y-6 bg-[#161616] p-4 sm:grid-cols-4 sm:p-6 lg:grid-cols-6">
          {photos.map((photo, i) => (
            <li
              key={photo.src ?? i}
              className="animate-[thumb-in_0.5s_cubic-bezier(0.2,0.7,0.1,1)_both]"
              style={{ animationDelay: i === index ? "0ms" : `${80 + i * 25}ms` }}
            >
              <button
                type="button"
                onClick={() => {
                  // Name the chosen thumbnail first, then morph it into the slide.
                  flushSync(() => setIndex(i));
                  closeIndex();
                }}
                className="group block w-full"
              >
                <span className="flex aspect-square items-end">
                  {/* Sized to the photo itself (keeps the morph to/from the slide undistorted). */}
                  <span
                    className={`relative block ${photo.width >= photo.height ? "w-full" : "h-full"}`}
                    style={{ aspectRatio: `${photo.width} / ${photo.height}` }}
                  >
                    {photo.src ? (
                      <Image
                        src={photo.src}
                        alt={photo.alt}
                        fill
                        sizes="(min-width: 1024px) 16vw, (min-width: 640px) 25vw, 33vw"
                        className={`object-cover transition-opacity ${i === index ? "" : "opacity-55 group-hover:opacity-100"}`}
                        style={i === index ? { viewTransitionName: morphName } : undefined}
                      />
                    ) : (
                      <span className="absolute inset-0 bg-neutral-700" />
                    )}
                  </span>
                </span>
                <span
                  className={`mt-2 block font-mono text-[11px] text-mark ${i === index ? "" : "opacity-60"}`}
                >
                  ▸ {pad(i + 1)}A
                </span>
              </button>
            </li>
          ))}
        </ol>
      ) : (
        <div
          role="region"
          aria-roledescription="carousel"
          aria-label="Photographs"
          className="relative h-[min(calc(100svh-17rem),125vw)] min-h-72 touch-pan-y select-none sm:h-[calc(100svh-17rem)]"
          onPointerDown={(e) => {
            pointerStart.current = e.clientX;
            swiped.current = false;
          }}
          onPointerMove={(e) => {
            if (e.pointerType !== "mouse" || count < 2) return;
            const box = e.currentTarget.getBoundingClientRect();
            const x = e.clientX - box.left;
            const y = e.clientY - box.top;
            if (cursorTag.current) {
              cursorTag.current.style.transform = `translate(${x + 14}px, ${y + 14}px)`;
            }
            const side = x < box.width / 2 ? "prev" : "next";
            if (side !== cursorSide) setCursorSide(side);
          }}
          onPointerLeave={() => setCursorSide(null)}
          onPointerUp={(e) => {
            if (pointerStart.current === null) return;
            const dx = e.clientX - pointerStart.current;
            pointerStart.current = null;
            if (Math.abs(dx) > SWIPE_THRESHOLD) {
              swiped.current = true;
              go(dx < 0 ? 1 : -1);
            }
          }}
        >
          {photos.map((photo, i) =>
            mounted.has(i) ? (
              <div
                key={photo.src ?? i}
                aria-hidden={i !== index}
                className={`absolute inset-0 flex items-center justify-center transition-opacity duration-500 ease-out ${
                  i === index ? "opacity-100" : "opacity-0"
                }`}
              >
                {photo.src ? (
                  <DevelopingImage
                    src={photo.src}
                    alt={photo.alt}
                    width={photo.width}
                    height={photo.height}
                    sizes="(min-width: 640px) 85vw, 100vw"
                    quality={90}
                    loading="eager"
                    {...(i === 0 && { fetchPriority: "high" })}
                    draggable={false}
                    className="h-auto max-h-full w-auto max-w-full"
                    style={i === index ? { viewTransitionName: morphName } : undefined}
                  />
                ) : (
                  <div
                    role="img"
                    aria-label={photo.alt}
                    className="h-full max-w-full bg-neutral-200"
                    style={{ aspectRatio: `${photo.width} / ${photo.height}` }}
                  />
                )}
              </div>
            ) : null,
          )}
          {/* Click zones: left half goes back, right half goes forward. */}
          {count > 1 && (
            <>
              <button
                type="button"
                aria-label="Previous photograph"
                onClick={() => !swiped.current && go(-1)}
                className="absolute inset-y-0 left-0 w-1/2 cursor-w-resize focus-visible:outline-none [@media(pointer:fine)]:cursor-none"
              />
              <button
                type="button"
                aria-label="Next photograph"
                onClick={() => !swiped.current && go(1)}
                className="absolute inset-y-0 right-0 w-1/2 cursor-e-resize focus-visible:outline-none [@media(pointer:fine)]:cursor-none"
              />
              <span
                ref={cursorTag}
                aria-hidden
                className={`pointer-events-none absolute left-0 top-0 z-10 whitespace-nowrap bg-mark px-2 py-1 font-mono text-[11px] uppercase tracking-wider text-white transition-opacity duration-150 ${
                  cursorSide ? "opacity-100" : "opacity-0"
                }`}
              >
                {cursorSide === "prev"
                  ? `← Prev ${pad(((index - 1 + count) % count) + 1)}A`
                  : `Next → ${pad(((index + 1) % count) + 1)}A`}
              </span>
            </>
          )}
        </div>
      )}

      <div className="mt-6 flex items-baseline gap-6 font-mono text-xs uppercase tracking-wider">
        <p aria-live="polite" className="tabular-nums">
          <span
            key={index}
            className="inline-block animate-[roll_0.35s_cubic-bezier(0.2,0.7,0.1,1)_both] text-mark"
          >
            {pad(index + 1)}
          </span>
          <span className="text-ink/40"> / {pad(count)}</span>
        </p>
        <div className="ml-auto flex gap-6">
          {!showIndex && count > 1 && (
            <>
              <button type="button" onClick={() => go(-1)} className="text-ink/45 hover:text-ink">
                ← Prev
              </button>
              <button type="button" onClick={() => go(1)} className="text-ink/45 hover:text-ink">
                Next →
              </button>
            </>
          )}
          <button
            type="button"
            onClick={showIndex ? closeIndex : openIndex}
            aria-pressed={showIndex}
            className={showIndex ? "text-mark" : "text-ink/45 hover:text-ink"}
          >
            {showIndex ? "× Close" : "Contact sheet"}
          </button>
        </div>
      </div>
    </div>
  );
}
