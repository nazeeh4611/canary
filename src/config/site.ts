/**
 * Central business configuration.
 *
 * Every fact here should match the Google Business Profile exactly.
 * Items marked `null` or `confirmed: false` are NOT rendered publicly
 * until the business verifies them — see docs/CONTENT-CHECKLIST.md.
 */

const rawSiteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.canaryinterior.ae";

export const site = {
  name: "Canary Interior Design",
  shortName: "Canary",
  legalName: null as string | null, // trade licence name — to be confirmed
  url: rawSiteUrl.replace(/\/$/, ""),
  locale: "en_AE",
  description:
    "Canary Interior Design is an Ajman-based interior design, renovation and fit-out studio working on villas, apartments and commercial spaces across the UAE.",

  phone: {
    display: "+971 52 771 8853",
    e164: "+971527718853",
  },
  /** Digits only, no plus — the format wa.me expects. */
  whatsapp: "971527718853",
  email: "info.canaryid@gmail.com",

  address: {
    street: "S134, Ajman Industrial 2",
    locality: "Ajman",
    region: "Ajman",
    country: "United Arab Emirates",
    countryCode: "AE",
    postalCode: null as string | null,
  },

  /** Opens Google Maps search for the studio. Replace with the GBP share link once available. */
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=" +
    encodeURIComponent("Canary Interior Design, S134 Ajman Industrial 2, Ajman, UAE"),

  /** Unverified — leave null until the business confirms hours that match Google. */
  openingHours: null as null | { days: string; hours: string }[],

  social: {
    instagram: "https://www.instagram.com/canaryrenovationdesign/",
  },

  /**
   * Service area. Ajman is the confirmed base; Canary's own Instagram describes
   * work "across the UAE". Individual emirates are only named publicly once
   * `confirmed` is set to true by the business.
   */
  serviceArea: {
    base: "Ajman",
    summary: "Studio in Ajman. Projects across the UAE.",
    emirates: [
      { name: "Ajman", confirmed: true },
      { name: "Sharjah", confirmed: false },
      { name: "Dubai", confirmed: false },
      { name: "Umm Al Quwain", confirmed: false },
      { name: "Ras Al Khaimah", confirmed: false },
      { name: "Abu Dhabi", confirmed: false },
    ],
  },

  /** Offers that must be confirmed before they may appear in copy. */
  offers: {
    freeConsultation: false,
    freeQuotation: false,
  },
} as const;

export const confirmedEmirates = site.serviceArea.emirates.filter((e) => e.confirmed).map((e) => e.name);

export const DEFAULT_WHATSAPP_MESSAGE =
  "Hello Canary Interior Design, I would like to discuss an interior design project.";

/** Build a wa.me link. Only pass non-sensitive context (e.g. a service name). */
export function whatsappUrl(context?: string): string {
  const article = context && /^[aeiou]/i.test(context) ? "an" : "a";
  const text = context
    ? `Hello Canary Interior Design, I would like to discuss ${article} ${context} project.`
    : DEFAULT_WHATSAPP_MESSAGE;
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`;
}

export const telUrl = `tel:${site.phone.e164}`;
export const mailUrl = `mailto:${site.email}`;

export const mainNav = [
  { href: "/projects", label: "Projects" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/process", label: "Process" },
  { href: "/guides", label: "Guides" },
  { href: "/contact", label: "Contact" },
] as const;

export function absoluteUrl(path = "/"): string {
  return `${site.url}${path.startsWith("/") ? path : `/${path}`}`;
}
