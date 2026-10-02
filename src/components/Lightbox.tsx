"use client";

import { useEffect, useRef } from "react";
import DevelopingImage from "@/components/DevelopingImage";
import type { Photo } from "@/lib/content";
import { direction, getDictionary, type Locale } from "@/lib/i18n";

type Props = {
  photos: Photo[];
  index: number;
  onIndex: (index: number) => void;
  onClose: () => void;
  /** Shared view-transition name, so the photo morphs between grid and full screen. */
  morphName: string;
  lang: Locale;
};

const SWIPE_THRESHOLD = 40;
// A tall, narrow hit area just outside one edge of the photo.
const arrow =
  "absolute inset-y-0 flex w-12 items-center justify-center font-mono text-2xl text-ink/40 transition-colors hover:text-mark sm:w-20 sm:text-3xl";
const pad = (n: number) => String(n).padStart(2, "0");

export default function Lightbox({ photos, index, onIndex, onClose, morphName, lang }: Props) {
  const t = getDictionary(lang);
  // In Hebrew (right-to-left) "next" lies to the left: the ← key goes forward, and so does
  // swiping right, like turning the page of a Hebrew book.
  const rtl = direction(lang) === "rtl";
  const closeButton = useRef<HTMLButtonElement>(null);
  const pointerStart = useRef<number | null>(null);
  const count = photos.length;
  const photo = photos[index];
  const go = (step: number) => onIndex((index + step + count) % count);

  // Keyboard, focus and scroll lock while open.
  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    closeButton.current?.focus();
    const root = document.documentElement;
    const overflow = root.style.overflow;
    root.style.overflow = "hidden";
    return () => {
      root.style.overflow = overflow;
      previouslyFocused?.focus({ preventScroll: true });
    };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      const forward = rtl ? "ArrowLeft" : "ArrowRight";
      const backward = rtl ? "ArrowRight" : "ArrowLeft";
      if (e.key === forward) onIndex((index + 1) % count);
      if (e.key === backward) onIndex((index - 1 + count) % count);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, count, onIndex, onClose, rtl]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={t.lightbox.dialog}
      className="fixed inset-0 z-[60] flex flex-col bg-paper text-ink"
      onPointerDown={(e) => {
        pointerStart.current = e.clientX;
      }}
      onPointerUp={(e) => {
        if (pointerStart.current === null) return;
        const dx = e.clientX - pointerStart.current;
        pointerStart.current = null;
        if (Math.abs(dx) > SWIPE_THRESHOLD) go((dx < 0) !== rtl ? 1 : -1);
      }}
    >
      <div className="flex items-baseline gap-6 px-6 py-5 font-mono text-xs uppercase tracking-wider sm:px-10">
        <button ref={closeButton} type="button" onClick={onClose} className="hover:text-mark">
          × {t.lightbox.close}
        </button>
        <p aria-live="polite" className="tabular-nums">
          <span className="text-mark">{pad(index + 1)}</span>
          <span className="opacity-50"> / {pad(count)}</span>
        </p>
      </div>

      {/* The arrows sit just outside the photo's edges (swapping sides in Hebrew), so they stay
          next to it whatever its shape; the side padding leaves them room. Clicking the empty
          area closes; clicking the photo moves on. */}
      <div
        className="flex min-h-0 flex-1 items-center justify-center px-12 pb-6 sm:px-20 sm:pb-10"
        onClick={(e) => e.target === e.currentTarget && onClose()}
      >
        {photo.src && (
          <div className="relative">
            {count > 1 && (
              <button
                type="button"
                onClick={() => go(-1)}
                aria-label={t.lightbox.previous}
                className={`${arrow} end-full`}
              >
                {t.back}
              </button>
            )}
            <DevelopingImage
              key={photo.src}
              src={photo.src}
              alt={photo.alt}
              width={photo.width}
              height={photo.height}
              sizes="100vw"
              quality={90}
              unoptimized={photo.unoptimized}
              loading="eager"
              draggable={false}
              onClick={() => count > 1 && go(1)}
              className={`block h-auto max-h-[calc(100svh-6rem)] w-auto max-w-full select-none sm:max-h-[calc(100svh-7.5rem)] ${count > 1 ? (rtl ? "cursor-w-resize" : "cursor-e-resize") : ""}`}
              style={{ viewTransitionName: morphName }}
            />
            {count > 1 && (
              <button
                type="button"
                onClick={() => go(1)}
                aria-label={t.lightbox.next}
                className={`${arrow} start-full`}
              >
                {t.forward}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
