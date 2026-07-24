# Phase 4 Brief — Quality: SEO, a11y, performance, TODO report

## Objective

Production-quality pass: SEO head, favicon, a11y sweep (incl. carried nits), font-payload trim, analytics slot, Lighthouse ≥ 95 mobile (or a documented blocked attempt), and a complete TODO compilation. Build green.

## Context from approved phases

All sections built and visually gated; CMS admin working. Carried items from earlier reviews are folded in below. Conventional commits, **no attribution trailers**.

## Decisions already made (do not re-decide)

1. **SEO head in `Base.astro`**:
   - `<title>` and meta description already derive from `profile`; make description use `profile.bio` (real copy) instead of echoing the name.
   - Set `site: 'https://marinamoura.com'` in `astro.config.mjs` with a `// TODO(Leo): real domain` comment (mirrors config.yml's `site_url` TODO). Derive canonical URL and OG URLs from `Astro.site`.
   - OG/Twitter tags: `og:type` website, `og:title`, `og:description`, `og:image` (absolute URL to `profile.photo`), `og:locale` `pt_BR`, `twitter:card` `summary_large_image`. All values from content JSON — no hardcoded copy.
2. **Favicon from monogram** (SPEC §5): hand-author `public/favicon.svg` — `bg`-colored rounded square, serif "M/M" stacked (match the monogram badge look; you may inline the two letters + rule as SVG text/paths using the same hex values as the tokens — a favicon SVG is outside Tailwind, so the token hexes may appear there, with a comment pointing at `global.css` as the source of truth). Link it in `Base.astro` (`rel="icon" type="image/svg+xml"`).
3. **Analytics slot**: commented-out Cloudflare Web Analytics `<script>` block in `Base.astro` head with a `TODO(Leo): token` note (SPEC §5 — commented slot only, must NOT render).
4. **Font payload trim** (carried from Phase 0): switch Fontsource imports to subset-scoped files — `latin` + `latin-ext` only, same weights (Cormorant Garamond 500/600, Allura 400, Poppins 400/500/600). Verify pt-BR diacritics (ã õ ç é ê í ó ú à) still render from the latin/latin-ext unicode-ranges. Expect dist woff2 count to drop.
5. **A11y sweep**:
   - Global visible focus style: `:focus-visible` ring (e.g. 2px `sage-dark` outline + offset) applied consistently; verify keyboard tab order hits every link.
   - Carried: Materials download links — `aria-label` folds title + subtitle (e.g. `"CHECKLIST — para produzir melhores Reels (download)"`... construct from the two JSON fields; no hardcoded words beyond generic connector punctuation; do NOT hardcode the word "download" as copy — the `download` attribute + icon suffice, so label = `` `${item.title} ${item.subtitle}` ``).
   - Carried: Hero scroll hint duplication — restructure so the script text and chevron form ONE `<a href="#servicos">` (text + icon inside the same link); removes the duplicate announcement and enlarges the tap target. Visual appearance must not change.
   - Contrast audit: verify all token text/background pairs used on the page meet ≥ 4.5:1 (body) / 3:1 (large text). Known tight pair: `muted` on `bg` ≈ 4.6:1 — passes; do not change tokens unless a pair actually fails, and if one does, darken the foreground token minimally in `global.css` and report the delta.
   - Image `alt`s, `aria-label`s, landmark structure: audit only — already largely in place; fix anything found.
6. **Lighthouse**: attempt `npx lighthouse http://localhost:<port> --preset=perf`-style run (mobile emulation, all categories) against a local preview build. `npx lighthouse` is not on the Bash allowlist — the attempt may hit a permission prompt or fail offline. If it runs: record all 4 scores in the report; iterate if any < 95 (within this phase's scope only). If it cannot run: say so plainly and list the manual command for the human. Do not fake scores.
7. **TODO compilation**: end your report with the complete, deduplicated TODO list for the human (placeholder assets, wa.me numbers, emails, social URLs, domain, config.yml backend values, Sveltia version-bump procedure, CMS manual test, Lighthouse if blocked). This list will be copied into `docs/phases/LOG.md` as the project's final handoff data.

## Scope

**In:** `src/layouts/Base.astro`, `astro.config.mjs`, `public/favicon.svg` (new), `src/components/{Hero,Materials}.astro` (the two carried a11y fixes only), `src/styles/global.css` (focus-visible; token adjustment only if a contrast pair fails).
**Out:** content JSON, config.yml, new sections, any visual redesign. `dist/index.html` must remain `<script>`-free (analytics stays commented).

## Acceptance criteria

1. `npm run build` exits 0.
2. `dist/index.html` head: title, description (= bio), canonical, OG/Twitter set with absolute URLs, favicon link; still 0 `<script>` tags; commented analytics slot present in source.
3. `public/favicon.svg` exists and renders the monogram (open it in the build output to sanity-check markup validity).
4. Font files in dist are latin/latin-ext subsets only, same six weight imports; pt-BR diacritics verified in rendered output.
5. Focus-visible outline present in built CSS; Hero scroll hint is a single link; Materials aria-labels include title + subtitle.
6. Contrast audit table in the report (pair → ratio → pass).
7. Lighthouse: 4 scores ≥ 95 recorded, or a clear blocked-attempt note with the exact manual command.
8. Complete TODO list in the report. Conventional commits, no attribution trailers; report at `docs/phases/phase-4-report.md`.
