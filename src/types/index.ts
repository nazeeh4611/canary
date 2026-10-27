/** The architectural drawing used when no photograph has been supplied yet. */
export type DrawingMotif =
  | "living-perspective"
  | "apartment-plan"
  | "villa-elevation"
  | "joinery-elevation"
  | "kitchen-elevation"
  | "arch-stair"
  | "office-plan"
  | "clinic-plan"
  | "pool-plan"
  | "material-stone"
  | "material-timber"
  | "detail-section";

/**
 * A visual slot. `kind` keeps provenance explicit so stock imagery is never
 * presented as completed Canary work:
 *  - "canary":  photograph of a real Canary project (rights confirmed)
 *  - "stock":   licensed stock image — must carry `credit`, never captioned as Canary work
 *  - "drawing": generated architectural drawing, used until photography is supplied
 */
export type Media =
  | {
      kind: "canary" | "stock";
      src: string;
      alt: string;
      width: number;
      height: number;
      credit?: string;
      /** CSS object-position for art-directed cropping, e.g. "30% 50%". */
      focus?: string;
      /** Drawing shown if the photograph fails to load. */
      fallback?: DrawingMotif;
      /** Licence / source page for stock images. */
      sourceUrl?: string;
    }
  | {
      kind: "drawing";
      motif: DrawingMotif;
      alt: string;
      tone?: "stone" | "ivory" | "olive" | "charcoal";
    };

export type ProjectCategory =
  | "Villa"
  | "Apartment"
  | "Penthouse"
  | "Townhouse"
  | "Office"
  | "Retail"
  | "Salon"
  | "Hospitality"
  | "Clinic"
  | "Landscape";

export type Project = {
  slug: string;
  title: string;
  category: ProjectCategory;
  sector: "Residential" | "Commercial";
  /** Only set when verified with the client. */
  location?: string;
  year?: string;
  summary: string;
  scope: string[];
  concept?: string;
  materials?: { name: string; note?: string; swatch: string }[];
  cover: Media;
  gallery: Media[];
  services: string[]; // service slugs
  /**
   * true = illustrative sample entry awaiting real project information.
   * Sample entries are labelled on-page, excluded from the sitemap and set to noindex.
   */
  placeholder: boolean;
};

export type FAQ = { q: string; a: string };

export type Service = {
  slug: string;
  name: string;
  /** Short label used in navigation, forms and WhatsApp messages. */
  shortName: string;
  group: "Residential" | "Commercial" | "Studio";
  index: string; // editorial numbering, e.g. "01"
  lede: string;
  summary: string;
  intro: string[];
  includes: string[];
  forWhom: { title: string; text: string }[];
  approach: { title: string; text: string }[];
  emphasis: string; // a pull-quote style statement unique to the service
  faqs: FAQ[];
  related: string[];
  cover: Media;
  seo: { title: string; description: string; keywords: string[] };
};

export type Testimonial = {
  quote: string;
  name: string;
  context?: string;
  sourceUrl?: string;
};

/** A photograph (Canary or licensed stock). */
export type PhotoMedia = Extract<Media, { kind: "canary" | "stock" }>;
