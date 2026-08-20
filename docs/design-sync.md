# Design system sync

`ajch_compass` shares a look-and-feel with `ajch_platform` and `ajch_spark`
but is a fully independent repo/deploy.

**Colors and typography come from `@aaryaai/brand`**
(github:ajeetchouksey/ajch_brand), not forked hex values — see that
package's `docs/BRAND.md`. Compass declares its own accent extension in
`src/index.css`: `--aarya-accent` = blue-700, `--aarya-accent-2` = sky-400
— restrained and professional, closer to the original ajch_platform look
than Spark's kids palette, deliberately echoing the old Discovery "safety"
track's blue.

**Components are copied, not shared.** `src/components/ui/*` was copied
from `ajch_spark@46b792e` (2026-08-20) — which had already fixed two
primitives (`SectionHeader`'s default `iconColor`, `Button`'s primary
variant) to reference `--aarya-accent` instead of a hardcoded violet
default. Re-diff quarterly or when the design language changes materially
— no automation, single maintainer across all three repos.
