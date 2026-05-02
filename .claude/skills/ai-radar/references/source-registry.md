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

### Workflow automation — agentic execution products (high BD priority)

This category covers **AI that autonomously executes multi-step work**, not workflow-builder SaaS. Most primary sources for this category are already covered under foundation model labs and agent vendors above (Anthropic announces Computer Use; OpenAI announces Operator; Manus announces Cloud Computer / My Computer). The discovery pattern is:

1. Watch foundation model lab blogs for agentic releases (Anthropic, OpenAI, Google DeepMind, Meta, xAI, Manus) — these typically ship the highest-impact agentic products.
2. Watch agent/tooling vendor blogs (already in registry) for new end-user agent products vs developer frameworks — read past the marketing to confirm whether the announcement is a consumer product (this category) or an SDK (`agent-framework`).
3. Search GitHub topics like `topic:autonomous-agent`, `topic:browser-agent`, `topic:computer-use` filtered by stars + recent push for new entrants.
4. Track community signals (HN, r/AI_Agents, X) for "I tried [product] autonomously do X" type reports — these surface real-world capability claims worth investigating.

**Examples of items that belong here:**
- Manus Cloud Computer launch
- Claude Computer Use general availability
- ChatGPT Operator / Agent Mode releases
- Gemini agent capabilities
- New autonomous browser agents shipping for general use
- Bot/agent products that complete work end-to-end (booking, research, code, email management) without per-step human approval

**Examples that DO NOT belong here (skip or other category):**
- Zapier, n8n, Make.com, Workato, Tray.io, Activepieces, Pipedream, Bardeen — these are workflow-builder SaaS. AI is at most one node in a human-designed flow. Skip from the radar unless they ship a genuinely autonomous capability (rare).
- Notion AI Q&A, Linear suggestions, GitHub Copilot inline — these are `productivity-ai` (assistive, not autonomous).
- LangChain, AutoGen, CrewAI — these are `agent-framework` (developer infrastructure, not end-user product).

**Caveat for this category**: vendor announcements often blur the line between "demo of agentic capability" and "shipping agentic product". Check: is it generally available, behind a waitlist, in private beta, or just a research demo? Mark caveats accordingly.

### Productivity AI vendors (high BD priority)

AI features that **assist** human work without autonomously executing it. The human stays in the loop — AI suggests, summarizes, drafts, transcribes, surfaces information. Distinct from `workflow-automation` which is autonomous multi-step execution.

| Source | URL | Fetch | Use for | Caveat |
|---|---|---|---|---|
| Notion blog | https://www.notion.com/blog | web_fetch | Notion AI features (Q&A, summaries, draft assist) | Marketing-heavy |
| Linear changelog | https://linear.app/changelog | web_fetch | Linear AI suggestions, integrations | High signal — concrete shipping changelog |
| Coda blog | https://coda.io/blog | web_fetch | Coda AI features, packs | |
| Granola blog | https://www.granola.ai/blog | web_fetch | Meeting AI, transcript automation | New vendor |
| Mem.ai blog | https://mem.ai/blog | web_fetch | AI-native notes, knowledge mgmt | |
| Reflect blog | https://reflect.app/blog | web_fetch | AI-native journaling / notes | |
| Glean blog | https://www.glean.com/blog | web_fetch | Enterprise search with AI | Enterprise sales bias |
| Mintlify blog | https://mintlify.com/blog | web_fetch | AI documentation tools | |
| Tldraw blog | https://tldraw.com/blog | web_fetch | AI canvas / whiteboarding | |
| Otter blog | https://otter.ai/blog | web_fetch | Meeting AI, transcription | |
| Fireflies blog | https://fireflies.ai/blog | web_fetch | Meeting AI assistant | |

**Use for**: tracking how AI is being embedded into productivity tools as assistive features. Signal for what individual or team workflows can benefit from off-the-shelf AI assistance.

