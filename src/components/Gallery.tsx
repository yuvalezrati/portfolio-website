"use client";

import { useCallback, useId, useState } from "react";
import { flushSync } from "react-dom";
import DevelopingImage from "@/components/DevelopingImage";
import Lightbox from "@/components/Lightbox";
import type { Photo } from "@/lib/content";
import { getDictionary, type Locale } from "@/lib/i18n";
import { withViewTransition } from "@/lib/viewTransition";

type Props = {
  photos: Photo[];
  lang: Locale;
  /** "grid": masonry columns. "sequence": one photo per row with its caption beside it. */
  layout?: "grid" | "sequence";
  /** Load the first images eagerly (use for the gallery at the top of a page). */
  eager?: boolean;
};

export default function Gallery({ photos, lang, layout = "grid", eager = false }: Props) {
  const t = getDictionary(lang);
  const [open, setOpen] = useState<number | null>(null);
  // The photo that morphs to/from full screen. Only one element may carry the name at a
  // time: the grid photo while closed, the full-screen photo while open.
  const [morphing, setMorphing] = useState<number | null>(null);
  const morphName = `photo-${useId().replace(/[^a-zA-Z0-9]/g, "")}`;

  const openAt = (i: number) => {
    flushSync(() => setMorphing(i));
    withViewTransition(() => setOpen(i));
  };

  const close = useCallback(() => {
    if (open === null) return;
    const current = open;
    // Bring the photo we ended on into view behind the overlay, so it shrinks back into place.
    document.getElementById(`${morphName}-${current}`)?.scrollIntoView({ block: "center" });
    withViewTransition(() => {
      setMorphing(current);
      setOpen(null);
    });
  }, [open, morphName]);

  const image = (photo: Photo, i: number, sizes: string) =>
    photo.src ? (
      <button
        type="button"
        onClick={() => openAt(i)}
        aria-label={`${t.lightbox.open} ${photo.alt}`}
        className="block w-full cursor-zoom-in"
      >
        <DevelopingImage
          src={photo.src}
          alt={photo.alt}
          width={photo.width}
          height={photo.height}
          sizes={sizes}
          quality={90}
          unoptimized={photo.unoptimized}
          {...(eager && i < 3 && { loading: "eager", fetchPriority: "high" })}
          className="h-auto w-full"
          style={open === null && morphing === i ? { viewTransitionName: morphName } : undefined}
        />
      </button>
    ) : (
      <div
        role="img"
        aria-label={photo.alt}
        className="w-full bg-neutral-200"
        style={{ aspectRatio: `${photo.width} / ${photo.height}` }}
      />
    );

  return (
    <>
      {/* Each photo opens like a shutter as it scrolls in, then develops (see globals.css). */}
      {layout === "sequence" ? (
        <ol className="space-y-12 sm:space-y-16">
          {photos.map((photo, i) => (
            <li key={photo.src ?? i}>
              <figure
                id={`${morphName}-${i}`}
                className="grid items-start gap-4 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] lg:gap-10"
              >
                <div className="shutter">{image(photo, i, "(min-width: 1024px) 55vw, 100vw")}</div>
                {photo.caption && (
                  // Captions here are found text (English, unbroken runs of letters): keep them
                  // left-to-right on the Hebrew site and let long runs wrap anywhere.
                  <figcaption
                    lang="en"
                    dir="ltr"
                    className="break-all font-mono text-xs leading-relaxed text-ink/60"
                  >
                    {photo.caption}
                  </figcaption>
                )}
              </figure>
            </li>
          ))}
        </ol>
      ) : (
        // Simple masonry: even columns, photos at their natural heights.
        <div className="columns-2 gap-3 sm:columns-3 lg:columns-4 [&>figure]:mb-3">
          {photos.map((photo, i) => (
            <figure key={photo.src ?? i} id={`${morphName}-${i}`} className="shutter break-inside-avoid">
              {image(photo, i, "(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw")}
            </figure>
          ))}
        </div>
      )}

      {open !== null && (
        <Lightbox photos={photos} index={open} onIndex={setOpen} onClose={close} morphName={morphName} lang={lang} />
      )}
    </>
  );
}
