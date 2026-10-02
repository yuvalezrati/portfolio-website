import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary, isLocale, type Locale } from "@/lib/i18n";

export async function generateMetadata({ params }: PageProps<"/[lang]/cv">): Promise<Metadata> {
  const { lang } = await params;
  return isLocale(lang) ? { title: getDictionary(lang).nav.cv } : {};
}

type Entry = {
  years: string;
  title: string;
  details?: string;
  credit?: string;
  points?: string[];
};

type Cv = {
  born: string;
  statement: string;
  portfolio: string;
  headings: { education: string; exhibitions: string; experience: string };
  education: Entry[];
  exhibitions: Entry[];
  experience: Entry[];
};

const PORTFOLIO_URL =
  "https://docs.google.com/presentation/d/1FxaS4N-MkuAGpt2-OJRTKPkHy6e1MVeQRpALbnIZS7o/edit?usp=sharing";

const cv: Record<Locale, Cv> = {
  en: {
    born: "Born 1997, Tel Aviv, Israel",
    statement:
      "Interdisciplinary artist with a background in photography, fine arts and computer science.",
    portfolio: "Portfolio deck",
    headings: {
      education: "Education",
      exhibitions: "Group Exhibitions",
      experience: "Professional Experience",
    },
    education: [
      {
        years: "2020–2026",
        title: "Dual-Degree Program",
        details:
          "Bezalel Academy of Arts and Design, Jerusalem & The Hebrew University of Jerusalem",
        points: [
          "2022–2026 — B.F.A. in Fine Arts, Photography, Bezalel Academy of Arts and Design, Jerusalem",
          "2020–2023 — B.Sc. in Computer Science, The Hebrew University of Jerusalem",
        ],
      },
    ],
    exhibitions: [
      {
        years: "2026",
        title: "And yet, Hope",
        details: "Group exhibition, Bifnocho Space, Tel Aviv",
        credit: "Curator: Assia Weisberg",
      },
      {
        years: "2026",
        title: "Coming Out",
        details: "Group exhibition, Light Box Gallery, the Alleys of Old Jaffa",
        credit: "Curators: Hagit Peleg Rotem, Limor Margolis, Yuval Saar",
      },
      {
        years: "2026",
        title: "Mandel Foundation Exhibition",
        details:
          "Selected final projects from all departments, Bezalel Academy of Arts and Design, Jerusalem",
        credit: "Curator: Bar Mussan Levi",
      },
      {
        years: "2026",
        title: "Apprendre de la ville, Paris 2025",
        details:
          "Double exhibition, Institut français de Tel Aviv & The Gallery of Photography, Bezalel Academy of Arts and Design, Jerusalem",
        credit: "Curator: David Adika",
      },
      {
        years: "2025",
        title: "Where Is Your Safe Space?",
        details: "Group exhibition and community research project, Mazeh 9, Tel Aviv",
        credit: "Curators: Kate Finkelstein, Vera Geilis",
      },
      {
        years: "2025",
        title: "Voices of the Valley",
        details: "Sound installation, The Tea House – Sound Gallery, Hansen House, Jerusalem",
        credit: "Guided by Daniel Meir",
      },
    ],
    experience: [
      {
        years: "2017–2019",
        title: "Music & Performance Photographer",
        details: "Roms Studios",
        points: [
          "Captured live performances, focusing on movement and dynamic lighting within the music industry.",
          "Collaborated with artists and production teams to document large-scale cultural events.",
        ],
      },
    ],
  },
  // Gender-neutral wording throughout (Hebrew is gendered): "אוצרות:" (curation) rather
  // than אוצר/אוצרת, and activity nouns rather than "artist"/"photographer".
  he: {
    born: "תל אביב, 1997",
    statement: "עבודה בין־תחומית, עם רקע בצילום, באמנות ובמדעי המחשב.",
    portfolio: "תיק עבודות (מצגת)",
    headings: {
      education: "השכלה",
      exhibitions: "תערוכות קבוצתיות",
      experience: "ניסיון מקצועי",
    },
    education: [
      {
        years: "2020–2026",
        title: "תוכנית דו־תואר",
        details: "בצלאל אקדמיה לאמנות ועיצוב, ירושלים, והאוניברסיטה העברית בירושלים",
        points: [
          "2022–2026 — תואר ראשון באמנות (B.F.A), המחלקה לצילום, בצלאל אקדמיה לאמנות ועיצוב, ירושלים",
          "2020–2023 — תואר ראשון במדעי המחשב (B.Sc), האוניברסיטה העברית בירושלים",
        ],
      },
    ],
    exhibitions: [
      {
        years: "2026",
        title: "And yet, Hope",
        details: "תערוכה קבוצתית, חלל בפנוכו, תל אביב",
        credit: "אוצרות: אסיה וייסברג",
      },
      {
        years: "2026",
        title: "Coming Out",
        details: "תערוכה קבוצתית, גלריית לייטבוקס, סמטאות יפו העתיקה",
        credit: "אוצרות: חגית פלג רותם, לימור מרגוליס, יובל סער",
      },
      {
        years: "2026",
        title: "תערוכת קרן מנדל",
        details: "פרויקטי גמר נבחרים מכל המחלקות, בצלאל אקדמיה לאמנות ועיצוב, ירושלים",
        credit: "אוצרות: בר מוסן לוי",
      },
      {
        years: "2026",
        title: "Apprendre de la ville, Paris 2025",
        details:
          "תערוכה כפולה, המכון הצרפתי בתל אביב והגלריה לצילום, בצלאל אקדמיה לאמנות ועיצוב, ירושלים",
        credit: "אוצרות: דוד אדיקה",
      },
      {
        years: "2025",
        title: "Where Is Your Safe Space?",
        details: "תערוכה קבוצתית ופרויקט מחקר קהילתי, מזא״ה 9, תל אביב",
        credit: "אוצרות: קייט פינקלשטיין, ורה גייליס",
      },
      {
        years: "2025",
        title: "Voices of the Valley",
        details: "מיצב סאונד, בית התה – גלריית סאונד, בית הנסן, ירושלים",
        credit: "בהנחיית דניאל מאיר",
      },
    ],
    experience: [
      {
        years: "2017–2019",
        title: "צילום מוזיקה והופעות",
        details: "Roms Studios",
        points: [
          "תיעוד הופעות חיות, עם דגש על תנועה ותאורה דינמית בתעשיית המוזיקה.",
          "עבודה עם אמנים וצוותי הפקה בתיעוד אירועי תרבות רחבי היקף.",
        ],
      },
    ],
  },
};

