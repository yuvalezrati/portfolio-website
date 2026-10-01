# Yuval Ezrati — Photography Portfolio

Next.js (App Router) + Tailwind CSS. See `CLAUDE.md` for design rules.

```bash
npm run dev
```

## Adding photos

Full-resolution masters go in `images/` (git-ignored). The site serves web copies:

1. Export web copies into `public/photos/<category>/` (sRGB, max 2560px long edge), e.g.:
   `sips -m "/System/Library/ColorSync/Profiles/sRGB Profile.icc" -Z 2560 -s formatOptions 85 in.jpg --out public/photos/art/sde-dov/01.jpg`
2. In `src/lib/content.ts`, replace the placeholder entries with `{ src, width, height, alt }`.

Art projects live in the `artProjects` array; each `slug` becomes `/art/<slug>`. A project is a list of
`sections` (e.g. the work, Installation, Book), each shown as its own slideshow under a tab.
