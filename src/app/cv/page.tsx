import type { Metadata } from "next";

export const metadata: Metadata = { title: "CV" };

type Entry = {
  years: string;
  title: string;
  details?: string;
  credit?: string;
  points?: string[];
};

const contact = [
  { label: "yuval.ezrati@gmail.com", href: "mailto:yuval.ezrati@gmail.com" },
  { label: "Instagram @yuvalezrati", href: "https://instagram.com/yuvalezrati" },
  {
    label: "Portfolio deck",
    href: "https://docs.google.com/presentation/d/1FxaS4N-MkuAGpt2-OJRTKPkHy6e1MVeQRpALbnIZS7o/edit?usp=sharing",
  },
];

const education: Entry[] = [
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
];

const exhibitions: Entry[] = [
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
];

const experience: Entry[] = [
  {
    years: "2017–2019",
    title: "Music & Performance Photographer",
    details: "Roms Studios",
    points: [
      "Captured live performances, focusing on movement and dynamic lighting within the music industry.",
      "Collaborated with artists and production teams to document large-scale cultural events.",
    ],
  },
];

function Section({ heading, entries }: { heading: string; entries: Entry[] }) {
  return (
    <section>
      <h2 className="mb-6 font-mono text-xs uppercase tracking-wider text-mark">{heading}</h2>
      <ol className="space-y-6">
        {entries.map(({ years, title, details, credit, points }) => (
          <li key={`${years}-${title}`} className="grid gap-x-8 gap-y-1 sm:grid-cols-[7rem_1fr]">
            <p className="font-mono text-xs text-ink/50 sm:pt-1.5">{years}</p>
            <div className="leading-relaxed">
              <p className="font-serif text-2xl italic leading-tight">{title}</p>
              {details && <p>{details}</p>}
              {credit && <p className="text-sm opacity-60">{credit}</p>}
              {points && (
                <ul className="mt-2 list-disc space-y-1 pl-5 text-sm">
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

export default function CvPage() {
  return (
    <div className="max-w-3xl">
      <header className="mb-16">
        <h1 className="font-serif text-5xl italic tracking-tight sm:text-6xl">Yuval Ezrati</h1>
        <p className="mt-2 font-mono text-xs text-ink/50">Born 1997, Tel Aviv, Israel</p>
        <p className="mt-6 max-w-xl font-serif text-2xl leading-snug">
          Interdisciplinary artist with a background in photography, fine arts and computer
          science.
        </p>
        <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-1 text-sm">
          {contact.map(({ label, href }) => (
            <li key={href}>
              <a
                href={href}
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
        <Section heading="Education" entries={education} />
        <Section heading="Group Exhibitions" entries={exhibitions} />
        <Section heading="Professional Experience" entries={experience} />
      </div>
    </div>
  );
}
