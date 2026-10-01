"use client";

import { useCallback, useId, useState } from "react";
import { flushSync } from "react-dom";
import DevelopingImage from "@/components/DevelopingImage";
import Lightbox from "@/components/Lightbox";
import type { GalleryVariant, Photo } from "@/lib/content";
import { withViewTransition } from "@/lib/viewTransition";

type Props = {
  photos: Photo[];
  /**
   * "loose": small photos of varied widths at staggered heights, like prints laid on a table.
   * "dense": tight masonry with more columns, for high-energy sets.
   */
  variant?: GalleryVariant;
  /** Load the first images eagerly (use for the gallery at the top of a page). */
  eager?: boolean;
};

// "loose" places each photo on a grid with its own column, width and drop, cycling through
// a short irregular rhythm per breakpoint (2 columns on phones, 6 on tablets, 12 on desktop).
// Photos still read in order, left to right, row by row.
const loosePhone = ["", "mt-6"];
const looseTablet = [
  "sm:col-start-1 sm:col-span-3 sm:mt-0",
  "sm:col-start-4 sm:col-span-3 sm:mt-8",
  "sm:col-start-1 sm:col-span-2 sm:mt-3",
  "sm:col-start-3 sm:col-span-4 sm:mt-0",
];
const looseDesktop = [
  "lg:col-start-1 lg:col-span-4 lg:mt-0",
  "lg:col-start-5 lg:col-span-3 lg:mt-8",
  "lg:col-start-9 lg:col-span-4 lg:mt-3",
  "lg:col-start-1 lg:col-span-3 lg:mt-5",
  "lg:col-start-4 lg:col-span-5 lg:mt-0",
  "lg:col-start-9 lg:col-span-3 lg:mt-10",
];

const layouts: Record<GalleryVariant, string> = {
  loose: "grid grid-cols-2 items-start gap-x-3 gap-y-4 sm:grid-cols-6 sm:gap-x-4 sm:gap-y-6 lg:grid-cols-12",
  dense: "columns-1 gap-2 sm:columns-2 lg:columns-3 [&>figure]:mb-2",
};

const sizes: Record<GalleryVariant, string> = {
  loose: "(min-width: 1024px) 42vw, 50vw",
  dense: "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw",
};

const placement = (variant: GalleryVariant, i: number) =>
  variant === "loose"
    ? `${loosePhone[i % loosePhone.length]} ${looseTablet[i % looseTablet.length]} ${looseDesktop[i % looseDesktop.length]}`
    : "break-inside-avoid";

export default function Gallery({ photos, variant = "loose", eager = false }: Props) {
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
      <div className={layouts[variant]}>
        {photos.map((photo, i) => (
          // Each photo opens like a shutter as it scrolls in, then develops (see globals.css).
          <figure key={photo.src ?? i} id={`${morphName}-${i}`} className={`shutter ${placement(variant, i)}`}>
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
                  sizes={sizes[variant]}
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
