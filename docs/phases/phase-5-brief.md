# Phase 5 — Brief: real brand glyphs for social icons

## Context

The project shipped through Phase 4. This is a post-delivery adjustment requested by the human,
resolving handoff TODO item 13 ("Icon fidelity decision") in `docs/phases/LOG.md`.

Today four social icons are lucide stand-ins, not brand marks:

| name | today | problem |
|---|---|---|
| `tiktok` | lucide `music-2` | not the brand glyph |
| `whatsapp` | lucide `phone` | not the brand glyph |
| `linkedin` | lucide `linkedin` | generic approximation |
| `instagram` | lucide `instagram` | already faithful — leave alone |

## Decision already made (do not re-litigate)

The human chose **fidelity to `design/reference.png`**, which deliberately mixes fill styles.
Target end state:

```
  instagram   outline 2px   unchanged (lucide, already faithful)
  tiktok      SOLID         official Simple Icons glyph
  linkedin    SOLID         official Simple Icons glyph
  whatsapp    outline 2px   brand-shaped, hand-tuned
  mail        outline 2px   unchanged
  folder      outline 2px   unchanged
```

Rejected alternatives: all-solid (diverges from reference, uneven weight next to
`mail`/`folder`), all-outline (TikTok/LinkedIn become unrecognizable).

## Objective

Replace the three stand-in glyphs with real brand marks while keeping the page's visual
weight consistent with `design/reference.png`.

## Scope — IN

1. **`src/components/Icon.astro`** — the only source file that should need to change.
   - Add a **brand tier** rendering mode. Filled glyphs must render `fill="currentColor"`
     with **no stroke**; the existing icons keep `fill="none" stroke="currentColor"
     stroke-width="2"`. A filled path that inherits `stroke-width="2"` will bloat visibly —
     this is the main trap in this phase.
   - Implementation shape is your call (second map, or `{ markup, filled }` records).
     Keep it legible and keep the existing "unknown icon throws" guard working.
   - Update the header comment block: the sourcing notes at lines 7–10 currently document
     the `music-2` / `phone` substitutions and will be stale.
   - Add a sourcing/licence note: glyphs are from **Simple Icons (CC0)**; brand marks are
     trademarks used nominatively to link to the corresponding profiles.

2. **`docs/phases/phase-5-report.md`** — your report.

### Verified glyph data (fetched from Simple Icons by the Planner — use verbatim, do not retype from memory)

All three are single `<path d="...">` on a `0 0 24 24` viewBox.

**tiktok** (SOLID):
```
M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z
```

**linkedin** (SOLID — note this glyph *includes* the rounded-square background plate):
```
M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z
```

**whatsapp** (official, SOLID — see the outline task below):
```
M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z
```

## The two judgment calls

These are the parts that need your eyes on the reference, not just a paste.

### 1. WhatsApp outline — no official outline version exists

The reference shows WhatsApp as a **thin outline** bubble-with-handset. Simple Icons ships
only the filled version. Try these in order and report which you landed on and why:

- **(a) Stroke the official path.** Render the filled path above with
  `fill="none" stroke="currentColor" stroke-width="2"`. Its compound geometry (outer bubble
  boundary + inner handset) may stroke into something very close to the reference. Cheapest
  option and it preserves official proportions — but it can also produce a muddy
  double-contour. Look at it before deciding.
- **(b) Hand-tune a 24×24 outline.** Speech bubble with the tail at bottom-left, handset
  inside, `stroke-width="2"`, round caps/joins, matching the optical weight of `mail`.

Do NOT ship (a) if it reads muddy at 24px. Judge it rendered, not in the abstract.

### 2. LinkedIn plate

The Simple Icons LinkedIn glyph includes the filled rounded-square plate around the "in".
The reference's hero chip may show a **boxless "in"**. Compare at real size against
`design/reference.png`.

- If the plate reads correct inside the circular chip → keep the official glyph.
- If it clearly diverges from the reference → **report it and stop**, do not improvise a
  boxless variant. The Planner will take the call to the human. Rule 1 says the reference
  wins, but inventing a glyph is a branding decision and that is not yours to make.

## Scope — OUT

- **Do NOT touch** `public/admin/config.yml`, `src/content.config.ts`, or any
  `src/content/*.json`. The icon **names** are unchanged (`tiktok`, `linkedin`,
  `whatsapp`, `instagram`), so the 3-way sync required by CLAUDE.md rule 5 does **not**
  apply here. Only the SVG markup behind the names changes.
- **No new dependencies.** Paths are inlined above; do not `npm install simple-icons`.
- Do not touch the decoration tier, the other content icons, or any other component.
- Do not fix unrelated carried nits (e.g. the focus-ring unification from Phase 4).
- Do not address any other handoff TODO item.

### Touching Hero.astro / Connect.astro

Only if optical sizing genuinely requires it. Solid glyphs read heavier than 2px outlines at
the same box size, so TikTok/LinkedIn may need a slightly smaller `size` to sit evenly beside
their neighbours. If you do change a size, keep it to that one prop and call it out
explicitly in the report.

## Acceptance criteria

1. `tiktok` and `linkedin` render the official Simple Icons glyphs, filled, with no stroke bloat.
2. `whatsapp` renders a brand-shaped outline consistent with the reference's line weight.
3. `instagram`, `mail`, `folder` and the whole decoration tier are visually unchanged.
4. The unknown-icon guard still throws.
5. `npm run build` green, zero errors (CLAUDE.md rule 10).
6. Visually gated at **390px and 1280px** against `design/reference.png` — check both the
   hero chip row and the Conectar section, where six icons sit side by side and any weight
   mismatch shows up first.
7. No new dependencies in `package.json`.
8. Conventional commit, one logical change.

## Report

Write `docs/phases/phase-5-report.md` covering: which WhatsApp option you shipped and why,
the LinkedIn plate verdict, any size prop you touched, build output, and what you gated
visually at each breakpoint.
