import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Gallery from "@/components/Gallery";
import PageIntro from "@/components/PageIntro";
import { concerts } from "@/lib/content";
import { getDictionary, isLocale } from "@/lib/i18n";

export async function generateMetadata({ params }: PageProps<"/[lang]/concerts">): Promise<Metadata> {
  const { lang } = await params;
  return isLocale(lang) ? { title: getDictionary(lang).nav.concerts } : {};
}

export default async function ConcertsPage({ params }: PageProps<"/[lang]/concerts">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  return (
    <>
      <PageIntro title={getDictionary(lang).nav.concerts} meta={concerts.years} />
      <Gallery photos={concerts.photos} lang={lang} />
    </>
  );
}
