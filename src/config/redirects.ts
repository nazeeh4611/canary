/**
 * Permanent redirects from the previous canaryinterior.ae site.
 *
 * `verified: true`  — URL confirmed to exist on the old site (seen in search results).
 * `verified: false` — likely URL based on the old site's navigation labels; confirm
 *                     against Google Search Console / the old sitemap before launch
 *                     and add any other indexed URLs here. Unused entries are harmless.
 */
export const legacyRedirects: { source: string; destination: string; verified: boolean }[] = [
  { source: "/about-company", destination: "/about", verified: true },
  { source: "/contact-us", destination: "/contact", verified: true },
  { source: "/villas", destination: "/services/villa-interiors", verified: false },
  { source: "/villa", destination: "/services/villa-interiors", verified: false },
  { source: "/apartments", destination: "/services/apartment-interiors", verified: false },
  { source: "/apartment", destination: "/services/apartment-interiors", verified: false },
  { source: "/penthouse", destination: "/services/apartment-interiors", verified: false },
  { source: "/penthouses", destination: "/services/apartment-interiors", verified: false },
  { source: "/pool-and-landscaping", destination: "/services/pool-landscaping", verified: false },
  { source: "/pool-landscaping", destination: "/services/pool-landscaping", verified: false },
  { source: "/hospitality", destination: "/services/commercial-interiors", verified: false },
  { source: "/offices", destination: "/services/commercial-interiors", verified: false },
  { source: "/office", destination: "/services/commercial-interiors", verified: false },
  { source: "/salons", destination: "/services/commercial-interiors", verified: false },
  { source: "/salon", destination: "/services/commercial-interiors", verified: false },
  { source: "/shops", destination: "/services/commercial-interiors", verified: false },
  { source: "/shop", destination: "/services/commercial-interiors", verified: false },
  { source: "/clinics", destination: "/services/clinic-interiors", verified: false },
  { source: "/clinic", destination: "/services/clinic-interiors", verified: false },
  { source: "/residential", destination: "/services", verified: false },
  { source: "/commercial", destination: "/services/commercial-interiors", verified: false },
  { source: "/portfolio", destination: "/projects", verified: false },
  { source: "/gallery", destination: "/projects", verified: false },
];
