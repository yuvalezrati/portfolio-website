import { NextResponse, type NextRequest } from "next/server";

// English is served at the root ("/art"), Hebrew under "/he" ("/he/art"). Both are
// rendered by app/[lang]: root URLs are rewritten (not redirected) to "/en/...", so
// English addresses stay clean, and "/en/..." itself redirects back to the root.
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/he" || pathname.startsWith("/he/")) return;

  const url = request.nextUrl.clone();
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
