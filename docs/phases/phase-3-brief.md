# Phase 3 Brief — Sveltia CMS admin

## Objective

Working CMS admin at `/admin`: `public/admin/index.html` added (config.yml already exists), local-repository editing workflow verified as far as automation allows, materials media-path convention reconciled. Build green.

## Context from approved phases

- Full page renders from the 7 JSON singletons. `public/admin/config.yml` pre-exists and matches schemas (including the `sectionLabel` additions from 2b).
- CLAUDE.md: Sveltia only (never Decap); allowed external dependency = "Sveltia's script tag" only.
- Conventional commits, **no attribution trailers**.

## Decisions already made (do not re-decide)

1. **`public/admin/index.html`**: minimal standard Sveltia admin page — `<!doctype html>`, `<html lang="pt-BR">`, charset + viewport meta, `<title>` (dev-facing, e.g. "Admin — Marina Moura"; admin chrome is not product copy, the copy rule doesn't apply), and the official Sveltia script tag. **Supply-chain hardening (security-hook requirement):** pin an exact Sveltia version and add Subresource Integrity — `<script src="https://unpkg.com/@sveltia/cms@<exact.version>/dist/sveltia-cms.js" type="module" integrity="sha384-<hash>" crossorigin="anonymous"></script>`. Determine the latest published version and compute the sha384 of that exact file with a small `node -e` script (node's global `fetch` + `crypto`); `curl`/`wget` are denied — use node. Verify the hash by fetching twice. Document in your report that updating Sveltia now requires bumping version + hash together (human-facing note). If the sandbox blocks network access from node entirely, fall back to the plain unpinned tag and flag it as a blocker-level TODO for the human. No dark-mode/custom styling extras. This is the ONLY page allowed an external script; `dist/index.html` must remain script-free.
2. **Materials media-path reconciliation** (carried from Phase 1 review): add per-field media/public folder overrides to the materials `file` field in `config.yml` so CMS uploads land in `public/materials/` and render as `/materials/<name>.pdf`, matching the existing JSON paths and SPEC §3.5. Use the Sveltia/Decap field-level `media_folder`/`public_folder` convention; verify how Sveltia resolves them (repo-root-relative with leading `/`) against its documentation in the package/README if available locally — if you cannot confirm the exact semantics, implement the documented Decap-compatible form (`media_folder: /public/materials`, `public_folder: /materials` on that field) and flag it for the manual test. Also do the same for the materials `image` field? **No** — images stay in the global `public/uploads` (they are generic card images); only the PDF/file field gets the override. No schema changes (paths remain plain strings), so rule 3 sync is not triggered.
3. **Backend TODOs stay TODOs**: `repo`, `base_url`, `site_url` placeholders in `config.yml` are the human's post-Phase-4 manual step (PLAN "Manual steps"). Do not invent values.
4. **Verification split** — automate what you can, document the rest:
   - Automated: `npm run build` green; `dist/admin/index.html` + `dist/admin/config.yml` both present in build output; config.yml is valid YAML (parse it, e.g. `node -e` with a YAML parse via Astro's bundled deps or a tiny hand check — do NOT add a dependency for this; a careful read + the existing Sveltia-side runtime validation is acceptable if no parser is at hand).
   - NOT automatable here: the interactive local-repository workflow (File System Access API permission prompts). Write a precise manual test script in your report: `npm run dev` → open `http://localhost:4321/admin` → "Work with Local Repository" → pick repo root → edit a field (e.g. profile bio) → confirm JSON file changed → reload site → change visible. The Planner will do a browser smoke-load of `/admin`; the full edit round-trip goes to the human checklist.
5. **No other files touched.** In particular `src/` is out of scope entirely this phase.

## Scope

**In:** `public/admin/index.html` (new), `public/admin/config.yml` (materials file-field override only).
**Out:** everything in `src/`, all Phase 4 items, backend credential/URL values.

## Acceptance criteria

1. `npm run build` exits 0; `dist/admin/index.html` and `dist/admin/config.yml` present.
2. `dist/index.html` still has zero `<script>` tags; the Sveltia script tag appears only in the admin page.
3. `config.yml` materials `file` field carries the media/public folder override; nothing else in config.yml changed; schemas untouched (no sync needed).
4. Report contains the exact manual local-workflow test script and states clearly what was / wasn't verified.
5. Conventional commits, no attribution trailers; report at `docs/phases/phase-3-report.md`.
