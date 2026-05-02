# Source Quality Rubric for AI News (T1-T5)

Adapted from `research-rigor` rubric. AI news domain has a quirk that market research doesn't: **vendor announcements ARE the primary source for "did this ship".** A blog post by Anthropic announcing Claude Opus 4.7 is the canonical source for that release — there is no "more primary" source. But the same blog post claiming "best-in-class on benchmark X" is marketing.

This rubric splits grading by **claim type** rather than blanket-grading sources.

## The tiers (claim-by-claim)

### Tier 1 — Independent verification, peer-reviewed, or government

**Characteristics:**
- Peer-reviewed paper (NeurIPS, ICML, ICLR, ACL, EMNLP, etc., post-acceptance)
- Independent benchmark consortium results (LMSYS Arena with sufficient votes, MLPerf, public eval harnesses with clear methodology)
- Government regulatory filings (EU AI Act notices, FTC actions, SEC filings by AI companies)
- Academic replication of vendor claims with disclosed methodology
- Investigative journalism with multi-source confirmation (404 Media, MIT Tech Review long-form)

**Weight in synthesis: 4x**

---

### Tier 2 — Vendor primary for descriptive claims, OR established trade press for original reporting

**Characteristics (vendor track):**
- Vendor's own blog/changelog/release notes for **descriptive claims about their own product** — release date, feature list, pricing, deprecation, supported regions, model name
- Vendor research papers on arXiv (pre-peer-review, but disclosed methodology)
- Official documentation pages

**Characteristics (trade press track):**
- The Information, Stratechery, Latent Space, Import Aith original reporting
- TechCrunch / The Verge / MIT Tech Review when citing named sources or company confirmation
- Founder/CEO direct statements (blog post, conference keynote, podcast where they speak on the record)

**Weight in synthesis: 3x**

**Important:** A vendor's own blog is **NOT** T2 for claims like "fastest model in the world", "outperforms competitor X", or "10x improvement". For comparative or capability superiority claims, downgrade to T4 unless paired with independent benchmark.

---

### Tier 3 — Aggregators, secondary news, practitioner blogs with hands-on data

