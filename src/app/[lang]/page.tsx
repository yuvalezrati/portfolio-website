import Link from "next/link";
import ProjectShowcase from "@/components/ProjectShowcase";
import { getDictionary, isLocale, localePath } from "@/lib/i18n";
import { notFound } from "next/navigation";

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = getDictionary(lang);

  return (
    <div>
      <section>
        <h2 className="mb-10 font-mono text-xs uppercase tracking-wider text-ink/50">
          {t.home.selected}
        </h2>
        <ProjectShowcase lang={lang} />
      </section>

      <section className="mt-32">
        <h2 className="mb-6 font-mono text-xs uppercase tracking-wider text-ink/50">{t.home.also}</h2>
        <ul className="space-y-3">
          {[
            { href: "/music", label: t.nav.music, note: t.home.musicNote },
            { href: "/misc", label: t.nav.misc },
            { href: "/cv", label: t.nav.cv, note: t.home.aboutNote },
          ].map(({ href, label, note }: { href: string; label: string; note?: string }) => (
            <li key={href}>
              <Link href={localePath(lang, href)} className="group inline-flex items-baseline gap-4">
                <span className="font-display text-4xl leading-none">{label}</span>
                {note && <span className="font-mono text-xs text-ink/45">{note}</span>}
                <span className="font-mono text-mark transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1">
                  {t.forward}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
