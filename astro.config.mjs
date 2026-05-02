import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  // Public site URL — update after Cloudflare Pages deploy gives subdomain
  site: 'https://ai-radar.pages.dev',
  output: 'static',
  trailingSlash: 'never',
  build: {
    format: 'directory',
  },
  markdown: {
    // Reading time, GitHub-flavored markdown by default
    syntaxHighlight: 'shiki',
    shikiConfig: {
      theme: 'github-light',
      wrap: true,
    },
  },
});