**Characteristics:**
- Newsletter aggregators (Ben's Bites, AI Tidbits, Last Week in AI) that summarize without original reporting
- News outlet articles that report on a vendor announcement without adding new information
- Practitioner blogs documenting hands-on testing (Simon Willison level — has data but single tester)
- Hugging Face model cards (vendor-supplied content but with community use signals)
- Reputable Substack writers with domain credentials but small-N testing

**Weight in synthesis: 2x**

**Use rules:**
- Acceptable for "this was announced" if vendor primary is unreachable
- Acceptable for hands-on observations clearly framed as one tester's experience
- NOT acceptable for adoption/market claims
- NOT acceptable as primary citation when vendor primary exists — always trace upstream

---

### Tier 4 — Influencer commentary, single-source tweets, marketing benchmarks

**Characteristics:**
- AI Twitter influencer reactions and "takes" without their own data
- LinkedIn thought-leadership posts
- Reddit/HN comment threads (individual opinions)
- Vendor marketing benchmarks where the vendor designed the test (even if the test is real)
- Single-source tweets making strong claims without primary backing
- Conference talk slides shared without context (lose nuance from speaker)

**Weight in synthesis: 1x**

**Use rules:**
- Acceptable for "this is being discussed" sentiment
- Acceptable for capturing direct quotes from named persons
- NOT acceptable as evidence for capability claims, market share, adoption
- When used, label explicitly: "per [name]'s commentary" or "vendor-designed benchmark, no independent verification"

---

### Tier 5 — Anonymous, undated, retracted, or contradicted

**Characteristics:**
- Anonymous "leak" accounts without verification track record
- Screenshots without source URL
- Undated content (cannot establish currency)
- Claims that have been retracted or contradicted by T1-T2
- YouTube clickbait ("GPT-5 LEAKED!!!") without primary

**Use rules:** Do not cite. If a claim only appears in T5 sources, treat as "unsupported".

**Weight in synthesis: 0x**

---

## Grading workflow per claim

For each claim worth using, answer in order:

1. **What is the claim?** (descriptive / comparative / capability / adoption / quantitative)
2. **What is the source?** (vendor / independent / aggregator / individual)
3. **Apply the appropriate column from the table below**

### Quick decision matrix

| Claim type | Vendor self | Independent | Aggregator | Influencer |
|---|---|---|---|---|
| "X was released on date Y" | T2 | T2 | T3 | T4 |
| "X has feature Y" | T2 | T2 | T3 | T4 |
| "X is faster than Y" (no independent benchmark) | **T4** | T2 if methodology disclosed | T4 | T5 |
| "X scored N on benchmark Y" | T3 (vendor benchmark) | T1 if peer-reviewed eval, T2 otherwise | T3 | T4 |
| "X is widely adopted" | **T4** (marketing claim) | T1-T2 if real adoption data | T4 | T5 |
| "X will ship by date Y" (forward-looking) | T3 (intent, not commitment) | T3 | T4 | T5 |
| "X failed in production" | T2 if firsthand, T3 if reported | T1-T2 with evidence | T3 | T4 |

---

## Recency weighting for AI

AI moves fast. Recency haircut is more aggressive than general research:

- Published <30 days ago: full weight
- Published 30-90 days ago: 0.85x weight
- Published 90-180 days ago: 0.6x weight
- Published 180-365 days ago: 0.4x weight (and flag explicitly — "from N months ago, may be superseded")
- Published >365 days ago: 0.2x weight (use only if landmark result still cited)

**Exception:** Foundational research (transformer architecture papers, alignment fundamentals) keeps weight regardless of age. Apply judgment.

---

## Specific AI-domain conflict patterns

These are common failure modes in AI news; recognize them.

### "Vendor benchmark vs independent benchmark"

When a vendor claims SOTA but an independent benchmark (LMSYS, public leaderboards) shows different ranking, weight independent at 4x and vendor at 1x. Show both numbers in the deliverable.

### "Demo vs reproduction"

When a vendor demo shows capability X, but practitioners attempting to reproduce report inconsistency, weight reproduction reports collectively (each at T2-T3) and surface the discrepancy. Demo is T4 for capability claims.

### "Announcement vs availability"

A vendor announces a feature at conference Y. Treat as T2 for "announced". Do **not** treat as T2 for "available" until independent practitioners confirm access. Many announced features are vaporware or extended-beta for months.

### "Tweet vs official"

Founder tweets a feature, but it's not on the company blog. Tweet is T2 for "founder said this", but T3 for "company committed to this". Wait for official channel for full T2 commitment claims.

### "Benchmark contamination"

When a model performs unusually well on a benchmark, check if that benchmark's test set could be in the training data. Note contamination concerns explicitly. Many widely-cited "model X beats model Y" claims have contamination flags.

---

## Conflict of interest flags (must be recorded)

Always flag if:
- Author is employed by a company being discussed (e.g., Anthropic employee writing about Claude)
- Author has equity/investment in a discussed company
- Article was paid placement / sponsored content (often disclosed in fine print)
- Vendor provided the article author with privileged access (e.g., "we got an exclusive demo")
- Newsletter author runs a paid product in the same space

These don't disqualify the source — but they're recorded next to the citation so the reader can weight accordingly.

---

## When the rubric breaks

Some AI claims can only be supported by T3/T4 sources (e.g., "is feature X actually useful in practice"). That's acceptable IF:
1. You explicitly label as T3/T4 evidence
2. You triangulate ≥5 independent practitioner reports
3. You do not state findings with T1-confidence
4. You offer a way to upgrade ("running a 5-task internal pilot would give T2-equivalent data for our use case")
