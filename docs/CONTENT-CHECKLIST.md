# Content checklist — what Canary needs to provide or confirm

The site was built only from information that could be verified publicly. Everything below is either
missing, unverified, or contradictory. **The site should not launch until items marked 🔴 are resolved.**

## 🔴 Blocking

| # | Item | Why it matters | Where to change it |
|---|------|----------------|--------------------|
| 1 | **Project photography and case studies** (6+ projects ideally) | The site currently uses licensed Pexels stock photos, labelled "Illustrative". All six portfolio entries are *sample entries* and `noindex`. Stock images can't prove craftsmanship — Canary's own work can. | `src/data/projects.ts`, `src/data/photos.ts`; images in `public/images/projects/<slug>/` |
| 2 | **Confirm the correct phone number** | Public sources list both **+971 52 771 8853** (used on this site, from the brief and Instagram) and **+971 50 468 8977** (old site contact page). NAP consistency with Google Business Profile directly affects local ranking. | `src/config/site.ts` → `phone`, `whatsapp` |
| 3 | **Configure enquiry delivery** | Without it the form honestly reports that it cannot send, and offers WhatsApp. | `.env` → `RESEND_API_KEY` + `ENQUIRY_TO_EMAIL`, or `ENQUIRY_WEBHOOK_URL` |
| 4 | **Official logo files** (SVG preferred) | A typographic stand-in wordmark is used. | `src/components/layout/Logo.tsx`, `src/app/icon.svg` |
| 5 | **Legal review of Privacy Policy and Terms** | Written in plain language to describe what the site actually does; not reviewed by a lawyer. | `src/app/privacy-policy`, `src/app/terms` |
| 6 | **Old website URL list** | The old domain title reads "Need to renew" — the hosting/domain may have lapsed. Export indexed URLs from Search Console so redirects can be completed. | `src/config/redirects.ts` |

## 🟠 Important

| Item | Current state | Where |
|------|---------------|-------|
| Hero photograph | Illustrative Pexels photo | `src/data/home.ts` → `heroMedia` |
| Opening hours (must match Google) | Hidden; contact page says "call ahead" | `site.openingHours` |
| Emirates served (Sharjah, Dubai, …) | Only Ajman named; "across the UAE" from Canary's Instagram | `site.serviceArea.emirates[].confirmed` |
| Genuine client testimonials (with permission, ideally linked Google reviews) | Section replaced by material palette | `src/data/testimonials.ts` |
| Studio / workshop photographs, team information | About page omits team section | `src/app/about/page.tsx` |
| Google Maps share link for the exact pin | Search URL by address | `site.mapsUrl` |
| Trade licence / legal name | Not shown | `site.legalName` |
| Budget ranges in the enquiry form | Reasonable defaults in AED — adjust to Canary's real project sizes | `src/lib/enquiry-options.ts` |

## 🟡 Confirm before claiming

These services/claims are on the site because Canary's own channels list them. Confirm they're current:

- Architecture & space planning — old site: "interior design, architecture, landscaping and fit-outs"
- Pool & landscaping — old site navigation
- Joinery & custom carpentry — Canary social post: "Design. Renovation. Fit-Out. Joinery."
- Clinic, salon, shop, office, hospitality work — old site navigation
- Design-through-delivery in one team — Dubizzle directory listing

**Deliberately not claimed** (add only if true): project management as a service, free consultation,
free quotation, years in business, project counts, awards, certifications, warranties, regulatory approvals.

## Adding a real project

```ts
// src/data/projects.ts
{
  slug: "al-zahia-villa",            // permanent URL: /projects/al-zahia-villa
  title: "Al Zahia Villa",
  category: "Villa",
  sector: "Residential",
  location: "Al Zahia, Sharjah",     // only with client consent
  summary: "…",
  scope: ["Interior design", "Joinery", "Fit-out"],
  concept: "…",
  materials: [{ name: "Travertine", swatch: "#D9CBB2" }],
  cover: { kind: "canary", src: "/images/projects/al-zahia-villa/01.jpg", alt: "Double-height living room with travertine floor", width: 2400, height: 1600 },
  gallery: [ /* same shape */ ],
  services: ["villa-interiors", "joinery"],
  placeholder: false,                // → indexed + added to sitemap
}
```

Photograph guidance: export JPEGs at ~2400px on the long edge, natural light, consistent white balance,
no heavy filters. `next/image` handles AVIF/WebP conversion and responsive sizes. Use
`focus: "60% 40%"` to control cropping. Licensed stock images must use `kind: "stock"` with a `credit` —
they are labelled "Illustrative" on the page and must never be described as Canary's work.
