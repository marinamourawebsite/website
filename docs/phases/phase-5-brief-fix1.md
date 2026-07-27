# Phase 5 — Fix round 1: LinkedIn glyph

Resolves the single blocker from `phase-5-report.md`. Read that report and
`phase-5-brief.md` first for context. Scope here is deliberately tiny.

## Human decisions (final — do not re-open)

**1. LinkedIn → solid, plate-less "in". Approved.**
Your evidence image was taken to the human, who confirmed the reference shows a solid
boxless "in" and signed off on the derived glyph. Your own finding is the approved
approach: take the official Simple Icons path and drop the trailing plate subpath that
begins at `M22.225 0H1.771`. Keep everything before it byte-identical:

```
M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452z
```

Renders in the **brand/solid tier** you already built — `fill="currentColor"`, no stroke.
`linkedin` appears only in `social.json` (hero), so there is no second render site to check.

Document in the component comment that this glyph is the official Simple Icons LinkedIn
**with the background plate subpath removed**, human-approved, so a future maintainer
doesn't "restore" it from upstream and silently reintroduce the black square.

**2. Conectar section — WON'T FIX. Your flag was correct; the human chose to accept it.**
You were right that the reference draws TikTok outlined in the Conectar section and solid
in the hero, and right to flag rather than act. The human weighed it and accepted the
divergence: TikTok stays solid in both. **Do not** add a `variant` prop, do not touch
`Connect.astro`. Note the accepted divergence in the report so it is on record.

**3. Horizontal overflow — retracted, no action.**
The Planner re-measured in-browser at 360 / 390 / 500 / 768px using a same-origin iframe
harness: `documentElement.scrollWidth` is *below* the viewport at every width (345/375/485/753)
and zero elements have a right edge past the viewport. `Connect.astro` uses `flex-wrap`, so
the cards reflow. Your measurement was a harness artifact. Nothing to fix — and the phase-2
visual gates stand. Flagging it was still the right call; it just didn't survive checking.

## Scope

- IN: `src/components/Icon.astro` (the `linkedin` entry + its comment), and appending a
  short "fix round 1" section to `docs/phases/phase-5-report.md`.
- OUT: everything else. No `variant` prop, no `Connect.astro`, no `size` props, no other
  icons, no config/schema/JSON (the icon *name* `linkedin` is unchanged).

## Acceptance criteria

1. `linkedin` renders the solid plate-less "in", filled, no stroke, no black plate.
2. Visually gated in the hero chip against `design/reference.png` — confirm it reads at the
   same optical weight as the solid TikTok beside it. The letters sit inset in the 24×24 box
   (~3.5px margin); if that makes it read noticeably small next to TikTok, report the
   measurement rather than silently bumping `size`.
3. Instagram / TikTok / WhatsApp / mail / folder and the decoration tier unchanged.
4. Unknown-icon guard still throws.
5. `npm run build` green.
6. Conventional commit, one logical change.
