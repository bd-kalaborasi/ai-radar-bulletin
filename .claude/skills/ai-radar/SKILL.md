---
name: ai-radar
description: Rigorous, citation-backed research on latest AI news, model releases, agent frameworks, dev tools, MCP updates, and AI-for-business developments with zero hallucination. Use whenever the user asks for AI updates, weekly AI digest, model release scan, vendor news (Anthropic, OpenAI, Google, Manus, Mistral, Meta, xAI, etc.), agent framework news, AI tooling for productivity, or "what's new in AI". Trigger on phrases like update AI terbaru, riset AI, scan rilis AI, AI weekly, model release, agent news, what shipped this week, AI radar, catchup AI. Use even when the user doesn't say "research" — if they want reliable current AI info, this applies. Enforces zero-hallucination discipline: every claim traces to a primary source with date and verification status; unverifiable items are dropped, not disclaimed. Output is dual-format: internal brief framed for workflow-automation/BD use cases, plus a public-ready digest. Research only — publishing and integration are out of scope.
---

# AI Radar — Rigorous AI News Research

A discipline for producing reliable, citation-backed snapshots of what's happening in AI right now. Built for a workflow-automation / BD audience that needs to spot leverage opportunities without being misled by hype, marketing copy, or fabricated benchmarks.

## When to use this skill

- User asks for an AI update, weekly AI digest, or "catch me up on AI"
- User asks about specific vendor news (Anthropic, OpenAI, Google, Manus, Mistral, Meta, xAI, etc.) or specific topics (agent frameworks, MCP, AI dev tools)
- User wants to know which AI capabilities can be leveraged for workflow automation
- User asks "is X true" about an AI claim circulating in social media

If the user wants brainstorm, opinion, or hypothetical discussion about AI — do NOT use this skill, it adds overhead. Use this skill only when factual reliability is the priority.

## Core principles (non-negotiable)

1. **Every claim traces to a primary source.** The source URL, publication date, author/org, and verification status are recorded. No claim ships without all four.
2. **Primary > secondary always.** If a news article says "OpenAI announced X", the skill fetches the OpenAI blog post itself, not the news article. The news article is at most a discovery aid.
3. **Source quality is graded before claims are stated.** A vendor blog and an independent benchmark cannot share the same weight. The grading rubric for AI domain is in `references/source-quality-rubric-ai.md`.
4. **Conflicting claims are surfaced, not hidden.** When a vendor's marketing benchmark contradicts an independent benchmark, both are shown with grading.
5. **Gaps are stated explicitly.** "I could not verify this claim from a primary source" is a valid output — fabricating a source is not.
6. **Items that cannot be verified are dropped, with transparency.** A "Dropped items" section lists what was skipped and why, so the user knows the radar didn't miss them silently.
7. **Hype language is stripped.** "Revolutionary", "game-changing", "10x faster" without a benchmark — these are flagged and rewritten or dropped. The skill does not launder marketing copy.

## When the skill runs (invocation modes)

This skill runs in **automated mode only** — fetches publicly accessible sources via `web_search`, `web_fetch`, RSS, and public APIs. Login-walled content (X timeline as logged-in user, IG, LinkedIn private posts, Discord servers) is **out of scope** for this skill.

Why: the skill is designed to be invokable by Cowork on a schedule. That requires deterministic, login-free access. Login-walled content can be added later via a separate Chrome-connector workflow if needed.

What this means in practice:
- ✅ Vendor blogs, GitHub releases, RSS, public news, Reddit, Hacker News, public X posts visible via search
- ❌ X timeline scrolling, IG, LinkedIn DMs, Discord — not handled

## The 7-stage workflow

### Stage 1 — Scope the run

Confirm with the user (or use defaults if invoked automatically):
- **Timeframe**: last 72h / last 7d / last 30d / custom date range
- **Categories**: pick from `model-release`, `agent-framework`, `dev-tools`, `mcp-ecosystem`, `workflow-automation`, `productivity-tools`, `ai-for-business`, `research-papers`, `policy-regulation`, or `all`
- **Depth**: `quick-scan` (top 5 items, ~15 min) / `standard` (top 15, ~45 min) / `deep` (25+, ~2h)
- **Audience**: `internal-bd` (workflow automation framing) / `public-digest` (neutral newsroom tone) / `both`

If invoked automatically without parameters, default to: `last 72h`, `all categories`, `standard depth`, `both audiences`.

**Why 72h not 24h**: AI vendor announcements often happen mid-week and don't surface in search indexes for 24-48h. Strict 24h windows produce sparse output and miss substantive items. 72h is the practical sweet spot for daily runs — recent enough to feel current, long enough to catch lagged indexing.

