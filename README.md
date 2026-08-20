# Compass

Practical AI for non-technical professionals — a standalone app under the
[Aarya — My AI Learning Hub](https://aaryaai.dev) family, deployed at
`compass.aaryaai.dev`.

Compass is the non-technical-professional half of what was briefly
[Spark](https://github.com/ajeetchouksey/ajch_spark)'s `/grownups` section
— split into its own vertical so Spark could focus entirely on kids and
Compass could focus entirely on working professionals (finance, ops,
"anyone with a job to do"), each with branding and content suited to its
actual audience instead of sharing one page.

## Tracks

Migrated from `ajch_platform`'s former Discovery/Pathways feature:

- **AI Safety & Responsibility** (Teens 13–18)
- **Applied AI for Practitioners** (Finance & Data Professionals)
- **AI Ethics & Bias** (Students & Policy Researchers)
- **AI Productivity** (Students & Professionals)

## Status

App shell + migrated content live. 2 of 12 articles have real body
content (`How Scammers Use AI`, `Financial Forecasting with AI`); the
other 10 show an honest "coming soon" placeholder — matches what
`ajch_platform` itself rendered for them before the migration.

## Development

```bash
npm install
npm run dev       # http://localhost:5173
npm run build      # tsc -b && vite build
```

## Deploy

Pushes to `main` deploy automatically via
`.github/workflows/deploy-cloudflare-pages.yml` to the `ajch-compass`
Cloudflare Pages project.
