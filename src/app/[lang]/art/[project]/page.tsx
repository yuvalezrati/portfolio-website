import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Gallery from "@/components/Gallery";
import VideoList from "@/components/VideoList";
import { artProjects, getArtProject, projectText } from "@/lib/content";
import { getDictionary, isLocale, localePath } from "@/lib/i18n";

// The projects in content.ts are pre-rendered; any other slug hits notFound() below.
export function generateStaticParams() {
  return artProjects.map(({ slug }) => ({ project: slug }));
}

export async function generateMetadata({ params }: PageProps<"/[lang]/art/[project]">): Promise<Metadata> {
  const { lang, project } = await params;
  const data = getArtProject(project);
  return data && isLocale(lang) ? { title: projectText(data, lang).title } : {};
}

export default async function ArtProjectPage({ params }: PageProps<"/[lang]/art/[project]">) {
  const { lang, project } = await params;
  const data = getArtProject(project);
  if (!data || !isLocale(lang)) notFound();
  const t = getDictionary(lang);
  const { title, description, meta } = projectText(data, lang);

  return (
    <>
      <Link
        href={localePath(lang, "/art")}
        className="font-mono text-xs uppercase tracking-wider text-ink/45 hover:text-ink"
      >
        {t.back} {t.nav.art}
      </Link>
      <div className="mb-16 mt-6 max-w-xl">
        <div className="flex flex-wrap items-baseline gap-x-6 gap-y-1">
          <h1 className="font-display text-5xl tracking-tight sm:text-6xl">{title}</h1>
          {data.year && <p className="font-mono text-xs text-ink/50">{data.year}</p>}
        </div>
        {description?.split("\n\n").map((paragraph) => (
          <p key={paragraph} className="mt-6 leading-relaxed">
            {paragraph}
          </p>
        ))}
        {meta && <p className="mt-4 font-mono text-xs leading-relaxed text-ink/50">{meta}</p>}
      </div>

      {/* The photographs first, then any further sections (Installation, Book, Video) in turn. */}
      <div className="space-y-24 sm:space-y-32">
        {data.sections.map(({ title: section, layout, photos, videos }, i) => (
          <section key={section ?? i}>
            {section && (
              <h2 className="mb-8 font-mono text-xs uppercase tracking-wider text-mark">
                {t.project.sections[section] ?? section}
              </h2>
            )}
            {photos.length > 0 && <Gallery photos={photos} layout={layout} eager={i === 0} lang={lang} />}
            {videos && <VideoList videos={videos} />}
          </section>
        ))}
      </div>
    </>
  );
}
