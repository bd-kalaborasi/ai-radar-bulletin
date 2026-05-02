# Output Template — AI Radar Deliverable

This template is used when writing the final deliverable. Fill the placeholders. Keep section order. Empty sections are explicitly stated, not omitted.

---

## Template structure (use as-is)

```markdown
# AI Radar — [YYYY-MM-DD to YYYY-MM-DD]

**Run parameters**:
- Timeframe: [e.g., last 7 days]
- Categories: [list, or "all"]
- Depth: [quick-scan / standard / deep]
- Audience: [internal-bd / public-digest / both]
- Run timestamp: [YYYY-MM-DD HH:MM TZ]
- Items reviewed: [N harvested before filter]
- Items in deliverable: [N after filter]

---

## Executive Summary

[3-5 bullets, each ≤2 sentences, each citing the detailed item below.]

- [Bullet 1] (see Item N)
- [Bullet 2] (see Item N)
- [Bullet 3] (see Item N)

If quiet period: "Quiet period — no major releases or research breakthroughs. Notable noise but low signal in [categories]. Detail items below cover what was substantive."

---

## Items

[Items in priority order, each following `templates/item-record.md` schema]

### Item 1: [title]

[full item record]

### Item 2: [title]

[full item record]

...

---

## Conflicts surfaced

[Topics where sources disagreed and reconciliation was applied. Use format from `references/conflict-reconciliation-ai.md`. If no conflicts: "No source conflicts requiring reconciliation this period."]

---

## Dropped items (transparency)

Items that surfaced during harvest but were dropped, with reason. This section exists so the user knows the radar didn't quietly miss things.

| Title considered | Source | Reason for drop |
|---|---|---|
| [title] | [URL] | [Verification failed / Tier too low / Off-scope / Duplicate] |

If nothing dropped: "No items dropped this period."

---

## Limitations

[Always present. Name explicitly:]

- **Sources unreachable**: [list with HTTP status or reason, e.g., "Manus blog returned 404 — possibly site restructure"]
- **Login-walled coverage gap**: This run did not access X timelines, IG, LinkedIn, or Discord. Items from these sources may have been missed if not also visible via public search.
- **Categories with thin coverage**: [if any, e.g., "policy-regulation: only 1 item this period; this is below baseline — may indicate quiet period or coverage gap"]
- **Items requiring upgrade**: [items with `secondary` or `rumor` status, with what would upgrade them]
- **Time period bias**: [e.g., "this run covered 5 weekdays — weekend items not yet captured"]
- **Geographic bias**: [e.g., "sources are US/EU heavy. SEA-region AI ecosystem (e.g., Indonesian model dev, regional deployments) underrepresented."]
- **Period-specific bias**: [e.g., "This was a major US conference week — vendor announcements over-represented relative to research publications."]

If any limitation feels weak — that's the signal it should stay in.

---

## Search log (compact)

Searches run this session, with yield:

```
Q: "[query 1]" → [N results, M high-relevance]
Q: "[query 2]" → [N results, M high-relevance]
...
```

Total searches: [N]

---

## Suggested next runs

[Topics that warrant deeper coverage. Omit section if none.]

- [Topic 1] — current evidence is T3 only; would benefit from independent benchmark search
- [Topic 2] — vendor announced but availability unclear; revisit in [N days]
```

---

## Format variations

### If audience = internal-BD only

- Skip the "Public-digest framing" subsection in each item
- Tone: Indonesian-English mix, direct, BD-focused
- Executive summary frames consequences in workflow-automation terms

### If audience = public-digest only

- Skip the "Internal-BD framing" subsection in each item
- Tone: neutral newsroom English
- Executive summary frames consequences for general AI-using audience

### If audience = both

- Each item carries both framings
- The header documents both
- The deliverable can later be filtered into two separate publishable outputs from the same item pool (saves duplicate research)

---

## Length expectations by depth

| Depth | Word count target | Item count |
|---|---|---|
| quick-scan | 800-1,500 | 5 items |
| standard | 2,000-4,000 | 10-15 items |
| deep | 5,000-10,000 | 20+ items |

Don't pad. If a depth-level natural length is shorter, deliver shorter. The skill values signal density.

---

## Final delivery rules

Before sending:
1. Run the self-check from `references/deliverable-rules-ai.md`
2. Verify every item has primary URL + date + tier + verification
3. Verify limitations section is substantive
4. Verify dropped items section is present
5. Verify no quote >15 words and no source quoted twice
6. Verify no hype language survived

If any check fails, fix before delivering.
