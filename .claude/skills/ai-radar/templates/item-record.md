# Item Record Schema

Every item in the deliverable uses this structure. Fields marked **required** must be present; if a required field cannot be filled, the item is dropped.

## Schema

```
### Item N: [Title — descriptive, not clickbait]

**Primary source**: [URL]                    ← required
**Publication date**: YYYY-MM-DD              ← required (exact)
**Author/org**: [name + affiliation]          ← required
**Tier grade**: T1 / T2 / T3 / T4             ← required
**Verification status**: verified / secondary / rumor   ← required
**Methodology**: announcement / changelog / benchmark / research-paper / opinion / rumor   ← required
**Conflict of interest**: [flag if any, else "none observed"]
**Category**: model-release / agent-framework / dev-tools / mcp-ecosystem / ai-for-business / research-papers / policy-regulation
**Recency-adjusted weight**: [computed from rubric]

**What happened** (paraphrased, ≤4 sentences):
[Concise factual description in your own words]

**Numbers / claims** (with provenance per claim):
- Claim 1 → source/calc
- Claim 2 → source/calc
- (None if no quantitative content)

**Cross-references** (other sources discussing this, with tier):
- [URL] (T?)
- [URL] (T?)

---

### Internal-BD framing (only if audience includes internal-BD):

**Pain-point this addresses**: [concrete pain in our operations, or "none directly"]
**Before vs after**: 
  - Before: [current state]
  - After: [state if leveraged]
**Efficiency estimate**:
  - Formula: [transactions × time × frequency, or other math]
  - Result: [number with units]
  - Confidence: [high/medium/low based on input data quality]
  - If can't quantify: state "needs baseline measurement of [specific metric]"
**Risk & dependency**: [what could go wrong, what we'd need]
**Pilot fit**: yes / no / maybe — [1-line reason]

---

### Public-digest framing (only if audience includes public-digest):

**What this means for users**: [1-2 sentences, no marketing language]
**Caveats**: [vendor-claimed only / demo conditions / waitlist / regional limit / etc., else "none"]
```

## Field rules

### Title
- Descriptive of what happened, not clickbait
- ❌ "Anthropic CRUSHES competition with Opus 4.7"
- ✅ "Anthropic released Claude Opus 4.7 on [date] with [specific change]"

### Primary source URL
- The actual page that announced/published the thing
- NOT a news article reporting on the thing (that goes in cross-references)
- If primary is paywalled but verifiable through screenshots/quotes, note this and downgrade tier appropriately
- If primary cannot be located after lateral search, item is dropped

### Publication date
- Format YYYY-MM-DD
- Use the date on the source page, not the date you found it
- If source doesn't have a date → tier T5 → drop

### Tier grade
- Per rubric, claim-by-claim graded but record the dominant tier for the item
- If item makes both descriptive (T2) and comparative (T4) claims, record as T2 with note "comparative claims downgraded — see below"

### Verification status
- **verified**: primary source confirmed, claim is consistent with primary
- **secondary**: primary not yet found or unreachable; relying on credible secondary reporting
- **rumor**: single-source unverified claim; included only if newsworthy enough to warrant tracking, with explicit "rumor" label

### Methodology
- announcement: vendor announcing their own thing
- changelog: GitHub release / version notes
- benchmark: a measurement (independent or vendor)
- research-paper: peer-reviewed or arXiv
- opinion: practitioner commentary, analysis, prediction
- rumor: unverified claim circulating

### Conflict of interest
- Flag if author employed by, invested in, or has business relationship with the discussed entity
- Format: "Author employed at [org] — note for items about [org]"
- "None observed" is acceptable when checked

### Numbers / claims provenance
- Every number gets a → pointer to either:
  - source URL
  - explicit calculation (e.g., "20 tickets/week × 30 min × 4 weeks = 40 hr/month")
- No bare numbers
- "Vendor-claimed X% faster" — that's a claim about the vendor's claim, not a fact

### Cross-references
- Other sources covering the same item — even if not the primary
- Helps reader triangulate
- Each gets its own tier grade
- 2-5 cross-refs typical; more for major items

### Internal-BD framing
- The point of this skill is to spot leverage opportunities
- If an item has no clear leverage angle, write "no immediate workflow leverage — informational only"
- Don't force-fit a use case where there isn't one
- Efficiency estimates: ALWAYS show the formula, never bare numbers; flag confidence level

### Public-digest framing
- Reader doesn't know context — explain briefly
- Caveats are not buried — they're in the framing
- No marketing language

## Examples

