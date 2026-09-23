# CLAUDE.md — Marina Moura Link-in-Bio

## What this is

Single-page link-in-bio site (Astro + Tailwind + Sveltia CMS) for a content creator. Full spec in `SPEC.md`, execution plan in `PLAN.md`, visual reference in `design/reference.png`. UI copy is pt-BR; code and comments are in English.

## Stack & commands

- Astro (static output) + Tailwind CSS. Based on the **Pulsar** boilerplate conventions where applicable.
- Node LTS. `npm install`, `npm run dev`, `npm run build`, `npm run preview`.
- Deploy: Cloudflare Pages (build command `npm run build`, output `dist/`). Do not add adapters — pure static.
- CMS: Sveltia CMS. Admin lives at `public/admin/index.html` + `public/admin/config.yml`. Do NOT use Decap.

## Project layout

```
src/
  layouts/Base.astro        # <html lang="pt-BR">, fonts, meta, slots
  pages/index.astro         # assembles all sections
  components/
    Hero.astro
    Services.astro
    About.astro
    Connect.astro
    Materials.astro
    FooterCta.astro
    SectionLabel.astro      # "· LABEL ·" pattern
    Icon.astro              # inlines lucide SVGs from fixed whitelist
  content/                  # JSON singletons edited via Sveltia (see SPEC §4)
  styles/global.css         # tokens as Tailwind theme + minimal custom CSS
public/
  admin/                    # Sveltia
  uploads/                  # CMS media
  materials/                # free-download PDFs
design/reference.png        # source of truth for visuals
```

## Rules

1. **The reference image wins.** When in doubt about spacing, color, or hierarchy, match `design/reference.png`, not your own taste.
2. **All user-visible text comes from `src/content/*.json`.** Never hardcode copy in components. If a string is in the design, it must have a CMS field.
3. Content collections: define schemas with `astro:content` (zod) matching the Sveltia `config.yml`. Keep both in sync — if you change one, change the other in the same commit.
4. Minimal JS: the only client script allowed is the hero chevron smooth-scroll (respecting `prefers-reduced-motion`). No React/Vue/Svelte islands.
5. Icons: only from the whitelist in `Icon.astro`. Adding an icon = add SVG to the component + add option to the CMS select field.
6. Tailwind: use theme tokens (`bg`, `surface`, `sage`, `sage-dark`, `ink`, `muted`, `line`) — no raw hex in components.
7. Accessibility floor: semantic sections, alt text from CMS fields, focus-visible styles, contrast ≥ 4.5:1 for body text.
8. Do not commit real personal data (phone numbers, emails). Use `TODO:` placeholders and list them in the final report.
9. Conventional commits (`feat:`, `fix:`, `chore:`), one logical change per commit.
10. After each phase in `PLAN.md`, run `npm run build` and confirm zero errors before moving on.

## Images

- **Every image in `public/uploads/` is webp.** Two kinds, and they are not interchangeable:
  - **Library:** `marina-moura-01.webp` … `-NN.webp`, 1400px long edge, quality 75, chronological by
    EXIF capture date. This is what Marina browses in the Sveltia media picker, so it lives in the
    `media_folder` root, not a subfolder.
  - **Slots:** purpose-named (`profile.webp`, `about.webp`, `material-checklist.webp`,
    `material-ferramentas.webp`, `material-apps.webp`), cropped to the exact ratio the component
    declares (hero 1120x1440, about 640x640, materials 800x600). The `src/content/*.json` paths
    point at these names and stay stable when the underlying photo is swapped.
- `docs/image-manifest.tsv` maps each library number back to its original camera filename. Update it
  whenever the library changes.
- **Never leave originals (or any large source asset) under `public/`.** Everything there is copied
  verbatim into `dist/` and shipped to Cloudflare Pages. Marina's originals live in
  `/Users/leoad/superPasta/leo/marina-moura-originais`, outside the repo.
- Tooling on this machine: no ImageMagick. `sips` decodes HEIC and reads capture dates, `cwebp`
  encodes and is the only one that can crop at an offset. **`sips` does not reliably apply EXIF
  rotation** — check every output visually, never infer rotation from the metadata.
- Strip metadata on every encode (`-metadata none`); phone photos carry GPS coordinates.

## Multi-agent orchestration

This repo is executed by a planner/executor/reviewer setup (see PLAN.md "Roles" and "Orchestration loop").

- The MAIN session is the Planner. It never edits `src/` — it writes briefs in `docs/phases/`, dispatches the `executor` and `reviewer` subagents, and gates phase approval.
- Subagents have isolated context. All coordination happens through files in `docs/phases/` (brief → report → review). If information isn't in a file, the subagent doesn't have it.
- One phase per subagent invocation. Max 2 fix rounds per phase before escalating to the human.
- `docs/phases/LOG.md` is append-only experiment data; never rewrite past entries.

## Out of scope

- Blog, multi-page routing, i18n, analytics, forms. This is one page + CMS. Don't add dependencies beyond Astro, Tailwind, Fontsource packages, and Sveltia's script tag.
