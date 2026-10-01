"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Scribble from "@/components/Scribble";
import { navigation } from "@/lib/content";

export default function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2 px-6 py-6 sm:px-10">
      <Link href="/" className="font-serif text-2xl italic tracking-tight">
        Yuval Ezrati
      </Link>
      <nav className="flex gap-6 font-mono text-xs uppercase tracking-wider">
        {navigation.map(({ href, label }) => {
          const active = pathname === href || pathname.startsWith(`${href}/`);
          return (
            <Link
              key={href}
              href={href}
              aria-current={active ? "page" : undefined}
              className={`relative ${active ? "" : "text-ink/45 transition-colors hover:text-ink"}`}
            >
              {label}
              {active && <Scribble key={pathname} shape="underline" className="-bottom-2 left-0 h-2 w-full" />}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
