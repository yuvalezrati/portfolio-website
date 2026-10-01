import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Gallery from "@/components/Gallery";
import { artProjects, getArtProject } from "@/lib/content";

// Only the projects listed in content.ts exist; anything else 404s.
export const dynamicParams = false;

export function generateStaticParams() {
  return artProjects.map(({ slug }) => ({ project: slug }));
}

export async function generateMetadata({ params }: PageProps<"/art/[project]">): Promise<Metadata> {
  const { project } = await params;
  return { title: getArtProject(project)?.title };
}

export default async function ArtProjectPage({ params }: PageProps<"/art/[project]">) {
  const { project } = await params;
  const data = getArtProject(project);
  if (!data) notFound();

  return (
    <>
      <Link href="/art" className="font-mono text-xs uppercase tracking-wider text-ink/45 hover:text-ink">
        ← Art
      </Link>
      <div className="mb-16 mt-6 max-w-xl">
        <div className="flex flex-wrap items-baseline gap-x-6 gap-y-1">
          <h1 className="font-display text-5xl tracking-tight sm:text-6xl">{data.title}</h1>
          {data.year && <p className="font-mono text-xs text-ink/50">{data.year}</p>}
        </div>
        {data.description && <p className="mt-6 leading-relaxed">{data.description}</p>}
        {data.meta && <p className="mt-4 font-mono text-xs leading-relaxed text-ink/50">{data.meta}</p>}
      </div>

      {/* The photographs first, then any further sections (Installation, Book) as their own grids. */}
      <div className="space-y-24 sm:space-y-32">
        {data.sections.map(({ title, photos }, i) => (
          <section key={title ?? i}>
            {title && (
              <h2 className="mb-8 font-mono text-xs uppercase tracking-wider text-mark">{title}</h2>
            )}
            <Gallery photos={photos} eager={i === 0} />
          </section>
        ))}
      </div>
    </>
  );
}
