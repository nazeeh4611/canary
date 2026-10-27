# Canary Interior Design — website

Next.js (App Router) site for Canary Interior Design, Ajman. Static by default; the only server code is
the enquiry endpoint.

> **Before launch, read [`docs/CONTENT-CHECKLIST.md`](docs/CONTENT-CHECKLIST.md).** The portfolio currently
> contains labelled sample entries, the phone number needs confirming, and enquiry delivery must be configured.

## Quick start

```bash
npm install
cp .env.example .env.local   # configure enquiry delivery + analytics
npm run dev                  # http://localhost:3000
```

| Script | Purpose |
|--------|---------|
| `npm run build` / `npm start` | Production build (regenerates drawings first) and server |
| `npm run lint` / `npm run typecheck` | ESLint and TypeScript |
| `npm run drawings` | Render architectural drawings to `public/drawings/*.svg` |
| `npm run qa` | End-to-end QA against a running production server (`BASE_URL=…`; add `QA_OFFLINE_IMAGES=1` where remote images are unreachable) |

## Stack

Next.js 16 · React 19 · TypeScript · Tailwind CSS 4 · Zod (server validation only) · Lucide icons ·
`next/font/local` (Google Sans Flex, self-hosted). No CMS, database or animation
library — content lives in typed files, motion is CSS and respects `prefers-reduced-motion`.

## Where things live

```
src/config/site.ts        Business facts (NAP, WhatsApp, service area, flags for unverified items)
src/config/redirects.ts   301s from the old canaryinterior.ae URLs
src/data/                 services, projects, guides, photos, FAQs, process, homepage copy, testimonials
src/app/                  routes: /, /services/[slug], /projects/[slug], /guides/[slug], /about, /process,
                          /contact, /start-a-project, legal pages, sitemap, robots, OG image
src/app/api/enquiry       Enquiry endpoint: Zod validation, honeypot + timing trap, rate limit
src/lib/                  SEO metadata, JSON-LD, validation, analytics, email/webhook delivery
src/components/media      Figure (photo or drawing) + architectural drawing library
```

## Design system

The concept is **the drawing set**: warm paper tones, ink linework, sheet numbers (`A-03`, `P-01`),
title blocks and dimension-string details, so the site reads like an architect's monograph rather than
a template. Tokens are in `src/app/globals.css` (`@theme`).

- **Type:** **Google Sans Flex** — Google's brand typeface, published on Google Fonts under the SIL Open
  Font License — self-hosted from `src/fonts/` (one 51 KB variable file, weights 300–800). Falls back to
  Apple's SF Pro via `-apple-system`, then Segoe UI / Roboto. Headlines follow the Apple/Google product-page
  manner: medium weight, tight tracking, and a second phrase in grey (`<em>`) instead of italics. Apple's
  SF Pro itself is not embedded: its licence only permits use in apps for Apple platforms, not on websites.
  Fluid scale via `clamp()`: `text-display`, `text-h1`–`h3`, `text-lede`; `.label` and `.sheet` for metadata.
- **Colour:** ivory, paper, ink, stone, sand, olive, umber. **Canary ochre** (`#d4a72c`) is reserved for
  small marks (wordmark dot, active nav, focus ring) — never body text on light backgrounds.
- **Shape:** rectangular buttons with hairline borders, 2px radius, no pills, no cards-in-cards, no gradients.

### Imagery

The site uses licensed stock photography from **Pexels** (free for commercial use) until Canary's own
project photos are supplied — all listed in `src/data/photos.ts`. Every image slot is a typed `Media`
value with explicit provenance:

- `kind: "canary"` — real project photograph (rights confirmed)
- `kind: "stock"` — licensed stock, with credit
- `kind: "drawing"` — generated architectural drawing, served as a static SVG (brand sections such as
  the approach detail, process and materials)

Stock photos are labelled "Illustrative photo" wherever they could be read as Canary's own work (all
portfolio and guide images), and the footer notes that some images are illustrative. If a remote photo
fails to load, it degrades to the matching drawing rather than a broken image. Replacing a stock photo
with a Canary photo is a data change only — see the checklist.

### Guides

`/guides` holds evergreen articles (`src/data/guides.ts`) aimed at the questions people search before
hiring a designer, with `Article` schema and links into the relevant services. Add one genuinely useful
guide a month; never publish invented prices, statistics or regulations.

## Enquiries

`POST /api/enquiry` validates on the server, drops honeypot/too-fast submissions, rate-limits per IP
(5 per 10 minutes; in-memory — add a shared store on serverless if abused), then delivers via **Resend**
email and/or a **webhook** (CRM, Zapier, Make). If neither is configured it returns `503` and the form tells
the visitor their enquiry was *not* sent and offers WhatsApp/phone — it never fakes success.

WhatsApp links are built by `whatsappUrl()` with only the service/project type in the message — no
personal data goes into URLs or analytics.

## Analytics

Set `NEXT_PUBLIC_GA_ID` or `NEXT_PUBLIC_GTM_ID`; nothing loads otherwise. Elements with `data-track`
send `whatsapp_click`, `phone_click`, `email_click`, `directions_click`, `cta_click`, plus
`enquiry_submit` / `enquiry_error`. Service and project page views are standard page views in GA4.

## Deployment

Any Node host works (Vercel, Netlify, a VPS with `npm start`). Set `NEXT_PUBLIC_SITE_URL` to the
production domain, configure enquiry delivery, and do **not** set `NEXT_PUBLIC_ALLOW_INDEXING=false`
in production. Then follow "After launch" in [`docs/SEO-KEYWORD-MAP.md`](docs/SEO-KEYWORD-MAP.md).
# canary
