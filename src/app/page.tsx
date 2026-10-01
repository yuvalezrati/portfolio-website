import Link from "next/link";
import { artProjects, navigation } from "@/lib/content";

export default function Home() {
  return (
    <div className="max-w-xl">
      <p className="font-serif text-2xl leading-snug sm:text-3xl">
        Photography — art projects, concerts and medium-format analog work.
      </p>
      <ul className="mt-16 space-y-3">
        {navigation.map(({ href, label }) => (
          <li key={href}>
            <Link href={href} className="font-serif text-xl hover:opacity-50">
              {label}
            </Link>
            {href === "/art" && (
              <ul className="mt-2 space-y-1 pl-4 text-sm">
                {artProjects.map((p) => (
                  <li key={p.slug}>
                    <Link href={`/art/${p.slug}`} className="opacity-60 hover:opacity-100">
                      {p.title}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
