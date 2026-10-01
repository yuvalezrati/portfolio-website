import Link from "next/link";
import ProjectShowcase from "@/components/ProjectShowcase";
import { concerts } from "@/lib/content";

export default function Home() {
  return (
    <div>
      <section>
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
                <span className="font-display text-4xl leading-none">{label}</span>
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
