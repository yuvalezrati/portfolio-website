import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PageIntro from "@/components/PageIntro";
import ProjectShowcase from "@/components/ProjectShowcase";
import { artProjects } from "@/lib/content";
import { getDictionary, isLocale } from "@/lib/i18n";

export async function generateMetadata({ params }: PageProps<"/[lang]/art">): Promise<Metadata> {
  const { lang } = await params;
  return isLocale(lang) ? { title: getDictionary(lang).nav.art } : {};
}

export default async function ArtPage({ params }: PageProps<"/[lang]/art">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = getDictionary(lang);

  return (
    <>
      <PageIntro title={t.nav.art} meta={t.project.count(artProjects.length)} />
      <ProjectShowcase lang={lang} />
    </>
  );
}
