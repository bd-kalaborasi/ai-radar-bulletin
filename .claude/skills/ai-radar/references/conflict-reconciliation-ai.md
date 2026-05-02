# Conflict Reconciliation for AI Claims

When two or more sources disagree, do not pick one and ignore the other. Apply weighted synthesis and surface the disagreement transparently.

## The protocol

1. **List all sources making the claim** with tier grade and date
2. **Identify the methodological difference** producing the disagreement
3. **Compute weighted recommendation**: T1=4x, T2=3x, T3=2x, T4=1x, T5=0x. Apply recency haircut from rubric
4. **State reconciliation transparently** in the deliverable — show which sources contributed, the weighted result, and the residual uncertainty

If weighted analysis is inconclusive (evenly split, or split among same-tier sources), state explicitly: "evidence is genuinely mixed — recommendation requires user judgment".

## Worked examples

### Example 1 — Benchmark conflict (vendor vs independent)

**Claim**: "Model A is the best at code generation"

**Sources collected**:
- Vendor A's blog: "Model A scores 85.2% on HumanEval, beating Model B at 78.1%" (T3 — vendor benchmark, methodology partially disclosed) — last week
- Vendor B's response post: "Model B actually scores 82.5% with proper prompting" (T3 — vendor counter-benchmark) — 3 days ago
- LMSYS Chatbot Arena code subset: Model A ranked #2, Model B ranked #1 by Elo (T1 — independent, large-N) — current
- Substack practitioner test on 50 real coding tasks: Model B wins 58% of the time (T3 — small-N independent) — 2 weeks ago
- AI Twitter influencer thread: "Model A is clearly better trust me" (T4) — yesterday

**Reconciliation**:
- T1 LMSYS (4x): favors B → 4
- T3 vendor A claim (2x): favors A → 2
- T3 vendor B counter (2x): favors B → 2
- T3 practitioner test (2x): favors B → 2
- T4 influencer (1x): favors A → 1

Weighted: B = 8, A = 3 → **Model B has stronger independent evidence for code generation**, though both vendors claim wins on their own benchmarks.

**How to write it in deliverable**:

> Independent evaluation favors Model B for code generation. LMSYS Arena (large-N independent crowd voting) ranks Model B #1. A 50-task practitioner test by [name] also showed Model B winning 58% of the time. Vendor A and Vendor B each claim wins on their own internal benchmarks — these are not independently reproducible and have lower weight. **Recommendation**: for production code generation use cases, Model B currently has stronger evidence; re-evaluate when peer-reviewed benchmarks publish.

### Example 2 — Release date conflict

**Claim**: "Model X release date"

**Sources collected**:
- Vendor blog post: "Available April 15" (T2)
- TechCrunch reporting: "Sources say internal target is April 22" (T3 — anonymous source)
- Founder tweet 3 days later: "Pushing to April 25 for stability" (T2 for founder direct statement)
- Reddit thread: "I got access yesterday April 12" (T4 — single anecdote)

**Reconciliation**:
- Most recent authoritative statement wins for forward-looking claims
- Founder tweet supersedes blog post (more recent + same authority)
- TechCrunch anonymous source predates founder tweet — historical context only
- Reddit anecdote may indicate early access / staged rollout, not general availability

**How to write it**:

> Originally announced for April 15 [vendor blog link, date]. CEO confirmed delay to April 25 [tweet link, date]. Some users reported earlier access (April 12 per Reddit thread) — likely staged rollout, not general availability. **Status**: GA target April 25, subject to further change.

### Example 3 — Capability claim vs reproduction

**Claim**: "Agent X can autonomously complete software engineering tasks"

