import Image from "next/image";
import DevelopingImage from "@/components/DevelopingImage";
import Link from "next/link";
import { artProjects } from "@/lib/content";

const pad = (n: number) => String(n).padStart(2, "0");

export default function ProjectShowcase() {
  return (
    <ol className="showcase space-y-32 sm:space-y-48">
      {artProjects.map(({ slug, title, year, sections }, i) => {
        const photos = sections.flatMap((s) => s.photos);
        const [cover, ...rest] = sections[0]?.photos ?? [];
        const strip = rest.slice(0, 4);
        const flipped = i % 2 === 1;

        return (
          <li key={slug}>
            <Link
              href={`/art/${slug}`}
              className="group grid items-end gap-6 sm:grid-cols-12 sm:gap-10"
            >
              <span
                className={`shutter relative block aspect-[5/4] overflow-hidden bg-ink/10 sm:col-span-7 ${
                  flipped ? "sm:order-2 sm:col-start-6" : ""
                }`}
              >
                {/* Taller than the frame so the photo can drift inside it (parallax);
                    on hover it eases slightly closer. */}
                <span className="parallax absolute inset-x-0 -top-[8%] block h-[116%] transition-[scale] duration-[1200ms] ease-out group-hover:scale-[1.04] motion-reduce:transition-none">
                  {cover?.src && (
                    <DevelopingImage
                      src={cover.src}
                      alt=""
                      fill
                      sizes="(min-width: 640px) 58vw, 100vw"
                      {...(i === 0 && { loading: "eager", fetchPriority: "high" })}
                      className="object-cover"
                    />
                  )}
                </span>
              </span>

              <span className={`block sm:col-span-5 ${flipped ? "sm:order-1 sm:row-start-1" : ""}`}>
                <span className="font-mono text-xs text-mark">{pad(i + 1)}</span>
                <span className="drift mt-2 block w-fit">
                  <span className="block font-serif text-5xl italic leading-[0.95] tracking-tight transition-[translate] duration-500 ease-out group-hover:translate-x-2 motion-reduce:transition-none sm:text-7xl">
                    {title}
                  </span>
                </span>
                <span className="mt-4 block font-mono text-xs uppercase tracking-wider text-ink/50">
                  {[year, `${photos.length} frames`].filter(Boolean).join(" · ")}
                </span>

                {strip.length > 0 && (
                  <span className="mt-6 flex h-14 gap-1 sm:h-16">
                    {strip.map((photo) =>
                      photo.src ? (
                        <Image
                          key={photo.src}
                          src={photo.src}
                          alt=""
                          width={photo.width}
                          height={photo.height}
                          sizes="96px"
                          className="h-full w-auto"
                        />
                      ) : null,
                    )}
                  </span>
                )}

                <span className="mt-6 inline-flex items-baseline gap-2 font-mono text-xs uppercase tracking-wider">
                  <span className="text-mark transition-[translate] duration-500 ease-out group-hover:translate-x-1">→</span>
                  View project
                </span>
              </span>
            </Link>
          </li>
        );
      })}
    </ol>
  );
}
