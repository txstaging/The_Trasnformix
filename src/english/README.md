English versions are available at `/en`, `/en/v2`, `/en/v3`, and `/en/v4`.
All corresponding inner pages retain their paths beneath the `/en` prefix.
Every version's navbar includes a globe language switch on desktop and mobile.
It keeps the current version, page, query parameters, and section anchor.

The Arabic routes live in `src/app/(arabic)` and keep their original public
URLs. The English root layout has its own `lang="en"` and `dir="ltr"`; switching
back to Arabic loads its original root layout and styles.

English components and styles are isolated to protect the Arabic designs.
Shared images, videos, fonts, social destinations, and contact endpoints are
reused. English contact forms preserve the existing endpoint values.

To synchronize a later Arabic source change, update the contextual translations
in `messages.json`, then run `node scripts/generate-english.mjs`. The generator
fails if a translation is missing. English-only adaptations live in
`scripts/english-adjustments.mjs`. The language switch and its styles are shared
from `src/components/ui/LanguageSwitch`. The English root layout,
contact adapter, and this file are maintained separately.
