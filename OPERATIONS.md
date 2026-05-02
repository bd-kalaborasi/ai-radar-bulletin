# Operations — AI Radar Bulletin

This document holds the operational details: Routine prompt templates, recovery procedures, and scaling tiers. Architecture and conventions are in `README.md`.

## Routine 1 — `ai-radar-public`

**Trigger:** Schedule, daily 08:00 WIB (UTC+7) → Claude Code converts from local automatically.

**Repos attached:** `<owner>/ai-radar-bulletin` (public, this repo).

**Connectors:** web search, web fetch.

**Prompt template** (paste into Routine config):

```
You are running the daily AI Radar pipeline for the public bulletin.

STEP 1 — RESEARCH
Invoke the /ai-radar skill with these parameters:
- timeframe: "last 24h" (or "last 72h" if today is Monday)
- categories: all
- depth: standard (target 10–15 verified items)
- audience: both (you'll generate public-digest and internal-BD framings;
  this Routine only commits the public-digest version)

STEP 2 — QUALITY GATE (semantic, your responsibility)
Before formatting the post, self-check:
1. Every quantitative claim has a primary source URL
2. No source is quoted more than once anywhere in the bulletin
3. No quote exceeds 14 words
4. Stage 3.5 exploration was performed broadly (≥30% of items from outside
   the source registry)
5. Limitations section is substantive (not boilerplate; names what was missed
   and why)
6. Dropped section lists items considered but rejected, with reason
7. Tone is neutral newsroom — no hype patterns: revolutionary, game-changer,
   mind-blowing, breakthrough, state-of-the-art (unless directly quoted from
   vendor and attributed), disrupt*, must-have

If any check fails, revise the content. Do not proceed to commit until all
six checks pass.

STEP 3 — QUIET PERIOD CHECK
If after research and verification you have ≤2 verified items, do NOT publish.
Instead, log "quiet period — only N verified items" and exit. The site stays
on yesterday's bulletin.

STEP 4 — FORMAT
Produce a markdown file with frontmatter exactly matching this contract:

---
title: "AI Radar — DD Mon YYYY"
date: YYYY-MM-DD
audience: ["public-digest"]
period_start: YYYY-MM-DD
period_end: YYYY-MM-DD
items_reviewed: <int>
items_published: <int>
items_dropped: <int>
categories: [<from controlled list — see README.md>]
verification_summary:
  verified: <int>
  secondary: <int>
  rumor: <int>
limitations_present: true
sources_count: <int>
exploration_pct: <int 30-100>
---

Body must include:
- "## Items" with N entries, each labeled with tier (T1–T5) and verification
  status, with primary source URL
- "## Limitations" section
- "## Dropped" section

Save to: src/content/posts/YYYY-MM-DD-ai-radar.md

ALSO save the full structured radar output (both audiences, all metadata) to:
data/YYYY-MM-DD.json

STEP 5 — SYNTACTIC GATE
Run `npm install` once (cached after first run), then `npm run verify:post --
src/content/posts/YYYY-MM-DD-ai-radar.md`.

If the script exits non-zero, do NOT commit. Read the errors, fix the post,
re-run. Maximum 2 fix attempts; if still failing, exit with error log.

STEP 6 — BUILD CHECK
Run `npm run build`. If Astro build fails (e.g., Zod schema rejects a field),
do NOT commit. Same fix-loop rule as Step 5.

STEP 7 — COMMIT & PUSH
Commit message format:
  ai-radar: YYYY-MM-DD — N items (V verified, S secondary, R rumor)

Push to main. Cloudflare Pages picks it up automatically.

STEP 8 — REPORT
Output a one-paragraph run summary: items reviewed, published, dropped,
which categories, any anomalies. This goes in the Routine run log.
```

## Routine 2 — `ai-radar-internal-bd`

**Trigger:** Schedule, daily 08:00 WIB.

**Repos attached:** `<owner>/ai-radar-internal-bd` (private).

**Prompt template:** identical to Routine 1, except:

- Step 1 audience parameter: focus on internal-BD framing
- Step 4 frontmatter `audience: ["internal-bd"]`
- Step 4 body emphasizes workflow-automation leverage points per item
- Skip Step 5 (quality gate script not deployed in private repo unless desired)
- Skip Step 6 (no Astro build in private repo unless mirrored)
- Step 7 commit format: `ai-radar-bd: YYYY-MM-DD — ...`

The private repo may be a flat markdown collection without Astro. Decide
during operations setup whether to mirror the public site structure or keep
it as raw notes.

## Recovery procedures

| Failure | Symptom | Fix |
|---|---|---|
| Source unreachable | Skill logs in Limitations, continues | None — already documented in post |
| Syntactic gate fails | `quality-gate.mjs` exits non-zero | Routine retries 2× then logs error; owner reviews next day |
| Astro build fails | `npm run build` exits non-zero | Same |
| Git push fails | Auth or merge conflict | Routine retries once, then errors. Manual: `git pull --rebase && git push` |
| Token quota hit | Routine error mid-run | Wait for reset (5h rolling). Check at claude.ai/code/routines |
| Stage 3.5 <30% | Quality gate (Layer 2) catches it | Claude re-runs with explicit broader exploration scope |
| Quiet period | ≤2 verified items | Acceptable. No publish. Sunday catch-up summarizes the gap |
| Cloudflare build fails | Site stays on previous build | Check Cloudflare dashboard. Usually a typo in markdown — fix and push again |

## Scaling tiers (for future IT handoff)

The pilot is intentionally minimal — fewer moving parts to debug while we calibrate the Routine. As confidence grows:

**Tier 1 — Review workflow.** Routine commits to a `staging` branch instead of `main`. Owner (or eventual editor) reviews PR, merges to publish. Trades autonomy for an extra human gate.

**Tier 2 — Monitoring.** Cloudflare Analytics on the site, Slack webhook on Routine failure, uptime check on the public URL. Notification surface beyond email.

**Tier 3 — CMS layer.** Replace single repo with proper CMS (Decap, Tina) or headless backend if non-technical editors need to add posts manually alongside the Routine.

**Tier 4 — Automated tests.** Quality gate as CI tests on PR (link-check, frontmatter schema, hype-language regex, copyright-quote-length). Block merge on fail.

**Custom domain.** Switch from `*.pages.dev` to a real domain when ready for public visibility beyond pilot. DNS via Cloudflare (free).
