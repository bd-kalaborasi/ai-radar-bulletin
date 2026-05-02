# Item Record Schema

Every item in the deliverable uses this structure. Fields marked **required** must be present; if a required field cannot be filled, the item is dropped.

## Writing principles (apply to every item)

- **Active voice, lead with action**: "Anthropic released Opus 4.7" not "Opus 4.7 was released"
- **Concrete over abstract**: numbers with units, dates as YYYY-MM-DD or "DD Mon YYYY", never "recently" or "this week"
- **2-4 sentence body**: no padding, no marketing register
- **Zero tolerance for hype**: "revolutionary", "game-changing", "10x faster", "breakthrough", "state-of-the-art" — only acceptable inside attributed direct quote
- **Compact metadata header**: source/date/tier on a tight 2-line block, NOT inline within prose
- **Suppress default fields**: skip `Conflict of interest: none observed` and `Recency-adjusted weight: 1.0` — only surface non-default values
- **Title declarative, not academic**: "Microsoft Agent 365 reaches GA at $15/user/month" — no "Item N:" prefix in publishable output
- **"Why it matters" is BD-framed**: connect to workflow automation / individual or corporate productivity. If no actionable angle, write that explicitly — do not force-fit

## Schema (publishable layout)

This is the layout that ships in the bulletin. The metadata is collapsed to a tight header. Skip fields that hold default values.

```markdown
### [Title — declarative, what shipped]

**Source:** [URL] · [Publisher] · [YYYY-MM-DD]
**Verification:** T[N] [verified|secondary|rumor] · [methodology] · [category]
[Conditional line — only if non-default:]
[**COI:** [flag] · **Tier nuance:** [comparative claims downgraded to T4, etc.]]

[2-4 sentence body in own words. What shipped, who's affected, key numbers. Active voice. Neutral newsroom tone. No marketing register.]

**Why it matters for automation/productivity:** [1-2 sentences. Concrete BD angle: who benefits, what workflow this unlocks, what cost/time it changes. If no angle: "Informational only — no immediate workflow leverage."]

**Key claims:**
- [claim 1] → [URL or calc]
- [claim 2] → [URL or calc]

**Cross-references:**
- [URL] (T[N], [role: corroborating | contradicting | discovery])
- [URL] (T[N], [role])

[Conditional block, only if applicable:]
**Caveats:** [vendor-claimed | demo-only | regional limit | waitlist | independently unverified]
```

For audience=internal-bd (private repo only), append:

```markdown
**BD framing:**
- **Pain-point:** [concrete pain in our operations, or "informational only"]
- **Before vs after:** before [current state] → after [state if leveraged]
- **Efficiency estimate:** [formula: transactions × time × frequency = X hr/month] · confidence [high/medium/low]
- **Risk & dependency:** [what could go wrong, what we'd need]
- **Pilot fit:** [yes / no / maybe — 1-line reason]
```

## Field rules

### Title
- Declarative — what shipped, who, when implicit. Verb-first.
- ❌ "Anthropic CRUSHES competition with Opus 4.7"
- ❌ "Item 5: xAI Grok 4.3 announcement"
- ✅ "xAI ships Grok 4.3 at $1.25/M input tokens"
- ✅ "Microsoft Agent 365 reaches GA at $15/user/month"

