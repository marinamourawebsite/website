# Phase 3 Report — Sveltia CMS admin

## Status
`done`

## What was built
- `public/admin/index.html` (new) — minimal Sveltia admin page: `<!doctype html>`, `<html lang="pt-BR">`, charset + viewport meta, `<title>Admin — Marina Moura</title>`, and the pinned Sveltia script tag with Subresource Integrity.
- `public/admin/config.yml` (changed) — added field-level `media_folder: /public/materials` and `public_folder: /materials` to the materials `items[].file` field only. No other changes.

## Decisions made
- **Sveltia version + SRI**: Latest published version resolved to `0.172.4` (via `https://registry.npmjs.org/@sveltia/cms/latest`). Computed `sha384` of `https://unpkg.com/@sveltia/cms@0.172.4/dist/sveltia-cms.js` with node's global `fetch` + `crypto`, fetched twice — both runs produced identical hash and byte length (1,975,506 bytes), confirming integrity of the value:
  - `sha384-Sj4Mfbg9OjjwG2ZE/YeUYu7xbZRTXGFg/wa/nszj3KzItKuRLEmGqSpV5C9YI2Ge`
  - Tag: `type="module"`, `crossorigin="anonymous"`, `integrity=...`.
- **HUMAN-FACING NOTE**: Updating Sveltia now requires bumping BOTH the version in the URL AND the `integrity` hash together — otherwise the browser will refuse to load the script. A comment to that effect is in `index.html`.
- **Materials path override semantics**: Sveltia is CDN-loaded (not in `node_modules`), so no local docs were available to confirm resolution rules. Implemented the documented Decap-compatible form the brief prescribed: `media_folder: /public/materials` (leading slash → repo-root-relative upload location) and `public_folder: /materials` (public URL path). This matches the existing JSON paths (`/materials/*.pdf`) and SPEC §3.5. Flagged for the manual test below.
- **`image` field left untouched** per brief — generic card images stay in global `public/uploads`.

## Deviations
None. Scope held to `public/admin/` only; `src/` untouched; backend `repo`/`base_url`/`site_url` TODO placeholders left as-is.

## Build
`npm run build` exits 0. Verifications:
- `dist/admin/index.html` present; `dist/admin/config.yml` present.
- `dist/index.html` contains **0** `<script>` tags (grep count 0).
- `dist/admin/index.html` contains exactly 1 Sveltia script tag with 1 `integrity="sha384-"` attribute.
- `config.yml` parses as valid YAML (verified with `js-yaml`, an Astro transitive dep — no new dependency added). The materials `file` field parses to `{ widget: "file", media_folder: "/public/materials", public_folder: "/materials" }`. No tabs in file.

## Manual local-repository workflow test script (NOT automatable here — File System Access API needs interactive permission prompts)
1. `npm run dev`
2. Open `http://localhost:4321/admin` in a Chromium-based browser (Chrome/Edge — File System Access API required).
3. Click **"Work with Local Repository"**.
4. In the OS picker, select the repo root: `/Users/leoad/superPasta/leo/marina-moura` and grant read/write permission.
5. Open **Conteúdo do Site → Perfil**, change the **Frase de apresentação** (bio) field, and Save.
6. Confirm `src/content/profile.json` on disk now reflects the new `bio` value.
7. Reload `http://localhost:4321/` and confirm the change is visible in the hero.
8. **Materials override check**: open **Materiais gratuitos**, edit an item's **Arquivo (PDF)** field, upload a test PDF, and Save. Confirm the file lands in `public/materials/` and the JSON `file` value is `/materials/<name>.pdf` (NOT `/uploads/...`). This validates the field-level override semantics.

### What was verified vs. not
- **Verified (automated)**: build green; both admin files in `dist/`; `dist/index.html` script-free; single SRI-pinned Sveltia tag in admin; config.yml valid YAML with the override resolving correctly; SRI hash reproducible across two fetches.
- **NOT verified (needs interactive browser)**: the full local-repository edit round-trip (steps 3–8), and the runtime behavior of the materials `media_folder`/`public_folder` override — Sveltia validates config client-side at load, so this only confirms once the admin actually loads. The Planner's browser smoke-load of `/admin` covers page load; the edit round-trip is for the human checklist.

## TODOs introduced
None new. Pre-existing backend TODOs in `config.yml` remain (`repo`, `base_url`, `site_url`) — human's post-Phase-4 manual step.

## Questions for reviewer
1. **Materials override semantics** — I used the Decap-compatible `/public/materials` + `/materials` form because Sveltia docs weren't available locally. If Sveltia resolves field-level `media_folder` differently (e.g. relative to the collection file rather than repo root when leading-slash is used), the upload could land in the wrong place. This is the single item I'm least confident about; step 8 of the manual test is designed to catch it.
2. **Sveltia pinned at `0.172.4`** — this is the current latest. Confirm you're comfortable pinning to it (vs. tracking a range); the SRI hardening intentionally trades auto-updates for supply-chain safety.
