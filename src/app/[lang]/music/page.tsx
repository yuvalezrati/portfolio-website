import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Gallery from "@/components/Gallery";
import PageIntro from "@/components/PageIntro";
import { music } from "@/lib/content";
import { getDictionary, isLocale } from "@/lib/i18n";

export async function generateMetadata({ params }: PageProps<"/[lang]/music">): Promise<Metadata> {
  const { lang } = await params;
  return isLocale(lang) ? { title: getDictionary(lang).nav.music } : {};
}

export default async function MusicPage({ params }: PageProps<"/[lang]/music">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = getDictionary(lang);
  const label = "mb-8 font-mono text-xs uppercase tracking-wider";

  return (
    <>
      <PageIntro title={t.nav.music} />
      <div className="space-y-24 sm:space-y-32">
        <section>
          <h2 className={`${label} text-mark`}>{t.music.concerts}</h2>
          <Gallery photos={music.concerts} eager lang={lang} />
        </section>

        {/* One section per musician, each name a small red title like Installation and Book. */}
        <section>
          <h2 className={`${label} text-ink/50`}>{t.music.musicians}</h2>
          <div className="space-y-16 sm:space-y-20">
            {music.musicians.map(({ name, photos }) => (
              <section key={name}>
                <h3 className={`${label} text-mark`}>{name}</h3>
                <Gallery photos={photos} lang={lang} />
              </section>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
