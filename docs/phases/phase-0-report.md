# Phase 0 Report — Scaffold

## Status
done

## What was built
- `.tool-versions` — pins `nodejs 22.22.2` (asdf); global Node v20 is below the engine floor.
- `.gitignore` — `node_modules/`, `dist/`, `.astro/`, `.DS_Store`.
- `package.json` / `package-lock.json` — Astro + `@tailwindcss/vite` + Fontsource deps.
- `astro.config.mjs` — static output, Tailwind v4 via the Vite plugin, no adapters/integrations.
- `tsconfig.json` — extends `astro/tsconfigs/strict`.
- `src/styles/global.css` — Tailwind import + `@theme` tokens (colors + font families). Only file with raw hex.
- `src/layouts/Base.astro` — `<html lang="pt-BR">`, charset/viewport meta, `title`+`description` props, per-weight font imports, `global.css` import, body `bg-bg text-ink font-sans`, `<slot />`.
- `src/pages/index.astro` — renders `Base` with placeholder title/description and an empty `<main>`.

## Decisions made
- **Astro version**: brief referenced "Astro 5's engine floor", but the current published Astro is `7.1.3` (engines `node >=22.12.0`). Node 22.22.2 satisfies it, so I installed the latest Astro rather than pinning to 5. The brief's constraint ("do not downgrade Astro to work around engines") pointed toward staying current. Tailwind v4 (`4.3.3`) as specified.
- **`.gitignore` commit placement**: the brief's step 1 creates `.gitignore` before the docs commit, so it went into the initial `chore: add project docs, agents and CMS config` commit alongside the pre-existing files.
- **`description` placeholder**: set equal to the title (`"Marina Moura"`) since no real meta copy exists yet (arrives via content JSON / Phase 4 SEO). Kept minimal to avoid inventing user-visible copy.
- **Font fallback stacks**: added sensible fallbacks (`Georgia` for serif, `Segoe Script` for script, system sans stack for Poppins) per brief item 4.

## Deviations
- None from scope. The only divergence from the brief's literal wording is the Astro major version (7 vs the "Astro 5" phrasing), explained above — engines are satisfied so this is not a blocker.

## Build
`npm run build` exits 0. Output: 1 page built (`dist/index.html`), static mode, completed in ~256ms. Verified:
- `dist/index.html` contains `lang="pt-BR"`.
- CSS resolves `--color-bg:#f5f2ed` and `.bg-bg{background-color:var(--color-bg)}`.
- 22 `.woff2` files bundled locally (subset splits of the specified weights only: Cormorant 500/600, Allura 400, Poppins 400/500/600). No `fonts.googleapis`/`fonts.gstatic` references anywhere in `dist/`.
- No raw hex in any source file except `src/styles/global.css`.

## TODOs introduced
- Meta `description` is a placeholder equal to the title; real SEO description belongs to Phase 4 / content JSON.

## Questions for reviewer
- Am I clear to stay on Astro 7 (latest) given the brief said "Astro 5"? Engines are satisfied by the pinned Node, and downgrading was explicitly discouraged.
- Fontsource ships per-subset woff2 splits (latin, latin-ext, cyrillic, vietnamese, devanagari), so 22 files exist for 6 weight imports. These are subsets of the requested weights, not extra weights — acceptable, or should non-latin subsets be trimmed later for payload?
