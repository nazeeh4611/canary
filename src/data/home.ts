import type { Media } from "@/types";
import { photos } from "./photos";

/**
 * Homepage content that is likely to change.
 * Hero image. Currently an illustrative stock photo — replace with a Canary project photo, e.g.
 * { kind: "canary", src: "/images/hero.jpg", alt: "...", width: 2400, height: 3000, focus: "60% 50%" }
 */
export const heroMedia: Media = { ...photos.livingLight, focus: "50% 60%" };

export const heroCaption = { sheet: "A-01", title: "Illustrative · Living room" };

export const principles = [
  {
    n: "1",
    title: "Start with the people",
    text: "How you live or run your business shapes the brief before any finish is chosen.",
  },
  {
    n: "2",
    title: "Design for real use",
    text: "Circulation, storage, cleaning and daily routines are planned, not left to chance.",
  },
  {
    n: "3",
    title: "Choose materials with intent",
    text: "A small, deliberate palette — selected for how it looks, wears and ages.",
  },
  {
    n: "4",
    title: "Draw the details",
    text: "Edges, junctions and transitions are resolved on paper before they reach site.",
  },
  {
    n: "5",
    title: "Execute with care",
    text: "Joinery, finishes and fixing are carried out to the standard the design asks for.",
  },
  {
    n: "6",
    title: "Keep design and delivery together",
    text: "One team across design, renovation, fit-out and joinery, so intent isn't lost in handover.",
  },
] as const;

/** A typical starting palette. Shown as material references, not as a specific project. */
export const palette = [
  { name: "Honed limestone", use: "Floors, thresholds, vanity tops", swatch: "#CFC6B6", texture: "material-stone" as const },
  { name: "Natural oak", use: "Joinery, doors, stair treads", swatch: "#B58E63", texture: "material-timber" as const },
  { name: "Lime plaster", use: "Walls with depth and softness", swatch: "#E9E2D6" },
  { name: "Aged bronze", use: "Handles, trims, light fittings", swatch: "#7A5E3E" },
  { name: "Woven linen", use: "Curtains, upholstery, wall fabric", swatch: "#DDD3C2" },
  { name: "Olive", use: "An accent drawn from planting", swatch: "#6B6F5B" },
];
