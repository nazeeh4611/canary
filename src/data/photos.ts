import type { DrawingMotif, PhotoMedia } from "@/types";

/**
 * Licensed stock photography (Pexels License — free for commercial use,
 * attribution not required but given). These are ILLUSTRATIVE images, not
 * Canary projects: they're labelled as such wherever they could be mistaken
 * for completed work. Replace with Canary's own photographs as they become
 * available (see docs/CONTENT-CHECKLIST.md).
 *
 * Each photo falls back to an architectural drawing if it fails to load.
 */
function pexels(id: number, alt: string, credit: string, fallback: DrawingMotif, focus?: string): PhotoMedia {
  return {
    kind: "stock",
    src: `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg`,
    alt,
    width: 2400,
    height: 1600,
    credit: `${credit} / Pexels`,
    fallback,
    focus,
    sourceUrl: `https://www.pexels.com/photo/${id}/`,
  };
}

export const photos = {
  livingLight: pexels(5793547, "Light-filled modern living room with soft seating and large windows", "Mariette de Villiers", "living-perspective"),
  livingModern: pexels(7851904, "Contemporary living room with a low sofa, neutral palette and layered lighting", "Gabriela Pons", "living-perspective"),
  livingView: pexels(6035357, "Modern apartment living room with natural light and simple furniture", "Curtis Adams", "apartment-plan"),
  livingTimber: pexels(3952034, "Open living space with a wooden floor and a comfortable modern sofa", "Stephen Leonardi", "living-perspective"),
  villaPool: pexels(34378030, "Contemporary villa with clean lines, a calm swimming pool and landscaped garden", "Pexels contributor", "villa-elevation"),
  villaInfinity: pexels(31817156, "Modern villa in glass and stone with an infinity pool", "Ahmet Çötür", "pool-plan"),
  villaEvening: pexels(26859048, "Villa and swimming pool lit at dusk", "Pexels contributor", "pool-plan"),
  kitchenIsland: pexels(7031213, "Modern kitchen with a central island, timber and stone finishes", "Max Vakhtbovych", "kitchen-elevation"),
  bedroomMinimal: pexels(28536695, "Minimalist white bedroom with soft bedding and natural light", "Aljona Ovtšinnikova", "apartment-plan"),
  bathroomMarble: pexels(16249146, "Modern bathroom in white marble with a freestanding bath and glass shower", "Curtis Adams", "detail-section"),
  bathroomStone: pexels(7534538, "Bathroom with marble walls, vessel basin and daylight through louvres", "Max Vakhtbovych", "detail-section"),
  wardrobeTimber: pexels(6585617, "Built-in wardrobe with open timber shelving and hanging space", "Max Vakhtbovych", "joinery-elevation"),
  officeOpen: pexels(36631699, "Spacious open-plan office interior", "Pexels contributor", "office-plan"),
  officeWorkspace: pexels(7046156, "Modern workspace with timber furniture and pendant lights", "Pexels contributor", "office-plan"),
  officeExecutive: pexels(33827312, "Office with executive chairs and a meeting table", "Pexels contributor", "office-plan"),
  clinicReception: pexels(33812025, "Modern medical reception with timber panelling and warm lighting", "Jinshu Pulpatta", "clinic-plan"),
  clinicInterior: pexels(7108324, "Bright clinic interior in white and teal", "Pavel Danilyuk", "clinic-plan"),
  salon: pexels(7750099, "Beauty salon interior with styling stations and mirrors", "Max Vakhtbovych", "office-plan"),
  restaurant: pexels(4450334, "Contemporary restaurant with large windows, armchairs and greenery", "Ksenia Chernaya", "living-perspective"),
  blueprints: pexels(34573691, "Architectural plans and drawings spread across a desk", "Marina Zvada", "apartment-plan"),
  renovation: pexels(15798784, "Sunlit room under renovation with materials and tools", "Francesco Ungaro", "detail-section"),
  renovationMajor: pexels(15798781, "Home renovation in progress with exposed walls", "Francesco Ungaro", "detail-section"),
} satisfies Record<string, PhotoMedia>;
