#!/usr/bin/env node
/**
 * AI Radar Quality Gate — syntactic checks
 * Layer 1 of the hybrid quality gate (project instruction §5, Fase 5C).
 * Layer 2 (semantic — hype language, substantive limitations, no-quote-twice)
 * is performed by Claude self-check inside the Routine prompt.
 *
 * Run via:
 *   node scripts/quality-gate.mjs                       # check all posts
 *   node scripts/quality-gate.mjs --file <path.md>      # check single post
 *
 * Exit codes:
 *   0 — all checks pass
 *   1 — one or more checks fail (details printed to stderr)
 */

import { readFileSync, readdirSync } from 'node:fs';
import { join, basename } from 'node:path';
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';
import matter from 'gray-matter';

const __dirname = dirname(fileURLToPath(import.meta.url));
const POSTS_DIR = join(__dirname, '..', 'src', 'content', 'posts');

// ---- Configurable rules ----
const RULES = {
  // From project instruction §4 frontmatter contract
  requiredFrontmatter: [
    'title',
    'date',
    'audience',
    'period_start',
    'period_end',
    'items_reviewed',
    'items_published',
    'items_dropped',
    'categories',
    'verification_summary',
    'limitations_present',
    'sources_count',
    'exploration_pct',
  ],
  // From skill — Stage 3.5 exploration % must be >=30
  minExplorationPct: 30,
  // From copyright rules — quote ceiling
  maxQuoteWords: 14,
  // Hype words that should not appear in neutral newsroom-style digest.
  // List is intentionally conservative — false positives reviewed manually.
  hypePatterns: [
    /\brevolutionary\b/i,
    /\bgame[- ]chang(er|ing)\b/i,
    /\bmind[- ]blowing\b/i,
    /\binsane(ly)?\b/i,
    /\bunbelievabl[ye]\b/i,
    /\bmust[- ]have\b/i,
    /\bnext[- ]level\b/i,
    /\bstate[- ]of[- ]the[- ]art\b/i, // tolerated only in citations; gate flags for review
    /\bbreakthrough\b/i,
    /\bdisrupt(ive|ing|or)\b/i,
  ],
  // Required structural sections in body markdown
  requiredSections: ['Limitations', 'Dropped'],
};

// ---- Check helpers ----
const errors = [];
const warnings = [];

function checkFrontmatter(filePath, fm) {
  for (const key of RULES.requiredFrontmatter) {
    if (fm[key] === undefined || fm[key] === null || fm[key] === '') {
      errors.push(`${basename(filePath)}: missing required frontmatter field '${key}'`);
    }
  }
  if (typeof fm.exploration_pct === 'number' && fm.exploration_pct < RULES.minExplorationPct) {
    errors.push(
      `${basename(filePath)}: exploration_pct=${fm.exploration_pct} < ${RULES.minExplorationPct} (Stage 3.5 rule)`
    );
  }
  if (fm.limitations_present !== true) {
    errors.push(`${basename(filePath)}: limitations_present must be true`);
  }
  // Internal consistency
  if (
    typeof fm.items_reviewed === 'number' &&
    typeof fm.items_published === 'number' &&
    typeof fm.items_dropped === 'number'
  ) {
    if (fm.items_reviewed < fm.items_published + fm.items_dropped) {
      errors.push(
        `${basename(filePath)}: items_reviewed (${fm.items_reviewed}) < published (${fm.items_published}) + dropped (${fm.items_dropped})`
      );
    }
  }
  if (fm.verification_summary && typeof fm.verification_summary === 'object') {
    const { verified = 0, secondary = 0, rumor = 0 } = fm.verification_summary;
    const sum = verified + secondary + rumor;
    if (typeof fm.items_published === 'number' && sum !== fm.items_published) {
      errors.push(
        `${basename(filePath)}: verification_summary sum (${sum}) != items_published (${fm.items_published})`
      );
    }
  }
}

function checkRequiredSections(filePath, body) {
  for (const section of RULES.requiredSections) {
    // Match markdown header (## or ###) containing the section name
    const re = new RegExp(`^#{2,3}\\s.*${section}`, 'im');
    if (!re.test(body)) {
      errors.push(`${basename(filePath)}: missing required section '${section}'`);
    }
  }
}

function checkQuoteLength(filePath, body) {
  // Match content inside double quotes (loose — flags for review, not a hard fail)
  const quoteRegex = /"([^"]{20,})"/g;
  let m;
  while ((m = quoteRegex.exec(body)) !== null) {
    const wordCount = m[1].trim().split(/\s+/).length;
    if (wordCount > RULES.maxQuoteWords) {
      errors.push(
        `${basename(filePath)}: quote exceeds ${RULES.maxQuoteWords}-word limit (${wordCount} words): "${m[1].slice(0, 60)}..."`
      );
    }
  }
}

function checkHypeLanguage(filePath, body) {
  for (const pattern of RULES.hypePatterns) {
    const match = body.match(pattern);
    if (match) {
      warnings.push(
        `${basename(filePath)}: hype pattern '${match[0]}' detected — review for context`
      );
    }
  }
}

function checkPost(filePath) {
  const raw = readFileSync(filePath, 'utf8');
  const { data: fm, content: body } = matter(raw);
  checkFrontmatter(filePath, fm);
  checkRequiredSections(filePath, body);
  checkQuoteLength(filePath, body);
  checkHypeLanguage(filePath, body);
}

// ---- Main ----
function main() {
  const args = process.argv.slice(2);
  const fileFlag = args.indexOf('--file');
  let files = [];

  if (fileFlag !== -1 && args[fileFlag + 1]) {
    files = [args[fileFlag + 1]];
  } else {
    try {
      files = readdirSync(POSTS_DIR)
        .filter((f) => f.endsWith('.md'))
        .map((f) => join(POSTS_DIR, f));
    } catch (err) {
      console.error(`Cannot read posts directory: ${POSTS_DIR}`);
      process.exit(1);
    }
  }

  if (files.length === 0) {
    console.log('No posts to check.');
    process.exit(0);
  }

  for (const f of files) {
    try {
      checkPost(f);
    } catch (err) {
      errors.push(`${basename(f)}: parse error — ${err.message}`);
    }
  }

  console.log(`Quality gate checked ${files.length} post(s).`);
  if (warnings.length > 0) {
    console.log(`\n⚠  ${warnings.length} warning(s):`);
    warnings.forEach((w) => console.log(`   ${w}`));
  }
  if (errors.length > 0) {
    console.error(`\n✗  ${errors.length} error(s):`);
    errors.forEach((e) => console.error(`   ${e}`));
    console.error('\nQuality gate FAILED. Post will not publish.');
    process.exit(1);
  }
  console.log('\n✓  Quality gate passed.');
  process.exit(0);
}

main();