**Window expansion (mandatory rule)**: If after standard searches in the strict window you have ≤5 verified items, expand the window:
- Daily run with 72h base → expand to 5 days
- Weekly run with 7d base → expand to 10 days
- Document the expansion in Limitations: "Strict window yielded N items; expanded to X days to recover signal density."

The point is signal density, not arbitrary recency. A high-quality item from 4 days ago beats a thin item from yesterday. **Items dated outside the expanded window are still dropped** — the goal is reach, not staleness.

### Stage 2 — Plan source coverage

Open `references/source-registry.md`. The registry is a **starting point with known-good sources**, NOT a whitelist. Use it to seed the harvest, but treat exploration beyond the registry as mandatory (see Stage 3.5). For each category in scope, identify which registry sources to harvest first. Categories must hit at least 3 source tiers each — never rely solely on vendor blogs or solely on third-party news.

For each source planned, note expected yield (high/medium/low) so the user can see effort budget.

### Stage 3 — Harvest primary sources

In priority order:
1. **Vendor primary** (blog/news/changelog/release notes pages) — `web_fetch` directly
2. **GitHub releases** — fetch `https://github.com/{org}/{repo}/releases` or RSS
3. **Newsletter/media** with original reporting — fetch full article, not summary
4. **X / public social via search** — `web_search "site:x.com [topic]"` or `"site:threads.net [topic]"` to capture posts visible in search index. If a tweet is the original source (founder announcement before official blog), record the tweet URL as primary at T2; influencer commentary is T4. **Engagement proxy**: when the same X/Threads post appears in multiple aggregator/news search results, treat that diffusion as a signal of practitioner-community attention — flag in cross-references with note "diffusion: cited by N outlets". True engagement metrics (likes, retweets, reply count) require Twitter API access not available in this environment; diffusion is the practical proxy.
5. **Community signals** (HN, Reddit) — use as discovery aid only, never as primary citation

**Category priority (BD-relevance)**: items in different categories have different default weight in the run. Top-tier (highest priority for surfacing):

1. **`workflow-automation`** — tools that automate cross-app or cross-department processes (Zapier-style, n8n, Make, etc., plus AI-native automation platforms). Direct BD leverage for the radar's audience.
2. **`productivity-tools`** — AI-powered tools for individual or team productivity (Notion AI, Linear, Granola, etc.). High direct applicability.
3. **`agent-framework`** — frameworks and platforms for building agentic AI (LangChain, LlamaIndex, AutoGen, CrewAI, Browser-use, OpenHands, Manus). Enables custom automation builds.
4. **`dev-tools`** — AI-coding tools (Cursor, Claude Code, Copilot, Cody). Enables faster pilot app builds.
5. **`mcp-ecosystem`** — MCP spec, servers, integrations. Foundation for connecting AI to existing workflows.
6. **`ai-for-business`** — enterprise AI deployments, partnerships, vendor strategy that affects deployment decisions.
7. **`model-release`** — frontier or open model releases. Relevant when API/pricing/availability changes affect deployment.
8. **`research-papers`** — research with practical implications. Medium priority; surface only if the finding affects a current pilot or production decision.
9. **`policy-regulation`** — government rulings, compliance requirements. Lower priority unless directly affects what tools can be deployed.

This is a soft prior, not a hard filter. A landmark policy ruling can still lead. But absent strong signal, weight toward items where the BD audience can act.

Search rules from `research-rigor` apply:
- Specific keywords beat generic phrases
- Search for current year explicitly when timeliness matters
- Run lateral searches: if you find a release, search for benchmarks, critiques, replications
- Document every search in an internal log (queries + yield)

### Stage 3.5 — Exploration beyond the registry (mandatory)

The registry is intentionally incomplete. AI moves too fast for any curated list to stay comprehensive — new vendors, new researchers, new tooling appear weekly. Skipping this stage produces stale, registry-bound output that misses the actual frontier.

For every run, allocate at least 30% of search budget to **exploratory searches** that go beyond registered sources:

1. **Open-ended discovery searches** for the timeframe and categories in scope:
   - `"AI announcement" [month] [year]`
   - `"agent framework" launch [month] [year]`
   - `"new LLM" OR "new model" released [date range]`
   - `"AI startup" funding announcement [month] [year]`
   - Use varied phrasings — search engines reward keyword variation

2. **Trending and aggregator pages** (use as discovery, then trace upstream):
   - GitHub trending — `https://github.com/trending?since=weekly`
   - Hugging Face Daily Papers — `https://huggingface.co/papers`
   - Hacker News front page filtered for AI keywords
   - Product Hunt AI category for the period
   - **MCP server aggregators** — PulseMCP, Glama AI, mcp.so (track new MCP servers shipping for automation/integration)

