"use client";

import { useCallback, useId, useState } from "react";
import { flushSync } from "react-dom";
import DevelopingImage from "@/components/DevelopingImage";
import Lightbox from "@/components/Lightbox";
import type { Photo } from "@/lib/content";
import { withViewTransition } from "@/lib/viewTransition";

type Props = {
  photos: Photo[];
  /** Load the first images eagerly (use for the gallery at the top of a page). */
  eager?: boolean;
};

export default function Gallery({ photos, eager = false }: Props) {
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

  return (
    <>
      {/* Simple masonry: even columns, photos at their natural heights. */}
      <div className="columns-2 gap-3 sm:columns-3 lg:columns-4 [&>figure]:mb-3">
        {photos.map((photo, i) => (
          // Each photo opens like a shutter as it scrolls in, then develops (see globals.css).
          <figure key={photo.src ?? i} id={`${morphName}-${i}`} className="shutter break-inside-avoid">
            {photo.src ? (
              <button
                type="button"
                onClick={() => openAt(i)}
                aria-label={`View full screen: ${photo.alt}`}
                className="block w-full cursor-zoom-in"
              >
                <DevelopingImage
                  src={photo.src}
                  alt={photo.alt}
                  width={photo.width}
                  height={photo.height}
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
                  quality={90}
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
            )}
          </figure>
        ))}
      </div>

      {open !== null && (
        <Lightbox photos={photos} index={open} onIndex={setOpen} onClose={close} morphName={morphName} />
      )}
    </>
  );
}
