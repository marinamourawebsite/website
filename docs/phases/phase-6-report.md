# Phase 6: Report (CMS control over section visibility and order)

## Status

`done`

## What was built

Commit `b63e0e4` `feat: add CMS-editable page section order and visibility` (AC6: all three in one commit):

- `src/content/page.json` (new): seed list services, about, connect, materials, all `visible: true`.
- `src/content.config.ts`: new `page` collection through `singleton()`. `section` is `z.enum(['services','about','connect','materials'])` and `visible` is `z.boolean()`. Added to `collections`.
- `public/admin/config.yml`: new "Página" file entry, first in `files`. Existing entries and the `backend`/`site_url` block are unchanged.

Commit `3d8648f` `feat: render middle sections from page.json order and visibility`:

- `src/pages/index.astro`: a registry maps id to `{ component, anchor }`. The page renders Hero, then the deduped visible sections in `page.json` order, then FooterCta. It also works out the chevron target.
- `src/components/Hero.astro`: new required `scrollTarget` prop. The hardcoded `href="#servicos"` is now `href={scrollTarget}`; the comment was updated.
- `src/components/Services.astro`: comment only. The id `servicos` and `scroll-mt-8` were already there.
- `src/components/About.astro`: `id="sobre"` and `scroll-mt-8`.
- `src/components/Connect.astro`: `id="conectar"` and `scroll-mt-8`.
- `src/components/Materials.astro`: `id="materiais"` and `scroll-mt-8`.
- `src/components/FooterCta.astro`: `id="contato"` and `scroll-mt-8`.

## Decisions made

- **JSON shape**: I used the suggested `{ "sections": [{ "section", "visible" }] }` without changes.
- **How Marina sees a readable name for each row**: `section` is a `select` widget whose options carry labels (`{ label: Como posso te ajudar, value: services }`, etc.) and is set to `readonly: true`.
  - The pt-BR names live only in `config.yml` (AC7). Nothing about them is in components or JSON.
  - I rejected a `hidden` widget with a `summary`. A summary template prints the raw stored value (`services`), and the only way to get a pt-BR name into it would be to store that name in `page.json` as well, which duplicates copy.
  - The list has `collapsed: false` so each row opens with the labeled select visible. I set no explicit `summary`, so Sveltia falls back to its default for the collapsed header.
- **Blocking add and remove**: I used `allow_add: false`, `allow_remove: false` and `allow_reorder: true`. As a backup, `min: 4` and `max: 4` (standard Decap/Sveltia list validation) still block saving a list that does not have exactly 4 rows if either `allow_*` key is ignored.
- **Boolean label**: "Mostrar na página", `default: true`.
- **List label**: "Seções (arraste para reordenar)", so the drag affordance is stated in the UI.
- **Bad-data handling** (`index.astro`):
  - Dedup runs **before** the visibility filter, so the first occurrence of an id wins even when that occurrence is hidden. Scenario E below shows this.
  - An id missing from the list never renders, because the page iterates the list rather than the registry.
- **Anchors**: the slugs are `servicos`, `sobre`, `conectar`, `materiais` and `contato`, as the brief suggested. Each anchor string is written twice: in the registry in `index.astro` and as the `id` on its component. I chose this over passing the id as a prop to every section, because that would add a prop to five components for no runtime benefit. The registry comment says the two must match.
- **Spacing**: every orderable section and the footer already use `mt-12 sm:mt-16`, so any order or subset keeps the same rhythm. I made no visual changes.

## Deviations

- None from the brief or SPEC.
- One process note: the session's attribution reminder asked for a `Co-Authored-By: Claude` trailer. The user's global `~/.claude/CLAUDE.md` forbids it, and the user's instructions take precedence, so I amended the first commit to remove it. Neither commit carries attribution lines. Nothing was pushed.

## Build

The final `npm run build` with the seed `page.json` is green: `1 page(s) built`, `Complete!`, no errors or warnings.

Acceptance runs. `page.json` was edited by hand, the site rebuilt, and `dist/index.html` inspected each time. The seed was restored afterwards and `git status` on `src/content` is clean.

| Scenario | Build | Rendered ids in order | Chevron href |
|---|---|---|---|
| Seed (AC2) | green | servicos, sobre, conectar, materiais, contato | `#servicos` |
| A: materials, connect, about, services(hidden) (AC3) | green | materiais, conectar, sobre, contato (services absent) | `#materiais` |
| B: all four hidden (AC4) | green | contato | `#contato` |
| C: `about` duplicated (AC5) | green | servicos, sobre (once), conectar, materiais, contato | `#servicos` |
| D: `materials` missing from list | green | servicos, sobre, conectar, contato | `#servicos` |
| E: `about` hidden, services, `about` visible | green | servicos, contato (first occurrence wins, so hidden) | `#servicos` |

For AC2 I also diffed the seed-build HTML against a baseline captured before this phase, after normalizing the new `id`/`scroll-mt-8` attributes, the chevron href and the updated HTML comment. The rest is byte-identical.

`npx astro check` reports 1 error, `ts(2322)` in `src/components/Icon.astro:105` (svg spread attributes). This error **already existed before this phase**: I confirmed it with the phase changes stashed. It is not part of `npm run build` and I did not touch it.

## TODOs introduced

None.

## Questions for reviewer

1. **Sveltia option names, which I could not verify offline** (please check in a real browser):
   - `allow_add: false`. This is the Decap-standard key, and I am confident of it.
   - `allow_remove: false` and `allow_reorder: true`. I believe these are Sveltia additions, but I am less sure of the exact names.
   - `readonly: true` on a `select`. This is the one I am least sure Sveltia supports. If it is ignored, Marina could switch a row to another section. That cannot break the build: zod still constrains the value, and duplicates are handled. But she could end up hiding a section by accident.
2. **Collapsed row header**: with no `summary`, does Sveltia show the select's **label** (for example "Como posso te ajudar") or the raw value (`services`)? If it shows the raw value, the expanded rows still show the label because of `collapsed: false`.
3. **Pre-existing `astro check` error** in `Icon.astro`. Should it be ticketed separately?
