# AI Radar Bulletin

Daily verified AI news bulletin. Autonomous research → markdown → static site → public page.

Pipeline: Claude Code Routine (cloud-scheduled, 08:00 WIB daily) invokes the `/ai-radar` skill, runs a hybrid quality gate, and commits the output to this repo. Cloudflare Pages auto-builds on push.

## Stack

| Layer | Tool | Why |
|---|---|---|
| Research | Claude Code Routine + `/ai-radar` skill | Cloud-scheduled, included in Max plan |
| Storage | Markdown in `src/content/posts/` + JSON sidecar in `data/` | Git is the archive |
| Build | Astro v5 (pinned) | Type-safe content collections, fast builds |
| Hosting | Cloudflare Pages free tier | Unlimited bandwidth, 500 builds/month |
| Quality gate | Hybrid: `scripts/quality-gate.mjs` (syntactic) + Claude self-check (semantic) | Defense in depth |

## Local development

```bash
npm install
npm run dev         # http://localhost:4321
npm run build       # production build → dist/
npm run preview     # serve dist/ locally
npm run verify      # run quality gate on all posts
```

Requires Node.js >=20.

## Repo layout

```
ai-radar-bulletin/
├── src/
│   ├── content/
│   │   └── posts/             # ← bulletins live here (one .md per day)
│   ├── pages/
│   │   ├── index.astro        # last 30 days
│   │   ├── archive.astro      # >30 days, grouped by month
│   │   ├── about.astro        # methodology disclosure
│   │   └── [...slug].astro    # individual post pages
│   ├── layouts/
│   │   ├── BaseLayout.astro
│   │   └── PostLayout.astro
│   ├── components/
│   │   └── PostListItem.astro
│   ├── styles/
│   │   └── global.css
│   └── content.config.ts      # Zod schema — first line of quality gate
├── scripts/
│   └── quality-gate.mjs       # syntactic checks (Layer 1 of hybrid gate)
├── data/                      # JSON sidecars per post (committed by Routine)
├── public/                    # static assets (favicon, etc.)
├── astro.config.mjs
├── package.json
├── tsconfig.json
└── wrangler.toml              # Cloudflare Pages build config
```

## Frontmatter contract

Every post in `src/content/posts/` must include:

```yaml
---
title: "AI Radar — DD Mon YYYY"
date: YYYY-MM-DD
audience: ["public-digest"]
period_start: YYYY-MM-DD
period_end: YYYY-MM-DD
items_reviewed: N
items_published: N
items_dropped: N
categories: [<from controlled list>]
verification_summary:
  verified: N
  secondary: N
  rumor: N
limitations_present: true
sources_count: N
exploration_pct: NN          # must be >= 30
---
```

Allowed `categories` values: `model-release`, `agent-framework`, `dev-tools`, `mcp-ecosystem`, `ai-for-business`, `research-papers`, `policy-regulation`.

Schema is enforced by `src/content.config.ts` (Zod). Build fails if any post violates it.

## Required body sections

Every post body must contain markdown sections titled `Limitations` and `Dropped` (under `##` or `###` headers). The quality gate script enforces this in addition to Zod schema.

## Quality gate (hybrid 5C)

**Layer 1 — Syntactic (Node script + Zod):**
- All required frontmatter fields present
- `exploration_pct >= 30`
- `items_reviewed >= items_published + items_dropped`
- `verification_summary` sums to `items_published`
- Required body sections (`Limitations`, `Dropped`) present
- No quote >14 words (copyright rule)
- Hype-language patterns flagged as warnings

**Layer 2 — Semantic (Claude self-check inside Routine prompt):**
- Substantive limitations (not boilerplate)
- No source quoted twice (cross-document check)
- Tone matches neutral newsroom, not hype
- Stage 3.5 exploration was actually performed broadly

If Layer 1 fails, the Routine does not commit — error surfaces in run log. Layer 2 failures cause Claude to revise before commit.

## Archive logic

Posts with `date < today - 30 days` automatically appear under `/archive` instead of `/`. No physical deletion — every post stays at its direct URL forever. Filter is applied at build time (no backend, no database).

## Routine setup (operational)

Two Routines on the owner's Claude Code Max account:

1. **`ai-radar-public`** — daily 08:00 WIB → commits to this repo's `main` branch
2. **`ai-radar-internal-bd`** — daily 08:00 WIB → commits BD-framed version to private repo

Both use the same `/ai-radar` skill but with different `audience` parameter. See `OPERATIONS.md` for prompt templates and recovery procedures.

## Cost ceiling

- Claude Max 20x: 2 routine runs/day = 2/15 daily quota
- Cloudflare Pages: ~30 builds/month (1/day) of 500 free
- GitHub: free public repo

If any of these change, owner is notified before change takes effect.

## Scaling path

This is a pilot. Production hardening (PR review workflow, monitoring, automated link-checking, custom domain) lives in `OPERATIONS.md` Tier 1–4 sections.
