# Phase 2a Review — SectionLabel + Hero

> Note (Planner): reviewer output persisted verbatim by the Planner (reviewer has no Write tool).

**Verdict:** `approved`

## Summary
The implementation matches the brief precisely. Build exits 0 (2 pages). All acceptance criteria verified against `dist/` and source. No blockers, no changes requested.

## Verified against acceptance criteria
1. `npm run build` exits 0 — confirmed.
2. `dist/index.html` contains: hero `<section>`, `<img alt="Marina Moura" width="560" height="720">`, stacked `M`/`M` monogram, `href="#servicos"` with matching `aria-label`, keywords/bio/scrollHint strings, and 4 social `<a>`s (Instagram/TikTok/LinkedIn/WhatsApp) each with `target="_blank" rel="noopener noreferrer"` and `aria-label` — confirmed.
3. Zero `<script>` tags in `dist/index.html`; smooth scroll present as `@media (prefers-reduced-motion:no-preference){html{scroll-behavior:smooth}}` — confirmed.
4. `Icon.astro`: 13 names, chevrons under a commented decoration tier. `src/content.config.ts` zod enums (`socialIcon`/`serviceIcon`/`connectIcon`) contain no chevrons; `public/admin/config.yml` has no chevron — the decoration-tier ruling is implemented exactly as specified. Confirmed.
5. No raw hex in `src/components/` or `src/pages/index.astro` (grep clean); only token color classes used. Confirmed.
6. No hardcoded visible copy: Hero pulls every string from `profile.json`/`social.json`; `index.astro` title/description now derive from `profile` (pre-accepted deviation); `SectionLabel` copy comes only from the debug page (copy-rule exempt). Confirmed.
7. Structure matches SPEC §3.1: two-column grid at ≥640px with `order-first` photo for mobile photo-first stacking, monogram badge, serif+script name lockup in a single `<h1>`, rule, keywords, bio, script scroll hint + chevron to `#servicos`, social pill bar. `bg-bg` on `<body>` (`Base.astro:28`); `<main>` is the centered `max-w-[760px]` column. Confirmed.

## Findings

1. **(nit)** `Hero.astro:66-73` — the visible scroll-hint `<span>` text and the chevron `<a aria-label={profile.scrollHint}>` produce the same string twice for screen readers (once as text, once as link label). Exactly what the brief specified (decision 7), so not a deviation — noting only as a future a11y polish candidate.

## Report honesty
The report's "Deviations" section is accurate: it discloses the one scope-adjacent change (title/description sourcing in `index.astro`), pre-accepted by the Planner and matching the diff. No undisclosed changes found.

## Unverifiable items (need human/browser eyes)
- Pixel-level visual fidelity of blob silhouette, name-lockup overlap, and vertical distribution at 390px/1280px. Planner signed off in a real browser, with two logged minor polish items (script/serif overlap tightness, blob bottom-corner rounding).
- `text-muted` (#6e6e6a) on `bg` (#f5f2ed) for the bio computes to ~4.6:1, just above the 4.5:1 floor. Passes, but narrow margin — worth a human confirm on real displays. (Token set in Phase 1; out of this phase's control.)
