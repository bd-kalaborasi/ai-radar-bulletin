# Source Registry — AI Radar

**This registry is a starting point, not a whitelist.** Skill `ai-radar` runs Stage 3.5 (exploration beyond registry) on every run — sources outside this list are actively searched for, harvested, and graded with the same rubric. The registry exists to (a) seed the harvest with known-good sources, (b) document tier expectations and caveats for sources used repeatedly, and (c) prevent re-grading the same source from scratch each run.

If a source is not listed here but proves useful, grade it on the spot using `source-quality-rubric-ai.md` and propose adding it (per the checklist at the bottom of this file). Conversely, do not assume registry sources are infallible — apply the rubric per claim, every time.

## How to read this file

For each source:
- **Name & URL** — what it is
- **Tier expected** — typical grade (specific claims may be graded differently per `source-quality-rubric-ai.md`)
- **Fetch method** — how to retrieve (RSS / `web_fetch` / `web_search`)
- **Use for** — what types of claims this source is good for
- **Caveat** — known biases or limitations

## Update cadence

Review this registry quarterly. Remove sources that have gone dormant, added more than 3 false/retracted claims in the period, or pivoted away from AI coverage. Add new sources only after a 1-month evaluation period.

---

## Vendor primary sources

These are the original announcements. Treated as **T2 for descriptive claims about own products** (release dates, features, pricing) and **T4 for comparative claims** (benchmarks vs competitors). See rubric for nuance.

### Foundation model labs

| Source | URL | Fetch | Use for | Caveat |
|---|---|---|---|---|
| Anthropic News | https://www.anthropic.com/news | web_fetch index, then per-post | Claude releases, research, policy | Marketing tone; benchmark claims need independent verification |
| OpenAI News | https://openai.com/news/ | web_fetch | GPT releases, ChatGPT features, API changes | Same |
| Google DeepMind Blog | https://deepmind.google/discover/blog/ | web_fetch | Gemini, research papers | Research blog often more substantive than product blog |
| Google AI Blog | https://blog.google/technology/ai/ | web_fetch | Gemini product, Workspace AI features | Marketing-heavy |
| Meta AI Blog | https://ai.meta.com/blog/ | web_fetch | Llama, FAIR research, product AI | Open-weight focus |
| Mistral News | https://mistral.ai/news/ | web_fetch | Mistral models, La Plateforme | EU-based, sometimes underreported in US media |
| xAI Blog | https://x.ai/blog | web_fetch | Grok releases | Founder-driven announcements often happen on X first |
| Cohere Blog | https://cohere.com/blog | web_fetch | Command models, enterprise focus | |
| Stability AI Blog | https://stability.ai/news | web_fetch | Image/audio/video models | Frequent leadership turnover — verify org claims |
| AI21 Labs Blog | https://www.ai21.com/blog | web_fetch | Jamba, enterprise | |

### Agent/tooling vendors

| Source | URL | Fetch | Use for | Caveat |
|---|---|---|---|---|
| Manus blog/news | check https://manus.im/ for current blog URL | web_fetch | Manus agent updates | New vendor — verify any extraordinary claims with independent sources |
| LangChain blog | https://blog.langchain.com/ | web_fetch / RSS | LangChain, LangGraph, LangSmith | |
| LlamaIndex blog | https://www.llamaindex.ai/blog | web_fetch | LlamaIndex, agent stack | |
| Vercel AI | https://vercel.com/blog/category/ai | web_fetch | AI SDK, deployment patterns | |
| Replicate blog | https://replicate.com/blog | web_fetch | Open-source model hosting | |
| Hugging Face blog | https://huggingface.co/blog | web_fetch | Open-source releases, papers walkthrough | High signal for open-source ecosystem |

### Dev tool vendors (AI-coding)

| Source | URL | Fetch | Use for | Caveat |
|---|---|---|---|---|
| Cursor changelog | https://www.cursor.com/changelog | web_fetch | Cursor IDE updates | |
| GitHub Copilot blog | https://github.blog/category/ai-and-ml/ | web_fetch | Copilot, GitHub AI | |
| Cody (Sourcegraph) | https://sourcegraph.com/blog | web_fetch | Cody updates | |

