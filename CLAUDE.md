# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Compass is a standalone React SPA — "Practical AI for non-technical professionals" — one vertical of the
[Aarya — My AI Learning Hub](https://aaryaai.dev) family, deployed independently at `compass.aaryaai.dev`.
It was split out of `ajch_spark`'s brief `/grownups` section so Spark could stay kids-only. There is no
backend: content is a static TypeScript data module, not a CMS or API.

## Commands

```bash
npm install
npm run dev       # http://localhost:5173
npm run build      # tsc -b && vite build (type-check then bundle)
npm run lint       # eslint .
npm run preview    # serve the production build locally
```

There is no test suite/framework configured in this repo (no vitest/jest, no test script). Verify changes
via `npm run build` (catches type errors) and `npm run lint`.

Deploys are automatic: every push to `main` runs `.github/workflows/deploy-cloudflare-pages.yml`, which
builds and runs `wrangler pages deploy dist --project-name=ajch-compass`. There's no staging/preview
deploy target configured — `main` is production.

## Architecture

**Routing** (`src/app/router.tsx`, mounted in `src/App.tsx` inside `Layout`): four routes, all lazy-loaded.
`/tracks` is a deliberate alias of `/` (Home already renders the full track list — there was never a
separate list view in the original design). Content pages are `/tracks/:trackId` (`TrackDetail`) and
`/tracks/:trackId/:slug` (`TrackArticle`).

**Content is data, not files.** All tracks and articles live as typed arrays in
`src/features/tracks/data/tracks.ts` (`TRACKS: Track[]`) and `src/features/tracks/data/articles.ts`
(`ARTICLES: Article[]`), with lookup helpers `getTrack(id)`, `getArticlesForTrack(trackId)`,
`getArticle(slug)`. To add or edit an article or track, edit these arrays directly — there is no CMS,
no markdown files on disk, no build-time content pipeline. Article body content is an inline markdown
string in the `content` field, rendered via `react-markdown` + `remark-gfm` + `rehype-raw` in
`TrackArticle.tsx`.

Only 2 of 12 articles currently have real `content` (`ai-scam-awareness`,
`financial-forecasting-with-ai`); the rest have `content: undefined` and `TrackArticle` renders a generic
"Coming soon" placeholder for them — this mirrors what `ajch_platform` itself showed before migration, so
don't treat missing content as a bug to silently paper over with placeholder prose.

There are exactly 4 tracks, each with a fixed identity (`id`, `accent`/`badgeVariant` tokens, and separately
a raw `color`/`bg`/`border` triplet used for direct inline-style hover/glow effects that predate the
Badge/accent-token system — both are needed, not redundant). New tracks must supply all of these fields.

**`src/components/ui/*` is a copied, not shared, design-system.** It was forked from
`ajch_spark@46b792e` (see `docs/design-sync.md`) — it is NOT an npm dependency and NOT kept in sync
automatically. Colors and typography (fonts, base tokens) come from the `@aaryaai/brand` GitHub package
(`github:ajeetchouksey/ajch_brand`); Compass declares its own accent extension on top in `src/index.css`
(`--aarya-accent` / `--aarya-accent-2`, blue/sky — deliberately closer to the original `ajch_platform`
look than Spark's kids palette). When touching `src/components/ui/`, remember changes here do not
propagate to `ajch_spark` or vice versa — re-diff quarterly per the note in `docs/design-sync.md`, don't
assume automation exists.

**Layout & breadcrumbs**: `src/components/Layout.tsx` derives breadcrumbs from the URL path directly
(splitting `location.pathname`) rather than from route config — the same pattern used in `ajch_platform`'s
Layout. If you add new route segments under `/tracks/...`, update the `Breadcrumbs()` logic in that file
to match, since it pattern-matches path depth rather than reading route metadata.

**TrackArticle.tsx** is a faithful port of `ajch_platform`'s old `PathwayArticle.tsx` (reading-progress
bar, scroll-spy TOC sidebar + mobile TOC drawer, related-articles panel). It deliberately does NOT support
Mermaid diagrams (dropped as a dependency during migration — the two real articles' diagrams were
rewritten as plain numbered lists) or the platform's `KeywordHighlight` feature. Don't reintroduce Mermaid
here without discussing scope — it was an intentional omission, not an oversight.

**Path alias**: `@/*` maps to `src/*` (configured in both `vite.config.ts` and `tsconfig.app.json`) —
use `@/...` imports, not deep relative paths, consistent with the rest of the codebase.

**Styling**: Tailwind v4 via the `@tailwindcss/vite` plugin (no `tailwind.config.js` — v4 is CSS-first,
configured in `src/index.css`). Most one-off visual effects (per-track colored glows, gradients) are done
as inline `style` objects reading from track data rather than Tailwind classes, since the colors are
per-track runtime values, not fixed design tokens.

## Sibling repos worth knowing about

- `ajch_platform` — the main Aarya hub; Compass's tracks/articles were migrated out of its old
  Discovery/Pathways feature.
- `ajch_spark` — kids-focused sibling app; source of the copied `src/components/ui/` primitives.
- `ajch_brand` (`@aaryaai/brand`) — shared design tokens/fonts package consumed via GitHub dependency.
