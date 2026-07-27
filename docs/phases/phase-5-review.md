# Phase 5 — Review (initial + fix round 1)

**Verdict: approved**

Scope: commits `74b3b84`, `1fa677a`, `fe0dd1c`, `986e7a5` (`git diff 09c3553..HEAD`).
Source diff is one file: `src/components/Icon.astro` (+52/-20). Everything else is `docs/phases/*`.

## Verified independently

- **Glyph data byte-checked against the briefs.** `tiktok` (Icon.astro:82) is byte-identical to
  the brief's Simple Icons string. `linkedin` (Icon.astro:80) is byte-identical to the fix-brief
  string and is an exact prefix of the official path; the only removed bytes are the plate
  subpath starting `M22.225 0H1.771`. `whatsapp` subpath 1 (handset) is an exact prefix of the
  official path; subpath 2 is byte-identical after its moveto.
- **WhatsApp moveto conversion is arithmetically correct.** Traced subpath 1: it ends at
  (17.471, 14.382); `m-5.421 7.403` from there = (12.050, 21.785), exactly the shipped
  `M12.05 21.785`. Traced subpath 2: it returns to its start with gap 0.0000, so the stroked
  contour has no seam despite being unclosed.
- **No stroke leaks onto filled paths.** Built HTML: the two brand SVGs render
  `fill="currentColor" stroke="none"` with no `stroke-width` anywhere (`dist/index.html`, hero
  chips 2 and 3). The WhatsApp SVG root keeps the outline paint and the handset subpath carries
  its own `fill="currentColor" stroke="none"` override — correct hybrid, no bloat.
- **Outline tier untouched.** `instagram`, `mail`, `folder` and the whole decoration tier
  (`chevron-down`, `chevron-right`, `check`, `heart`, `download`, `arrow-right`) are context-only
  lines in the diff — byte-unchanged — and all 28 non-brand SVGs in `dist/index.html` still render
  `fill="none" stroke="currentColor" stroke-width="2"` with round caps/joins.
- **CLAUDE.md rule 5 (3-way sync) holds; the briefs' reasoning is correct.** The union of the
  `select` options in `public/admin/config.yml` (lines 44, 58, 87) equals the union of the zod
  enums in `src/content.config.ts` (lines 7–9) equals `{folder, handshake, instagram, lightbulb,
  linkedin, mail, smartphone, ticket, tiktok, video, whatsapp}`, and every one of those names
  resolves in `Icon.astro` (`icons` ∪ `brandIcons`). Only markup moved between maps; no name was
  added, removed or renamed, so no config/schema edit was owed. Decoration-tier names still leak
  into neither config nor enums, per the standing Planner ruling.
- **Rule 6:** zero hex literals in `Icon.astro`; everything is `currentColor`.
- **Rule 4:** no `<script>` added; `dist/index.html` still has exactly one script (the pre-existing
  hero chevron scroll).
- **Rule 10:** `npm run build` re-run by me — clean, 1 page, zero errors/warnings. Working tree
  clean.
- **Scope discipline:** `Connect.astro`, `Hero.astro`, `src/content/*.json`, `config.yml`,
  `content.config.ts` untouched; `package.json` / lockfile unchanged — no new dependencies.
  No `size` prop changed (`Hero.astro:98` still `size={20}`, `Connect.astro:29` still `size={24}`).
- **LinkedIn documentation requirement met.** `Icon.astro:72–78` names the removed subpath by its
  start token, states the removal is deliberate and human-approved, links `phase-5-brief-fix1.md`,
  and carries an explicit "DO NOT restore from upstream" warning. `Icon.astro:13–15` repeats it in
  the header. This satisfies the fix brief's requirement.
- **Visual (hero chips):** `docs/phases/phase-5-fix1-linkedin-evidence.png` reference-over-shipped
  comparison — silhouettes match on all four chips: solid boxless "in", solid TikTok note, outline
  bubble with solid handset, unchanged Instagram.
- I re-cropped the reference's Conectar row myself: TikTok and the WhatsApp handset are indeed
  drawn hollow there. The executor's flag was accurate, and the human's acceptance of the
  divergence is a legitimate call, not a misread.

## Findings

1. **minor — `src/components/Icon.astro:16–19` (header comment) is inaccurate about WhatsApp.**
   It says the WhatsApp glyph's "Geometry is the official one, only the paint differs", and line 13
   says `linkedin` "is the only brand glyph whose geometry is modified". Both are false: the
   official WhatsApp path's third subpath — the outer bubble contour, starting `m8.413-18.297` —
   was deleted (verified: it appears nowhere in the file). That is the same class of modification
   the brief demanded be documented for LinkedIn, and it is the same maintainer trap: someone
   comparing against upstream will see a shorter path and "restore" the outer contour, which will
   double-stroke the rim. The inline comment at :35–36 says "inner bubble contour", which implies
   but does not state the deletion. Fix is comment-only.

2. **nit — `src/components/Icon.astro:85`, `name in brandIcons` matches `Object.prototype` keys.**
   `name = "toString"` / `"constructor"` sets `filled = true` and yields a truthy `markup`
   (a function), bypassing the guard on :87 and emitting garbage via `set:html`. Pre-existing in
   kind (`icons[name]` had the same hole before this phase), unreachable in practice because every
   call site is gated by a zod enum, and both call sites pass either a literal or enum-validated
   data. `Object.hasOwn(brandIcons, name)` closes it in one token.

3. **nit — no guard for a name present in both maps.** `Icon.astro:69–70` states "Names must stay
   unique across both maps" as a comment only; if violated, `brandIcons` silently wins. The maps
   are disjoint today.

4. **nit — report bookkeeping.** `phase-5-report.md:86` says "Deviations: None from the brief", but
   the brief's target table (`phase-5-brief.md:26`) specifies `whatsapp outline 2px, hand-tuned`
   and neither of its two enumerated options was shipped — a third, hybrid option was. The choice
   is well-argued and fully disclosed two sections earlier (`:32–52`), so this is presentation, not
   concealment; the "Deviations" heading should have carried it.

5. **nit — scope of the accepted Conectar divergence.** `phase-5-brief-fix1.md:25–29` accepts
   solid TikTok in Conectar, but says nothing about WhatsApp. The shipped build also renders a
   **solid handset** in Conectar where the reference draws it hollow (I confirmed the reference
   crop). The report records both under one bullet (`:193–196`). Worth the Planner confirming the
   human's acceptance was understood to cover both, since only TikTok was named.

Report honesty is otherwise good: the LinkedIn ~15% relative undersize was measured and surfaced
rather than silently patched, the retracted overflow claim is left in place with a labelled
retraction (correct — reports are append-only), and every "not touched" claim in the report checks
out against the diff.

## Unverifiable items (need human eyes)

- Pixel-level fidelity of the **shipped** page at 390px and 1280px. I have no browser; I verified
  the built markup and the executor's evidence PNG, not a live render. The `phase-5-fix1` evidence
  image covers the hero chip row only.
- The LinkedIn ~15% relative undersize and the "chip circles are larger relative to row pitch than
  the reference" caveat (`phase-5-report.md:226–230`) — both are optical judgements against
  `design/reference.png` at real size. Already accepted by the human per the task framing; noted
  here only as something no static check can confirm.
- Trademark posture of shipping a modified LinkedIn mark (`phase-5-report.md:267–269`) — a legal
  /brand judgement, out of a code reviewer's competence. On record.

Not findings, per explicit human acceptance: solid TikTok in Conectar; the LinkedIn optical size.
The horizontal-overflow claim stays retracted — I found no independent evidence for it and did not
look for any.
