# Output Template — AI Radar Deliverable

This template is used when writing the final deliverable. Fill placeholders. Keep section order. Empty sections are stated explicitly, not omitted.

## Hard rules for the publishable layout

- **No "Item N:" prefix** in titles — declarative title only
- **Metadata in 2-line compact header**, not inline within prose
- **Suppress default fields** (`Conflict of interest: none observed`, `Recency-adjusted weight: 1.0`) — only surface when non-default
- **Active voice, lead with action** — see `templates/item-record.md` for full copywriting principles
- **2-4 sentence body per item** — no padding, no marketing register
- **Every item ends with "Why it matters for automation/productivity"** in BD framing
- **Dedupe before publishing** — same announcement reported by multiple outlets = 1 item with cross-references, not N items

## Template structure

```markdown
# AI Radar — DD Mon YYYY

[Optional one-line subhead summarizing the day's signal: e.g. "Microsoft, IBM, xAI ship; Pentagon excludes Anthropic; China courts protect AI-displaced workers."]

**Run:** [Timeframe] · [N items reviewed] → [N published] · [N verified · N secondary · N rumor] · [exploration_pct% exploration]

---

## TL;DR

[3-5 bullets, each ≤2 sentences. Lead with the most BD-relevant item. Each cites the item title below.]

- **[Subject]** — [what shipped, in one phrase]. ([→ link to detailed item below])
- **[Subject]** — [...]
- **[Subject]** — [...]

If quiet period: "Quiet period — only [N] verified items met the bar this window. Detail items below cover what was substantive."

---

## Items

[Items in priority order. Per `templates/item-record.md` schema. Top items: highest automation/productivity relevance × verification confidence.]

[Item 1 — see item-record.md schema]

[Item 2 — see item-record.md schema]

...

---

## Conflicts surfaced

[Only when sources disagreed and reconciliation was applied. Format from `references/conflict-reconciliation-ai.md`.]

If no conflicts this run: skip this section entirely. (Don't print "No conflicts" — silence is fine.)

---

## Dropped

Items considered but not published, with reason. Helps the reader see what wasn't quietly missed.

| Title considered | Source | Reason |
|---|---|---|
| [title] | [URL] | [Outside window / Verification failed / Tier too low / Duplicate of item N / Off-scope] |

If nothing dropped: "No items dropped this run."

---

## Limitations

[Always present. Surface the gaps that affect what the reader can trust this week.]

- **Sources unreachable**: [list with reason — "anthropic.com 403 from sandbox", "Manus blog 404", etc.]
- **Login-walled coverage**: This run did not access X timelines, IG, LinkedIn private, or Discord directly. Public X posts visible via search engines were captured. Items behind logged-in walls may have been missed.
- **Categories with thin coverage**: [if any — "no MCP releases this window", "policy-regulation: 1 item, below baseline"]
- **Items requiring upgrade**: [items with `secondary` or `rumor` status, with what would upgrade them — "ICLR/NeurIPS acceptance", "vendor primary publishing"]
- **Time period bias**: [e.g., "covers Tue-Thu — weekend not yet captured", "expanded from 24h to 72h to recover from sparse strict window"]
- **Geographic bias**: [e.g., "US/EU heavy; SEA-region underrepresented; one explicit search yielded no in-window items"]
- **Vendor benchmark caveats**: [e.g., "Granite 4.1, FlashKDA speedups vendor-measured, no independent replication this run"]

If a limitation feels weak — that's the signal to keep it in.

---

## Search log (compact)

```
Q: "[query 1]" → [N results, M high-relevance]
Q: "[query 2]" → [N results, M high-relevance]
...
```

Total searches: [N], of which [M] exploratory or adversarial ([X]%).

---

## Suggested next runs

[Optional. Topics that warrant deeper coverage.]

- [Topic] — [why follow up]
- [Topic] — [why follow up]
```

## Format variations

### audience = public-digest only

- Skip BD framing block per item (BD framing only appears in the internal-bd version)
- Tone: neutral newsroom English
- TL;DR phrased for general AI-using readership

### audience = internal-bd only

- Each item appends BD framing block (pain-point, before-after, efficiency formula, risk, pilot fit)
- Tone: Indonesian-English mix permitted, direct, BD-focused
- TL;DR phrased in workflow-automation terms ("3 items this week could reduce X workflow time by Y hr/month")

### audience = both

- Generate both versions from the same verified item pool
- BD version is committed to private repo; public-digest to public repo
- Don't duplicate research effort — gather once, reframe twice

## Length expectations by depth

| Depth | Target words | Item count |
|---|---|---|
| quick-scan | 800-1,500 | 5 |
| standard | 2,000-4,000 | 10-15 |
| deep | 5,000-10,000 | 20+ |

Don't pad. If the natural length is shorter, deliver shorter. The skill values signal density.

## Final delivery checklist

Before submitting:

1. Run the self-check from `references/deliverable-rules-ai.md`
2. Every item has primary URL + date + tier + verification
3. Every item has "Why it matters for automation/productivity" line
4. Limitations section is substantive (named gaps, not boilerplate)
5. Dropped section is present (even if empty)
6. No quote >14 words, no source quoted twice
7. No hype language survived
8. Dedupe applied — no two items report the same announcement
9. Items sorted by automation/productivity relevance × verification (top item should be the most actionable for BD/workflow use case)
10. Compact metadata block — not inline run-on prose

If any check fails, fix before delivering.
