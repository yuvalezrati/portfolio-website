"use client";

import Image from "next/image";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import type { Photo } from "@/lib/content";
import { getDictionary, type Locale } from "@/lib/i18n";

type Props = {
  photos: Photo[];
  lang: Locale;
  /** Milliseconds each frame stays on screen. */
  interval: number;
  /** Accessible description of the whole sequence (individual frames are decorative). */
  label: string;
};

const pad = (n: number) => String(n).padStart(2, "0");

const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";
const subscribeReducedMotion = (onChange: () => void) => {
  const query = window.matchMedia(REDUCED_MOTION);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
};

/**
 * Plays photos in place as a looping sequence with hard cuts, like a flipbook. All frames are
 * stacked in one frame so they're loaded ahead; only the current one is visible. Runs only
 * while on screen, starts paused for reduced motion, and can be paused (WCAG 2.2.2).
 * A photo's caption, if any, is shown beside it and changes with the frame.
 */
export default function RunningSequence({ photos, lang, interval, label }: Props) {
  const t = getDictionary(lang);
  const [index, setIndex] = useState(0);
  // The viewer's own choice; until they press Pause/Play, follow reduced motion (paused if set).
  const [userPaused, setUserPaused] = useState<boolean | null>(null);
  const reducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    () => window.matchMedia(REDUCED_MOTION).matches,
    () => false,
  );
  const paused = userPaused ?? reducedMotion;
  const [onScreen, setOnScreen] = useState(false);
  const frame = useRef<HTMLDivElement>(null);
  const count = photos.length;
  const hasCaptions = photos.some((p) => p.caption);
  const { width, height } = photos[0];

  useEffect(() => {
    const el = frame.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => setOnScreen(entry.isIntersecting));
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (paused || !onScreen || count < 2) return;
    const timer = window.setInterval(() => setIndex((i) => (i + 1) % count), interval);
    return () => window.clearInterval(timer);
  }, [paused, onScreen, count, interval]);

  const caption = photos[index].caption;

  return (
    <div
      className={`grid items-start gap-4 ${hasCaptions ? "lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] lg:gap-10" : ""}`}
    >
      <div>
        <div
          ref={frame}
          role="img"
          aria-label={label}
          className="relative w-full"
          style={{ aspectRatio: `${width} / ${height}` }}
        >
          {photos.map((photo, i) =>
            photo.src ? (
              <Image
                key={photo.src}
                src={photo.src}
                alt=""
                aria-hidden
                fill
                sizes={hasCaptions ? "(min-width: 1024px) 55vw, 100vw" : "(min-width: 1280px) 1200px, 100vw"}
                quality={90}
                unoptimized={photo.unoptimized}
                className={`object-contain ${i === index ? "" : "invisible"}`}
              />
            ) : null,
          )}
        </div>
        <div className="mt-3 flex items-baseline gap-5 font-mono text-xs uppercase tracking-wider">
          <p className="tabular-nums">
            <span className="text-mark">{pad(index + 1)}</span>
            <span className="text-ink/40"> / {pad(count)}</span>
          </p>
          <button
            type="button"
            onClick={() => setUserPaused(!paused)}
            aria-pressed={paused}
            className="text-ink/45 hover:text-ink"
          >
            {paused ? t.sequence.play : t.sequence.pause}
          </button>
        </div>
      </div>
      {hasCaptions && (
        // Found text (English, long unbroken runs): keep it left-to-right on the Hebrew site
        // and let the runs wrap anywhere.
        <p lang="en" dir="ltr" className="break-all font-mono text-xs leading-relaxed text-ink/60">
          {caption}
        </p>
      )}
    </div>
  );
}
