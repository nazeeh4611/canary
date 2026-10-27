import { absoluteUrl, confirmedEmirates, site } from "@/config/site";
import type { FAQ, Service } from "@/types";

/**
 * JSON-LD builders. Only verified business information is included —
 * no ratings, review counts, geo coordinates or opening hours until confirmed.
 */

const orgId = absoluteUrl("/#organization");

export function organizationSchema() {
  const business: Record<string, unknown> = {
    "@type": "HomeAndConstructionBusiness",
    "@id": orgId,
    name: site.name,
    url: site.url,
    description: site.description,
    telephone: site.phone.e164,
    email: site.email,
    image: absoluteUrl("/opengraph-image"),
    logo: absoluteUrl("/icon.svg"),
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      addressLocality: site.address.locality,
      addressRegion: site.address.region,
      addressCountry: site.address.countryCode,
      ...(site.address.postalCode ? { postalCode: site.address.postalCode } : {}),
    },
    areaServed: [
      ...confirmedEmirates.map((name) => ({ "@type": "City", name })),
      { "@type": "Country", name: "United Arab Emirates" },
    ],
    hasMap: site.mapsUrl,
    sameAs: [site.social.instagram],
  };

  if (site.openingHours) {
    business.openingHours = site.openingHours.map((h) => `${h.days} ${h.hours}`);
  }

  return {
    "@context": "https://schema.org",
    "@graph": [
      business,
      {
        "@type": "WebSite",
        "@id": absoluteUrl("/#website"),
        url: site.url,
        name: site.name,
        publisher: { "@id": orgId },
        inLanguage: "en",
      },
    ],
  };
}

export function webPageSchema({ name, description, path }: { name: string; description: string; path: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": absoluteUrl(path),
    url: absoluteUrl(path),
    name,
    description,
    isPartOf: { "@id": absoluteUrl("/#website") },
    about: { "@id": orgId },
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function serviceSchema(service: Service) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    serviceType: service.name,
    description: service.summary,
    url: absoluteUrl(`/services/${service.slug}`),
    provider: { "@id": orgId },
    areaServed: { "@type": "Country", name: "United Arab Emirates" },
  };
}

export function faqSchema(faqs: FAQ[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function articleSchema(a: { title: string; description: string; path: string; image: string; published: string; updated: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: a.title,
    description: a.description,
    image: [a.image],
    datePublished: a.published,
    dateModified: a.updated,
    mainEntityOfPage: absoluteUrl(a.path),
    author: { "@id": orgId },
    publisher: { "@id": orgId },
    inLanguage: "en",
  };
}

/** ItemList for index pages (services, projects, guides) — helps search engines understand the collection. */
export function itemListSchema(name: string, items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name,
    itemListElement: items.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.name, url: absoluteUrl(it.path) })),
  };
}
