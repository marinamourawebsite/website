# Phase 1 Report — Content layer

**Status:** done

## What was built

- `src/content.config.ts` — 7 singleton collections via `file()` loader + zod schemas mirroring `config.yml`.
- `src/content/profile.json` — hero/monogram/bio/keywords copy from reference.
- `src/content/social.json` — 4 hero pill links (instagram, tiktok, linkedin, whatsapp).
- `src/content/services.json` — 5 service cards.
- `src/content/about.json` — heading, photo, 4 bullets, sideNote.
- `src/content/connect.json` — 5 connect cards (instagram, tiktok, folder, whatsapp, mail).
- `src/content/materials.json` — 3 material cards with image/file paths.
- `src/content/cta.json` — footer CTA text/button.
- `src/components/Icon.astro` — 11-icon lucide whitelist, inline SVG, throws on unknown name.
- `src/pages/debug.astro` — temporary verification page (renders all fields + 11 icons).
- `public/uploads/*.svg` (5 placeholders), `public/materials/*.pdf` (3 placeholders).

## Decisions made

- **Singleton loading:** Astro's `file()` loader treats each top-level key of a flat object as a separate entry, which would break singleton JSONs. Resolved with the documented `parser: (text) => ({ data: JSON.parse(text) })` wrapper, so each singleton is one entry with id `data`. On-disk JSON stays exactly as Sveltia writes it (flat object). Fetch via `getEntry(coll, 'data')`. This satisfies the brief's "use `file()` loader" requirement without editing config.yml.
- **Icon enums per collection:** schemas use per-field `z.enum()` matching each collection's exact `select` option set in config.yml (rather than one shared 11-value enum), so validation is as strict as the CMS.
- **`about.bullets` shape:** config.yml uses a single-`field` list, which Sveltia serializes as an array of strings; schema is `z.array(z.string())`.
- **Social bar = 4 items:** reference shows 4 icons (no mail); `mail` remains an available option but is unused in social.json.
- **Placeholder copy for service `url`:** reference gives no per-card links, so each service card links to a WhatsApp placeholder with a card-specific prefilled message.
- **video icon:** used the classic lucide `video` markup (triangle play + rect), matches the reference's camera-style glyph well enough within the already-escalated brand-glyph tradeoff.

## Deviations

- Material `file` paths point at `/materials/<slug>.pdf` per the brief, which differs from config.yml's `public_folder: /uploads`. Followed the brief explicitly; these are placeholder paths.
- No other deviations from brief/SPEC.

## Build

`npm run build` exits 0. Content synced, types generated, 2 pages built (`/debug/index.html`, `/index.html`). Verified `dist/debug/index.html` contains 11 `<svg>` elements and all sampled field values. Verified the enum guardrail: setting `connect.items[0].icon` to a bad value fails the build with `InvalidContentEntryDataError`, then restored.

## TODOs introduced

Placeholder personal data (no real values committed):
- `profile.photo` → `/uploads/profile.svg` (placeholder image; needs real portrait)
- `about.photo` → `/uploads/about.svg` (placeholder image)
- `materials[*].image` → `/uploads/material-*.svg` (3 placeholder images)
- `materials[*].file` → `/materials/*.pdf` (3 minimal placeholder PDFs; need real materials)
- `social` urls → `https://instagram.com/TODO`, `https://tiktok.com/@TODO`, `https://linkedin.com/in/TODO`, `https://wa.me/55XXXXXXXXXXX?...`
- `connect` urls → same social placeholders + `https://TODO.example.com` (portfolio) + `mailto:TODO@example.com`
- `services[*].url` and `cta.buttonUrl` → `https://wa.me/55XXXXXXXXXXX?...`
- `src/pages/debug.astro` — **temporary; planned deletion in Phase 2c.**

## Questions for reviewer

- Least confident on the `video` icon fidelity vs the reference's rounded film-camera glyph (part of the already-escalated brand-glyph tradeoff).
- Confirm the singleton `file()`+`parser` wrapper (entry id `data`) is acceptable vs. an alternative loader — it is the cleanest way to keep flat CMS-authored JSON while using `file()`.
- Whether service-card WhatsApp URLs (prefilled per card) are the intended link target, since the reference specifies no explicit destinations.
