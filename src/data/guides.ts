import type { FAQ, PhotoMedia } from "@/types";
import { photos } from "./photos";

/**
 * Guides — evergreen, practical articles that answer the questions people
 * search for before hiring an interior designer. They target informational
 * queries the service pages can't, and link into the relevant services.
 *
 * Editorial rule: general professional guidance only. No invented prices,
 * statistics or regulatory specifics — where rules apply, tell readers who
 * to check with.
 */
export type GuideSection = { h: string; paras: string[]; list?: string[] };

export type Guide = {
  slug: string;
  title: string;
  /** <title> tag — keep ≤ 37 characters so the full title shows with the brand suffix. */
  seoTitle: string;
  description: string;
  excerpt: string;
  published: string; // ISO date
  updated: string;
  readingMinutes: number;
  cover: PhotoMedia;
  services: string[];
  sections: GuideSection[];
  faqs: FAQ[];
};

export const guides: Guide[] = [
  {
    slug: "villa-renovation-planning-guide",
    title: "How to Plan a Villa Renovation in the UAE",
    seoTitle: "Villa Renovation Planning Guide",
    description:
      "A practical, step-by-step guide to planning a villa renovation in Ajman and the UAE — brief, survey, design decisions, approvals, phasing and handover.",
    excerpt: "The order you make decisions in matters more than almost anything else. A step-by-step approach to renovating a villa without the usual surprises.",
    published: "2026-10-27",
    updated: "2026-10-27",
    readingMinutes: 7,
    cover: photos.villaPool,
    services: ["villa-interiors", "renovation", "joinery"],
    sections: [
      {
        h: "1. Start with how the house is used, not how it looks",
        paras: [
          "Before collecting images of finishes, write down how the household actually uses the villa today and what isn't working. Where do people gather? Which rooms go unused? Where does clutter collect? How are guests received, and how often?",
          "This brief is what separates a renovation that feels transformed from one that simply looks newer. It also tells your designer which walls, rooms and services are worth changing — and which aren't.",
        ],
        list: [
          "Who lives in the house now, and who will in five years?",
          "Which rooms need to work for guests, and which are strictly private?",
          "What storage is missing, and where?",
          "Are there accessibility needs — for elderly parents, for example?",
          "Which outdoor areas could be used more if they were shaded or better lit?",
        ],
      },
      {
        h: "2. Survey what's already there",
        paras: [
          "A proper survey records dimensions, levels, existing services and the condition of finishes. It's the point where you learn what's easy to change and what's expensive — moving a wet area, for instance, is a very different job from replacing a floor.",
          "If you have the original drawings from the developer or a previous contractor, find them now. They save time and reduce guesswork.",
        ],
      },
      {
        h: "3. Agree a budget range — and a contingency",
        paras: [
          "Share an honest budget range early. It lets your designer recommend where money makes the biggest difference and where a simpler specification is perfectly fine.",
          "Existing buildings hide things. Keep a contingency for what's discovered once work begins, and decide in advance how decisions on unexpected items will be made.",
        ],
      },
      {
        h: "4. Make the decisions before the work starts",
        paras: [
          "Most renovation delays come from late decisions: a tile chosen after the screed is laid, joinery drawn after the walls are closed, lighting positions agreed after the ceiling is up. Settle layouts, finishes, joinery and lighting during design — not on site.",
        ],
        list: [
          "Final layouts, including furniture",
          "Floor, wall and ceiling finishes",
          "Joinery drawings: wardrobes, kitchen, vanities, feature walls",
          "Lighting and socket positions",
          "Sanitaryware, ironmongery and fittings",
        ],
      },
      {
        h: "5. Check what approvals apply",
        paras: [
          "Depending on the scope, works may need approval from your community or developer, building management, or the relevant municipal authority. Structural changes, façade alterations and work on shared services are the usual triggers. Ask early — approval timelines affect your programme.",
        ],
      },
      {
        h: "6. Plan the phasing — especially if you're living there",
        paras: [
          "If the family stays in the villa, the work needs to be sequenced so that a kitchen, at least one bathroom and the bedrooms remain usable. Dust and noise control, working hours and safe access all need planning. Sometimes moving out for the heaviest phase is quicker and cheaper overall.",
          "Outdoor works such as pool and landscaping are often best timed for the cooler months, both for the people doing the work and for planting.",
        ],
      },
      {
        h: "7. Close out properly",
        paras: [
          "At handover, walk the completed scope with your designer or contractor, list any outstanding items, and collect warranties, manuals and finish details (paint colours, tile references) for future maintenance.",
        ],
      },
    ],
    faqs: [
      {
        q: "How long does a villa renovation take?",
        a: "It depends on scope, approvals and how quickly decisions are made. A kitchen or bathroom refresh is a very different project from a whole-villa renovation. A designer can give you a realistic programme once the scope is clear.",
      },
      {
        q: "Should I renovate the whole villa at once or in phases?",
        a: "Doing everything at once is usually more efficient, but phasing can work well if you plan the whole house first, so each phase fits the overall design.",
      },
    ],
  },
  {
    slug: "interior-design-vs-fit-out",
    title: "Interior Design vs Fit-Out: What's the Difference?",
    seoTitle: "Interior Design vs Fit-Out Explained",
    description:
      "What interior design covers, what fit-out covers, how shell-and-core, Category A and Category B fit-outs differ, and when you need one team for both.",
    excerpt: "Two terms used interchangeably — and they shouldn't be. What each covers, and why it matters when you're comparing quotes.",
    published: "2026-10-27",
    updated: "2026-10-27",
    readingMinutes: 5,
    cover: photos.officeExecutive,
    services: ["interior-design", "interior-fit-out", "commercial-interiors"],
    sections: [
      {
        h: "Interior design: deciding what the space should be",
        paras: [
          "Interior design is the work of deciding how a space is planned and how it looks and feels: layouts, circulation, materials, lighting, joinery and furniture. Its output is a set of decisions and drawings that describe the finished space.",
        ],
      },
      {
        h: "Fit-out: building it",
        paras: [
          "Fit-out is the physical work of making an interior ready to use: partitions, ceilings, flooring, finishes, joinery, doors and the coordination of services such as lighting and power. Its output is the finished space.",
        ],
      },
      {
        h: "Shell and core, Category A and Category B",
        paras: [
          "These terms are common in commercial property, and you'll see them in leases and quotes:",
        ],
        list: [
          "Shell and core — the base building: structure, envelope, shared services and common areas, with the tenant space left largely bare.",
          "Category A — a basic, usable finish: typically raised floors or screed, suspended ceilings, basic lighting and services, ready for a tenant to customise.",
          "Category B — the tenant's own fit-out: partitions, meeting rooms, reception, kitchen areas, branded finishes and furniture.",
        ],
      },
      {
        h: "Why the distinction matters when comparing quotes",
        paras: [
          "A fit-out quote prices what's drawn. If the design is incomplete, the quote will be too — and the gaps come back later as variations. Before comparing quotes, make sure every contractor is pricing the same drawings and specification.",
        ],
      },
      {
        h: "When one team for both makes sense",
        paras: [
          "When the same team designs and builds, the people who understand the design intent are on site, and buildability questions are resolved during design rather than during construction. It also gives you one point of responsibility.",
          "Separating design and fit-out can still work well, especially on large projects — but it needs complete drawings and clear responsibility for coordination.",
        ],
      },
    ],
    faqs: [
      {
        q: "Can I hire a fit-out contractor without a designer?",
        a: "For a simple refresh, perhaps. For anything involving layout changes, joinery or lighting, design decisions still have to be made — the question is whether they're made deliberately on paper or improvised on site.",
      },
      {
        q: "Does Canary do both?",
        a: "Yes. Canary works across interior design, fit-out, renovation and joinery, so a project can run from design through to a finished space.",
      },
    ],
  },
  {
    slug: "apartment-space-planning-ideas",
    title: "Space Planning Ideas for UAE Apartments",
    seoTitle: "Apartment Space Planning Ideas",
    description:
      "Practical space planning ideas for apartments — storage walls, kitchens, lighting and layout changes — plus what to check with building management before you start.",
    excerpt: "In an apartment, good design is mostly invisible. Ideas for storage, light and layout that make a standard plan work harder.",
    published: "2026-10-27",
    updated: "2026-10-27",
    readingMinutes: 6,
    cover: photos.livingView,
    services: ["apartment-interiors", "joinery", "architecture-space-planning"],
    sections: [
      {
        h: "Treat storage as architecture",
        paras: [
          "The most effective apartment upgrade is often a full-height storage wall. Built from floor to ceiling and wall to wall, it reads as a single calm surface rather than a collection of furniture — and holds far more than freestanding cabinets.",
        ],
        list: [
          "Corridors: shallow cabinets along one side can absorb everyday clutter",
          "Entrance: a closed unit for shoes, bags and keys keeps the living area clear",
          "Bedrooms: full-height wardrobes with integrated lighting",
          "Living room: a media wall that hides cables, routers and storage",
        ],
      },
      {
        h: "Plan the kitchen around how you cook",
        paras: [
          "Open kitchens make an apartment feel larger, but they need more discipline: integrated appliances, enough closed storage, and good extraction. If you cook often, a partially enclosed kitchen with a glazed screen can be a good compromise.",
        ],
      },
      {
        h: "Carry daylight further into the plan",
        paras: [
          "Lighter floor and wall finishes, glazed internal doors or screens, and mirrors placed to reflect windows all help daylight travel deeper. Layered artificial lighting — ambient, task and accent — then makes the space work in the evening.",
        ],
      },
      {
        h: "Use zones rather than walls",
        paras: [
          "Rugs, ceiling changes, lighting and joinery can define dining, living and working zones without closing the plan. This keeps sightlines long, which is what makes a small space feel generous.",
        ],
      },
      {
        h: "Check with building management first",
        paras: [
          "Apartment buildings usually have rules on permitted works, working hours, deliveries and noise, and may require approval and deposits before work starts. Some changes — to structure, façades, or shared services — are often restricted. Get the building's fit-out guidelines before finalising the design.",
        ],
      },
    ],
    faqs: [
      {
        q: "Can I remove a wall in my apartment?",
        a: "Sometimes. It depends on whether the wall is structural or carries services, and on your building's rules. Your building management and, where required, a structural engineer need to confirm it.",
      },
      {
        q: "What makes the biggest difference in a small apartment?",
        a: "Usually integrated storage and better lighting. Both make the space calmer and easier to live in without changing the layout.",
      },
    ],
  },
  {
    slug: "clinic-interior-design-checklist",
    title: "Planning a Clinic Interior: A Layout Checklist",
    seoTitle: "Clinic Interior Design Checklist",
    description:
      "A practical checklist for planning a clinic interior: patient flow, reception, treatment rooms, finishes, lighting, accessibility and licensing.",
    excerpt: "A clinic layout should be understood without signage. A checklist of what to resolve before you design a single room.",
    published: "2026-10-27",
    updated: "2026-10-27",
    readingMinutes: 6,
    cover: photos.clinicReception,
    services: ["clinic-interiors", "commercial-interiors", "interior-fit-out"],
    sections: [
      {
        h: "Map the patient journey",
        paras: [
          "Walk through a typical visit from the front door to departure: arrival, registration, waiting, consultation, treatment, payment and exit. The layout should make each step obvious, with as little backtracking as possible.",
        ],
      },
      {
        h: "Separate patient and staff routes where you can",
        paras: [
          "Staff need to move between rooms, storage and support areas without crossing through waiting patients. Even in a small unit, a simple back-of-house route makes the clinic calmer and more efficient.",
        ],
      },
      {
        h: "Reception and waiting",
        paras: ["Reception sets the tone. Plan it for both privacy and visibility:"],
        list: [
          "Clear sightlines from reception to the entrance and waiting area",
          "A counter height and layout that allows private conversations",
          "Seating with a mix of options, including for less mobile patients",
          "Durable, cleanable upholstery and finishes",
        ],
      },
      {
        h: "Treatment and consultation rooms",
        paras: [
          "Room requirements depend heavily on clinic type. Confirm the equipment, clearances, handwashing, storage and privacy needs for each room with your clinical team before the layout is fixed.",
        ],
      },
      {
        h: "Finishes and lighting",
        paras: [
          "Choose finishes that can be cleaned easily and repeatedly without looking clinical. Warm timber tones, soft lighting in waiting areas and good, even task lighting in treatment rooms help balance reassurance with function.",
        ],
      },
      {
        h: "Accessibility",
        paras: [
          "Plan for wheelchair access, door widths, turning spaces and accessible toilets from the start. These are much harder to add later.",
        ],
      },
      {
        h: "Coordinate with licensing early",
        paras: [
          "Clinics are licensed by the health authority responsible for your emirate and facility type, and the requirements can shape room sizes and layouts. Involve your licensing adviser or consultant at the design stage so the plan accommodates what's required — rather than redesigning after a review.",
        ],
      },
    ],
    faqs: [
      {
        q: "Who confirms clinic licensing requirements?",
        a: "The health authority that licenses your facility type in your emirate. A licensing consultant can advise on the requirements that apply to your clinic.",
      },
      {
        q: "Can an existing commercial unit be converted into a clinic?",
        a: "Often, yes — but check the unit's permitted use, services capacity and accessibility before signing a lease. A test-fit layout can show whether the space works.",
      },
    ],
  },
];

export function getGuide(slug: string) {
  return guides.find((g) => g.slug === slug);
}

export function guidesForService(serviceSlug: string) {
  return guides.filter((g) => g.services.includes(serviceSlug));
}
