import Rewind from "@/components/Rewind";
import { getDictionary, type Locale } from "@/lib/i18n";

export default function SiteFooter({ lang }: { lang: Locale }) {
  const t = getDictionary(lang);
  return (
    <footer className="px-6 py-10 font-mono text-xs uppercase tracking-wider text-ink/45 sm:px-10">
      <div className="page-column flex flex-wrap items-baseline gap-x-6 gap-y-2">
        <p>
          {t.footer.frame} <span className="text-mark">36/36</span> — {t.footer.endOfRoll}
        </p>
        <Rewind label={t.footer.rewind} />
        <p>
          © {new Date().getFullYear()} {t.name}
        </p>
      </div>
    </footer>
  );
}
