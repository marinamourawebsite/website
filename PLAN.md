# PLAN — Multi-agent execution

## Roles

- **Planner/Orchestrator** — the MAIN session (run it on the strongest model available; check `/model`). Never writes application code. Owns this file, writes phase briefs, dispatches subagents, resolves conflicts, decides approval.
- **executor** — subagent (`.claude/agents/executor.md`, Opus). Implements one phase per invocation.
- **reviewer** — subagent (`.claude/agents/reviewer.md`, Opus, read-only). Audits one phase per invocation.

## Handoff protocol (files are the only shared memory)

Subagents run in isolated context: they do NOT see this conversation. Everything they need must be in files.

```
docs/phases/
  phase-0-brief.md    # written by Planner
  phase-0-report.md   # written by executor
  phase-0-review.md   # written by reviewer
  phase-1-brief.md
  ...
```

## Orchestration loop (Planner follows this strictly)

For each phase N in the table below:
1. **Brief** — write `docs/phases/phase-N-brief.md`: objective, exact scope (in/out), files expected to change, acceptance criteria copied/adapted from the phase definition, and any decisions already made in earlier reviews.
2. **Execute** — invoke `executor` with: "Execute phase N. Read docs/phases/phase-N-brief.md first."
3. **Review** — read the report. Then invoke `reviewer` with: "Review phase N."
4. **Gate** — read the review.
   - `approved` → mark phase done below, proceed to N+1.
   - `changes-requested` → write `phase-N-brief-fix1.md` with ONLY the blocker findings, re-invoke executor, re-review. Max 2 fix rounds; after that, escalate to the human with a summary of what's stuck.
5. **Log** — append one line to `docs/phases/LOG.md`: phase, rounds needed, notable findings. (This log is the experiment data — the human is testing multi-agent orchestration itself.)

Planner rules:
- Never edit `src/` yourself. If you're tempted, the brief was incomplete — fix the brief.
- Never invoke executor for two phases at once.
- Minor/nit findings don't block: carry them into the next phase's brief instead of triggering a fix round.

## Phases

Same content as before, now as dispatch units:

| N | Phase | Done when |
|---|---|---|
| 0 | Scaffold: Astro + Tailwind + Fontsource, folder structure, theme tokens | Dev server renders empty Base layout, correct bg + fonts, build green |
| 1 | Content layer: 7 JSON singletons + zod schemas + Icon.astro | Debug page renders every field and icon; schemas match config.yml |
| 2a | Components: SectionLabel, Hero (incl. smooth-scroll w/ reduced-motion guard) | Matches reference at 390/1280px |
| 2b | Components: Services, About | Matches reference at 390/1280px |
| 2c | Components: Connect, Materials, FooterCta + assemble index.astro | Full page matches reference top to bottom |
| 3 | Sveltia: public/admin/ (index.html + config.yml from kit), local workflow test | Editing JSON via local CMS UI + rebuild updates the page |
| 4 | Quality: SEO head, a11y sweep, Lighthouse ≥ 95 mobile, TODO report | All criteria met; final TODO list in docs/phases/LOG.md |
| 5 | Post-delivery: real brand glyphs for social icons (resolves handoff TODO 13) | Instagram/TikTok/LinkedIn/WhatsApp render real brand marks matching the reference's mixed fill treatment |

Phase 5 was added after delivery, at the human's request. Post-delivery adjustments follow the
same brief → execute → review → gate loop; they do not bypass it.

Phase 2 was split into 2a/2b/2c deliberately — smaller dispatch units make the orchestration experiment more observable (more briefs, reports and reviews to compare).

## Manual steps (human, after Phase 4)
1. GitHub repo → Cloudflare Pages (build `npm run build`, output `dist/`).
2. Deploy sveltia-cms-auth Worker, register GitHub OAuth App, set env vars (`GITHUB_CLIENT_ID`, `GITHUB_CLIENT_SECRET`, `ALLOWED_DOMAINS`).
3. Fill `base_url` + `repo` in config.yml; test `/admin` login in production.
4. Replace placeholder assets with real ones via CMS.
