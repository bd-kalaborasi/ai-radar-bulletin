# Deliverable Rules — AI Radar

These rules apply to every output. Failing any one of them is a quality regression.

## Hard rules (no exceptions)

1. **Every item has a primary source URL.** No exceptions. If you cannot find a primary source, the item is dropped (not included with disclaimer).
2. **Every item has a publication date.** Exact date, not "recent" or "this week".
3. **Every item has a tier grade and verification status.** T1-T5 + (verified | secondary | rumor).
4. **Every quantitative claim has either a source or a calculation.** No bare numbers. If a calculation, show the formula.
5. **Vendor benchmark claims are labeled.** Never present a vendor's "we beat X" benchmark as fact. Either pair with independent benchmark or label "vendor-claimed, unverified".
6. **Author/org with conflict of interest is disclosed.** If a Latent Space writeup discusses a tool the author invests in, that's flagged at the citation point.
7. **Forward-looking claims ("will ship", "plans to") are tagged as intent, not commitment.** Companies miss roadmaps routinely.
8. **No "industry consensus" framing without ≥3 independent T1-T2 sources.** Strip the claim if those don't exist.
9. **Quote limit: 15 words per quote, 1 quote per source, paraphrase as default.** Copyright policy is not negotiable.
10. **Hype words are stripped or rewritten.** "Revolutionary", "game-changing", "10x faster" → either a specific benchmark claim with citation, or removed.

## Output structure

Every deliverable has these sections in this order. Do not omit any section — empty sections are explicitly stated as empty.

### 1. Header

- Title: "AI Radar — [date range]"
- Run parameters: timeframe, categories, depth, audience
- Run timestamp
- Total items reviewed (before filtering)
- Total items in deliverable (after filtering)

### 2. Executive summary (3-5 bullets max)

The 3-5 most consequential developments for the audience. Each bullet ≤2 sentences. Each bullet has a citation pointer to the detailed item below (e.g., "see Item 3").

If the period had no consequential developments, say so honestly: "Quiet week — no major releases or research breakthroughs. Notable noise but low signal."

### 3. Items

Each item follows the schema in `templates/item-record.md`. Render using the **BD-actionability ordering rule** from `source-quality-rubric-ai.md`:

1. High-actionability T1-T2 verified items → top
2. High-actionability T3 secondary → upper-middle (flagged)
3. Medium-actionability T1-T2 → middle
4. Medium-actionability T3 → lower-middle
5. Low-actionability anything → bottom

In practice: items in `workflow-automation`, `productivity-ai`, `agent-framework`, `dev-tools`, `mcp-ecosystem` typically lead. `model-release` and `ai-for-business` items follow if they affect deployment decisions. `research-papers` and `policy-regulation` typically tail unless landmark.

**Both audiences**: every item ends with **"Why it matters for automation/productivity"** — a 1-2 sentence framing that connects the item to a concrete BD/automation/productivity angle. If no actionable angle exists, state explicitly: "Informational only — no immediate workflow leverage."

**For `internal-BD` audience**, every item additionally appends a BD framing block:
- **Pain-point** (if any) — concrete pain in your operations
- **Before vs after** — what changes if leveraged
- **Efficiency estimate** — show formula only when item is **clearly applicable** with available baseline data. Format: `transactions × time × frequency = X hr/month`. **Skip this field entirely** if the angle is speculative or no baseline exists. Do NOT fabricate "needs baseline measurement of X" as filler — silence is acceptable when the estimate would be a guess.
- **Risk & dependency** — what could go wrong, what we'd need
- **Pilot fit** — yes/no/maybe + 1-line reason

**For `public-digest` audience**, BD framing block is omitted. Only the universal "Why it matters" line ships.

The point: efficiency estimates that survive scrutiny are valuable. Estimates that paper over speculation with formulas erode trust. Default to honesty.

### 4. Conflicts surfaced

Any topic where sources disagreed and reconciliation was applied. Show the working using `conflict-reconciliation-ai.md` format. If no conflicts this period, write: "No source conflicts requiring reconciliation this period."

### 5. Dropped items (transparency)

List items that surfaced during harvest but were dropped, with reason. Categories of drops:
- **Verification failed** — could not find primary source
- **Tier too low** — only T4-T5 sources, no triangulation possible
- **Off-scope** — out of category requested
- **Duplicate** — same story already covered upstream

This section exists so the user can see the radar didn't quietly miss things. If nothing was dropped, write: "No items dropped this period."

### 6. Limitations (always present)

