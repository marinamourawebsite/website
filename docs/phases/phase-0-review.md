# Phase 0 Review — Scaffold

> Note (Planner): the reviewer agent has no Write tool (read-only by design), so it returned this review as output and the Planner persisted it here verbatim. Content below is the reviewer's, unedited.

**Verdict:** `approved`

## Summary
The scaffold matches the brief precisely. Build is green (exit 0, 1 page, static mode). All 7 acceptance criteria verified against the actual `dist/` output and git history. No out-of-scope files touched; the tracked file set exactly equals the brief's "files expected to change" list plus the pre-existing docs. Per the planner note, the Astro 7.1.3-vs-5 choice is accepted and not flagged.

## Findings

1. **(pass) Build** — `npm run build` exits 0, zero errors, static output, `dist/index.html` generated. Report's build claim is accurate.
2. **(pass) lang + meta** — `dist/index.html` contains `lang="pt-BR"`, `<title>Marina Moura</title>`, `<meta name="description" content="Marina Moura">`. Matches `src/layouts/Base.astro:21,25-26`.
3. **(pass) bg token** — CSS emits `--color-bg:#f5f2ed` and `.bg-bg{background-color:var(--color-bg)}`; body uses `bg-bg` (`Base.astro:28`). Background resolves to `#F5F2ED` via the token as required.
4. **(pass) Fonts self-hosted, correct weights** — 22 `.woff2` bundled locally; weight variants are exactly Cormorant 500/600, Allura 400, Poppins 400/500/600 (`Base.astro:3-8`). No `fonts.googleapis`/`fonts.gstatic` references anywhere in `dist/`. Per-weight imports used, not full-family.
5. **(pass) Hex isolation** — Raw hex appears only in `src/styles/global.css:5-11` (the `@theme` block). Grep across all other `src/`, `astro.config.mjs`, `tsconfig.json`, `package.json` finds none. Complies with CLAUDE.md rule 6 and brief item 5.
6. **(pass) No hardcoded copy** — Only visible string is the `title`/`description` placeholder `"Marina Moura"` in `src/pages/index.astro:5-6`; `<main>` is empty. Complies with CLAUDE.md rule 2.
7. **(pass) Git hygiene** — Branch `main`, 5 conventional commits, one logical change each, no co-author trailers and no "Generated with Claude Code" footers (verified full `%B` bodies). Complies with brief item 2 and global preferences. `.DS_Store` present on disk but correctly untracked; working tree clean.
8. **(pass) Scope discipline** — `src/content/`, components, `Icon.astro`, zod schemas untouched. `public/admin/config.yml` left exactly as pre-existing (committed unchanged in the docs commit). `.gitignore` contains the four required entries; `.tool-versions` pins `nodejs 22.22.2`.
9. **(nit) Non-latin font subsets** — The 22 woff2 files include cyrillic/vietnamese/devanagari subsets Fontsource ships per weight. These are subsets of the requested weights (not extra weights), so they satisfy the brief. For a pt-BR-only page they are dead payload; consider trimming to latin/latin-ext in a later performance pass. Not a phase-0 blocker — the report already raised this transparently.

## Report honesty
The report's "Deviations" section is accurate: the only real divergence is the Astro major version, which it discloses and the planner has resolved. Build metrics, woff2 count, hex isolation, and CDN-absence claims all reproduce exactly. Both open questions (Astro 7, font subsets) are legitimately surfaced rather than hidden.

## Unverifiable items
- None requiring human eyes at this phase. There is no UI to compare against `design/reference.png` yet (empty `<main>` by design). Visual fidelity review begins in Phase 1+.
