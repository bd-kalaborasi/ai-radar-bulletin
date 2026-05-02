import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Schema mirrors project instruction §4 frontmatter contract.
// Any post that violates this fails the build — first line of defense
// in the hybrid quality gate (5C).
const posts = defineCollection({
  loader: glob({
    pattern: '**/*.md',
    base: './src/content/posts',
  }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    audience: z.array(z.enum(['public-digest'])).default(['public-digest']),
    period_start: z.coerce.date(),
    period_end: z.coerce.date(),
    items_reviewed: z.number().int().nonnegative(),
    items_published: z.number().int().nonnegative(),
    items_dropped: z.number().int().nonnegative(),
    categories: z.array(
      z.enum([
        'model-release',
        'agent-framework',
        'dev-tools',
        'mcp-ecosystem',
        'workflow-automation',
        'productivity-tools',
        'ai-for-business',
        'research-papers',
        'policy-regulation',
      ])
    ),
    verification_summary: z.object({
      verified: z.number().int().nonnegative(),
      secondary: z.number().int().nonnegative(),
      rumor: z.number().int().nonnegative(),
    }),
    limitations_present: z.literal(true),
    sources_count: z.number().int().nonnegative(),
    exploration_pct: z.number().min(0).max(100),
  }),
});

export const collections = { posts };
