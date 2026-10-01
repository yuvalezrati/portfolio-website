"use client";

import { useEffect, useRef } from "react";
import DevelopingImage from "@/components/DevelopingImage";
import type { Photo } from "@/lib/content";

type Props = {
  photos: Photo[];
  index: number;
  onIndex: (index: number) => void;
  onClose: () => void;
  /** Shared view-transition name, so the photo morphs between grid and full screen. */
  morphName: string;
};

const SWIPE_THRESHOLD = 40;
const pad = (n: number) => String(n).padStart(2, "0");

export default function Lightbox({ photos, index, onIndex, onClose, morphName }: Props) {
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
      if (e.key === "ArrowRight") onIndex((index + 1) % count);
      if (e.key === "ArrowLeft") onIndex((index - 1 + count) % count);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, count, onIndex, onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Photograph, full screen"
      className="fixed inset-0 z-[60] flex flex-col bg-[#111] text-[#ebe7de]"
      onPointerDown={(e) => {
        pointerStart.current = e.clientX;
      }}
      onPointerUp={(e) => {
        if (pointerStart.current === null) return;
        const dx = e.clientX - pointerStart.current;
        pointerStart.current = null;
        if (Math.abs(dx) > SWIPE_THRESHOLD) go(dx < 0 ? 1 : -1);
      }}
    >
      <div className="flex items-baseline gap-6 px-6 py-5 font-mono text-xs uppercase tracking-wider sm:px-10">
        <button ref={closeButton} type="button" onClick={onClose} className="hover:text-mark">
          × Close
        </button>
        <p aria-live="polite" className="tabular-nums">
          <span className="text-mark">{pad(index + 1)}</span>
          <span className="opacity-50"> / {pad(count)}</span>
        </p>
        {count > 1 && (
          <div className="ml-auto flex gap-5">
            <button type="button" onClick={() => go(-1)} aria-label="Previous" className="opacity-60 hover:opacity-100">
              ←
            </button>
            <button type="button" onClick={() => go(1)} aria-label="Next" className="opacity-60 hover:opacity-100">
              →
            </button>
          </div>
        )}
      </div>

      {/* Clicking the dark area closes; clicking the photo moves on. */}
      <div
        className="flex min-h-0 flex-1 items-center justify-center px-4 pb-6 sm:px-10 sm:pb-10"
        onClick={(e) => e.target === e.currentTarget && onClose()}
      >
        {photo.src && (
          <DevelopingImage
            key={photo.src}
            src={photo.src}
            alt={photo.alt}
            width={photo.width}
            height={photo.height}
            sizes="100vw"
            quality={90}
            loading="eager"
            draggable={false}
            onClick={() => count > 1 && go(1)}
            className={`h-auto max-h-full w-auto max-w-full select-none ${count > 1 ? "cursor-e-resize" : ""}`}
            style={{ viewTransitionName: morphName }}
          />
        )}
      </div>
    </div>
  );
}
