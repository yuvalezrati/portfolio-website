import Image from "next/image";
import DevelopingImage from "@/components/DevelopingImage";
import Link from "next/link";
import { artProjects, projectText } from "@/lib/content";
import { getDictionary, localePath, type Locale } from "@/lib/i18n";

const pad = (n: number) => String(n).padStart(2, "0");

export default function ProjectShowcase({ lang }: { lang: Locale }) {
  const t = getDictionary(lang);
  return (
    <ol className="space-y-32 sm:space-y-48">
      {artProjects.map((project, i) => {
        const { slug, year, sections } = project;
        const { title } = projectText(project, lang);
        const photos = sections.flatMap((s) => s.photos);
        const [cover, ...rest] = sections[0]?.photos ?? [];
        const strip = rest.slice(0, 4);

        return (
          <li key={slug}>
            <Link
              href={localePath(lang, `/art/${slug}`)}
              className="group grid items-end gap-6 sm:grid-cols-12 sm:gap-10"
            >
              <span className="relative block aspect-[5/4] overflow-hidden bg-ink/10 sm:col-span-7">
                {/* The photo is a touch taller than its frame, which sets each cover's framing;
                    it doesn't move with scrolling, only eases slightly closer on hover. */}
                <span className="absolute inset-x-0 -top-[8%] block h-[116%] transition-[scale] duration-[1200ms] ease-out group-hover:scale-[1.04] motion-reduce:transition-none">
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

              <span className="block sm:col-span-5">
                <span className="font-mono text-xs text-mark">{pad(i + 1)}</span>
                <span className="mt-2 block w-fit">
                  <span className="block font-display text-5xl leading-[0.95] tracking-tight sm:text-7xl">
                    {title}
                  </span>
                </span>
                <span className="mt-4 block font-mono text-xs uppercase tracking-wider text-ink/50">
                  {[year, t.project.frames(photos.length)].filter(Boolean).join(" · ")}
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
                  <span className="text-mark">
                    {t.forward}
                  </span>
                  {t.project.view}
                </span>
              </span>
            </Link>
          </li>
        );
      })}
    </ol>
  );
}
