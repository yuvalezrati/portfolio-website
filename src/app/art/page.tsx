import type { Metadata } from "next";
import PageIntro from "@/components/PageIntro";
import Print from "@/components/Print";
import { artProjects } from "@/lib/content";

export const metadata: Metadata = { title: "Art" };

const tilts = [-2, 1.5, -1, 2.5];

export default function ArtPage() {
  return (
    <>
      <PageIntro title="Art" meta={`${artProjects.length} projects`} />
      <ul className="grid gap-x-10 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
        {artProjects.map(({ slug, title, year, sections }, i) => (
          <li key={slug}>
            <Print
              href={`/art/${slug}`}
              title={title}
              caption={[String(i + 1).padStart(2, "0"), year].filter(Boolean).join(" · ")}
              cover={sections[0]?.photos[0]}
              tilt={tilts[i % tilts.length]}
              eager={i === 0}
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            />
          </li>
        ))}
      </ul>
    </>
  );
}
