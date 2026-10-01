import Link from "next/link";
import ProjectShowcase from "@/components/ProjectShowcase";
import { concerts } from "@/lib/content";

export default function Home() {
  return (
    <div>
      <p className="max-w-3xl font-serif text-5xl leading-[1.02] sm:text-7xl">
        Photographs of places that <em>insist</em> on staying beautiful
        <span className="text-mark">.</span>
      </p>

      <section className="mt-24">
        <h2 className="mb-10 font-mono text-xs uppercase tracking-wider text-ink/50">
          Selected projects
        </h2>
        <ProjectShowcase />
      </section>

      <section className="mt-32">
        <h2 className="mb-6 font-mono text-xs uppercase tracking-wider text-ink/50">Also</h2>
        <ul className="space-y-3">
          {[
            { href: "/concerts", label: "Concerts", note: concerts.years },
            { href: "/misc", label: "Misc", note: "medium-format film" },
            { href: "/cv", label: "CV", note: "about" },
          ].map(({ href, label, note }) => (
            <li key={href}>
              <Link href={href} className="group inline-flex items-baseline gap-4">
                <span className="font-serif text-4xl italic leading-none">{label}</span>
                <span className="font-mono text-xs text-ink/45">{note}</span>
                <span className="font-mono text-mark transition-transform group-hover:translate-x-1">
                  →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
