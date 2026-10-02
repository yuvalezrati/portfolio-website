import { NextResponse, type NextRequest } from "next/server";
import { enabledLocales } from "@/lib/i18n";

// English is served at the root ("/art") and rendered by app/[lang]: root URLs are rewritten
// (not redirected) to "/en/...", so English addresses stay clean, and "/en/..." itself
// redirects back to the root. Hebrew ("/he/...") is switched off for now (see enabledLocales
// in src/lib/i18n.ts), so its links go to the same page in English; temporarily (307), as
// Hebrew may come back.
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const url = request.nextUrl.clone();

  if (pathname === "/he" || pathname.startsWith("/he/")) {
    if (enabledLocales.includes("he")) return;
    url.pathname = pathname.slice(3) || "/";
    return NextResponse.redirect(url, 307);
  }

  if (pathname === "/en" || pathname.startsWith("/en/")) {
    url.pathname = pathname.slice(3) || "/";
    return NextResponse.redirect(url, 308);
  }

  url.pathname = `/en${pathname === "/" ? "" : pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  // Skip Next internals, the photos and any other file with an extension.
  matcher: ["/((?!_next|photos/|.*\\..*).*)"],
};
