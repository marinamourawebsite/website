# Phase 2c Report — Connect + Materials + FooterCta + full assembly

**Status:** done

## What was built
- `src/components/Icon.astro` — added `download` + `arrow-right` to the decoration tier (17 icons total; not in CMS selects / zod enums).
- `src/components/Connect.astro` (new) — `· VAMOS NOS CONECTAR ·`, centered `flex-wrap` of 5 square outlined `<a>` cards (icon + uppercase label); external links get `target=_blank rel=noopener`, `mailto:` gets neither.
- `src/components/Materials.astro` (new) — `· MATERIAIS GRATUITOS ·`, `grid-cols-1 sm:grid-cols-3` cards: 4:3 `object-cover` image, uppercase title + subtitle, `sage-dark` circular download button (`<a download aria-label>`).
- `src/components/FooterCta.astro` (new) — `<footer>` full-width `sage-dark` rounded bar; script text left, white pill button with `arrow-right`; stacks centered below 640px.
- `src/components/Services.astro` — spacing normalized `pt-*` → `mt-*`; added `scroll-mt-8` for the `#servicos` anchor.
- `src/components/About.astro` — column rebalance only: photo `sm:w-40 md:w-44`, sideNote `sm:w-28 md:w-36` (middle column widened so heading fits one line).
- `src/pages/index.astro` — assembled Hero → Services → About → Connect → Materials → FooterCta.
- `src/pages/debug.astro` — deleted.

## Decisions made
- **Spacing utility choice:** normalized every section (Services, About, Connect, Materials, FooterCta) to `mt-12 sm:mt-16`. Hero stays first with no top margin.
- **Scroll anchor breathing room:** since `mt` (unlike `pt`) sits outside the border box, added `scroll-mt-8` to Services so the smooth-scroll landing keeps a little space above the section label. This is an anchor-offset utility, orthogonal to the section-spacing rule.
- **Connect card sizing:** fixed `w-[104px] h-[92px]` squares — wraps 3+2 centered at 390px, single row of 5 at ≥640px (fits within the 760px column).
- **Materials image dimensions:** authored `400×300` (4:3) with `aspect-[4/3] object-cover`.

## Deviations
- None from the brief. Icon markup for `download`/`arrow-right` taken from standard lucide 24×24 paths, consistent with the existing whitelist style.

## Build
`npm run build` exits 0. 1 page built (`/index.html`) in ~0.5s. Verified: `dist/debug/` absent; 0 `<script>` tags in `dist/index.html`; section order hero → `#servicos` → about → connect → materials → `<footer>`; 3 download anchors with `download aria-label`; mailto anchor has no `target`/`rel`; `download`/`arrow-right` absent from `config.yml` and `content.config.ts`.

## TODOs introduced
- None new. Existing placeholders remain in content JSON (from prior phases): `connect.json` (instagram/tiktok/portfolio/whatsapp/email URLs, `mailto:TODO`), `cta.json` + `connect.json` WhatsApp `55XXXXXXXXXXX`, `materials/*.pdf` are placeholder files, `uploads/material-*.svg` are placeholder images.

## Questions for reviewer
- **About one-line heading:** rebalanced by column widths only (per brief). At the 760px breakpoint the middle column is ~330px, which my math says comfortably holds "um pouco sobre mim ♡" in Allura 4xl — but the final visual gate is the Planner's browser pass; confirm it does not wrap.
- **Connect card proportions:** chose 104×92 to match the reference's slightly-wider-than-tall look; confirm against `design/reference.png`.
- **FooterCta bottom breathing room** comes from `main`'s existing `pb-16`; confirm that matches the reference's spacing to page bottom.