### Example A — Strong item (high tier, verified)

```
### Item 3: Anthropic released Model Context Protocol v2.5 spec

**Primary source**: https://github.com/modelcontextprotocol/specification/releases/tag/v2.5.0
**Publication date**: 2026-04-28
**Author/org**: Anthropic + MCP working group
**Tier grade**: T2
**Verification status**: verified
**Methodology**: changelog
**Conflict of interest**: none observed (open spec, multi-vendor working group)
**Category**: mcp-ecosystem
**Recency-adjusted weight**: 1.0

**What happened**: 
The MCP specification reached v2.5, adding [specific changes — fetched from changelog]. The spec is open and adopted by Anthropic, [other vendors per source].

**Numbers / claims**:
- Spec version 2.5.0 → primary source
- [N] new methods added → primary source

**Cross-references**:
- LangChain blog walkthrough (T2)
- HN discussion (T4 — sentiment only)

---

**Internal-BD framing**:

**Pain-point this addresses**: Saat ini integrasi tools internal masih custom per-app (Google Sheets connector, Drive connector, dll). MCP v2.5 adds [feature] which means we can build one MCP server for our internal tools and connect from any MCP-compatible client.

**Before vs after**:
- Before: Each integration is custom code. Adding new client (e.g., a different agent platform) requires rewriting integration.
- After: One MCP server exposes our internal tools. Any MCP-compatible client uses it.

**Efficiency estimate**:
- Formula: We currently maintain 3 custom integrations × ~8 hours/integration/quarter for updates = 24 hours/quarter
- After: 1 MCP server × ~6 hours/quarter for updates = 6 hours/quarter
- Saved: 18 hours/quarter, IF we have at least 2 different clients consuming
- Confidence: medium — depends on how many MCP clients we actually adopt
- Caveat: this assumes Cowork / Claude desktop / future agent platform all support MCP — currently they do, may change

**Risk & dependency**: 
- Spec is still maturing; v2.5 may have breaking changes from v2.4
- If we go all-in on MCP and ecosystem fragments, we re-do work
- IT team needs to learn MCP server pattern (1-2 days ramp)

**Pilot fit**: yes — small pilot wrapping one existing integration (e.g., Google Sheets reader) as MCP server, test with Cowork
```

### Example B — Lower-tier item, secondary verification

```
### Item 7: TechCrunch reports OpenAI in talks for new $X funding round

**Primary source**: [could not locate primary; OpenAI has not commented]
**Best available source**: https://techcrunch.com/[article-url]
**Publication date**: 2026-05-01
**Author/org**: TechCrunch (citing "two people familiar with the matter")
**Tier grade**: T3 (secondary reporting with anonymous sources)
**Verification status**: secondary
**Methodology**: opinion (anonymous source reporting)
**Conflict of interest**: TechCrunch is owned by [parent], no direct OpenAI relationship known
**Category**: ai-for-business
**Recency-adjusted weight**: 1.0

**What happened**: 
TechCrunch reports OpenAI is in talks for a new funding round at $X valuation, citing two unnamed sources. Neither OpenAI nor the named investors have publicly confirmed.

**Numbers / claims**:
- Valuation $X → TechCrunch reporting only, no primary
- Round size $Y → TechCrunch reporting only

**Cross-references**:
- [Other outlets reporting same story] (T3)

---

**Internal-BD framing**:

**Pain-point this addresses**: none directly — informational

**Before vs after**: n/a — no leverage angle

**Efficiency estimate**: n/a

**Risk & dependency**: 
- Funding rumors often shift before close
- If round closes at reported valuation, signals continued OpenAI growth → API pricing pressure unlikely to reduce in near term
- Useful only as macro-context, not actionable

**Pilot fit**: no — no actionable element
```

### Example C — Item that should be dropped

```
[NOT INCLUDED IN DELIVERABLE — listed in "Dropped items" section]

Title considered: "GPT-5 LEAKED — Will Change Everything"
Source: YouTube video, no primary, undated thumbnail
Reason for drop: T5 — clickbait without primary; OpenAI has not announced; cannot verify any claim in the video
```

## Item ordering in deliverable

Items are ordered by **impact × verification confidence**:

1. T1-T2 verified items with high relevance to user's audience → top
2. T2 verified but lower relevance → middle
3. T3 secondary items with high relevance → middle (but flagged)
4. T3-T4 anything → bottom
5. Rumor items → only if highly newsworthy, separate "Rumors tracked" subsection

Within tier, sort by: BD-impact (for internal-BD audience) or general consequence (for public-digest).
