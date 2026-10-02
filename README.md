# Yuval Ezrati — Photography Portfolio

Next.js (App Router) + Tailwind CSS. See `CLAUDE.md` for design rules.

```bash
npm run dev
```

### Preview on your phone

With the dev server running and the phone on the same Wi-Fi as this Mac, open Safari on the
phone at `http://<mac-name>.local:3000` (e.g. `http://yuvals-macbook-pro.local:3000`) or the
"Network" address that `npm run dev` prints. `next.config.ts` allows this Mac's network
addresses automatically.

## Adding photos

Full-resolution masters go in `images/` (git-ignored). The site serves web copies:

1. Export web copies into `public/photos/<category>/` (sRGB, max 2560px long edge), e.g.:
   `sips -m "/System/Library/ColorSync/Profiles/sRGB Profile.icc" -Z 2560 -s formatOptions 85 in.jpg --out public/photos/art/sde-dov/01.jpg`
2. In `src/lib/content.ts`, replace the placeholder entries with `{ src, width, height, alt }`.

Art projects live in the `artProjects` array; each `slug` becomes `/art/<slug>`. A project is a list of
`sections` (e.g. the work, Installation, Book), each shown as its own image grid, one after another.

## Languages

English is served at `/`. A Hebrew (right-to-left) version at `/he` is built in but switched
off for now: add `"he"` to `enabledLocales` in `src/lib/i18n.ts` and restore the header's
language link to bring it back; meanwhile `/he` links redirect to the English page.
`src/proxy.ts` maps root URLs onto `app/[lang]` with `lang = "en"`, so both languages share
the same pages. Interface text is in `src/lib/i18n.ts`; each project's Hebrew title and
statement go in its `he` field in `src/lib/content.ts`, and the CV's Hebrew text is in
`src/app/[lang]/cv/page.tsx`.
