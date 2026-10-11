# Phase 6 — Brief: CMS control over section visibility and order

## Context

The site is live-ready (Phases 0–5 approved). The human wants Marina to be able to **hide/show**
and **reorder** the page's middle sections from the CMS, without touching code. Today the order
is hardcoded in `src/pages/index.astro:19-24` and every section always renders.

## Decisions already made (do not re-litigate)

- **Hero** stays first and always visible. Not in the list.
- **Footer CTA** stays last and always visible. Not in the list. (Human decision.)
- The four orderable sections are: Services, About, Connect, Materials.
- One new CMS screen, label **"Página"**, holding a fixed list of those four sections. Each row:
  a visibility toggle. Marina can drag to reorder and toggle visibility. She must **not** be able
  to add or remove rows.
- The hero chevron must scroll to the **first visible** orderable section. If all four are
  hidden, it scrolls to the Footer CTA.

## Objective

Make section order and visibility content-driven, with `config.yml`, zod schema and JSON in sync
(CLAUDE.md rule 3: same commit).

## Scope — IN

1. **`src/content/page.json`** (new singleton). Seed it with the current order, all visible:
   services, about, connect, materials.
   Suggested shape (adjust if Sveltia forces otherwise, and say so in the report):
   ```json
   { "sections": [ { "section": "services", "visible": true }, ... ] }
   ```
2. **`src/content.config.ts`** — add the `page` collection via the existing `singleton()` helper.
   `section` is a `z.enum(['services','about','connect','materials'])`, `visible` a boolean.
3. **`public/admin/config.yml`** — add the "Página" file entry. Requirements:
   - Rows can be reordered; adding and removing rows is disabled. Sveltia supports list options
     for this (`allow_add`, `allow_remove`, `allow_reorder` family). Sveltia is CDN-loaded, so you
     may not be able to confirm option names offline. Use the documented names you are confident
     of and **flag them in "Questions for reviewer"**; the Planner will verify in a real browser.
   - Marina must see a **human-readable pt-BR name** per row (e.g. "Como posso te ajudar"), not the
     raw id. The id itself should not be editable by her. Choose the mechanism (e.g. hidden
     field + list `summary`, or a read-only select) and justify it in the report.
   - Labels in pt-BR, matching the tone of the existing screens. Place "Página" first in the
     `files` list so it is the first thing she sees.
4. **`src/pages/index.astro`** — render Hero, then the visible sections in `page.json` order, then
   FooterCta. Must be robust to bad data the CMS could still produce:
   - duplicate ids → render the first occurrence only;
   - an id missing from the list → treat as hidden (do not crash, do not append it).
5. **Chevron target** — today it is hardcoded `href="#servicos"` (`Hero.astro:76`) with the id
   living on `Services.astro`. Give each orderable section and the Footer CTA a stable id
   (pt-BR slugs consistent with `#servicos`, e.g. `#sobre`, `#conectar`, `#materiais`, `#contato`)
   and the matching `scroll-mt-8`, then pass the resolved target into Hero as a prop. Keep it
   CSS-only smooth scroll: **no client JS** (rule 4).
6. **`docs/phases/phase-6-report.md`** — your report.

## Scope — OUT

- No visual changes. Spacing between sections must look identical to today in the default order.
  Each section currently carries its own `mt-12 sm:mt-16`; verify that reordering does not break
  rhythm (it should not, since every section uses the same top margin).
- No ordering or toggling for Hero or Footer CTA.
- No changes to section content fields, icons, tokens, or dependencies.
- Do not touch `astro.config.mjs` or the `backend`/`site_url` block of `config.yml`.

## Acceptance criteria

1. `npm run build` green.
2. With the seeded `page.json`, the built HTML has the same section order as before this phase.
3. Manually edit `page.json` to (a) reorder to materials, connect, about, services and (b) hide
   services: build is green, `dist/index.html` reflects the new order, services is absent, and
   the chevron `href` points at `#materiais`. Restore the seed afterwards. Record the results.
4. Hide all four: build green, chevron points at the Footer CTA id. Restore.
5. Duplicate an id in `page.json`: build green, section renders once. Restore.
6. `config.yml`, zod schema and `page.json` land in **one commit**.
7. No hardcoded user-visible copy in components (rule 2). The pt-BR section names shown in the
   CMS live in `config.yml`, not in components.

## Files expected to change

`src/content/page.json` (new), `src/content.config.ts`, `public/admin/config.yml`,
`src/pages/index.astro`, `src/components/Hero.astro`, and the five section components (id +
`scroll-mt-8` only). Plus the report.