Name explicitly:
- Sources unreachable during this run (with HTTP status or reason)
- Login-walled content not covered (X timeline, IG, LinkedIn, Discord)
- Categories with thin coverage this period
- Items with `secondary` or `rumor` verification and what would upgrade them
- Time period bias (e.g., "this period was 5 days, weekend not yet captured")
- Geographic bias (e.g., "no SEA-region AI coverage this run — sources are US/EU heavy")

Do NOT skip this section because the run looked clean. Limitations exist on every run.

### 7. Search log (compact)

A compact record of searches run, queries, and yield. This proves search effort and helps the user see what wasn't searched.

Format:
```
Q: "anthropic claude release november 2026" → 8 results, 2 high-relevance
Q: "manus agent benchmark independent" → 3 results, 0 high-relevance
...
```

### 8. Suggested next runs

If the radar identified topics that warrant deeper coverage in a follow-up run, list them. Otherwise omit.

---

## Tone rules

### Internal-BD tone

- Indonesian-English mix consistent with user's preference
- Direct, no preamble, no apologies for caveats
- Frame everything in workflow-automation / leverage terms
- "Saya" / "kita" pronoun ok
- Skip basic explanations of AI concepts user already knows
- Numbers always have formula or source visible

### Public-digest tone

- Neutral newsroom tone
- English (unless user requests otherwise)
- No marketing language, no "exciting", "groundbreaking"
- Active voice for what shipped, hedged voice for claims
- Caveats integrated, not buried at the end
- Reader doesn't know the writer — no first-person pronouns

Both tones share: every claim is sourced, every number has math, no hype.

---

## Self-check checklist

Before finalizing the deliverable, verify each:

**Sourcing**
- [ ] Every item has primary URL (not aggregator URL)
- [ ] Every item has exact publication date
- [ ] Every item has T1-T5 grade
- [ ] Every item has verification status (verified / secondary / rumor)
- [ ] Vendor benchmark claims explicitly labeled
- [ ] Conflict of interest flagged where applicable (otherwise skip — don't print "none observed" boilerplate)

**Numbers**
- [ ] No bare numbers without source or calculation
- [ ] Efficiency estimates show formula AND only appear where item is clearly applicable; speculative estimates are skipped, not faked
- [ ] All "X% improvement" claims have benchmark context (which benchmark, which baseline)

**Quotes**
- [ ] No quote >14 words
- [ ] No source quoted more than once
- [ ] Default is paraphrase

**Honesty**
- [ ] Limitations section present and substantive (named gaps, not boilerplate)
- [ ] Dropped section present (even if empty)
- [ ] Conflicts not hidden
- [ ] No "industry shift" framing without ≥3 T1-T2 sources
- [ ] Hype language stripped

**Dedup**
- [ ] Same announcement reported by multiple outlets = ONE item with cross-references, not N items
- [ ] Same vendor's related announcements grouped where natural; separated where genuinely independent

**Ordering**
- [ ] Top items are high-actionability T1-T2 (workflow-automation, productivity-ai, agent-framework, dev-tools, mcp-ecosystem when shipping concrete features)
- [ ] Low-actionability items (pure policy, distant research, corporate news without product impact) at bottom
- [ ] BD-actionability ordering matches the rule in `source-quality-rubric-ai.md`

**Tone match**
- [ ] If audience=internal-BD: BD framing block per item where applicable; efficiency estimate skipped when speculative
- [ ] If audience=public-digest: neutral tone, no marketing language, no BD framing block
- [ ] If audience=both: both versions present, item pool consistent

**Run hygiene**
- [ ] Search log present
- [ ] Run timestamp present
- [ ] Total items reviewed vs delivered numbers shown

If any box is unchecked, fix before delivering.

---

## Failure modes to recognize

If the deliverable starts to look like any of these, stop and rework:

- **"News blog"** — flowing narrative without clear sourcing per claim → restructure to per-item with provenance
- **"Vendor press release roundup"** — every item is a vendor blog with no independent verification → expand sources, downgrade unverified items
- **"AI Twitter recap"** — heavy on T4 commentary, light on T1-T2 → not enough primary research, search wider
- **"Hype recap"** — words like "groundbreaking", "revolutionary" → strip language, demand benchmark for any superiority claim
- **"Confidence inflation"** — T3 evidence stated with T1 confidence → rewrite with appropriate hedging
- **"Registry-bound output"** — every cited source is from `source-registry.md` and zero items came from exploration → Stage 3.5 was skipped or under-budgeted; re-run with explicit exploratory searches before delivering

The fix in every case is the same: trace upstream, apply rubric, accept that some claims can't be made strongly.
