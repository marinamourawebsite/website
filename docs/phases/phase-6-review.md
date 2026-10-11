# Phase 6 Review

**Verdict**: `approved`

## Findings

1. **minor** — `SPEC.md:55-63`: §4 content-model tree does not list the new `page.json` singleton, so SPEC is out of sync with `src/content.config.ts:19-31` / `public/admin/config.yml:24-46`. Planner-side doc update (brief's file list excluded SPEC); not an executor fault.
2. **nit** — `public/admin/config.yml:41-44`: CMS row labels ("Como posso te ajudar", etc.) are static strings; if Marina renames a section's heading in its own screen, the "Página" row label won't follow. Acceptable per AC7 (names live in config, not components); note for her handover.

Everything else matches the brief: AC6 met (`b63e0e4` contains config.yml + zod schema + page.json together); "Página" is first in `files`, backend/site_url block untouched; bad-data handling correct (`index.astro:28-37` dedupes before the visibility filter, missing ids never render because iteration is over the list, not the registry); chevron target passed as prop, no client JS (rule 4); every section + footer carries `id` + `scroll-mt-8`, no other class changed; no hardcoded copy added to components (rule 2, anchor slugs are not user-visible); no raw hex (rule 6); no new deps; report deviations ("none") match the diff, and its Services note is accurate (`Services.astro:13-15` was already correct).

Reviewer-verified: `npm run build` green; with seed data `dist/index.html` has ids in order servicos, sobre, conectar, materiais, contato and the chevron href is `#servicos`; `config.yml` parses as YAML and the multi-line flow map resolves as intended. AC3/4/5 mutation scenarios were not re-run; the code logic supports the report's table.

## Unverifiable items (need a browser)

1. Sveltia option names: whether it honours `allow_add: false`, `allow_remove: false`, `allow_reorder: true`, and especially `readonly: true` on a `select` (`config.yml:31-33, 39`). If `readonly` is ignored, Marina could switch a row to another section. The build survives but a section could be hidden by accident. `min: 4` / `max: 4` is a sound fallback for add/remove only.
2. Collapsed row header: option label vs raw value (`services`), since no `summary` is set.
3. Drag-to-reorder works in the live Sveltia UI.
4. Spacing looks identical in a non-default order (every section uses `mt-12 sm:mt-16`, so it should; check visually against `design/reference.png`).
5. Smooth scroll lands correctly on `#materiais` / `#contato` with the `scroll-mt-8` offset.

Out of scope: the report says `npx astro check` already failed at `src/components/Icon.astro:105` before this phase. Ticket separately if wanted.