**Sources collected**:
- Vendor announcement video: 20-minute demo of agent completing tasks end-to-end (T4 for capability — demo conditions cherry-picked)
- Vendor benchmark report: "Achieves 67% on SWE-bench" (T3 — vendor benchmark on public benchmark, methodology partially disclosed)
- SWE-bench leaderboard (independent host): same number listed, marked "vendor-submitted" (T2-T3 — independent host but vendor-submitted run)
- Practitioner blog: "I tried it on 10 real tickets, it succeeded on 3" (T3 — small-N hands-on)
- Reddit r/AI_Agents: 47 comments mostly negative ("crashed on my first task") (T4 — selection bias, sentiment only)
- Independent academic replication: NOT YET PUBLISHED

**Reconciliation**:
- Vendor demo (T4) shouldn't drive capability claims
- SWE-bench number is the strongest signal but with caveat (vendor-submitted, possible benchmark contamination)
- Practitioner blog (T3) shows real-world success rate ~30%, much lower than benchmark number
- Reddit sentiment (T4) is consistent with practitioner blog (gap between benchmark and reality)
- Gap = strong signal that benchmark conditions differ from real conditions

**How to write it**:

> Vendor reports 67% on SWE-bench [link], a public software-engineering benchmark. This number is based on a vendor-submitted run; independent replication has not yet been published. A practitioner test of 10 real tickets reported a 30% success rate [link, date], suggesting benchmark conditions are more favorable than real-world tasks. **Practical implication**: capability is real but expected real-world success rate is below benchmark figure. For pilot planning, model the ~30% rate, not the 67% rate. Re-evaluate once independent replication is available.

### Example 4 — "Industry shift" framing

**Claim**: "Enterprises are moving from RAG to long-context models"

**Sources collected**:
- a16z portfolio newsletter: "We see this trend across our portfolio" (T3 — portfolio bias)
- LangChain blog: "We're investing in long-context patterns" (T2 for their own roadmap, T4 for industry claim)
- Survey by [vendor]: "73% of enterprises plan to adopt long-context within 12 months" (T3 — vendor-funded survey, methodology likely weak)
- Anonymous Reddit threads: mixed opinions (T4)
- ZERO independent peer-reviewed or large-N independent surveys

**Reconciliation**:
- All sources have either selection bias (a16z portfolio) or vendor interest
- Survey N and methodology not disclosed — weight at T4 not T3
- No T1 evidence

**How to write it**:

> Multiple commentators have framed enterprise AI as shifting from RAG to long-context. However, **the evidence base for this is weak**: a16z's claim is portfolio-biased, the cited 73% survey is vendor-funded with undisclosed methodology, and no independent large-N research has been published on this transition. **Recommendation**: treat the "shift" framing as marketing-influenced. Decide based on your own use case requirements, not industry-shift claims. To validate independently, the radar would need a survey of ≥30 unrelated enterprises with disclosed methodology — currently not available.

---

## When weighted analysis is inconclusive

If after weighting the result is genuinely close (e.g., 5 vs 6), or if all sources are same-tier with no methodological differentiator, state this and stop.

> Evidence is mixed: 3 T2 sources support claim A, 3 T2 sources support claim B, with no clear methodological differentiator. **The radar cannot resolve this with current evidence.** Resolution would require [specific upgrade — e.g., independent benchmark, larger-N user survey, peer-reviewed replication].

This is honest. Pretending to resolve a mixed-evidence question with one side picked at random is the failure mode this skill exists to prevent.

---

## When ALL sources are low-tier

If a topic only has T3-T4 coverage and no T1-T2 source exists:

1. Do NOT upgrade by triangulation alone — five T4 sources is still T4 evidence, not T2
2. State the evidence ceiling: "the highest-quality source available on this topic is T3"
3. Offer the upgrade path: "T2 evidence would require [specific], T1 would require [specific]"
4. Frame findings with appropriate hedging — "based on practitioner reports" not "research shows"

---

## Self-check before publishing reconciliation

For each conflict resolved, verify:

- [ ] All sources cited with tier
- [ ] Methodological difference identified (or "no differentiator found" stated)
- [ ] Weights applied transparently
- [ ] Recency haircut applied
- [ ] Conflict of interest flags surfaced
- [ ] If inconclusive, said so clearly
- [ ] Recommendation (if any) traces from the weighted result