### Source URL
- Primary — the actual page that announced/published the thing
- NOT a news article reporting on the thing (that's cross-reference)
- If primary is paywalled but verifiable, note this and downgrade tier appropriately
- If primary unreachable in this run (e.g., 403 from sandbox) but exists publicly, note in caveats and use best secondary

### Date
- YYYY-MM-DD format
- Use the date on the source page, not the date you found it
- If source has no date → tier T5 → drop

### Tier and verification (compact)
- Format: `T2 verified · announcement · agent-framework`
- Order: tier → verification status → methodology → category
- If tier varies by claim (T2 descriptive but T4 comparative), put dominant tier here and add a "Tier nuance" line: `**Tier nuance:** Comparative benchmark claims downgraded to T4 — independent eval not yet available`

### Conflict of interest
- Skip entirely if "none observed"
- Surface only when present: vendor employee, investor, paid partnership, exclusive access. Format: `**COI:** Author at Anthropic — note for items about Claude`

### Body (the 2-4 sentence "what shipped" paragraph)
- Lead with subject + action verb in past tense
- Pack key numbers and dates inline
- No "this announcement is significant because" framing — just state what is, let the reader judge
- No "let's dive in" type filler

### Why it matters
- Required for every item
- 1-2 sentences, BD/automation/productivity framed
- For research papers: "What does this mean for someone deploying AI in production today?"
- For policy: "What changes for organizations operating in [jurisdiction]?"
- For tools: "What workflow does this unlock or improve?"
- If item has no actionable angle, state explicitly: "Informational only — no immediate workflow leverage."
- Skip generic phrasing like "important for AI users"

### Key claims (numbers)
- Bullet list, every number has a `→ source/calc` pointer
- Skip section if no quantitative claims
- Vendor claims explicitly labeled: `→ Vendor-claimed (anthropic.com), unreplicated`

### Cross-references
- 2-5 typical, more for major items
- Each with own tier and role: corroborating / contradicting / discovery
- Skip section if zero cross-refs

### Caveats
- Show only when applicable
- Specific: "Vendor benchmark, no independent replication" not "may have limitations"
- Common patterns: vendor-claimed, demo-only, waitlist, regional limit, independently unverified

## De-duplication (mandatory)

Before writing items, dedupe:

1. **Same announcement, multiple outlets** — keep ONE item with primary source as URL, list additional outlets in cross-references. Do NOT publish 5 items about the same Pentagon AI deal.
2. **Same product, multiple versions in window** — only the most recent unless versions are materially different (e.g., a v1.2 patch vs a v2.0 major release within same window can both publish if both are newsworthy).
3. **Same vendor, multiple announcements same day** — group into one item if they're related (e.g., model + pricing + benchmark all in one Anthropic blog), separate if independent (e.g., model release + safety policy update).
4. **Same story, different framings** — keep the version with strongest sourcing. If two outlets report the same fact with different angles, prefer the one with primary source confirmation.

Dedup logic, in order:
1. Title + date proximity (within 48h) + same primary entity → likely duplicate, merge
2. Different titles, same factual claim, same date range → check if it's the same announcement reported differently → merge
3. When in doubt, separate items but cross-reference each other

The "Items reviewed" count includes pre-dedup candidates. The "Items published" count is post-dedup.

## Examples

### Example A — Strong vendor release item

```markdown
### Microsoft Agent 365 reaches GA at $15/user/month

**Source:** https://www.microsoft.com/en-us/security/blog/2026/05/01/microsoft-agent-365-now-generally-available · Microsoft Security Blog · 2026-05-01
**Verification:** T2 verified · announcement · agent-framework / dev-tools / ai-for-business

Microsoft's agent governance platform reached general availability on 1 May 2026, priced at $15/user/month standalone or bundled in Microsoft 365 E7. Agent 365 functions as a control plane for observing, governing, and securing AI agents across Microsoft and third-party platforms. New at GA: discovery of local agents (Claude Code, GitHub Copilot CLI, OpenClaw) via Microsoft Defender; agent-to-asset context mapping; Bedrock and Google Cloud registry sync in public preview.

**Why it matters for automation/productivity:** Organizations running Microsoft 365 can centrally inventory and govern AI agents — including third-party — from one dashboard. Reduces shadow-AI risk for enterprises piloting multiple agent vendors simultaneously.

**Key claims:**
- Price: $15/user/month → Microsoft primary
- GA date 2026-05-01 → Microsoft primary

**Cross-references:**
- https://samexpert.com/agent-365-microsoft-ai-licensing/ (T2, contradicting — flags governance gaps)
- https://www.thurrott.com/a-i/335594 (T3, corroborating)

**Caveats:** Auto-discovery for third-party agents not yet shipped; registration manual. SAMexpert flags directional GA, not finished governance layer.
```

### Example B — Research paper at T3

```markdown
### Fine-tuning frequently degrades model safety in domain-specific deployments

**Source:** https://arxiv.org/abs/2604.24902 · arXiv (Khan, Winecoff, Bogen, Hadfield-Menell) · 2026-04-27
**Verification:** T3 secondary · research-paper · research-papers
**Tier nuance:** arXiv preprint, not peer-reviewed. Upgrade to T1-T2 when accepted.

Researchers tested 100 fine-tuned models across medical and legal domains. Core finding: fine-tuning produces large, heterogeneous, often contradictory shifts in measured safety. Models commonly improved on some safety benchmarks while regressing on others within the same evaluation suite.

**Why it matters for automation/productivity:** Organizations deploying fine-tuned models in regulated workflows (legal, medical, finance) cannot assume base-model safety evaluations carry through. Re-evaluation of fine-tuned models is required before production deployment — implies added evaluation cost in any AI deployment pipeline that uses fine-tuning.

**Key claims:**
- 100 models studied → arXiv abstract
- Domains: medical and legal → arXiv abstract

**Cross-references:**
- https://huggingface.co/papers (featured 2026-05-01, T3)

**Caveats:** Preprint, not yet peer-reviewed. Specific models not disclosed in abstract.
```

### Example C — No actionable angle

```markdown
### Pentagon signs classified AI agreements with 8 companies, excludes Anthropic

**Source:** https://defensescoop.com/2026/05/01/dod-expands-classified-ai-work-with-8-companies-excluding-anthropic/ · DefenseScoop · 2026-05-01
**Verification:** T2 verified · announcement · policy-regulation / ai-for-business

The US DoD formalized classified-network AI agreements (Impact Level 6 and 7) with eight companies on 1 May 2026: SpaceX, OpenAI, Google, NVIDIA, Reflection, Microsoft, AWS, and Oracle. Anthropic was excluded after a supply-chain risk designation, currently under federal court litigation in California.

**Why it matters for automation/productivity:** Informational only — no immediate workflow leverage. For organizations with US federal contracts in scope, watch the litigation outcome since it affects which AI providers are eligible for classified deployments.

**Key claims:**
- 8 named companies → DefenseScoop primary
- Supply-chain risk designation → DefenseScoop, confirmed by CNN, UPI, Breaking Defense

**Cross-references:**
- https://www.cnn.com/2026/05/01/tech/pentagon-ai-anthropic (T3, corroborating)
- https://breakingdefense.com/2026/05/pentagon-clears-7-tech-firms (T3, corroborating)

**Caveats:** Litigation active; outcome may shift the picture.
```

### Example D — Item that should be dropped

```
[NOT INCLUDED IN DELIVERABLE — listed in "Dropped" section]

Title considered: "GPT-5 LEAKED — Will Change Everything"
Source: YouTube video, no primary, undated thumbnail
Reason: T5 clickbait, no primary, no verifiable claim
```

## Item ordering in deliverable

Items are ordered by **automation/productivity relevance × verification confidence**:

1. **High BD-relevance, T1-T2 verified** → top (agent frameworks, automation tools, productivity AI, dev tools)
2. **High BD-relevance, T3** → middle (research with practical implications, even if preprint)
3. **Lower BD-relevance, T1-T2 verified** → middle-lower (policy, funding, vendor news with no immediate angle)
4. **Lower BD-relevance, T3-T4** → bottom (research without immediate practical use, distant policy)
5. **Rumor items** → only if highly newsworthy, separate "Rumors tracked" subsection

Within tier, sort by: BD impact (concrete workflow change) over general consequence.
