import Link from "next/link";
import Print from "@/components/Print";
import { artProjects, concerts } from "@/lib/content";

const tilts = [-3, 2.5, -1.5, 2];

export default function Home() {
  return (
    <div>
      <p className="max-w-2xl font-serif text-4xl leading-[1.05] sm:text-6xl">
        Photographs of places that <em>insist</em> on staying beautiful
        <span className="text-mark">.</span>
      </p>

      <section className="mt-16">
        <h2 className="mb-6 font-mono text-xs uppercase tracking-wider text-ink/50">Art</h2>
        <div className="flex flex-wrap gap-8 sm:gap-0">
          {artProjects.map(({ slug, title, year, sections }, i) => (
            <Print
              key={slug}
              href={`/art/${slug}`}
              title={title}
              caption={year}
              cover={sections[0]?.photos[0]}
              tilt={tilts[i % tilts.length]}
              eager={i === 0}
              sizes="(min-width: 640px) 320px, 80vw"
              className={`w-[80vw] sm:w-80 ${i > 0 ? "sm:-ml-6" : ""} ${i % 2 ? "sm:mt-10" : ""}`}
            />
          ))}
        </div>
      </section>

      <ul className="mt-20 space-y-2 font-mono text-sm">
        {[
          { href: "/concerts", label: "Concerts", note: concerts.years },
          { href: "/misc", label: "Misc", note: "medium-format film" },
          { href: "/cv", label: "CV", note: "about" },
        ].map(({ href, label, note }) => (
          <li key={href}>
            <Link href={href} className="group inline-flex items-baseline gap-3">
              <span className="text-mark transition-transform group-hover:translate-x-1">→</span>
              <span className="uppercase tracking-wider">{label}</span>
              <span className="text-ink/45">{note}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
