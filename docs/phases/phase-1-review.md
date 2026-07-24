# Phase 1 Review — Content layer

> Note (Planner): reviewer output persisted verbatim by the Planner (reviewer has no Write tool).

**Verdict:** `approved`

## Summary
The content layer is complete and faithful. All 7 singleton JSONs, matching zod schemas, `Icon.astro` (11-icon whitelist with build-time throw), and the temporary `/debug` page are in place. Build exits 0, `dist/debug/index.html` contains 11 inline `<svg>` and every sampled field value, no real personal data is committed, and commits carry no attribution trailers. Field-name/enum/list-shape parity with `config.yml` is exact across all 7 collections. pt-BR copy transcribes the reference accurately.

## Findings

1. **(nit) `src/content/about.json:2`** — `heading` is `"um pouco sobre mim"`; the reference and SPEC §3 show a decorative `♡` after it, and the `sideNote` column also has a `♡` glyph above it in the reference. Both hearts are decoration to be added component-side in Phase 2 (correctly not baked into copy). Flagging only so Phase 2 doesn't drop them.

2. **(minor, pre-accepted / honestly reported)** `src/content/materials.json` `file` paths use `/materials/<slug>.pdf`, but `config.yml:11-12` sets `public_folder: /uploads` and the materials `file` field (`config.yml:102`) is a `file` widget with no per-field override. When the client uploads a PDF via Sveltia it will land under `/uploads`, not `/materials` — a convention split. This is brief-directed (brief decision 7) and disclosed in the report's Deviations. Recommend a later phase either add a per-field `media_folder`/`public_folder: /materials` to the materials `file` field or move placeholders to `/uploads`, so CMS-authored and repo-authored paths agree.

3. **(nit)** `config.yml` social select includes `mail` and connect select includes `linkedin`, both unused by current JSON. Intentional availability, matches the 11-key union, not an issue — noted for completeness.

## Report honesty
Accurate. The Deviations section correctly surfaces the only real divergence (materials `file` path vs config `public_folder`). Decisions (singleton `parser` wrapper with entry id `data`, per-collection `z.enum` instead of one shared enum, 4-item social bar, per-card WhatsApp service URLs) all match the code. TODO list matches the actual placeholders on disk.

## Verified
- Build green; 2 pages built.
- `dist/debug/index.html`: exactly 11 `<svg>`; all spot-checked field values present.
- Grep clean: no phone-like numbers; only `TODO@example.com`; all social/portfolio URLs are `TODO`/`XXXXXXXXXXX` placeholders.
- Schema ↔ config.yml parity exact for names, list shapes, and per-field enum option sets (profile, social, services, about, connect, materials, cta).
- `Icon.astro` covers all 11 whitelisted names and throws on unknown (`src/components/Icon.astro:48-53`).
- Commits: conventional, one logical change each, no `Co-Authored-By`/Claude footer.
- Placeholder assets exist and are valid (`%PDF-1.4` header; labeled SVGs).

## Unverifiable items (need human eyes)
- **Pixel/visual fidelity:** no UI rendered this phase (`index.astro` stays empty), so nothing to compare against `reference.png` beyond copy. Full layout fidelity is a Phase 2 review item.
- **Icon glyph fidelity:** `tiktok`→`music-2`, `whatsapp`→`phone` substitutions (and `video` glyph) diverge from the reference's brand glyphs — already escalated, not a Phase 1 defect.
- **Enum build-failure guardrail:** verified structurally (`z.enum` present per collection in `src/content.config.ts:7-9`) and claimed tested in the report; not re-executed by the reviewer (read-only, no source writes).
