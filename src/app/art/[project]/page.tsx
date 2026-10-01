import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ProjectSlideshows from "@/components/ProjectSlideshows";
import { PageTone } from "@/components/Tone";
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

  const sections = data.sections.map(({ title, photos }) => ({
    title: title ?? "Photographs",
    photos,
  }));

  return (
    <>
      <PageTone tone={data.tone} />
      <div className="mb-6 flex flex-wrap items-baseline gap-x-6 gap-y-1">
        <Link href="/art" className="font-mono text-xs uppercase tracking-wider text-ink/45 hover:text-ink">
          ← Art
        </Link>
        <h1 className="font-serif text-4xl italic tracking-tight">{data.title}</h1>
        {data.year && <p className="font-mono text-xs text-ink/50">{data.year}</p>}
      </div>

      <ProjectSlideshows sections={sections} />

      {(data.description || data.meta) && (
        <div className="mt-20 max-w-xl leading-relaxed">
          {data.description && <p>{data.description}</p>}
          {data.meta && <p className="mt-4 font-mono text-xs leading-relaxed text-ink/50">{data.meta}</p>}
        </div>
      )}
    </>
  );
}
