import type { FAQ } from "@/types";

/** General FAQs used on the Process and Contact pages. Avoid promises the business hasn't confirmed. */
export const generalFaqs: FAQ[] = [
  {
    q: "Where is Canary based?",
    a: "Our studio is at S134, Ajman Industrial 2, Ajman, and we take on projects across the UAE.",
  },
  {
    q: "What should I prepare before getting in touch?",
    a: "Whatever you have: the property type and location, rough size, photos or floor plans, a few images of spaces you like, your timeline and an idea of budget. None of it is required to start the conversation.",
  },
  {
    q: "Do you work on both homes and businesses?",
    a: "Yes. Residential work includes villas, apartments, penthouses, townhouses, pools and landscaping. Commercial work includes offices, shops, salons, hospitality spaces and clinics.",
  },
  {
    q: "Can you take a project from design through to completion?",
    a: "Canary works across design, renovation, fit-out and joinery, so a project can run from first concept to finished space. The exact scope is agreed for each project.",
  },
  {
    q: "How long does a project take?",
    a: "It depends on size, scope and how quickly decisions are made. We'll give you a realistic picture once we understand the project.",
  },
];

export const processStages = [
  {
    n: "01",
    title: "Discovery",
    text: "We learn about the space, how you'll use it, your preferences, your timeline and your budget. A site visit or shared photos and plans help us understand what's there.",
    outcome: "A shared understanding of the brief.",
  },
  {
    n: "02",
    title: "Concept",
    text: "We develop the design direction — the layout, the overall feel and an initial palette of materials — and walk you through it.",
    outcome: "A direction you can respond to.",
  },
  {
    n: "03",
    title: "Design Development",
    text: "The approved concept is refined into layouts, finishes, joinery details and specifications, as applicable to the scope.",
    outcome: "A design that can be priced and built.",
  },
  {
    n: "04",
    title: "Execution",
    text: "The approved work is coordinated and carried out according to the agreed scope, with you kept informed as the space takes shape.",
    outcome: "The design, built.",
  },
  {
    n: "05",
    title: "Handover",
    text: "We review the completed scope with you and address outstanding items according to the project agreement.",
    outcome: "A finished space, ready to use.",
  },
] as const;