---

## GitHub sources (releases & changelogs)

Highly reliable for "what shipped". Fetch `https://github.com/{org}/{repo}/releases` or RSS at `/releases.atom`.

| Org/Repo | Why track |
|---|---|
| anthropics/anthropic-sdk-python (and -typescript) | SDK changes signal new API features |
| anthropics/claude-code | Claude Code releases |
| openai/openai-python | OpenAI API surface changes |
| modelcontextprotocol/* | MCP spec and reference implementations |
| langchain-ai/langchain | LangChain core |
| run-llama/llama_index | LlamaIndex |
| vercel/ai | Vercel AI SDK |
| huggingface/transformers | Library that tracks model releases |
| ollama/ollama | Local model runner |
| browser-use/browser-use | Browser agent framework |
| All-Hands-AI/OpenHands | Open-source agent (formerly OpenDevin) |
| microsoft/autogen | Microsoft agent framework |
| crewAIInc/crewAI | Multi-agent orchestration |

**Use for**: confirming feature shipped, version numbers, breaking changes, deprecations
**Caveat**: a release tag does not mean the feature is production-ready or widely available

### GitHub trending (discovery only)

| URL | Use for |
|---|---|
| https://github.com/trending?since=daily&language= | Discovery of fast-rising repos |
| https://github.com/trending?since=weekly | Less noisy than daily |

**Caveat**: trending is gameable; treat as discovery aid, not as evidence of actual adoption

---

## Newsletter & media (T2 typical)

Original reporting, often with anonymous sourcing. Use for claims that vendors won't confirm publicly.

| Source | URL | Tier | Use for | Caveat |
|---|---|---|---|---|
| Stratechery | https://stratechery.com/ | T2 | Strategic analysis of AI platform plays | Paywalled; opinion-heavy |
| The Information | https://www.theinformation.com/ | T2 | Original enterprise AI reporting | Paywalled |
| Latent Space | https://www.latent.space/ | T2 | Practitioner-focused, technical depth | Authors are also podcasters/investors — note potential conflicts |
| Import AI (Jack Clark) | https://importai.substack.com/ | T2 | Weekly research roundup | Author at Anthropic — note conflict on Anthropic items |
| The Batch (deeplearning.ai) | https://www.deeplearning.ai/the-batch/ | T2 | Andrew Ng's weekly | |
| AI Tidbits | https://www.aitidbits.com/ | T3 | Practitioner roundups | Lighter on primary research |
| Ben's Bites | https://bensbites.beehiiv.com/ | T3 | High-frequency aggregation | Aggregator — always trace to primary |
| Last Week in AI | https://lastweekin.ai/ | T3 | Weekly podcast + newsletter | |
| Simon Willison's blog | https://simonwillison.net/ | T2 | Hands-on testing of new tools, prompt injection research | Excellent for "did this actually work" |
| Sebastian Raschka blog | https://magazine.sebastianraschka.com/ | T2 | LLM technical deep-dives | |
| Interconnects (Nathan Lambert) | https://www.interconnects.ai/ | T2 | Open model ecosystem analysis | Author at AI2 — note org affiliation |
| TechCrunch AI | https://techcrunch.com/category/artificial-intelligence/ | T2-T3 | Funding news, product launches | Press-release-heavy; verify claims |
| The Verge AI | https://www.theverge.com/ai-artificial-intelligence | T2-T3 | Consumer AI angle | |
| MIT Tech Review AI | https://www.technologyreview.com/topic/artificial-intelligence/ | T2 | Long-form analysis | |
| 404 Media | https://www.404media.co/ | T2 | Investigative AI reporting | Strong on labor, copyright, AI-misuse stories |
| Semafor Tech | https://www.semafor.com/vertical/technology | T2 | Original reporting | |

---

## Research paper sources

Use when items reference a specific paper claim.

| Source | URL | Use for |
|---|---|---|
| arXiv (cs.AI, cs.CL, cs.LG) | https://arxiv.org/list/cs.AI/recent | Pre-print papers — NOT peer-reviewed, treat with caution |
| Hugging Face Daily Papers | https://huggingface.co/papers | Curated arXiv with community discussion |
| Papers with Code | https://paperswithcode.com/ | Papers + reproducibility status |
| Semantic Scholar | https://www.semanticscholar.org/ | Citation graph for papers |
| OpenReview | https://openreview.net/ | Conference review process visibility |

**Caveat**: arXiv is not peer-reviewed. Many heavily-cited "results" on arXiv have not been replicated. For strong claims, look for replication or peer-reviewed version.

---

## Community signals (discovery only, T3-T4)

Use these to **find** items, but trace to primary before citing.

| Source | URL | Fetch | Use for |
|---|---|---|---|
| Hacker News | https://hn.algolia.com/api | API search by keyword + date | Discovery of trending technical items |
| r/LocalLLaMA | https://www.reddit.com/r/LocalLLaMA/.json | JSON endpoint | Open-source model community signal |
| r/singularity | https://www.reddit.com/r/singularity/.json | JSON endpoint | Broad AI discussion (much hype — filter aggressively) |
| r/MachineLearning | https://www.reddit.com/r/MachineLearning/.json | JSON endpoint | Research-leaning community |
| r/AI_Agents | https://www.reddit.com/r/AI_Agents/.json | JSON endpoint | Agent framework discussion |

**Caveat**: comment counts and upvotes are not evidence of truth. Use for "this is being discussed" only.

---

## X / social (best-effort via web_search)

X timeline access is login-walled. Public posts can sometimes be retrieved via `web_search` when search engines have indexed them. Use for **discovery** and for **direct quotes from primary actors** (founders, researchers announcing their own work).

### High-value handles to monitor (via search query, not direct fetch)

Search pattern: `"@{handle}" {topic} site:x.com OR site:twitter.com` filtered by recent date.

| Handle | Why |
|---|---|
| @AnthropicAI | Official |
| @OpenAI | Official |
| @GoogleDeepMind | Official |
| @sama | OpenAI CEO — frequent product hints |
| @darioamodei | Anthropic CEO |
| @demishassabis | DeepMind CEO |
| @ylecun | Meta AI Chief Scientist |
| @karpathy | Independent — high-signal commentary |
| @swyx | Latent Space — practitioner |
| @simonw | Hands-on tool testing |
| @alexalbert__ | Anthropic — product/prompt updates |
| @soumithchintala | PyTorch / Meta |
| @rohanpaul_ai | Research roundups (verify) |
| @_philschmid | Hugging Face / open-source |

**Caveat**: tweets are often vague, deleted, or context-collapsed. If a tweet is the only source for a strong claim, mark `secondary` or `rumor`. Founder tweets about their own product are T2; influencer commentary is T4.

---

## Sources to AVOID or use with extreme caution

- **AI Twitter "leak" accounts** without verification track record — almost always T4-T5
- **YouTube AI channels** with breathless titles ("GPT-5 LEAKED", "AGI is HERE") — T5 unless they cite primary
- **Medium/Substack authors with no domain credentials** publishing strong claims — T4 default
- **LinkedIn AI thought leaders** writing reaction posts to news — T4, used only for sentiment, not facts
- **AI listicle SEO sites** ("Top 10 AI tools 2026") — T5, do not cite

---

## Adding a new source — checklist

Before adding to this registry, confirm:
- [ ] Identified author/org with track record
- [ ] At least 6 months of consistent publishing
- [ ] No major retractions or false claims in past year
- [ ] Methodology is observable (we know how they get their info)
- [ ] Tier assigned with explicit reasoning
- [ ] Caveat documented honestly

If any item fails, do not add. The registry is for sources that survive scrutiny — not for FOMO completeness.
