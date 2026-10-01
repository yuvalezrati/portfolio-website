import DevelopingImage from "@/components/DevelopingImage";
import type { GalleryVariant, Photo } from "@/lib/content";

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
const loosePhone = ["", "mt-12"];
const looseTablet = [
  "sm:col-start-1 sm:col-span-3 sm:mt-0",
  "sm:col-start-5 sm:col-span-2 sm:mt-16",
  "sm:col-start-2 sm:col-span-2 sm:mt-6",
  "sm:col-start-4 sm:col-span-3 sm:mt-12",
];
const looseDesktop = [
  "lg:col-start-1 lg:col-span-4 lg:mt-0",
  "lg:col-start-6 lg:col-span-3 lg:mt-24",
  "lg:col-start-10 lg:col-span-3 lg:mt-8",
  "lg:col-start-2 lg:col-span-3 lg:mt-14",
  "lg:col-start-6 lg:col-span-4 lg:mt-0",
  "lg:col-start-11 lg:col-span-2 lg:mt-28",
];

const layouts: Record<GalleryVariant, string> = {
  loose: "grid grid-cols-2 items-start gap-x-4 gap-y-8 sm:grid-cols-6 sm:gap-x-6 sm:gap-y-12 lg:grid-cols-12",
  dense: "columns-1 gap-2 sm:columns-2 lg:columns-3 [&>figure]:mb-2",
};

const sizes: Record<GalleryVariant, string> = {
  loose: "(min-width: 1024px) 34vw, 50vw",
  dense: "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw",
};

const placement = (variant: GalleryVariant, i: number) =>
  variant === "loose"
    ? `${loosePhone[i % loosePhone.length]} ${looseTablet[i % looseTablet.length]} ${looseDesktop[i % looseDesktop.length]}`
    : "break-inside-avoid";

export default function Gallery({ photos, variant = "loose", eager = false }: Props) {
  return (
    <div className={layouts[variant]}>
      {photos.map((photo, i) => (
        // Each photo opens like a shutter as it scrolls in, then develops (see globals.css).
        <figure key={photo.src ?? i} className={`shutter ${placement(variant, i)}`}>
          {photo.src ? (
            <DevelopingImage
              src={photo.src}
              alt={photo.alt}
              width={photo.width}
              height={photo.height}
              sizes={sizes[variant]}
              quality={90}
              {...(eager && i < 3 && { loading: "eager", fetchPriority: "high" })}
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
