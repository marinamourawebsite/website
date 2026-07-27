# Phase 5 — Report: real brand glyphs for social icons

## Status

`blocked` — on **LinkedIn only**. TikTok and WhatsApp are done, built and committed.
The LinkedIn swap is held per the brief's explicit instruction ("report it and stop, do not
improvise a boxless variant"). Everything else in scope shipped.

## What was built

- `src/components/Icon.astro` — only source file touched.
  - Added a **brand tier** (`brandIcons`) rendered `fill="currentColor"` / `stroke="none"`;
    the outline tier keeps `fill="none" stroke="currentColor" stroke-width="2"` plus round
    caps/joins. Paint is chosen once into a `paint` object and spread onto the root `<svg>`.
  - `tiktok` → official Simple Icons glyph, solid. Removed the lucide `music-2` stand-in.
  - `whatsapp` → official Simple Icons geometry, split by subpath: filled handset +
    2px-stroked bubble contour. Removed the lucide `phone` stand-in.
  - `linkedin` → unchanged (lucide), with an inline comment explaining why and pointing here.
  - Header comment rewritten: outline/brand tiers, the WhatsApp hybrid rationale, the
    "never let a filled path inherit stroke-width" trap, and the Simple Icons (CC0-1.0) /
    nominative-trademark note.
  - Unknown-icon guard now lists both maps in its error message.
- `docs/phases/phase-5-linkedin-evidence.png` — 4-up comparison (reference crop / shipped
  lucide / Simple Icons with plate / Simple Icons minus plate) for the human's LinkedIn call.
- `docs/phases/phase-5-report.md` — this file.

Not touched: `public/admin/config.yml`, `src/content.config.ts`, `src/content/*.json`,
`Hero.astro`, `Connect.astro`, decoration tier, `package.json`.

## Decisions made

### WhatsApp — shipped a hybrid, closest to option (a)

Rendered all candidates in headless Chrome at 20px (hero chip), 24px (Conectar card) and
120px, on the real `bg`/`surface` tokens, beside `instagram` and `mail`:

| candidate | verdict |
|---|---|
| (a) full official path, `fill=none stroke=2` | **rejected — muddy**, exactly the predicted double contour. The bubble ring's inner and outer boundaries both stroke, so the rim becomes a black band, and the handset turns into a hollow outline of a filled shape. Unreadable blob at 20px. |
| **(shipped) handset filled + inner bubble contour stroked 2px** | clean at 20 and 24px, optical weight matches `mail`, official proportions preserved. |
| handset filled + *outer* contour stroked 2px | correct shape but heavier than its neighbours, and the 2px stroke on a contour that already reaches x/y 0–24 gets clipped flat at the viewBox edges. |
| same, stroked 1.6px | too light next to `mail`. |

Why the hybrid rather than hand-tuning (b): the reference's WhatsApp is **not** a plain
outline — it is an outline bubble with a **solid** handset (see the 12x crop, hero chip).
That is exactly what you get by keeping the official geometry and painting the first
subpath filled and the bubble contour stroked. No shape was invented; only paint differs.

Implementation note: subpaths 2 and 3 of the official path start with *relative* `m`
commands, so they cannot be lifted out verbatim. I parsed the path to get absolute subpath
starts — subpath 2 begins at exactly `M12.05 21.785`. That is the only edit made to the
supplied path data; every curve/arc after the moveto is byte-identical to the brief.

Measured against the reference (dark-pixel mass inside each hero chip, reference's own
scale): instagram 190, tiktok 193, linkedin 197, whatsapp 155. The shipped WhatsApp is
likewise the lightest of the row, and TikTok reads at the same mass as Instagram — which is
why no `size` prop was changed (see below).

### LinkedIn — plate clearly diverges, stopped as instructed

The reference (hero chip, 12x crop) shows a **solid, boxless "in"**: no rounded-square
plate, letterforms filled dark on the chip's light background. The official Simple Icons
glyph is the inverse — a filled dark plate with the letters knocked out. Dropped into the
44px circular chip it reads as a black square and is by far the heaviest thing on the page.
That is a clear divergence, so per the brief I did not ship it and did not improvise a
replacement. `linkedin` still renders the lucide stand-in.

`docs/phases/phase-5-linkedin-evidence.png` shows the four options side by side at chip size
and enlarged. For the Planner/human, the two things worth knowing:

