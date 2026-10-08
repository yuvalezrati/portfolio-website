# Portfolio Website: Yuval Ezrati

Live: https://yuval-ezrati.vercel.app · Code: https://github.com/yuvalezrati/portfolio-website
See README.md for setup, the photo workflow and deploying.

## Stack & Architecture
- Next.js 16 (App Router, static pages), React 19, Tailwind CSS 4. Pages live in `src/app/[lang]/`;
  `src/proxy.ts` serves English at the root. Next 16 differs from older versions — check
  `node_modules/next/dist/docs/` before using an API (see AGENTS.md).
- Content (projects, photos, alt text, captions, sizes) is in `src/lib/content.ts`; interface text in
  `src/lib/i18n.ts`; the CV in `src/app/[lang]/cv/page.tsx`.
- Languages: English only for now, at `/`. A Hebrew (right-to-left) version is built in but switched
  off (`enabledLocales` in `src/lib/i18n.ts`; `/he` links redirect to English).

## Design rules (decided with Yuval — keep them)
- STRICT: all text aligns to the start of the line (left in English, right in Hebrew; `text-start`).
  Never center text. Use logical utilities (`ms-`/`ps-`/`start-`, `rtl:` variants).
- Minimal and gallery-first: warm paper background (`--background`), near-black ink, one red accent
  (`--mark`, #e8492f). Type: Bricolage Grotesque (text and titles, upright, no italics), Geist Mono
  for small uppercase labels, Heebo for Hebrew.
- Content sits in a centred column capped at 1280px (`.page-column`) so large screens stay proportionate.
- Motion is deliberately minimal:
  - Text never moves — no scroll drift, no hover nudges.
  - Photos and grids don't animate on scroll (no shutter reveals, no parallax).
  - On project lists, hover only zooms the cover photo slightly. Don't fade the other projects and
    don't recolour titles (both were tried and rejected).
  - Still allowed: photos "develop" from washed-out on first load, the thin red scroll-progress line,
    the header sliding away on scroll down and back (name rising) on scroll up, the grid ⇄ full-screen
    photo morph, and the red pencil underline under the active menu item.
  - Respect `prefers-reduced-motion`.
- Project lists: the cover is always at the start (left), text beside it — never alternating sides.
- Project pages: title, year, statement, then sections (the work, Installation, Book, Video, …),
  each with a small red uppercase mono heading, shown as simple masonry grids (4/3/2 columns,
  12px gaps, padding not margin so Safari columns align). Clicking a photo opens a light full-screen
  view with ← → arrows placed right against the photo's edges.
- Ask before adding new visual effects or decorations — Yuval prefers to request them.

## Navigation & Content
1. **Art**: Anti-Potential (2026, the Bezalel graduation project), Sde Dov (2025), City of the Dead
   (2025), Foreign (2023, corrupted-JPEG experiments with running sequences, found texts and videos).
2. **Music** (`/music`; `/concerts` redirects): Concerts, then a red-titled section per musician.
3. **Misc**: other work (no subtitle).
4. **CV**: education, exhibitions, experience; contact = email and @yuvalezrati only (no phone
   number, no portfolio deck).

## Photos
- Masters stay in `images/` (git-ignored, never uploaded). Web copies go in `public/photos/`:
  sRGB, max 2560px long edge, rotated upright (bake in any EXIF orientation).
- When a folder gains or loses photos, name its web copies after the originals (e.g. `dsc-0452.jpg`)
  — never renumber, or cached old photos reappear at reused addresses.
- Deliberately corrupted files (Foreign) are copied byte for byte and marked `unoptimized`; never
  re-encode them. Videos are remuxed to MP4 with faststart, not re-encoded.
- Write alt text for every photo; don't guess people's genders or pronouns.

## Workflow
- After each change: `npm run lint`, `npm run build`, check it in the browser, commit, deploy with
  `npx vercel deploy --prod`, then push `main` to GitHub.
- GitHub pushes use the GitHub CLI (`gh`). If it isn't installed, Homebrew needs the Xcode licence
  accepted first (`sudo xcodebuild -license accept`, Yuval runs it), then `brew install gh`.
  Large pushes may need `git -c http.postBuffer=524288000 push`. Never ask for or type passwords
  or tokens — use the browser sign-in flows (`gh auth login --web`, `vercel login`).
- The iOS Simulator needs `sudo xcode-select -s /Applications/Xcode.app/Contents/Developer` first
  (Yuval runs it); until then, check phone layouts in the browser at 375–390px wide.

## Open items
- Book-like viewer for the Anti-Potential book PDF (`images/Art/Anti-Potential/book/`, 92 pages):
  discussed, not built. Suggested a quiet page turn; confirm which pages may be public.
- Hebrew version: switched off. If revived, review the translations, the Hebrew spellings of
  curators' names and venues, and official Hebrew exhibition titles.
@AGENTS.md
