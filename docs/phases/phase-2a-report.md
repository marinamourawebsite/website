# Phase 2a Report — SectionLabel + Hero

**Status**: done

## What was built
- `src/components/Icon.astro` — added `chevron-down` / `chevron-right` under a commented UI-decoration tier (now 13 names; CMS selects + zod enums untouched).
- `src/components/SectionLabel.astro` — new `· LABEL ·` component, prop `label`; uppercase letterspaced sans, flanking dots in `sage`.
- `src/components/Hero.astro` — new hero section, all copy from `profile.json` / `social.json`.
- `src/pages/index.astro` — page shell: centered `max-w-[760px]` column on `bg-bg`, renders `<Hero />`; title/description now sourced from `profile` (was hardcoded).
- `src/styles/global.css` — CSS-only smooth scroll wrapped in `@media (prefers-reduced-motion: no-preference)`.
- `src/pages/debug.astro` — added SectionLabel sample + 2 chevrons to the icon grid (debug is copy-rule exempt, deleted in 2c).

## Decisions made
- Reduced-motion guard implemented as `@media (prefers-reduced-motion: no-preference) { html { scroll-behavior: smooth } }` — default (and reduce) stays `auto`, satisfying the brief guard without a second override rule.
- Blob radius: `rounded-tl-[2rem] rounded-tr-[7rem] rounded-br-[2rem] rounded-bl-[6rem]` (top-right heaviest, per reference silhouette). Arbitrary radii allowed by brief.
- Photo explicit dims `560x720` (~4:5 portrait) for CLS; `loading="eager"` (LCP).
- Name lockup is a single `<h1>` with two spans (serif firstName + script lastName), script tucked with negative top margin.
- Text column is centered (`text-center`, vertically `justify-center`) at both breakpoints, matching the reference’s centered right column.
- Grid `sm:grid-cols-[minmax(0,0.9fr)_1fr]`, photo `order-first` so mobile stacks photo-first (SPEC §3).
- Hero `<section aria-label>` derived from `firstName + lastName` (JSON-derived, not hardcoded).
- `index.astro` title/description pulled from `profile` to avoid hardcoded copy; full SEO/OG deferred to Phase 4 per scope.

## Deviations
- None from the brief. Minor scope-adjacent improvement: replaced the pre-existing hardcoded `'Marina Moura'` title/description in `index.astro` with `profile`-sourced values (removes a copy-rule violation; no OG/meta work added).

## Build
`npm run build` exits 0. 2 pages built (`/index.html`, `/debug/index.html`). Verified in `dist/index.html`: 0 `<script>` tags; `href="#servicos"` + matching `aria-label`; keywords/bio strings; stacked `M`/`M` monogram; `<img alt="Marina Moura" width="560" height="720">`; 4 social `<a>` aria-labels (Instagram/TikTok/LinkedIn/WhatsApp). CSS contains `@media (prefers-reduced-motion:no-preference){html{scroll-behavior:smooth}}`.

## TODOs introduced
- None new. Existing placeholders remain in `social.json` (`/TODO` handles, `wa.me/55XXXXXXXXXXX`) and `profile.photo` points at placeholder `/uploads/profile.svg` — real assets are Leo’s to supply.

## Questions for reviewer
- Blob corner radii are a visual approximation of the reference; confirm the silhouette reads correctly at 390px and 1280px.
- Text column uses `justify-center`; reference distributes monogram-near-top / pill-near-bottom against the tall photo. If tighter vertical match is wanted, switch to `justify-between`.
- Name lockup sizes (`text-6xl`/`sm:text-7xl` serif, `text-5xl`/`sm:text-6xl` script) — confirm the "Marina" scale vs. column width matches the reference.
