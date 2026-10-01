import Image from "next/image";
import Link from "next/link";
import Scribble from "@/components/Scribble";
import { artProjects } from "@/lib/content";

const pad = (n: number) => String(n).padStart(2, "0");

export default function ProjectShowcase() {
  return (
    <ol className="space-y-24 sm:space-y-32">
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
                className={`relative block aspect-[5/4] bg-neutral-200 sm:col-span-7 ${
                  flipped ? "sm:order-2 sm:col-start-6" : ""
                }`}
              >
                {cover?.src && (
                  <Image
                    src={cover.src}
                    alt=""
                    fill
                    sizes="(min-width: 640px) 58vw, 100vw"
                    {...(i === 0 && { loading: "eager", fetchPriority: "high" })}
                    className="object-cover"
                  />
                )}
              </span>

              <span className={`block sm:col-span-5 ${flipped ? "sm:order-1 sm:row-start-1" : ""}`}>
                <span className="font-mono text-xs text-mark">{pad(i + 1)}</span>
                <span className="relative mt-2 block w-fit">
                  <span className="block font-serif text-5xl italic leading-[0.95] tracking-tight sm:text-7xl">
                    {title}
                  </span>
                  {/* Remounts on hover (display toggles), so the circle is drawn fresh each time. */}
                  <span className="hidden group-hover:block">
                    <Scribble shape="circle" className="-inset-x-5 -inset-y-4" />
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
                  <span className="text-mark transition-transform group-hover:translate-x-1">→</span>
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