function Section({ heading, entries }: { heading: string; entries: Entry[] }) {
  return (
    <section>
      <h2 className="mb-6 font-mono text-xs uppercase tracking-wider text-mark">{heading}</h2>
      <ol className="space-y-6">
        {entries.map(({ years, title, details, credit, points }) => (
          <li key={`${years}-${title}`} className="grid gap-x-8 gap-y-1 sm:grid-cols-[7rem_1fr]">
            <p className="font-mono text-xs text-ink/50 sm:pt-1.5">{years}</p>
            <div className="leading-relaxed">
              {/* <bdi>: an English title on the Hebrew page keeps its punctuation in place. */}
              <p className="font-display text-2xl leading-tight">
                <bdi>{title}</bdi>
              </p>
              {details && <p>{details}</p>}
              {credit && <p className="text-sm opacity-60">{credit}</p>}
              {points && (
                <ul className="mt-2 list-disc space-y-1 ps-5 text-sm">
                  {points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              )}
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}

export default async function CvPage({ params }: PageProps<"/[lang]/cv">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = getDictionary(lang);
  const c = cv[lang];

  const contact = [
    { label: "yuval.ezrati@gmail.com", href: "mailto:yuval.ezrati@gmail.com", ltr: true },
    { label: "Instagram @yuvalezrati", href: "https://instagram.com/yuvalezrati", ltr: true },
    { label: c.portfolio, href: PORTFOLIO_URL, ltr: false },
  ];

  return (
    <div className="max-w-3xl">
      <header className="mb-16">
        <h1 className="sr-only">{t.nav.cv}</h1>
        <p className="font-mono text-xs text-ink/50">{c.born}</p>
        <p className="mt-4 max-w-xl font-display text-3xl font-normal leading-snug sm:text-4xl">
          {c.statement}
        </p>
        <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-1 text-sm">
          {contact.map(({ label, href, ltr }) => (
            <li key={href}>
              <a
                href={href}
                // Email and handles keep left-to-right order on the Hebrew page.
                dir={ltr ? "ltr" : undefined}
                {...(href.startsWith("http") && { target: "_blank", rel: "noreferrer" })}
                className="underline decoration-mark/40 underline-offset-4 hover:decoration-mark"
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      </header>
      <div className="space-y-16">
        <Section heading={c.headings.education} entries={c.education} />
        <Section heading={c.headings.exhibitions} entries={c.exhibitions} />
        <Section heading={c.headings.experience} entries={c.experience} />
      </div>
    </div>
  );
}
