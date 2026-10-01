"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navigation } from "@/lib/content";

export default function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2 px-6 py-6 sm:px-10">
      <Link href="/" className="font-serif text-xl tracking-tight">
        Yuval Ezrati
      </Link>
      <nav className="flex gap-6 text-sm">
        {navigation.map(({ href, label }) => {
          const active = pathname === href || pathname.startsWith(`${href}/`);
          return (
            <Link
              key={href}
              href={href}
              aria-current={active ? "page" : undefined}
              className={active ? "opacity-100" : "opacity-40 transition-opacity hover:opacity-100"}
            >
              {label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
