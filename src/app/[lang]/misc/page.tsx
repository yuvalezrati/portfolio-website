import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Gallery from "@/components/Gallery";
import PageIntro from "@/components/PageIntro";
import { misc } from "@/lib/content";
import { getDictionary, isLocale } from "@/lib/i18n";

export async function generateMetadata({ params }: PageProps<"/[lang]/misc">): Promise<Metadata> {
  const { lang } = await params;
  return isLocale(lang) ? { title: getDictionary(lang).nav.misc } : {};
}

export default async function MiscPage({ params }: PageProps<"/[lang]/misc">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = getDictionary(lang);

  return (
    <>
      <PageIntro title={t.nav.misc}>
        <p>{t.misc.description}</p>
      </PageIntro>
      <Gallery photos={misc.photos} lang={lang} />
    </>
  );
}
