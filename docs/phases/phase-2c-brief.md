# Phase 2c Brief — Connect + Materials + FooterCta + full assembly

## Objective

`Connect.astro`, `Materials.astro`, `FooterCta.astro`; `index.astro` assembles the full page top-to-bottom matching `design/reference.png`; temporary debug page deleted; carried About fix. Build green.

## Context from approved phases

- Singletons via `getEntry(<collection>, 'data')`. This phase consumes `connect`, `materials`, `cta` (all already have data, incl. `sectionLabel` on connect/materials).
- `Icon.astro`: 15 names (11 content + decoration tier: chevron-down, chevron-right, check, heart).
- Tokens only; zero `<script>`; conventional commits, **no attribution trailers**.

## Decisions already made (do not re-decide)

1. **Two more decoration-tier icons**: add lucide `download` (Materials button) and `arrow-right` (FooterCta button) to `Icon.astro`'s decoration tier → 17 names. As always: NOT in CMS selects, NOT in zod enums.
2. **Connect**: `<section aria-label={connect.sectionLabel}>`, `SectionLabel` on top, then the 5 items as square outlined cards — `surface` bg, `line` border, radius ~14–16px, centered `ink` icon over uppercase small letterspaced label. Whole card is `<a href={item.url}>`; external links get `target="_blank" rel="noopener noreferrer"`; `mailto:` links get neither. Layout: centered `flex-wrap` of fixed-size squares — wraps 3+2 (centered) at 390px, single row of 5 at ≥640px. Match reference sizing.
3. **Materials**: `<section aria-label={materials.sectionLabel}>`, `SectionLabel`, then 3 cards: `grid-cols-1` below 640px, `sm:grid-cols-3` above. Card: `surface`, `line` border, radius ~18px; image top (`item.image`, alt from `item.imageAlt`, `loading="lazy"`, explicit dimensions, rounded top corners, ~4:3 crop via `object-cover`); body: bold sans title (`ink`, uppercase per reference), 2-line `subtitle` (`muted`, small), and a `sage-dark` circular button bottom-right with white `download` icon — `<a href={item.file} download aria-label={item.title}>`.
4. **FooterCta**: component root is `<footer>` (still inside the page column): full-width `sage-dark` rounded bar (radius ~24–28px per reference), `cta.text` in `font-script` white-ish left, button right: white/`surface` pill, `cta.buttonLabel` uppercase small letterspaced `ink` + `arrow-right` icon, `<a href={cta.buttonUrl}>` with `target="_blank" rel="noopener noreferrer"`. Below 640px: stacks centered (text above button). Reference shows the bar as the last element with breathing room to the page bottom — match it.
5. **Assembly order** in `index.astro`: Hero → Services → About → Connect → Materials → FooterCta. Normalize section spacing to ONE utility approach while you're there (2b nit: Services uses `pt-*`, About uses `mt-*` — pick one for all sections and apply consistently).
6. **Carried About fix**: rebalance the About card's three zones at ≥640px so `about.heading` ("um pouco sobre mim" + heart) fits on ONE line as in the reference — photo and sideNote columns slightly narrower / middle column wider. No other About changes.
7. **Delete `src/pages/debug.astro`** (its Phase-1 purpose is over; the full page now renders every collection). `dist/debug/` must be gone after build.
8. **No hardcoded user-visible copy** — everything from `connect.json` / `materials.json` / `cta.json`. Decorative icons `aria-hidden`.

## Scope

**In:** `src/components/Connect.astro`, `src/components/Materials.astro`, `src/components/FooterCta.astro` (new); `src/components/Icon.astro` (+2 decoration icons); `src/pages/index.astro` (assembly + spacing normalization); `src/components/About.astro` (column rebalance only); delete `src/pages/debug.astro`.

**Out:** `config.yml`/schemas/JSON (no content-model changes this phase), SEO/OG/favicon/analytics/Lighthouse (Phase 4), `public/admin/` (Phase 3).

## Acceptance criteria

1. `npm run build` exits 0; `dist/debug/` no longer exists.
2. `dist/index.html` top-to-bottom order: hero, `#servicos`, about, connect, materials, footer CTA. Connect: 5 `<a>` cards with icons + labels from JSON. Materials: 3 cards with `<img alt>` from JSON, download `<a>`s with `download` attr + aria-labels. FooterCta: `<footer>`, script text, button with `cta.buttonLabel` + arrow icon.
3. `Icon.astro` = 17 names; download/arrow-right absent from CMS selects and zod enums.
4. Consistent section spacing utility across all sections.
5. About heading fits one line at 760px container width (verify with a quick serve + your own judgment; final visual gate is the Planner's browser pass).
6. No raw hex outside `global.css`; no hardcoded visible copy; zero `<script>` tags in `dist/index.html`.
7. Conventional commits, no attribution trailers; report at `docs/phases/phase-2c-report.md`.
