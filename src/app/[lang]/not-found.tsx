"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { getDictionary, localePath, splitLocalePath } from "@/lib/i18n";

// not-found receives no params, so the language comes from the URL ("/he/..." is Hebrew).
export default function NotFound() {
  const { lang } = splitLocalePath(usePathname());
  const t = getDictionary(lang);

  return (
    <div className="max-w-2xl pt-8">
      <p className="font-mono text-xs uppercase tracking-wider text-mark">{t.notFound.frame}</p>
      {/* Blown-out type: the frame didn't come out. */}
      <h1 className="mt-4 font-display text-7xl tracking-tight text-ink/15 blur-[1px] sm:text-9xl">
        {t.notFound.title}
      </h1>
      <p className="mt-6 font-display text-2xl font-normal">{t.notFound.body}</p>
      <Link
        href={localePath(lang, "/")}
        className="group mt-10 inline-flex items-baseline gap-3 font-mono text-xs uppercase tracking-wider"
      >
        <span className="text-mark transition-transform group-hover:-translate-x-1 rtl:group-hover:translate-x-1">
          {t.back}
        </span>
        {t.notFound.back}
      </Link>
    </div>
  );
}
