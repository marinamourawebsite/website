# Phase 3 Review — Sveltia CMS admin

> Note (Planner): reviewer output persisted verbatim by the Planner (reviewer has no Write tool).

**Verdict:** `approved`

## Verification performed
- Diff audit of commit `21521b8`: exactly 2 files touched (`public/admin/index.html` new, `public/admin/config.yml` +2/-1 lines). No `src/` changes — confirmed via `git show --stat -- src/` (empty).
- `npm run build` exits 0.
- `dist/index.html`: `<script>` count = **0** (AC2 met).
- `dist/admin/index.html` + `dist/admin/config.yml` both present in build output (AC1 met); admin page is byte-identical to source and carries exactly 1 script tag.
- SRI form: `src` pins exact `@0.172.4`, `type="module"`, `integrity="sha384-..."`, `crossorigin="anonymous"` — all four required attributes present and correctly shaped.
- SRI hash plausibility (no network re-fetch): the base64 payload decodes to **exactly 48 bytes**, the correct digest length for sha384. Report documents fetch-twice reproducibility and the version+hash co-bump procedure (also mirrored in an HTML comment at index.html:9).
- Materials override: `config.yml:106-107` adds `media_folder: /public/materials`, `public_folder: /materials` to the `file` field only; `image` field untouched. `public_folder: /materials` matches the existing JSON values — consistent, AC3 met.
- config.yml otherwise unchanged; schemas untouched, so rule-3 sync not triggered — correct.

## Findings
1. **nit** — `public/admin/config.yml:106`: the materials `file` field keeps the label "Arquivo (PDF) ou link" (accepts a link) while now forcing uploads into `public/materials` via the override. Semantically fine for PDFs; a pasted external link would ignore the folder override. Pre-existing label, out of scope — no action required.

## Unverifiable items (need human eyes / browser)
1. **Runtime resolution of the field-level `media_folder`/`public_folder` override** — Decap-compatible leading-slash semantics could not be confirmed against local docs. Report step 8 of the manual script is designed to catch this — keep it on the human checklist.
2. **Full local-repository edit round-trip** (File System Access API permission prompts) — steps 3–8 of the report's manual script. Planner's smoke-load of `/admin` confirmed boot only (Sveltia UI renders, config parsed, repo name shown).
3. **Actual sha384 correctness over the wire** — length/format validated; byte content trusted per the report's fetch-twice check.

## Report honesty
"Deviations: None" is accurate — the diff matches the brief's locked decisions exactly. The verified/not-verified split is honest; the single low-confidence item (override semantics) is surfaced as an open question rather than buried.
