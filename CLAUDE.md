# Portfolio Website: Yuval Ezrati

## Stack & Architecture
- Frontend: React / Next.js, Tailwind CSS.
- Styling: Minimalist, intuitive, gallery-focused.
- Typography & Layout: STRICT RULE - All text must be aligned to the start of the line: left in English, right in Hebrew (`text-start`). Never center text. Use logical utilities (`ms-`/`ps-`/`start-`, `rtl:` variants) rather than left/right ones so layouts mirror in Hebrew.
- Type: Bricolage Grotesque for Latin text, Heebo for Hebrew, Geist Mono for small labels.
- Languages: English at `/`, Hebrew (right-to-left) at `/he`, toggled from the header. UI strings live in `src/lib/i18n.ts`; project texts have a `he` field in `src/lib/content.ts`.
- Images: Optimize for high-resolution web delivery.

## Core Navigation & Categories
1. **Art**: Individual project pages for "anti-potential" (the Bezalel graduation project), "sde-dov" and "city-of-the-dead".
2. **Concerts**: High-energy layout, featuring 2017-2019 work.
3. **Misc**: Sandbox for other medium-format analog work.
4. **CV / About**: Left-aligned text page detailing education and technical/artistic background.

## UI/UX Rules
- Focus on the photography. UI elements should fade away until needed.
- No complex hover animations. Keep it fast, simple, and intuitive.
- Emulate the physical feel of a photobook layout where appropriate.
@AGENTS.md
