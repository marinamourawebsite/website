# Phase 4 Report — Quality: SEO, a11y, performance, TODO report

## Status: done

## What was built
- `src/layouts/Base.astro` — added SEO head (canonical, OG, Twitter), favicon link, commented Cloudflare analytics slot; switched Fontsource imports to `latin` + `latin-ext` subsets; derives description/OG from `profile` + `Astro.site`.
- `astro.config.mjs` — added `site: 'https://marinamoura.com'` (TODO domain) so canonical/OG URLs resolve to absolute.
- `public/favicon.svg` — new hand-authored monogram favicon (bg rounded square + stacked serif "M/M" + rule).
- `src/styles/global.css` — added global `:focus-visible` ring (2px `sage-dark`, 2px offset).
- `src/components/Hero.astro` — scroll hint restructured into a single `<a href="#servicos">` wrapping text + chevron (removes duplicate announcement, larger tap target; appearance unchanged).
- `src/components/Materials.astro` — download `aria-label` now folds `title` + `subtitle`.

## Decisions made
- **Base fetches `profile` itself** for the OG image URL (title/description still arrive as props from `index.astro`). Keeps `index.astro` unchanged and all copy CMS-sourced.
- **Analytics slot** uses Cloudflare's official beacon snippet, commented out. It renders as an inert HTML comment — no executable/rendered `<script>` tag exists in `dist` (verified: `grep` for an uncommented `<script...>` returns none). The literal string `<script` appears only inside that comment, which is exactly the "commented slot" the brief/SPEC §5 asked for and it does not run.
- **Font subsets**: imported both `latin-<w>.css` and `latin-ext-<w>.css` for all six weights. Portuguese diacritics (á à â ã ç é ê í ó ô õ ú) live in the Latin-1 range covered by the `latin` subset; `latin-ext` is kept for safety/completeness. dist woff2 count dropped to 12 (6 latin + 6 latin-ext) — no cyrillic/vietnamese shipped. Diacritics verified present and correct in `dist/index.html` (CONTEÚDO, histórias, experiências, começar, produção).
- **Focus style**: added a global `:focus-visible` floor in `global.css` in addition to the existing per-component utility outlines (kept; harmless and consistent).

## Deviations
- **Did not darken the `sage` token despite a failing contrast pair** (see audit below). `sage` script/accent text on `bg` computes to ~2.5:1, under the 3:1 large-text floor. Changing `sage` is a brand/visual-identity call (CLAUDE.md rule 1 "the reference wins" + global rule "no unrequested branding decisions") and touching that token is a visual redesign, explicitly **out of scope** for this phase. The reference art uses this exact sage for "Moura", the script headings and the scroll hint. I flag it for a human decision rather than unilaterally shifting the palette. All **body** text pairs pass. See Questions + TODOs.

## Contrast audit
Ratios computed from token hexes (WCAG relative-luminance). Threshold: 4.5:1 body / 3:1 large.

| Foreground | Background | Ratio | Role | Verdict |
|---|---|---|---|---|
| `ink` #2E2E2C | `bg` #F5F2ED | 12.2:1 | headings, keywords | pass |
| `muted` #6E6E6A | `bg` #F5F2ED | 4.6:1 | bio, section labels | pass (tight) |
| `ink` #2E2E2C | `surface` #FCFBF8 | 13.2:1 | card/service titles | pass |
| `muted` #6E6E6A | `surface` #FCFBF8 | 5.0:1 | card descriptions | pass |
| `ink` #2E2E2C | `surface` (footer pill) | 13.2:1 | "VAMOS CONVERSAR" | pass |
| `surface` #FCFBF8 | `sage-dark` #76866A | 3.8:1 | footer script (large) | pass (large only) |
| `sage` #8FA081 | `bg` #F5F2ED | **2.5:1** | script accents / "Moura" (large) | **FAILS 3:1** — flagged, token unchanged (see Deviations) |
| `surface` #FCFBF8 | `sage` #8FA081 | 2.7:1 | icon glyphs (non-text, `aria-hidden`) | n/a (decorative) |

## Build
`npm run build` exits 0. 1 page built. `dist/`:
- head: title, description (= bio), canonical, favicon link, full OG + Twitter tags with absolute URLs (`https://marinamoura.com/...`) — verified.
- 0 rendered `<script>` tags; analytics present only as an inert comment.
- fonts: 12 woff2 (6 latin + 6 latin-ext), no cyrillic/vietnamese.
- `dist/favicon.svg` present, valid markup.

## Lighthouse — BLOCKED (could not run)
`lighthouse` is not installed and `npx lighthouse` cannot auto-install in this sandbox (`npx canceled due to missing packages and no YES option`). Chrome is present but the package fetch is blocked. No scores were produced; none are faked.

Manual command for the human (from repo root):
```
npm run build
npm run preview            # note the printed port, e.g. 4321
npx lighthouse http://localhost:4321 \
  --preset=desktop=false --emulated-form-factor=mobile \
  --only-categories=performance,accessibility,best-practices,seo \
  --view
```
(or simply `npx lighthouse http://localhost:4321 --view` for the default mobile run.)

## TODOs introduced (this phase)
- `astro.config.mjs`: `site` = placeholder domain `https://marinamoura.com` — `// TODO(Leo): real domain`.
- `src/layouts/Base.astro`: Cloudflare Web Analytics token — `TODO(Leo): token` (uncomment slot when set).

## Complete project TODO / handoff list (deduplicated)
Placeholders and manual steps the human must resolve before launch:

1. **Real domain** — set `site` in `astro.config.mjs` and `site_url` in `public/admin/config.yml` (both currently `marinamoura.com` placeholder).
2. **WhatsApp number** — replace `55XXXXXXXXXXX` in every `wa.me` link (`social.json`, `services.json`, `connect.json`, `cta.json`).
3. **Email** — replace `mailto:TODO@example.com` (`connect.json`).
4. **Social URLs** — Instagram `.../TODO`, TikTok `@TODO`, LinkedIn `.../TODO`, Portfólio `https://TODO.example.com` (`social.json`, `connect.json`).
5. **Images** — replace placeholder SVGs in `public/uploads/` (profile, about, 3 material thumbnails) with real photos + verify `alt` text.
6. **Material PDFs** — add real files at `public/materials/{checklist,ferramentas,apps}.pdf`.
7. **Analytics token** — add Cloudflare Web Analytics token and uncomment the slot in `Base.astro`.
8. **CMS backend** — set `repo`, `branch`, `base_url` in `public/admin/config.yml`; deploy the Sveltia CMS auth worker.
9. **Sveltia version bump** — `public/admin/index.html` pins the Sveltia script via SRI; to upgrade, bump the version + regenerate the `integrity` hash together.
10. **CMS manual test** — after backend is live, log into `/admin` and confirm each singleton loads, edits, and commits.
11. **Contrast decision** — `sage` script/accent text on `bg` is ~2.5:1 (below 3:1 large-text). Decide: accept as decorative brand accent, or approve a darker sage token (would shift the palette vs. the reference).
12. **Lighthouse** — run the manual command above once deployed; confirm all four categories ≥ 95 on mobile.

## Questions for reviewer
- **Contrast vs. fidelity**: the sage script accents fail 3:1. I left the token alone to honor "reference wins" and avoid an unrequested branding change. Is that the right call, or should sage be darkened? This is the item I'm least confident about.
- **Analytics comment**: acceptable that the string `<script` appears inside an inert HTML comment in `dist`? It does not render/execute; it is the commented slot the brief requested. If a stricter "zero `<script>` substring" gate is desired, I can move the snippet's guidance out of a raw comment.
