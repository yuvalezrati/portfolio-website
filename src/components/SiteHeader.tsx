"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Scribble from "@/components/Scribble";
import { navigation } from "@/lib/content";
import { getDictionary, localePath, splitLocalePath, type Locale } from "@/lib/i18n";

// Ignore tiny scroll jitters; always show the header near the top of the page.
const SCROLL_DELTA = 6;
const ALWAYS_SHOWN_ABOVE = 120;

export default function SiteHeader({ lang }: { lang: Locale }) {
  const t = getDictionary(lang);
  // The page's path without its language prefix, e.g. "/art/sde-dov".
  const { path } = splitLocalePath(usePathname());
  // Tucked away while scrolling down; slides back (name rising into place) on scroll up.
  const [tucked, setTucked] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      if (Math.abs(y - lastY) < SCROLL_DELTA) return;
      setTucked(y > lastY && y > ALWAYS_SHOWN_ABOVE);
      lastY = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 bg-paper/90 px-6 py-6 backdrop-blur-sm transition-transform duration-300 ease-out motion-reduce:transition-none sm:px-10 ${
        tucked ? "-translate-y-full" : ""
      }`}
    >
      <div className="page-column flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2">
        <Link href={localePath(lang, "/")} className="font-display text-2xl tracking-tight">
          <span
            className={`inline-block transition-[translate,opacity] delay-100 duration-500 ease-out motion-reduce:transition-none ${
              tucked ? "translate-y-4 opacity-0" : ""
            }`}
          >
            {t.name}
          </span>
        </Link>
        <nav className="flex gap-6 font-mono text-xs uppercase tracking-wider">
          {navigation.map(({ href, key }) => {
            const active = path === href || path.startsWith(`${href}/`);
            return (
              <Link
                key={href}
                href={localePath(lang, href)}
                aria-current={active ? "page" : undefined}
                className={`relative ${active ? "" : "text-ink/45 transition-colors hover:text-ink"}`}
              >
                {t.nav[key]}
                {active && <Scribble key={path} shape="underline" className="-bottom-2 start-0 h-2 w-full" />}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
