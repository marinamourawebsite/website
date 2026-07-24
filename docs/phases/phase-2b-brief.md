# Phase 2b Brief — Services + About

## Objective

`Services.astro` and `About.astro` built and rendered on `index.astro` below the Hero, matching `design/reference.png` at 390px and 1280px. Two small carried-over Hero polish fixes. Build green.

## Context from approved phases

- Singletons via `getEntry(<collection>, 'data')`. This phase consumes `services`, `about`.
- `SectionLabel.astro` exists (prop `label`). `Icon.astro` has 11 CMS icons + 2 decoration-tier chevrons.
- Tokens only, no raw hex outside `global.css` `@theme`. Conventional commits, **no attribution trailers**.

## Decisions already made (do not re-decide)

1. **Section labels get a CMS field.** The reference's `· COMO POSSO TE AJUDAR ·` (and 2c's labels) are user-visible copy, so CLAUDE.md rule 2 applies — but the content model has no field for them. Resolution (per rule 3, config.yml and schemas change together in the same commit): add a required `sectionLabel` string field to the **services**, **connect** and **materials** collections — in `public/admin/config.yml` (label it `Rótulo da seção`, with the reference copy as `default`), in the zod schemas, and in the three JSON files (`"COMO POSSO TE AJUDAR"`, `"VAMOS NOS CONECTAR"`, `"MATERIAIS GRATUITOS"` — the `·` dots are SectionLabel decoration, not content). Do all three collections now even though connect/materials render in 2c — one sync commit beats two.
2. **Decoration-tier icons**: add lucide `check` and `heart` to `Icon.astro`'s decoration tier (needed for About checklist + the two ♡ glyphs). 15 names total. As before: NOT in CMS selects, NOT in zod enums.
3. **Services section**: `<section id="servicos" aria-label={services.sectionLabel}>` — the id is already targeted by the Hero chevron. `SectionLabel` on top, then a vertical stack of 5 cards from `services.items`. Card = one `<a href={item.url}>`: `surface` bg, `line` 1px border, radius ~18px, very soft shadow, horizontal layout — `sage` filled circle with white icon glyph left, middle column with uppercase letterspaced sans 600 title (`ink`) + 2-line description (`muted`), `chevron-right` (muted) flushed right, vertically centered. Match reference spacing/sizing.
4. **About section**: no SectionLabel in the reference — one large rounded card (`surface`, `line` border, radius slightly larger than service cards), 3 zones:
   - Left: `about.photo` `<img>` (alt from `photoAlt`, explicit dimensions, `loading="lazy"`), rounded corners, roughly square-ish portrait as in reference.
   - Middle: `about.heading` in `font-script` `sage` with a small `heart` icon after it (decoration, `aria-hidden`); below, checklist of `about.bullets` — each row: `check` icon in `sage` + sans text (`ink`/`muted` per reference).
   - Right: separated by a vertical `line` rule; stacked `heart` icon (`sage`, centered) above `about.sideNote` (`muted`, centered, small).
   - Mobile stacking order: photo → heading+bullets → horizontal rule (the vertical divider becomes horizontal) → sideNote.
5. **Hero polish (carried minors from 2a — small CSS-only tweaks in `Hero.astro`)**:
   - Loosen the script "Moura" so it overlaps "Marina" less tightly (reference shows a gentle tuck, baseline clearly below the serif).
   - Blob radius: reference's bottom corners are much less rounded than the top-right sweep — reduce bottom rounding.
6. **No hardcoded user-visible copy.** Everything from `services.json`/`about.json` (+ the new `sectionLabel`). Decorative glyphs (check/heart icons, SectionLabel dots) are `aria-hidden` markup, not copy.
7. **Whole-card links** must remain real `<a>` elements (SPEC §5) with accessible names derived from their content (title text inside the link suffices — no aria-label needed).

## Scope

**In:** `src/components/Services.astro`, `src/components/About.astro`, `src/pages/index.astro` (append the two sections), `src/components/Icon.astro` (+2 decoration icons), `public/admin/config.yml` + `src/content.config.ts` + `src/content/{services,connect,materials}.json` (sectionLabel sync), `src/components/Hero.astro` (the two polish tweaks only), `src/pages/debug.astro` (add the 2 new icons + new sectionLabel fields so /debug stays exhaustive).

**Out:** Connect/Materials/FooterCta components (2c), everything Phase 4.

## Acceptance criteria

1. `npm run build` exits 0.
2. `dist/index.html`: `section#servicos` with `aria-label` equal to `services.sectionLabel`; 5 service `<a>` cards each containing its title, description and an inline chevron-right svg; About card with img (correct alt), heading, 4 check rows, vertical-rule column with sideNote.
3. `config.yml` ↔ zod ↔ JSON perfectly in sync on the new `sectionLabel` fields (same commit), all three collections.
4. `Icon.astro` = 15 names; check/heart absent from CMS selects and zod enums.
5. No raw hex outside `global.css`; no hardcoded visible copy; still zero `<script>` tags in `dist/index.html`.
6. Structure matches the reference at 390px/1280px (planner does browser sign-off; you verify classes/structure).
7. Conventional commits (the config.yml+schema+JSON sync is ONE commit), no attribution trailers; report at `docs/phases/phase-2b-report.md`.
