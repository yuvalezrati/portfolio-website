// English lives at the root ("/art"), Hebrew under "/he" ("/he/art"). src/proxy.ts maps
// root URLs onto app/[lang] with lang "en", so both share one set of routes.
export const locales = ["en", "he"] as const;
export type Locale = (typeof locales)[number];

/**
 * Languages the site actually serves. Hebrew is switched off for now: its texts stay below and
 * in content.ts, its pages aren't built, and src/proxy.ts sends /he links to the English page.
 * To bring it back, add "he" here and restore the header's language link (see git history).
 */
export const enabledLocales: readonly Locale[] = ["en"];

export const isLocale = (value: string): value is Locale =>
  (locales as readonly string[]).includes(value);

export const direction = (lang: Locale) => (lang === "he" ? "rtl" : "ltr");

/** A site path ("/art/sde-dov") as a URL in the given language. */
export const localePath = (lang: Locale, path: string) =>
  lang === "en" ? path : `/he${path === "/" ? "" : path}`;

/** The language of a browser URL, and that URL without its language prefix. */
export const splitLocalePath = (pathname: string): { lang: Locale; path: string } =>
  pathname === "/he" || pathname.startsWith("/he/")
    ? { lang: "he", path: pathname.slice(3) || "/" }
    : { lang: "en", path: pathname };

const en = {
  name: "Yuval Ezrati",
  description: "Photography by Yuval Ezrati.",
  nav: { art: "Art", music: "Music", misc: "Misc", cv: "CV" },
  forward: "→",
  back: "←",
  home: {
    selected: "Selected projects",
    also: "Also",
    musicNote: "concerts & musicians",
    filmNote: "medium-format film",
    aboutNote: "about",
  },
  project: {
    view: "View project",
    frames: (n: number) => `${n} frames`,
    count: (n: number) => `${n} projects`,
    sections: { Installation: "Installation", Book: "Book", Video: "Video" } as Record<string, string>,
  },
  sequence: { pause: "Pause", play: "Play" },
  music: { concerts: "Concerts", musicians: "Musicians" },
  footer: { rewind: "Rewind" },
  notFound: {
    frame: "Frame 404",
    title: "Overexposed.",
    body: "This frame didn’t come out.",
    back: "Back to the contact sheet",
  },
  lightbox: {
    dialog: "Photograph, full screen",
    open: "View full screen:",
    close: "Close",
    previous: "Previous",
    next: "Next",
  },
};

export type Dictionary = typeof en;

const he: Dictionary = {
  name: "יובל עזרתי",
  description: "צילום — יובל עזרתי.",
  nav: { art: "אמנות", music: "מוזיקה", misc: "שונות", cv: "קורות חיים" },
  forward: "←",
  back: "→",
  home: {
    selected: "פרויקטים נבחרים",
    also: "עוד",
    musicNote: "הופעות ומוזיקאים",
    filmNote: "פילם בפורמט בינוני",
    aboutNote: "אודות",
  },
  project: {
    view: "לפרויקט",
    frames: (n) => `${n} פריימים`,
    count: (n) => `${n} פרויקטים`,
    sections: { Installation: "הצבה", Book: "ספר", Video: "וידאו" },
  },
  sequence: { pause: "השהיה", play: "הפעלה" },
  music: { concerts: "הופעות", musicians: "מוזיקאים" },
  footer: { rewind: "גלגול אחורה" },
  notFound: {
    frame: "פריים 404",
    title: "חשיפת יתר.",
    body: "הפריים הזה לא יצא.",
    back: "חזרה לגיליון המגע",
  },
  lightbox: {
    dialog: "תצלום, מסך מלא",
    open: "צפייה במסך מלא:",
    close: "סגירה",
    previous: "הקודם",
    next: "הבא",
  },
};

const dictionaries: Record<Locale, Dictionary> = { en, he };

export const getDictionary = (lang: Locale) => dictionaries[lang];
