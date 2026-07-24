# Phase 2a Brief — SectionLabel + Hero

## Objective

`SectionLabel.astro` and `Hero.astro` built and rendered on `index.astro`, matching `design/reference.png` at 390px and 1280px. Build green.

## Context from approved phases

- Content layer done: pull all copy via `getEntry(<collection>, 'data')` (singleton parser wrapper, entry id `data`). Collections: `profile`, `social` (others not used this phase).
- `Icon.astro` exists (11 CMS-selectable lucide icons, throws on unknown name).
- Tokens in `global.css` (`bg`, `surface`, `sage`, `sage-dark`, `ink`, `muted`, `line`; `--font-serif/script/sans`). No raw hex outside the `@theme` block, ever.
- Conventional commits, **no co-author trailers / attribution footers**.

## Decisions already made (do not re-decide)

1. **Page shell**: `index.astro` gets the real content column this phase — single centered column, `max-w` ≈ 760px (match reference proportions), horizontal padding for small screens, on `bg-bg`. Hero is its first section; later sections append in 2b/2c.
2. **SectionLabel.astro**: reusable; prop `label` (string). Renders `· LABEL ·` — uppercase, small, letterspaced sans; flanking dots in `sage`. Match reference size/tracking/spacing. (Not used by Hero; built now because 2b/2c consume it. Render one instance on the debug page so it's visually verifiable this phase — debug page is exempt from the copy rule and dies in 2c.)
3. **Hero layout**: two columns at ≥ ~640px (photo left ≈ 45–50%, text column right, both full-height aligned as in reference); stacked below that breakpoint, **photo first** (SPEC §3). At 1280px the layout is simply the centered 760px column — no wide-screen redesign.
4. **Photo**: `<img>` with `src` from `profile.photo` (public path — no `astro:assets` optimization for CMS-managed paths), `alt` from `profile.photoAlt`, explicit `width`/`height` (prevent CLS), eager loading (it's the LCP). Blob shape: large asymmetric border-radius, top-right heavily rounded — match the reference silhouette; arbitrary radius values in the component are fine (the "no raw values" rule covers colors only).
5. **Monogram badge**: thin `ink`-outlined circle. Parse `profile.monogram`: if it contains `/`, render the two parts stacked in `font-serif` with a thin horizontal rule between them (reference shows M over rule over M); otherwise render the string as-is inside the circle.
6. **Name lockup**: `profile.firstName` in `font-serif` large (weight 500/600, tight tracking, `ink`); `profile.lastName` in `font-script` `sage`, overlapping/tucked under the serif line as in the reference; thin horizontal rule below the lockup; then `profile.keywords` (string already contains the `·` separators) uppercase, letterspaced, small; then `profile.bio` in `muted`.
7. **Scroll hint + chevron**: `profile.scrollHint` in `font-script` `sage`; below it a chevron-down inside `<a href="#servicos" aria-label={profile.scrollHint}>`. The `#servicos` target section arrives in Phase 2b — the dead anchor this phase is expected and fine.
8. **Smooth scroll is CSS-only — zero JS.** In `global.css`: `html { scroll-behavior: smooth }` wrapped so that `prefers-reduced-motion: reduce` gets `auto` (guard required). This satisfies SPEC's smooth-scroll requirement with no client script at all (better than the allowed JS budget). Do not add a `<script>`.
9. **New icons — UI decoration tier**: add `chevron-down` and `chevron-right` (lucide) to `Icon.astro`'s map. Planner ruling on CLAUDE.md rule 5: these are **UI decoration, not content icons** — they must NOT be added to any CMS select in `config.yml` nor to the zod icon enums. Add a short comment in `Icon.astro` separating the two tiers. (`chevron-right` is consumed by 2b's service cards; adding both now avoids touching the whitelist twice.)
10. **Social pill bar**: one `surface` pill (fully rounded, `line` border, very soft shadow) containing the `social.items` as circular outlined icon buttons (thin `line`/`ink` outline, `ink` glyphs) — `<a>` with `aria-label` from `item.label`, `target="_blank"` + `rel="noopener noreferrer"` for external links. 4 items currently in JSON; the component maps whatever the JSON holds.
11. **No hardcoded user-visible copy.** Every visible string in Hero comes from `profile.json`/`social.json`. `aria-label`s reuse JSON fields as specified above.

## Scope

**In:** `src/components/SectionLabel.astro`, `src/components/Hero.astro`, `src/pages/index.astro` (shell + Hero), `src/styles/global.css` (scroll-behavior only), `src/components/Icon.astro` (add 2 decoration icons), `src/pages/debug.astro` (add SectionLabel sample + 2 new icons to the icon grid).

**Out:** Services/About/Connect/Materials/FooterCta components, `config.yml`, content JSON edits, SEO/OG (Phase 4).

## Acceptance criteria

1. `npm run build` exits 0.
2. `dist/index.html` contains: hero `<section>`; `<img>` with `alt` from `photoAlt` + explicit dimensions; monogram stacked parse of `M/M`; firstName/lastName/keywords/bio/scrollHint strings (grep against `profile.json` values); anchor `href="#servicos"` with `aria-label`; 4 social `<a>`s with `aria-label`s from `social.json`.
3. `global.css` has smooth-scroll with the `prefers-reduced-motion` guard; **no `<script>` anywhere in `dist/index.html`**.
4. `Icon.astro`: 13 names total, chevrons commented as decoration-tier; CMS selects and zod enums untouched.
5. No raw hex outside `global.css` `@theme`; only token color classes in components.
6. No hardcoded visible copy in `Hero`/`SectionLabel`/`index.astro`.
7. Layout structurally matches the reference at 390px and 1280px (visual sign-off happens at planner/human level — you verify structure, spacing intent, and class correctness).
8. Conventional commits, no attribution trailers; report at `docs/phases/phase-2a-report.md`.
