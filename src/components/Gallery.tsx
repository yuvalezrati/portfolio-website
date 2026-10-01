import DevelopingImage from "@/components/DevelopingImage";
import type { GalleryVariant, Photo } from "@/lib/content";

type Props = {
  photos: Photo[];
  /**
   * "book": airy two-column photobook spreads.
   * "dense": tighter, more columns for high-energy sets.
   */
  variant?: GalleryVariant;
  /** Load the first images eagerly (use for the gallery at the top of a page). */
  eager?: boolean;
};

const layouts: Record<GalleryVariant, string> = {
  book: "columns-1 gap-8 sm:columns-2 lg:gap-12 [&>figure]:mb-8 lg:[&>figure]:mb-12",
  dense: "columns-1 gap-2 sm:columns-2 lg:columns-3 [&>figure]:mb-2",
};

const sizes: Record<GalleryVariant, string> = {
  book: "(min-width: 640px) 50vw, 100vw",
  dense: "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw",
};

export default function Gallery({ photos, variant = "book", eager = false }: Props) {
  return (
    <div className={layouts[variant]}>
      {photos.map((photo, i) => (
        // Each photo opens like a shutter as it scrolls in, then develops (see globals.css).
        <figure key={photo.src ?? i} className="shutter break-inside-avoid">
          {photo.src ? (
            <DevelopingImage
              src={photo.src}
              alt={photo.alt}
              width={photo.width}
              height={photo.height}
              sizes={sizes[variant]}
              quality={90}
              {...(eager && i < 2 && { loading: "eager", fetchPriority: "high" })}
              className="h-auto w-full"
            />
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
  );
}