1. The current lucide stand-in already has the **right silhouette** (boxless "in"); it is
   wrong only in fill style — hollow 2px outline where the reference is solid.
2. The official Simple Icons path is four subpaths in the order `n`, dot, `i`-stem, plate.
   Truncating the string at `M22.225 0H1.771` drops the plate and leaves a solid boxless
   "in" that matches the reference almost exactly (4th column of the evidence image). It is
   derived from the official path, not drawn by hand — but it is still a modified brand
   mark, i.e. a branding decision. **Not shipped, awaiting sign-off.**

### No `size` props changed

The brief allowed a smaller `size` for solid glyphs. Not needed: the reference itself draws
TikTok at the same box height as Instagram (24px vs 23px measured), and at equal `size` the
Simple Icons TikTok's ink mass matches lucide Instagram's within ~2%. Both `Hero.astro`
(`size={20}`) and `Connect.astro` (`size={24}`) are untouched.

## Deviations

None from the brief. One **finding that conflicts with the brief's global target state**,
flagged rather than acted on:

- The reference does **not** use one treatment per icon across the page. In the hero chip
  row TikTok is solid and the WhatsApp handset is solid; in the **Conectar** section the same
  two are drawn as pure thin **outlines** (hollow TikTok note, hollow handset), matching the
  uniformly outlined `folder`/`mail` cards there. The brief's target table specifies TikTok
  SOLID globally, so that is what shipped — the Conectar section now shows a solid TikTok
  where the reference shows an outlined one. Supporting both would need a `variant` prop on
  `Icon.astro` plus edits to `Connect.astro`, neither of which the brief authorises. Raising
  it for the reviewer instead of quietly implementing it. Zoomed crops:
  reference Conectar TikTok/WhatsApp are unmistakably hollow.

## Build

```
npm run build
[content] Synced content
[build] output: "static"
[build] Building static entrypoints...
[vite] ✓ built in 619ms
generating static routes  ├─ /index.html
[build] 1 page(s) built in 1.09s
[build] Complete!
```
Zero errors, zero warnings. Unknown-icon guard re-verified by temporarily adding a page with
`<Icon name="definitely-not-an-icon" />`: build fails with
`Icon "definitely-not-an-icon" is not in the whitelist. Allowed: instagram, linkedin,
whatsapp, mail, video, smartphone, ticket, handshake, lightbulb, folder, chevron-down,
chevron-right, check, heart, download, arrow-right, tiktok`. Temp page removed.

## Visual gating

Headless Chrome against the running dev server, full-page at 2x, compared with crops of
`design/reference.png`:

- **390px** — hero chip row: instagram / tiktok / linkedin / whatsapp all sit evenly; solid
  TikTok matches the reference chip almost exactly; WhatsApp bubble+solid handset matches.
  Conectar row (5 cards) wraps as before, weights even except the TikTok note above.
- **1280px** — same two areas, plus a full-page pass to confirm the decoration tier
  (service-card icons, chevrons, check marks, hearts, download buttons, footer arrow) is
  visually unchanged. It is — those all still take the outline branch of `paint`.

Unrelated pre-existing issue noticed while gating: **the page overflows horizontally below
~500px** — at 360/390px viewport widths the content box stays ~500px wide and text/cards are
clipped on the right. I verified this is not mine: stashing the Phase 5 diff and
re-screenshotting at 360px reproduces the identical overflow. Out of scope here, but it
means the "390px" gate above was done on a layout that is already broken at that width.

## TODOs introduced

None. No placeholder content added. (Pre-existing `TODO:` placeholders in `src/content/*.json`
are untouched.)

## Questions for reviewer

1. **LinkedIn** — do we take the plate-less derivation of the official glyph (matches the
   reference), keep the lucide stand-in, or accept the plate and diverge from the reference?
   Needs the human, per the brief.
2. **Per-section fill style** — is the reference's outlined TikTok/hollow handset in the
   Conectar section intentional design, or an artifact of the mockup? If intentional, it
   needs an `Icon.astro` `variant` prop and a follow-up phase.
3. **WhatsApp bubble contour** — I stroked the *inner* contour, which puts the glyph's
   optical width at ~21.6/24 units, essentially identical to lucide Instagram's. If the
   reviewer wants the bubble a touch larger, the outer contour is the alternative, at the
   cost of clipping at the viewBox edges.
4. The horizontal overflow below ~500px is pre-existing but severe enough that it probably
   deserves its own phase.
