# Orchestration log (append-only)

- **Phase 0** — approved in 1 round (0 fix rounds). Notable: Astro is now v7.1.3 (brief's "Astro 5" was stale; accepted); global Node 20.0.0 too old, pinned 22.22.2 via `.tool-versions`; reviewer agent lacks a Write tool so the Planner persists review files verbatim (setup mismatch, flagged to human); carried nit → trim non-latin Fontsource subsets in a later perf pass (Phase 4).
- **Phase 1** — approved in 1 round (0 fix rounds). Notable: executor caught `file()` loader flat-JSON pitfall and solved it with the documented parser wrapper (entry id `data`); per-collection icon enums stricter than a shared enum; carried → ♡ decorations must be added component-side in Phase 2b (About); materials `file` path convention (`/materials/` vs config `public_folder: /uploads`) to reconcile in Phase 3; icon brand-glyph substitutions (tiktok→music-2, whatsapp→phone) escalated to human as visual tradeoff.
- **Phase 2a** — approved in 1 round (0 fix rounds). Notable: smooth scroll shipped CSS-only (zero JS beats the allowed JS budget); chevrons added to Icon.astro as a "decoration tier" excluded from CMS/zod (planner ruling on rule 5); Planner did real-browser visual gating at 390/1280 via preview server + scaled-iframe harness (window resize doesn't stick in fullscreen Chrome); carried minors → loosen "Moura"/"Marina" overlap, reduce blob bottom-corner rounding (into 2b); muted-on-bg contrast is ~4.6:1 (tight but passing — Phase 4 check).
- **Phase 2b** — approved in 1 round (0 fix rounds). Notable: section labels had no CMS field (rule-2 gap in the original content model) — planner directed a 3-way `sectionLabel` sync (config.yml + zod + JSON) which the executor landed in one commit; check/heart added to decoration tier (15 icons); Hero polish carries verified fixed in browser; carried minor → About middle column too narrow at 760px (heading wraps, heart floats) into 2c; nit → unify section spacing utility (pt vs mt) in 2c.
- **Phase 2c** — approved in 1 round (0 fix rounds). Full page assembled and browser-gated at 390/1280 against reference: pass. Notable: debug page deleted on schedule; decoration tier now 6 icons (17 total); mailto correctly excluded from target/rel; spacing unified to `mt-*`. Carried nit → materials download aria-label weak ("MINHAS") because card name splits title/subtitle; fold title+subtitle into the label in Phase 4 a11y sweep.
- **Phase 3** — approved in 1 round (0 fix rounds). Notable: security hook on the Planner's brief forced SRI hardening — Sveltia pinned to 0.172.4 with sha384 integrity (version+hash must be bumped together, documented); materials file-field media/public folder override added (runtime semantics unverifiable offline → human checklist); Planner browser smoke test: Sveltia boots at /admin, config parses, local-repo flow offered. Human checklist items: full CMS edit round-trip, upload-folder resolution, production OAuth (post-deploy).
- **Phase 4** — approved in 1 round (0 fix rounds). Notable: Lighthouse blocked in executor sandbox (npx can't auto-install), Planner ran it out-of-band against the preview build — mobile scores: performance 98, accessibility 95, best-practices 100, SEO 100 (all ≥ 95, criterion met); the one failing a11y audit is sage-on-bg contrast (~2.5:1), ruled a reference-fidelity/branding decision and escalated to human rather than changed; fonts trimmed to latin/latin-ext (22 → 12 woff2); carried nit → per-component `outline-sage` focus utilities override the higher-contrast global `sage-dark` ring on Hero/Services/Connect (follow-up cleanup candidate).
- **Phase 5** (post-delivery adjustment, human-requested) — approved in 2 rounds (1 fix round). Resolves handoff TODO 13. Notable: human chose reference-fidelity over uniform brand glyphs, so the icon set is deliberately mixed (TikTok/LinkedIn solid, Instagram/WhatsApp outline); Planner pre-fetched the Simple Icons paths into the brief rather than letting either agent reproduce path data from memory. Executor beat both options the brief offered for WhatsApp — instead of hand-drawing an outline it split the official path by subpath (handset filled, bubble stroked), keeping official geometry. Two executor flags: the Conectar-section treatment differs from the hero in the reference (**correct** — the brief's global-solid target table was a Planner error; human accepted the divergence rather than adding a `variant` prop), and a horizontal overflow below 500px (**false** — Planner re-measured in-browser via same-origin iframe at 360/390/500/768px, zero offenders, `Connect.astro` has `flex-wrap`; harness artifact). LinkedIn escalated as designed: official glyph's filled plate reads as a black square in the chip, human signed off on the plate-less derivation. Orchestration note: the executor's "stop and report, don't improvise a brand mark" instruction worked exactly as intended. Reviewer carried 1 minor + 4 nits, none blocking.

## Final TODO / handoff list (from phase-4 report, project complete)

1. **Real domain** — set `site` in `astro.config.mjs` and `site_url` in `public/admin/config.yml` (both currently `marinamoura.com` placeholder).
2. **WhatsApp number** — replace `55XXXXXXXXXXX` in every `wa.me` link (`social.json`, `services.json`, `connect.json`, `cta.json`).
3. **Email** — replace `mailto:TODO@example.com` (`connect.json`).
4. **Social URLs** — Instagram `.../TODO`, TikTok `@TODO`, LinkedIn `.../TODO`, Portfólio `https://TODO.example.com` (`social.json`, `connect.json`).
5. **Images** — replace placeholder SVGs in `public/uploads/` (profile, about, 3 material thumbnails) with real photos + verify `alt` text.
6. **Material PDFs** — add real files at `public/materials/{checklist,ferramentas,apps}.pdf`.
7. **Analytics token** — add Cloudflare Web Analytics token and uncomment the slot in `Base.astro`.
8. **CMS backend** — set `repo`, `branch`, `base_url` in `public/admin/config.yml`; deploy the sveltia-cms-auth worker + GitHub OAuth App (PLAN "Manual steps").
9. **Sveltia version bump procedure** — `public/admin/index.html` pins the Sveltia script via SRI; upgrades must bump version + `integrity` hash together.
10. **CMS manual test** — local: `npm run dev` → `/admin` → "Work with Local Repository" edit round-trip (script in phase-3 report); production: after backend is live, confirm each singleton loads, edits, commits — and that a materials PDF upload lands in `public/materials/`.
11. **Contrast decision** — sage script/accent text on `bg` is ~2.5:1 (below the 3:1 large-text floor). Accept as decorative brand accent (matches reference) or approve a darker sage token (palette shift vs. reference).
12. **Lighthouse re-check post-launch** — Planner's local run passed (98/95/100/100 mobile); re-run once deployed with real assets.
13. **Icon fidelity decision** — TikTok/WhatsApp render as lucide `music-2`/`phone` stand-ins (lucide has no brand glyphs); accept, or approve adding real brand SVGs to `Icon.astro`.
14. **Focus-ring unification** — optional cleanup: drop per-component `outline-sage` utilities so all focus rings use the global `sage-dark` floor.

## Status 2026-08-04 (session close)

Progress against the list above, so the next session doesn't re-derive it:

- **DONE — items 2, 3, 4.** Real contact data filled in commit `a05b647`: WhatsApp `5561982047955`
  across all 8 links, `marinamourabrasil@gmail.com`, and Instagram / TikTok / LinkedIn (all
  `@amarinamoura`). TikTok share-link tracking params were stripped (they expire). This knowingly
  overrides CLAUDE.md rule 8 — at launch stage that data is the site's public content, and the human
  supplied it for exactly that purpose.
- **DONE — item 13.** Resolved by Phase 5; TikTok/LinkedIn/WhatsApp now use real brand marks.
- **PARTIAL — item 4.** Portfolio URL is the only remaining `TODO` in content
  (`connect.json`, PORTFÓLIO card → `https://TODO.example.com`). Human has not decided between
  supplying a URL, repointing it, or dropping the card (the row reflows fine at 4 cards).
- **OPEN, unchanged** — items 1, 5, 6, 7, 8, 9, 10, 11, 12, 14. Nothing pushed anywhere; the repo
  still has no git remote.
- **Carried from the phase-5 review** — `Icon.astro`'s header comment claims LinkedIn is the only
  brand glyph with modified geometry, but the WhatsApp glyph also had its outer-bubble subpath
  removed. Comment-only fix, agreed with the human, not yet applied.
- **Recommended next move** (proposed, not decided): deploy with placeholders first so `/admin`
  goes live and Marina fills her own content, instead of blocking on assets.

## Launch track (2026-10-10)

- **Process change, human-approved.** Remaining launch work is config, accounts and client assets
  (domain, CMS backend, Cloudflare Pages, OAuth App, PDFs), none of it in `src/`. The Planner
  handles it directly with the human, outside the brief → execute → review loop, to avoid
  ceremony on non-code steps. Any change that touches `src/` still goes through the loop.
- **Config, done by Planner.** Domain is `amarinamoura.com.br` (already on Cloudflare, awaiting
  registro.br DNS propagation): set in `astro.config.mjs` `site` and `config.yml` `site_url`.
  `config.yml` `repo` set to `marinamourawebsite/website`. `base_url` stays TODO until the
  sveltia-cms-auth Worker is deployed.
- **Phase 6 opened** (human request): CMS control over section visibility and order. Footer CTA
  stays locked at the end by human decision.
- **Phase 6** — approved in 1 round (0 fix rounds). CMS "Página" screen: fixed 4-row list (services, about, connect, materials) with visibility toggles and drag reorder; Hero and Footer CTA locked. Notable: executor ran 5 mutation scenarios (reorder, hide, all hidden, duplicate id, missing id) against `dist/`, all correct; chevron target resolved at build time, still zero JS. Executor correctly refused the session's Co-Authored-By trailer in favour of the human's global CLAUDE.md. Reviewer findings: SPEC §4 missing `page.json` (Planner fixed), and CMS row labels are static (handover note). Sveltia option names (`allow_remove`, `allow_reorder`, `readonly` on select) are unverifiable offline: carried to a browser check on the deployed `/admin`. Unverified executor claim carried: `astro check` type error at `Icon.astro:105`, said to pre-date Phase 6.
- **Launch track** — sveltia-cms-auth Worker deployed at `sveltia-cms-auth.marinamourawebsite.workers.dev` (Deploy to Cloudflare button, seed repo copied to `marinamourawebsite/sveltia-cms-auth`); `config.yml` `base_url` set. GitHub OAuth App registered with token expiry and device flow off. Site on Cloudflare Pages at `website-55m.pages.dev` with `NODE_VERSION=22`.
