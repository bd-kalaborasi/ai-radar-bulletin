# Setup Steps — One-Time Pilot Bootstrap

Follow in order. Estimated total time: 45–75 minutes.

## Prerequisites

- [ ] Node.js ≥20 installed (`node -v` to check)
- [ ] Git installed and configured
- [ ] GitHub account with permission to create repos
- [ ] Cloudflare account (free, signup at https://dash.cloudflare.com)
- [ ] Claude Code Max plan with Claude Code on web enabled

## Step 1 — Local sanity check (5 min)

```bash
# Unzip / clone the skeleton into your local workspace
cd ai-radar-bulletin
npm install
npm run build
```

Expected: `npm run build` completes without error and outputs to `dist/`. The
sample bulletin (`2026-05-02-ai-radar.md`) renders.

If the build fails, fix locally before pushing — easier to debug than in CI.

## Step 2 — Create GitHub repos (5 min)

Create two repos via https://github.com/new:

1. **`ai-radar-bulletin`** — Public. This is the site. Do NOT initialize with
   README or .gitignore (the skeleton already has them).
2. **`ai-radar-internal-bd`** — Private. For BD-framed daily output. Initialize
   with a README; we'll structure it later.

## Step 3 — Push skeleton to public repo (5 min)

```bash
cd ai-radar-bulletin
git init
git add .
git commit -m "initial: bootstrap ai-radar-bulletin skeleton"
git branch -M main
git remote add origin git@github.com:<your-username>/ai-radar-bulletin.git
git push -u origin main
```

## Step 4 — Connect Cloudflare Pages (10 min)

1. Go to https://dash.cloudflare.com → Workers & Pages → Create → Pages → Connect to Git
2. Authorize Cloudflare to read your GitHub
3. Select `ai-radar-bulletin` repo
4. Build settings:
   - Framework preset: **Astro**
   - Build command: `npm run build`
   - Build output directory: `dist`
   - Root directory: `/`
   - Environment variable: `NODE_VERSION=20`
5. Project name: **`ai-radar`** (becomes `ai-radar.pages.dev`)
6. Click **Save and Deploy**

First build takes 1–3 minutes. Live URL: `https://ai-radar.pages.dev`.

Verify: open the URL. You should see the masthead and the placeholder
bulletin from 2 May 2026.

## Step 5 — Create Routine 1 (public bulletin) (10 min)

1. Go to https://claude.ai/code/routines
2. Click **Create Routine**
3. Name: `ai-radar-public`
4. Repos: select `ai-radar-bulletin`
5. Connectors: confirm web search and web fetch are enabled
6. Prompt: paste the full Routine 1 prompt from `OPERATIONS.md`
7. Trigger: Schedule → Daily → 08:00 (your local zone, Jakarta WIB)
8. Save

## Step 6 — Create Routine 2 (internal-BD) (10 min)

Same as Step 5, but:
- Name: `ai-radar-internal-bd`
- Repos: `ai-radar-internal-bd`
- Prompt: Routine 2 from `OPERATIONS.md`

## Step 7 — Manual test run (10 min)

Don't wait for the schedule. Trigger both Routines manually:

1. From the Routines list, click each Routine
2. Click **Run now**
3. Watch the run log

**Expected outcome for Routine 1:**
- Research succeeds (or returns quiet-period status)
- A new file appears at `src/content/posts/2026-05-XX-ai-radar.md` in the public repo
- A new file at `data/2026-05-XX.json`
- Cloudflare Pages auto-builds; site updates within 2–3 minutes
- New bulletin appears on https://ai-radar.pages.dev

**If quiet period triggered** (≤2 verified items): no commit, no publish.
This is correct behavior — verify by checking the run log.

**If quality gate fails:** check the error in the run log, fix the prompt
or skill, re-run.

## Step 8 — Confirm schedule (2 min)

In each Routine page, verify:
- Status: Active
- Next run: shows tomorrow 08:00 WIB
- Trigger type: Scheduled

You're done. The pipeline is now self-running.

## Day-2 verification

Tomorrow morning, around 08:30 WIB:
- Check https://ai-radar.pages.dev — should have a new bulletin dated today
- Check the public repo — new commit with conventional message
- Check claude.ai/code/routines — both Routines show "succeeded" for last run

If anything is off, see `OPERATIONS.md` recovery table.

## Open items to decide later

- Site name & branding (currently "AI Radar" generic)
- Custom domain (currently `*.pages.dev`)
- About page copy refinement
- Whether to mirror Astro structure in the private internal-BD repo, or keep
  it as raw markdown notes
- Source-of-record for the `/ai-radar` skill source registry (currently in the
  skill folder — consider whether to externalize for visibility)
