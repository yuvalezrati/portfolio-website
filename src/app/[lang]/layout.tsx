import type { Metadata } from "next";
import { Bricolage_Grotesque, Geist_Mono, Heebo } from "next/font/google";
import { notFound } from "next/navigation";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import { direction, getDictionary, isLocale, locales } from "@/lib/i18n";
import "../globals.css";

// One characterful grotesque for everything, from body text to the big titles; its
// optical-size axis keeps small text calm and large titles tight.
const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  axes: ["opsz"],
  subsets: ["latin"],
});

const mono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Bricolage and Geist Mono have no Hebrew; Heebo fills in Hebrew letters (see the font
// stacks in globals.css). Browsers only download it on pages that contain Hebrew.
const heebo = Heebo({
  variable: "--font-heebo",
  subsets: ["hebrew"],
});

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const t = getDictionary(lang);
  return {
    title: { default: t.name, template: `%s — ${t.name}` },
    description: t.description,
  };
}

export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  return (
    <html
      lang={lang}
      dir={direction(lang)}
      className={`${bricolage.variable} ${mono.variable} ${heebo.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col text-start font-sans">
        <div aria-hidden className="scroll-progress" />
        <SiteHeader lang={lang} />
        <main className="flex-1 px-6 pb-24 pt-8 sm:px-10">
          <div className="page-column">{children}</div>
        </main>
        <SiteFooter lang={lang} />
      </body>
    </html>
  );
}
