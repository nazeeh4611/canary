import type { Project } from "@/types";
import { photos } from "./photos";

/**
 * PORTFOLIO DATA
 *
 * Images on sample entries are licensed, illustrative stock photographs
 * (see ./photos.ts) and are labelled "Illustrative photo" on the page.
 *
 * No verified project information was available when this site was built, so
 * every entry below is an illustrative SAMPLE (`placeholder: true`):
 *  - shown with a "Sample entry" label,
 *  - excluded from the sitemap,
 *  - served with `noindex`.
 *
 * To publish a real project: replace the text, set `cover`/`gallery` to
 * `{ kind: "canary", src: "/images/projects/<slug>/01.jpg", ... }`, add a
 * verified `location` only if the client agrees, and set `placeholder: false`.
 * Never add budgets, durations, dates or client names that aren't confirmed.
 */

const stone = "#CFC6B6";
const oak = "#B58E63";
const plaster = "#ECE6DC";
const bronze = "#7A5E3E";
const olive = "#737763";
const charcoal = "#2B2B27";
const travertine = "#D9CBB2";
const linen = "#E4DCCD";

export const projects: Project[] = [
  {
    slug: "villa-interior",
    title: "Villa Interior",
    category: "Villa",
    sector: "Residential",
    summary:
      "A sample entry showing how a whole-villa project will be presented: the brief, the planning moves and the materials that tie the house together.",
    scope: ["Space planning", "Interior design", "Bespoke joinery", "Fit-out"],
    concept:
      "This is where the design idea will be described in two or three sentences — for example, how one stone and one timber were carried from the entrance through to the family rooms, or how the majlis was planned for both formal and everyday use.",
    materials: [
      { name: "Honed limestone", swatch: stone },
      { name: "Natural oak", swatch: oak },
      { name: "Lime plaster", swatch: plaster },
      { name: "Bronze detail", swatch: bronze },
    ],
    cover: photos.villaPool,
    gallery: [photos.livingModern, photos.kitchenIsland, photos.bathroomMarble, photos.wardrobeTimber],
    services: ["villa-interiors", "interior-design", "joinery", "interior-fit-out"],
    placeholder: true,
  },
  {
    slug: "apartment-interior",
    title: "Apartment Interior",
    category: "Apartment",
    sector: "Residential",
    summary:
      "A sample entry for an apartment project — layout changes, integrated storage and a lighter palette to carry daylight further into the plan.",
    scope: ["Layout reworking", "Kitchen design", "Fitted storage", "Renovation"],
    concept:
      "Describe the main planning move here — for example, opening the kitchen to the living space, or turning a corridor into a wall of storage.",
    materials: [
      { name: "White oak", swatch: oak },
      { name: "Warm white plaster", swatch: plaster },
      { name: "Linen", swatch: linen },
    ],
    cover: photos.livingView,
    gallery: [photos.bedroomMinimal, photos.kitchenIsland, photos.bathroomStone],
    services: ["apartment-interiors", "renovation", "joinery"],
    placeholder: true,
  },
  {
    slug: "penthouse-interior",
    title: "Penthouse Interior",
    category: "Penthouse",
    sector: "Residential",
    summary:
      "A sample entry for a penthouse — framing views, connecting the terrace and resolving a larger open plan.",
    scope: ["Interior design", "Lighting design", "Joinery", "Terrace design"],
    materials: [
      { name: "Travertine", swatch: travertine },
      { name: "Smoked oak", swatch: bronze },
      { name: "Charcoal metal", swatch: charcoal },
    ],
    cover: photos.livingTimber,
    gallery: [photos.bedroomMinimal, photos.bathroomMarble],
    services: ["apartment-interiors", "interior-design"],
    placeholder: true,
  },
  {
    slug: "office-fit-out",
    title: "Office Fit-Out",
    category: "Office",
    sector: "Commercial",
    summary:
      "A sample entry for a workplace — reception, open workspace and meeting rooms planned around how the team works.",
    scope: ["Space planning", "Commercial interior design", "Fit-out", "Reception joinery"],
    materials: [
      { name: "Oak veneer", swatch: oak },
      { name: "Olive textile", swatch: olive },
      { name: "Warm grey", swatch: stone },
    ],
    cover: photos.officeOpen,
    gallery: [photos.officeWorkspace, photos.officeExecutive],
    services: ["commercial-interiors", "interior-fit-out", "architecture-space-planning"],
    placeholder: true,
  },
  {
    slug: "clinic-interior",
    title: "Clinic Interior",
    category: "Clinic",
    sector: "Commercial",
    summary:
      "A sample entry for a clinic — patient flow from reception to treatment rooms, with calm, practical finishes.",
    scope: ["Workflow planning", "Interior design", "Fit-out"],
    materials: [
      { name: "Soft white", swatch: plaster },
      { name: "Pale oak", swatch: travertine },
      { name: "Sage", swatch: olive },
    ],
    cover: photos.clinicReception,
    gallery: [photos.clinicInterior],
    services: ["clinic-interiors", "commercial-interiors", "interior-fit-out"],
    placeholder: true,
  },
  {
    slug: "villa-garden-pool",
    title: "Villa Garden & Pool",
    category: "Landscape",
    sector: "Residential",
    summary:
      "A sample entry for an outdoor project — pool, shaded terrace and planting designed as an extension of the house.",
    scope: ["Landscape design", "Pool design", "Outdoor lighting"],
    materials: [
      { name: "Sandstone paving", swatch: travertine },
      { name: "Teak", swatch: oak },
      { name: "Olive planting", swatch: olive },
    ],
    cover: photos.villaInfinity,
    gallery: [photos.villaEvening, photos.villaPool],
    services: ["pool-landscaping", "villa-interiors"],
    placeholder: true,
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}

export function projectsForService(serviceSlug: string) {
  return projects.filter((p) => p.services.includes(serviceSlug));
}

export function relatedProjects(project: Project, limit = 3) {
  return projects
    .filter((p) => p.slug !== project.slug)
    .sort((a, b) => Number(b.sector === project.sector) - Number(a.sector === project.sector))
    .slice(0, limit);
}

export const hasRealProjects = projects.some((p) => !p.placeholder);
