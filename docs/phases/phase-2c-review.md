# Phase 2c Review — Connect + Materials + FooterCta + assembly

> Note (Planner): reviewer output persisted verbatim by the Planner (reviewer has no Write tool).

**Verdict:** `approved`

### Verified clean
- **Debug page fully removed** — `src/pages/debug.astro` deleted (commit `fbb137f`); `dist/debug/` absent after fresh build. Only `src/pages/index.astro` remains.
- **Icon.astro decoration-tier isolation** — exactly 17 names (11 content + 6 decoration: chevron-down, chevron-right, check, heart, download, arrow-right). Decoration icons confirmed absent from `public/admin/config.yml` and `src/content.config.ts`. `Icon.astro:47-58`.
- **mailto handling** — `Connect.astro:11` `external()` helper correctly omits `target`/`rel` for `mailto:`; rendered `dist/index.html` confirms the `mailto:TODO@example.com` card has neither attribute while all `https://` cards get `target="_blank" rel="noopener noreferrer"`.
- **Download attrs + aria-labels** — all 3 material anchors render `download` + `aria-label` (`Materials.astro:33-35`).
- **Section spacing normalized** — every section root uses `mt-12 sm:mt-16`; Services carries an orthogonal `scroll-mt-8` anchor offset. The 2b `pt-*`/`mt-*` split is resolved.
- **No hardcoded copy** — all visible text via `connect.*` / `materials.*` / `cta.*` bindings; no raw hex in `src/components/`; 0 `<script>` tags in `dist/index.html`.
- **Assembly order** — Hero → `#servicos` → about → connect → materials → `<footer>`, confirmed in rendered HTML.
- **Build** — `npm run build` exits 0, 1 page.

### Findings
1. **nit — `Materials.astro:29`** — download link `aria-label={item.title}` yields a weak label for card 2 (`aria-label="MINHAS"`) because the content model splits the name across `title`("MINHAS") + `subtitle`("ferramentas favoritas"). Follows the brief exactly, so not a blocker — but a screen reader announces "MINHAS, link". Worth a future note (e.g. `aria-label` combining title + subtitle).
2. **nit — report honesty** — the diff since 2b includes `Hero.astro` changes (blob bottom radius + script tuck, commit `7fcc504`) not mentioned in the 2c report. These belong to the 2b work (a pre-2c commit), so they are legitimately outside the 2c report's scope — flagged only for completeness.

### Unverifiable items (need human eyes)
- Pixel-level fidelity vs `design/reference.png` (Connect card proportions, FooterCta bar radius/breathing room, About one-line heading). Per Planner note, the full-page browser gate at 390/1280 already passed all six sections.
