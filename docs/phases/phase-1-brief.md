# Phase 1 Brief — Content layer

## Objective

The 7 JSON content singletons, matching zod schemas via `astro:content`, and `Icon.astro`. A temporary `/debug` page proves every field and every icon renders. Build green.

## Context from Phase 0 (approved)

Scaffold is in place: Astro 7.1.3, Tailwind v4 tokens in `src/styles/global.css`, `Base.astro`, empty `index.astro`. Node pinned via `.tool-versions` (asdf). Conventional commits, **no co-author trailers / attribution footers**.

## Decisions already made (do not re-decide)

1. **`public/admin/config.yml` is the content-model contract.** It already exists and is authoritative. Schemas and JSON must match its field names exactly — including where it differs from SPEC §4: materials items use `file` (not `fileUrl`) and include `imageAlt`; icon select values are semantic names (`tiktok`, `whatsapp`, `linkedin`), not raw lucide names. Do not edit config.yml this phase; if you find a genuine contradiction that forces a schema change, stop and report it instead.
2. **Icon whitelist** = the union of config.yml's select options, exactly these 11 keys:
   `instagram, tiktok, linkedin, whatsapp, mail, video, smartphone, ticket, handshake, lightbulb, folder`
3. **Icon SVG sourcing**: hand-inline lucide SVG markup inside `Icon.astro` (a `name → svg` map). **No new npm dependency** for icons. Mapping for keys lucide lacks a brand glyph for: `tiktok` → lucide `music-2` paths; `whatsapp` → lucide `phone` paths. All others map 1:1 to the same-named lucide icon (`instagram`, `linkedin`, `mail`, `video`, `smartphone`, `ticket`, `handshake`, `lightbulb`, `folder`). Known visual-fidelity tradeoff vs the reference's real brand glyphs — already escalated to the human, not yours to solve.
   - `Icon.astro` props: `name` (required), optional sizing/class pass-through. Unknown name must **throw at build time** (never render silently).
   - SVGs render with `stroke="currentColor"`, `fill="none"`, `aria-hidden="true"` (associated text/labels carry meaning), standard lucide 24×24 viewBox.
4. **Collections**: define in `src/content.config.ts` using the `file()` loader from `astro/loaders`, one collection per singleton JSON, zod schemas mirroring config.yml field-for-field. All fields required (no `.optional()`) — the CMS always writes them.
5. **JSON copy comes from `design/reference.png`** — transcribe the actual pt-BR copy visible in the reference (hero bio, 5 service cards, about bullets, side note, connect labels, 3 materials, CTA). This is a reproduction brief; do not invent alternative copy.
6. **No real personal data** (CLAUDE.md rule 8): WhatsApp URLs use `https://wa.me/55XXXXXXXXXXX?text=...` placeholder; email uses `TODO@example.com`; social/portfolio URLs use `https://instagram.com/TODO`-style placeholders. List every placeholder under "TODOs introduced" in your report.
7. **Placeholder assets**: create simple local placeholder images in `public/uploads/` (e.g. small solid-color or labeled SVG/PNG you generate — no downloads, no network) for `profile.photo`, `about.photo`, and the 3 material card images, and reference them from the JSON. Material `file` fields point at `/materials/<slug>.pdf` paths; create `public/materials/` with tiny valid placeholder PDFs (a minimal hand-written PDF is fine). All placeholders are flagged as TODOs for real assets.
8. **Debug page**: `src/pages/debug.astro` — renders every field of all 7 singletons (via `getEntry`) plus all 11 icons with their key names. Plain unstyled-ish output is fine; this page is scaffolding, will be **deleted in Phase 2c**, and is exempt from the no-hardcoded-copy rule (its labels are developer-facing, not product copy). Note the planned deletion in your report.

## Scope

**In:** `src/content/*.json` (7 files), `src/content.config.ts`, `src/components/Icon.astro`, `src/pages/debug.astro`, placeholder assets in `public/uploads/` and `public/materials/`.

**Out:** all other components, `index.astro` (stays empty), `Base.astro`, `global.css`, `public/admin/`, any styling work beyond making /debug readable.

## Acceptance criteria

1. `npm run build` exits 0; collections validate the 7 JSON files (a deliberately broken field fails the build — verify once locally, then restore).
2. Field names in JSON + zod match `public/admin/config.yml` exactly (names, list shapes, select option sets).
3. `Icon.astro` renders all 11 whitelisted names; an unknown name throws at build.
4. `dist/debug/index.html` contains every string field's value from all 7 JSONs and 11 inline `<svg>` elements.
5. JSON copy is the pt-BR copy from the reference image; no real phone/email/URLs — grep-clean of anything that looks like real personal data.
6. Conventional commits, one logical change each, no attribution trailers/footers.
7. `docs/phases/phase-1-report.md` written per the executor output contract.
