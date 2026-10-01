import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageIntro from "@/components/PageIntro";
import { artProjects } from "@/lib/content";

export const metadata: Metadata = { title: "Art" };

export default function ArtPage() {
  return (
    <>
      <PageIntro title="Art" />
      <ul className="grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
        {artProjects.map(({ slug, title, year, sections }, i) => {
          const cover = sections[0]?.photos[0];
          return (
            <li key={slug}>
              <Link href={`/art/${slug}`} className="group block">
                <div className="relative aspect-[5/4] w-full bg-neutral-200">
                  {cover?.src && (
                    <Image
                      src={cover.src}
                      alt=""
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      {...(i === 0 && { loading: "eager", fetchPriority: "high" })}
                      className="object-cover"
                    />
                  )}
                </div>
                <p className="mt-3 font-serif text-lg group-hover:opacity-50">{title}</p>
                {year && <p className="text-sm opacity-50">{year}</p>}
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
}