**What belongs here**: features where AI suggests, drafts, summarizes, transcribes, retrieves — and the human decides what to do next. Examples: ChatGPT/Claude regular chat (non-agentic), Notion AI Q&A, GitHub Copilot inline suggestions, Granola transcription, Linear AI suggestions.

**What does NOT belong here**: agentic/autonomous AI products (Manus Computer, Claude Computer Use, ChatGPT Operator, etc.) → those go in `workflow-automation`. Distinguish by whether the AI executes multi-step actions on its own or merely assists a human-driven flow.

**Caveat**: many productivity-tool blogs are marketing-heavy and reuse the word "AI" loosely. Look for actual feature spec, pricing, availability date. Dismiss generic "we're using AI" announcements without specifics.

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

### GitHub trending & topic search (discovery only)

| URL / Pattern | Use for |
|---|---|
| https://github.com/trending?since=daily | Discovery of fast-rising repos |
| https://github.com/trending?since=weekly | Less noisy than daily |
| `topic:claude-skill stars:>50 pushed:>{date}` (GitHub search) | Active Claude skills with adoption signal |
| `topic:mcp-server stars:>100 pushed:>{date}` | MCP servers gaining traction |
| `topic:ai-agent stars:>50 created:>{date}` | New agent tooling with stars |
| `topic:llm-tools OR topic:ai-automation stars:>100 pushed:>{date}` | Adjacent automation toolchain |
| `topic:claude-code OR topic:cursor stars:>50 pushed:>{date}` | AI-coding ecosystem |
| `topic:agentic-ai stars:>50 pushed:>{date}` | Agentic patterns and frameworks |

**Search via**: GitHub search UI, or `web_search "site:github.com topic:X stars:>N"` for indexed results.

**Filter rules to avoid false positives:**
- `pushed:<60d` floor — repos starred but not maintained ≠ adoption
- Exclude tutorial repos (heuristic: README emphasizes "learn how to" without working code)
- Exclude archived projects
- Stars without recent commits = bookmarking, not adoption signal

**Caveat**: trending and stars are gameable; treat as discovery aid, not as evidence of production adoption. Always trace upstream to verify the project actually delivers.

### MCP ecosystem aggregators (discovery + tracking)

The MCP ecosystem moves fast and many servers don't have their own blog. Aggregators surface what's shipping.

| Source | URL | Tier | Use for | Caveat |
|---|---|---|---|---|
| PulseMCP | https://www.pulsemcp.com/ | T3 | Curated MCP server directory with metadata | Aggregator — trace upstream to vendor or repo before citing as primary |
| Glama AI MCP directory | https://glama.ai/mcp/servers | T3 | Browseable MCP servers, search by category | Same — discovery only |
| mcp.so | https://mcp.so/ | T3 | Community-driven MCP server index | Tier varies by entry; verify per-item |
| Awesome MCP servers (GitHub) | https://github.com/punkpeye/awesome-mcp-servers | T3 | Curated list with descriptions | Trace upstream |
| modelcontextprotocol/servers | https://github.com/modelcontextprotocol/servers | T2 | Official reference + community servers | Tier T2 for official entries, T3 for community-contributed |

**Use for**: identifying MCP servers shipping for automation/integration use cases (filesystem, databases, SaaS, dev tools). Particularly relevant when looking for tooling that bridges Claude/agents to existing workflows — a high-leverage area for the BD audience.

**Caveat**: MCP server quality varies enormously. A server with 500 stars and a polished README may still have stale tool definitions or broken schemas. Verify by reading the actual server code or testing in a sandbox before recommending in BD framing.

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

## Social via search (X + Threads — best-effort indexed posts)

X and Threads timeline access is login-walled. Public posts can sometimes be retrieved via `web_search` when search engines have indexed them. Use for **discovery**, for **direct quotes from primary actors** (founders, researchers announcing their own work), and as **engagement proxy** when same post diffuses across multiple aggregators.