3. **GitHub stars-based discovery (automation/productivity focus)**: search GitHub explicitly for active repos with adoption signal in BD-relevant topics. Use search patterns like:
   - `topic:claude-skill stars:>50 pushed:>{date}` — Claude skills with traction
   - `topic:mcp-server stars:>100 pushed:>{date}` — MCP servers with adoption
   - `topic:ai-agent stars:>50 created:>{date}` — new agent tooling
   - `topic:llm-tools OR topic:ai-automation stars:>100 pushed:>{date}` — adjacent automation tools
   - `topic:claude-code OR topic:cursor stars:>50 pushed:>{date}` — dev tool ecosystem

   Adapt the date threshold to the run's timeframe. Filter false positives: starred-but-stale repos (`pushed:<60d` is the floor for "active"), tutorial repos, archived projects. **Stars without recent commits = not adoption, just bookmarking.**

4. **Lateral discovery from any item already found**: when an item mentions a person, company, or tool not in the registry, run a search on that name. New names lead to new sources.

5. **Cross-language discovery**: at least once per run, search in Indonesian / SEA-region terms for AI news (`"AI Indonesia"`, `"startup AI Asia Tenggara"`, `"model AI lokal"`) — registry is US/EU-heavy and SEA coverage gap is documented in Limitations.

6. **Adversarial discovery**: actively search for criticism, replication failures, or contradicting evidence on items already harvested. "X benchmark debunked", "Y vendor controversy", "Z model limitations" — counter-evidence is as important as the original claim.

7. **Diffusion-signal discovery (social engagement proxy)**: when a tweet, blog post, or announcement appears repeatedly across different aggregators / newsletters / search results within the window, that **multi-source citation pattern** is a signal of community attention worth investigating. This is not engagement measurement (no Twitter API), but a practical proxy: high diffusion = high practitioner attention = worth a closer look. Trace upstream to verify the source still passes the rubric — diffusion does not equal quality.

When exploration surfaces a previously-unknown source that proves reliable across multiple runs, propose adding it to the registry (per the checklist at the end of `source-registry.md`). Registry is updated quarterly based on exploration findings — it grows, it does not stay static.

**Failure mode to avoid**: a run that only cites registry sources is a regression, not a feature. The registry is scaffolding, not a cage.

### Stage 4 — Grade each source

Apply the rubric in `references/source-quality-rubric-ai.md`. Every source gets a tier grade T1-T5 recorded explicitly. **Vendor blogs are T2 for capability claims about their own product, but T4 for comparative benchmarks against competitors** — read the rubric for nuance.

### Stage 5 — Extract claims with provenance

For each item worth including, record:
- **Source URL** (primary, not aggregator)
- **Tier grade** (T1-T5)
- **Publication date** (exact, not "recent")
- **Author/org**
- **Methodology** (announcement / changelog / benchmark / opinion / rumor)
- **Verification status**: `verified` (primary source confirmed), `secondary` (primary not yet found, news outlet reporting), `rumor` (single-source unverified)
- **Conflict of interest flag** if applicable

Apply the 15-word quote limit and one-quote-per-source rule from copyright policy. Default to paraphrasing.

#### Stage 5.5 — De-duplicate before formatting (mandatory)

A single announcement reported by multiple outlets is **one item, not many**. Before moving to Stage 7, apply dedup:

1. **Same announcement, multiple outlets** → 1 item with primary source as URL, additional outlets in cross-references. Example: Pentagon AI deal → 1 item citing DefenseScoop primary, with CNN/UPI/Breaking Defense as cross-refs. Not 4 items.
2. **Same product, related announcements same day** → group into 1 item if all in one vendor blog (e.g., model + pricing + benchmark together). Separate if independent (e.g., model release + safety policy update).
3. **Same story, different framings** → keep the version with strongest sourcing. Two outlets reporting same fact differently → prefer primary-source-confirmed version.
4. **Same vendor, multiple unrelated launches in window** → separate items, each with its own provenance.

Dedup decision rule (in order):
- Title + date proximity (within 48h) + same primary entity → likely duplicate, merge
- Different titles, same factual claim, same date range → check if same announcement reported differently → merge
- When in doubt, separate items but cross-reference each other

The "Items reviewed" count in run parameters includes pre-dedup candidates. The "Items published" count is post-dedup. Surface this in run summary so the reader sees harvest breadth.

**Why this matters specifically for AI radar**: AI announcements get heavy coverage from many outlets simultaneously. Without dedup, a single Microsoft Agent 365 GA could occupy 5-7 slots in the bulletin and crowd out other substantive items. Dedup preserves signal density.

### Stage 6 — Reconcile conflicts

