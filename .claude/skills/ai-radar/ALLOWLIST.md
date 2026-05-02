# Domain Allowlist for AI Radar Routine Custom Environment

This list is used when configuring a Custom Environment in Claude Code Routines. Without it, the cloud sandbox blocks outbound network requests, and `web_fetch` calls to vendor blogs / GitHub / news outlets will return 403.

Domains derived from `references/source-registry.md` plus discovery sources mentioned in SKILL.md Stage 3.5.

## How to use

1. Go to Claude Code → Settings → Environments → Add environment (or pick one from the Routine create form)
2. Set Network access to **Custom**
3. Paste these domains in the allowlist field (UI may want them comma-separated or one-per-line — adapt as needed)
4. Save the environment, then attach it to both Routines

## Domain list (44 entries, alphabetized)

```
404media.co
ai.meta.com
ai21.com
aitidbits.com
anthropic.com
arxiv.org
bensbites.beehiiv.com
blog.google
blog.langchain.com
cohere.com
cursor.com
deeplearning.ai
deepmind.google
github.blog
github.com
hn.algolia.com
huggingface.co
importai.substack.com
interconnects.ai
lastweekin.ai
latent.space
llamaindex.ai
magazine.sebastianraschka.com
manus.im
mistral.ai
news.ycombinator.com
openai.com
openreview.net
paperswithcode.com
producthunt.com
reddit.com
replicate.com
semafor.com
semanticscholar.org
simonwillison.net
sourcegraph.com
stability.ai
stratechery.com
techcrunch.com
technologyreview.com
theinformation.com
theverge.com
vercel.com
x.ai
```

## Why these?

- **Foundation model labs** (anthropic.com, openai.com, deepmind.google, blog.google, ai.meta.com, mistral.ai, x.ai, cohere.com, stability.ai, ai21.com) — vendor primary sources
- **Agent/tooling vendors** (manus.im, blog.langchain.com, llamaindex.ai, vercel.com, replicate.com, huggingface.co) — agent framework news
- **Dev tool vendors** (cursor.com, github.blog, sourcegraph.com) — AI-coding tools
- **Research papers** (arxiv.org, paperswithcode.com, semanticscholar.org, openreview.net) — paper validation
- **Newsletter/media** (stratechery.com, theinformation.com, latent.space, importai.substack.com, deeplearning.ai, aitidbits.com, bensbites.beehiiv.com, lastweekin.ai, simonwillison.net, magazine.sebastianraschka.com, interconnects.ai, techcrunch.com, theverge.com, technologyreview.com, 404media.co, semafor.com) — secondary sources with original reporting
- **Discovery sources** (github.com, news.ycombinator.com, hn.algolia.com, reddit.com, producthunt.com) — Stage 3.5 exploration entry points

## Domains to add over time

Stage 3.5 of the skill mandates exploration beyond the registry. When the Routine discovers useful sources outside this list, the run will fail to fetch them (403). Add them to the allowlist after each run, batch-style:

1. Check Routine run log for 403 errors
2. Add the blocked domain to allowlist
3. Re-run if needed

This is inherent to allowlist-based security — it requires curation. The alternative (Unrestricted network access) is also available in Routine env, but trades safety for convenience. For a research bot like AI Radar where we want to keep scope tight, allowlist is the correct choice.

## Optional infra domains

If the Routine's setup script needs to install npm/pip packages, add:

```
registry.npmjs.org
pypi.org
files.pythonhosted.org
```

These are typically already in the "Trusted" preset, but Custom mode sometimes drops them. Add explicitly to be safe.

## GitHub-related (always allow)

`github.com` is already on the list — used for git push and for `https://github.com/{org}/{repo}/releases` fetches.