**This category is mandatory per run** (Stage 3 priority #3). Always run dedicated search passes — do not skip even when no lateral discovery surfaces an X handle.

### Search patterns

For specific handles:
- `web_search "@handle [topic]" site:x.com` (or `site:twitter.com` legacy)
- `web_search "@handle [topic]" site:threads.net`

For topic discovery without specific handle:
- `web_search "[topic]" site:x.com [date qualifier like 'this week']`
- `web_search "[topic]" site:threads.net`

For viral/trending content:
- `web_search "[topic] viral OR trending site:x.com"`
- Cross-reference with HN search to validate engagement

### High-value handles — official accounts

| Handle | Org | Use for |
|---|---|---|
| @AnthropicAI | Anthropic | Official announcements, often before blog post |
| @OpenAI | OpenAI | Official announcements |
| @GoogleDeepMind | Google DeepMind | Official |
| @GoogleAI | Google | Product AI announcements |
| @MetaAI | Meta | Llama, FAIR research |
| @MistralAI | Mistral | Model releases |
| @xai | xAI | Grok |
| @cohere | Cohere | Command models |
| @huggingface | Hugging Face | Open-source ecosystem |
| @LangChainAI | LangChain | Framework updates |
| @llama_index | LlamaIndex | Framework updates |
| @manus_ai | Manus | Agent product launches |

### High-value handles — leadership voices

| Handle | Why | Caveat |
|---|---|---|
| @sama | OpenAI CEO | Frequent product hints; often vague |
| @darioamodei | Anthropic CEO | Less frequent, high signal |
| @demishassabis | DeepMind CEO | Research-leaning |
| @ylecun | Meta AI Chief Scientist | Opinion-heavy on AGI/ML |
| @adcock_brett | Robotics + AI | Verify claims |
| @gdb | Greg Brockman, OpenAI | Product updates |

### High-value handles — practitioner / independent

| Handle | Why | Caveat |
|---|---|---|
| @karpathy | Andrej Karpathy | High-signal AI commentary, hands-on |
| @swyx | Latent Space | Practitioner perspective; investor — note potential conflicts |
| @simonw | Simon Willison | Hands-on tool testing — excellent for "did this actually work" |
| @rauchg | Vercel founder | Product/dev tools angle |
| @pirroh | Designer + AI builder | Product launches |
| @soumithchintala | PyTorch core | Open-source signal |
| @_philschmid | Philipp Schmid (HF) | Open-source releases |
| @AndrewCurran_ | AI news curator | Verify before citing — useful for discovery |
| @rohanpaul_ai | Research roundups | Always verify — discovery only |
| @alexalbert__ | Anthropic product | Prompt patterns, product hints |
| @cremieuxrecueil | Research commentary | Verify |
| @tszzl | Roon, OpenAI | Cultural commentary, occasionally product |
| @sangerized | AI dev tools | Product tracking |

### Threads handles to monitor

Threads is sparser than X for AI content, but a few high-value voices have moved:

| Handle (Threads) | Why |
|---|---|
| @sama | Cross-posts from X |
| @karpathy | Occasional Threads-only |
| @pirroh | Active on Threads |

For Threads, search-engine indexing is less reliable than X. Treat Threads-only finds as discovery; trace upstream to X or vendor blog before citing.

### Topic-based search patterns

Run these per category to capture content from outside the known handle list:

- workflow-automation: `"AI agent" OR "autonomous agent" site:x.com [recent]`
- productivity-ai: `"Notion AI" OR "Linear AI" OR "AI assistant" site:x.com [recent]`
- agent-framework: `"LangChain" OR "AutoGen" OR "CrewAI" site:x.com [recent]`
- mcp-ecosystem: `"MCP server" OR "Model Context Protocol" site:x.com [recent]`
- model-release: `"GPT-5" OR "Claude" OR "Gemini" release site:x.com [recent]`

**Caveat**: tweets are often vague, deleted, or context-collapsed. If a tweet is the only source for a strong claim, mark `secondary` or `rumor`. Founder tweets about their own product are T2 for "person said this", T3 for "company committed". Influencer commentary without primary backing is T4. Anonymous "leak" account tweets are T5 — do not cite.

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