When two sources disagree about the same fact (e.g., model release date, benchmark score, pricing), apply weighted synthesis from `references/conflict-reconciliation-ai.md`:

1. List all sources making the claim with tier grades
2. Identify methodological difference producing the disagreement
3. Compute weighted recommendation (T1=4x, T2=3x, T3=2x, T4=1x, T5=0x)
4. State reconciliation transparently in deliverable

If evenly split among same-tier sources, state explicitly: "evidence is genuinely mixed".

### Stage 7 — Write deliverable

Use the template in `templates/output-template.md`. The template enforces:
- Compact metadata header per item (not run-on inline prose)
- No "Item N:" prefix in titles — declarative title only
- Active voice, lead with action
- 2-4 sentence body per item, no padding
- Suppress default fields (Conflict of interest: none observed; Recency-adjusted weight: 1.0) — only surface non-default values
- Every item has "Why it matters for automation/productivity" framing
- Every quantitative claim has a calculation or source
- A "Dropped" section showing what was skipped and why
- A "Limitations" section naming gaps in coverage and confidence
- Two output formats (internal-BD and public-digest) generated from the same verified item pool

Self-check using the checklist at the end of `references/deliverable-rules-ai.md` before delivering.

**Copywriting principles** are documented in `templates/item-record.md`. Read them before writing the first item — they are not optional. Common failure modes:
- Listing every metadata field inline as prose (creates wall-of-text)
- Using "Item 1:", "Item 2:" academic-paper prefix (signal of unfinished editing)
- Hype language slip ("revolutionary", "game-changing", "breakthrough") — even in summaries
- "What this means for users" generic phrasing — should be specific to automation/productivity

## Anti-patterns specific to AI news

These are mistakes that look reasonable but produce unreliable AI radar output. Avoid them.

- ❌ **Quoting vendor benchmark numbers as fact.** "Model X is 30% faster than Y" from the vendor's own announcement is a marketing claim, not a measurement. Either find independent benchmark or label as "vendor-claimed, unverified by independent source"
- ❌ **Treating a news article as primary.** A TechCrunch article saying "Anthropic launched X" is a discovery signal, not the source. Fetch the Anthropic blog
- ❌ **Including a tweet thread without checking if the claimant is reliable.** A founder of the company is primary; a random AI influencer with no verification is T4 at best
- ❌ **"Industry is shifting toward X" without sources.** This is editorial framing dressed as fact. Either back with ≥3 independent sources or strip the claim
- ❌ **Copying capability claims from vendor demo videos without testing.** Demo conditions are cherry-picked. Note "vendor demo, not independently reproduced"
- ❌ **Using a benchmark leaderboard without checking if the test data is contaminated.** Many AI benchmarks have known contamination issues (e.g., test set in training data). Flag when relevant
- ❌ **Confusing "released" with "available".** A model can be announced, in private beta, in waitlist, in API only, in chat product only — distinctions matter for whether it can be leveraged
- ❌ **Inflating GitHub stars or trend numbers as adoption proof.** Stars ≠ usage. Note "stars only — no telemetry on actual adoption"

## Calibrating depth to scope

| Scope signal | Searches | Items in deliverable | Time budget |
|---|---|---|---|
| Quick-scan (e.g., daily standup prep) | 5-8 | top 5 | 15-20 min |
| Standard weekly | 15-25 | 10-15 | 45-60 min |
| Deep (monthly review or vendor deep-dive) | 30+ | 20+ | 90-180 min |
| Specific-question (e.g., "is Manus actually working?") | 10-15 lateral searches on one topic | 1 thorough finding | 30-60 min |

Match the budget to what the user signaled. Default to `standard` if unclear.

## Reporting limitations honestly

Every deliverable includes a "Limitations" section that names:
- Sources that were unreachable during this run (with reason)
- Login-walled content that may have been missed (X timeline, etc.)
- Items with verification status of `secondary` or `rumor` and their implication
- Time period where coverage was thin
- Bias risks (e.g., "vendor-heavy coverage this week — independent benchmarks not yet published")

If the deliverable is leaning heavily on T3/T4 sources, say so. If a specific category had no high-quality sources this period, say so.

## Reference files

Read these when you reach the relevant stage:

- `references/source-registry.md` — Stage 2. Curated list of sources by category
- `references/source-quality-rubric-ai.md` — Stage 4. T1-T5 grading adapted for AI domain
- `references/conflict-reconciliation-ai.md` — Stage 6. Worked examples for AI claims (model benchmarks, release dates, capability claims)
- `references/deliverable-rules-ai.md` — Stage 7. Output formatting rules and self-check
- `templates/output-template.md` — Stage 7. Standard structure for both internal-BD and public-digest
- `templates/item-record.md` — Stage 5. Per-item provenance record schema
