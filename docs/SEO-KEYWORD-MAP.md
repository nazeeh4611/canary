# SEO keyword map

Search volumes were **not** measured — no keyword tool was available while building. Validate the
primary terms in Google Keyword Planner / Search Console after launch and adjust titles if the data
disagrees. Each page owns one primary intent to avoid pages competing with each other.

| Page | Primary intent | Secondary terms | Title |
|------|----------------|-----------------|-------|
| `/` | Canary brand + interior design & fit-out studio Ajman | interior design company Ajman | Canary Interior Design \| Interior Design & Fit-Out Studio in Ajman, UAE |
| `/services/interior-design` | interior design services Ajman | interior designers Ajman | Interior Design Services in Ajman — Homes & Businesses |
| `/services/villa-interiors` | villa interior design Ajman | villa interior design UAE, villa renovation | Villa Interior Design in Ajman & the UAE |
| `/services/apartment-interiors` | apartment interior design Ajman | penthouse / townhouse interior design | Apartment & Penthouse Interior Design in Ajman |
| `/services/renovation` | home renovation Ajman | villa / apartment renovation Ajman | Home Renovation in Ajman — Villas & Apartments |
| `/services/interior-fit-out` | interior fit-out Ajman | fit-out company Ajman | Interior Fit-Out Company in Ajman |
| `/services/joinery` | custom joinery Ajman | fitted wardrobes, carpentry Ajman | Custom Joinery & Carpentry in Ajman |
| `/services/commercial-interiors` | commercial interior design Ajman | office fit-out Ajman, salon/shop interior | Commercial Interior Design & Office Fit-Out in Ajman |
| `/services/clinic-interiors` | clinic interior design Ajman | clinic fit-out UAE | Clinic Interior Design in Ajman |
| `/services/architecture-space-planning` | space planning Ajman | interior architecture UAE | Architecture & Space Planning in Ajman |
| `/services/pool-landscaping` | landscaping Ajman | pool design Ajman | Pool & Landscape Design in Ajman |
| `/projects` | interior design portfolio | — | Projects — Interior Design Portfolio |
| `/guides/villa-renovation-planning-guide` | how to plan a villa renovation UAE | villa renovation checklist | Villa Renovation Planning Guide |
| `/guides/interior-design-vs-fit-out` | interior design vs fit-out | Cat A vs Cat B fit-out | Interior Design vs Fit-Out Explained |
| `/guides/apartment-space-planning-ideas` | apartment space planning ideas | apartment storage ideas UAE | Apartment Space Planning Ideas |
| `/guides/clinic-interior-design-checklist` | clinic interior design checklist | clinic layout planning | Clinic Interior Design Checklist |
| `/contact` | interior design studio Ajman contact / NAP | directions | Contact Our Ajman Design Studio |

## Location strategy

- Ajman is the only confirmed location, so it is the only place named in titles.
- **No city landing pages were created.** Add a Sharjah or Dubai page only when (a) Canary confirms it
  serves that emirate and (b) there are real projects there to show. A location page without local
  projects is thin content.
- Once projects have verified locations, project titles carry the local signal naturally
  ("Villa Interior, Al Zahia, Sharjah").

## Technical checklist (implemented)

- Titles keyword-first and ≤ 65 characters including the brand; descriptions 50–165 characters (enforced by `npm run qa`)
- Service H1s carry the location ("Villa Interiors in Ajman & across the UAE")
- Four guides with `Article` schema; internal links guide → service and service → guide
- `ItemList` schema on the services, projects and guides indexes; `lastModified` dates in the sitemap
- Unique title, description, canonical, Open Graph and Twitter tags on every page (checked by `npm run qa`)
- JSON-LD: `HomeAndConstructionBusiness` + `WebSite` (sitewide), `WebPage`, `BreadcrumbList`,
  `Service` on service pages, `FAQPage` where FAQs are visible. No ratings, review counts, coordinates
  or hours until verified.
- `sitemap.xml` (sample projects excluded), `robots.txt`, permanent redirects from old URLs, custom 404
- `NEXT_PUBLIC_ALLOW_INDEXING=false` blocks staging; leave unset in production

## After launch

1. Verify the domain in Google Search Console (`NEXT_PUBLIC_GSC_VERIFICATION`) and submit `/sitemap.xml`.
2. Make the Google Business Profile match the site exactly: name, address, **phone**, website URL, hours.
3. Add the website URL to the Instagram bio.
4. Watch Search Console "Pages" for 404s from old URLs and add them to `src/config/redirects.ts`.
5. Each real project published is new, unique, indexable content — the single most valuable SEO action available.
