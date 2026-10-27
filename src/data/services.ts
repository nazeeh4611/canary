import type { Service } from "@/types";
import { photos } from "./photos";

/**
 * Services offered by Canary Interior Design.
 *
 * Source of the service list: canaryinterior.ae navigation (villas, apartments,
 * penthouses, pool & landscaping, hospitality, offices, salons, shops, clinics;
 * "interior design, architecture, landscaping and fit-outs") and Canary's own
 * social profiles ("Design. Renovation. Fit-Out. Joinery.").
 * Project management is NOT listed because it has not been confirmed.
 */
export const services: Service[] = [
  {
    slug: "interior-design",
    name: "Interior Design",
    shortName: "interior design",
    group: "Studio",
    index: "01",
    lede: "A complete design direction for the way a space is meant to be used.",
    summary:
      "Layouts, finishes, lighting, joinery and furniture brought together into one coherent design, for homes and commercial spaces.",
    intro: [
      "Interior design at Canary begins with the plan, not the mood board. We look at how you move through the space, where light arrives, what needs to be stored and what deserves to be seen — and only then decide on finishes.",
      "The result is a design you can build from: layouts, material selections, lighting intent and joinery details that hold together as one idea rather than a collection of individual choices.",
    ],
    includes: [
      "Briefing and site review",
      "Space planning and furniture layouts",
      "Design concept and material palette",
      "Lighting intent and ceiling design",
      "Joinery and feature-wall design",
      "Finishes, fixtures and furniture selection",
      "Drawings and visualisation, as agreed in scope",
    ],
    forWhom: [
      { title: "Homeowners", text: "Moving into, or reworking, a villa, apartment, penthouse or townhouse." },
      { title: "Business owners", text: "Shaping a workplace, shop, salon or clinic around how it actually operates." },
      { title: "Investors", text: "Preparing a property that needs to present well and last." },
    ],
    approach: [
      { title: "Listen", text: "We start with how you live or work, your timeline and an honest budget conversation." },
      { title: "Plan", text: "Circulation, zoning and storage are resolved before anything decorative." },
      { title: "Compose", text: "Materials, light and joinery are developed together so the space reads as a whole." },
      { title: "Detail", text: "Junctions, edges and transitions are drawn so they can be built well." },
    ],
    emphasis: "A beautiful room that doesn't work is not finished.",
    faqs: [
      {
        q: "Do you only design, or can you also build?",
        a: "Canary works across design, renovation, fit-out and joinery, so a project can continue from design into execution. The scope for each project is agreed with you at the start.",
      },
      {
        q: "How is the design fee worked out?",
        a: "It depends on the size of the space, the type of project and how much of the design and delivery you want us to handle. We'll explain the options once we understand your project.",
      },
      {
        q: "Can you work with furniture I already own?",
        a: "Yes. Tell us which pieces you're keeping and we'll plan around them.",
      },
    ],
    related: ["villa-interiors", "apartment-interiors", "commercial-interiors"],
    cover: photos.livingModern,
    seo: {
      title: "Interior Design Services in Ajman",
      description:
        "Residential and commercial interior design from an Ajman studio — space planning, materials, lighting and joinery developed into one buildable design.",
      keywords: ["interior design Ajman", "interior design company Ajman", "interior designers Ajman"],
    },
  },
  {
    slug: "villa-interiors",
    name: "Villa Interiors",
    shortName: "villa interior",
    group: "Residential",
    index: "02",
    lede: "Large homes that still feel like one home.",
    summary:
      "Whole-villa interiors with continuity of materials from entrance to majlis, kitchen to master suite.",
    intro: [
      "A villa is rarely one room problem — it's twenty. Formal majlis and family living, guest and private wings, staff areas, outdoor rooms. The challenge is to give each its own character while keeping the house recognisably one place.",
      "We work room by room inside a single material story, so a stone in the entrance or a timber in the stair returns where it should, and the house feels considered from every doorway.",
    ],
    includes: [
      "Whole-villa space planning, including majlis and guest areas",
      "Material continuity across floors and wings",
      "Staircases, feature walls and ceiling design",
      "Kitchens, wardrobes and bespoke joinery",
      "Bathroom and dressing room design",
      "Lighting layouts for day and evening use",
      "Coordination with pool and landscape design where required",
    ],
    forWhom: [
      { title: "New villa owners", text: "Fitting out a new build or shell-and-core villa." },
      { title: "Growing families", text: "Reworking an existing villa for how the family lives now." },
      { title: "Hosts", text: "Homes that need to receive guests formally and still be comfortable every day." },
    ],
    approach: [
      { title: "Map the house", text: "We plan public, family and private zones before any single room." },
      { title: "One palette", text: "A limited set of materials is chosen and carried through the villa." },
      { title: "Room by room", text: "Each space is then developed for its own use and light." },
      { title: "Inside to outside", text: "Terraces and garden edges are treated as part of the interior." },
    ],
    emphasis: "Scale is easy. Coherence at scale is the work.",
    faqs: [
      {
        q: "Can you design just part of a villa?",
        a: "Yes — a ground floor, a master suite or a kitchen and family area are common starting points. We'll keep future phases in mind so the house stays consistent.",
      },
      {
        q: "Do you handle the garden and pool as well?",
        a: "Canary also works on pool and landscaping, so the outdoor areas can be designed alongside the interior.",
      },
      {
        q: "Do you work on villas outside Ajman?",
        a: "Our studio is in Ajman and we take on projects across the UAE. Tell us the location when you get in touch.",
      },
    ],
    related: ["pool-landscaping", "joinery", "renovation"],
    cover: photos.villaPool,
    seo: {
      title: "Villa Interior Design in Ajman",
      description:
        "Villa interior design by Canary — whole-house planning, majlis and family living, bespoke joinery and material continuity from entrance to garden.",
      keywords: ["villa interior design Ajman", "villa interior design UAE", "villa renovation Ajman"],
    },
  },
  {
    slug: "apartment-interiors",
    name: "Apartment, Penthouse & Townhouse Interiors",
    shortName: "apartment interior",
    group: "Residential",
    index: "03",
    lede: "Every square metre given a job.",
    summary:
      "Interiors for apartments, penthouses and townhouses where planning, storage and light matter most.",
    intro: [
      "In an apartment, good design is mostly invisible: a wall of storage that reads as panelling, a kitchen that disappears when it isn't in use, a layout that pulls daylight deeper into the plan.",
      "Penthouses and townhouses bring their own questions — views to frame, terraces to connect, stairs to resolve — but the discipline is the same. Plan first, then finish.",
    ],
    includes: [
      "Layout reworking and space optimisation",
      "Integrated storage and wardrobes",
      "Kitchen design and appliance planning",
      "Lighting to extend daylight and define zones",
      "Bathroom refurbishment design",
      "Terrace and balcony treatment for penthouses",
      "Finishes suited to building-management requirements",
    ],
    forWhom: [
      { title: "Owner-occupiers", text: "Making a standard layout fit a particular household." },
      { title: "Penthouse owners", text: "Larger plans with views, terraces and double-height moments." },
      { title: "Townhouse owners", text: "Vertical homes where stairs and storage shape every floor." },
    ],
    approach: [
      { title: "Measure honestly", text: "We survey what's there, including the services you can and can't move." },
      { title: "Plan for storage", text: "Storage is designed as architecture, not added at the end." },
      { title: "Borrow light", text: "Finishes and openings are chosen to carry daylight further in." },
      { title: "Respect the building", text: "Work is planned around building rules and neighbours." },
    ],
    emphasis: "Small plans reward precision more than any other kind.",
    faqs: [
      {
        q: "Can you work within building-management rules?",
        a: "Yes. Share any building guidelines with us early; they affect working hours, permitted works and the order things happen in.",
      },
      {
        q: "Can I stay in the apartment during the work?",
        a: "It depends on the scope. Light refurbishment sometimes allows it; kitchen and bathroom work usually doesn't. We'll advise once we see the space.",
      },
    ],
    related: ["renovation", "joinery", "interior-design"],
    cover: photos.livingView,
    seo: {
      title: "Apartment Interior Design in Ajman",
      description:
        "Apartment, penthouse and townhouse interiors by Canary — smarter layouts, integrated storage, kitchens and lighting for UAE homes.",
      keywords: ["apartment interior design Ajman", "penthouse interior design UAE", "townhouse interior design"],
    },
  },
  {
    slug: "renovation",
    name: "Renovation & Refurbishment",
    shortName: "renovation",
    group: "Residential",
    index: "04",
    lede: "Keep what works. Rethink what doesn't.",
    summary:
      "Renovation of existing homes and spaces — from kitchens and bathrooms to full-floor refurbishments.",
    intro: [
      "Renovation is design with constraints: an existing structure, existing services, sometimes a family still living in the house. We start by understanding what is worth keeping, then make deliberate changes where they will make the biggest difference.",
      "We plan the work in a sensible order, with the finishes and joinery decided before the demolition begins — so the project doesn't stall halfway through on decisions that should have been made earlier.",
    ],
    includes: [
      "Condition review of the existing space",
      "Kitchen and bathroom renovation",
      "Flooring, ceilings and wall finishes",
      "Reconfiguring layouts where structure allows",
      "Lighting and electrical upgrades, coordinated with qualified trades",
      "New joinery, doors and wardrobes",
      "Phased works for occupied homes",
    ],
    forWhom: [
      { title: "Long-term owners", text: "Homes that served well but no longer suit the household." },
      { title: "New buyers", text: "Properties bought for their location, not their finishes." },
      { title: "Landlords", text: "Refurbishing between tenancies with durable, practical materials." },
    ],
    approach: [
      { title: "Survey", text: "We look at what's there, what's worth keeping and what's hidden." },
      { title: "Decide early", text: "Finishes and fittings are chosen before the work starts." },
      { title: "Sequence", text: "The work is planned to minimise disruption and rework." },
      { title: "Close out", text: "We walk the completed scope with you before handover." },
    ],
    emphasis: "Most renovation problems are decisions that were made too late.",
    faqs: [
      {
        q: "Do you renovate single rooms?",
        a: "Yes. Kitchens, bathrooms and master suites are common single-room projects.",
      },
      {
        q: "Will I need permits?",
        a: "Some works need approval from the building, community or relevant authority. Tell us what you're planning and we'll discuss what may apply to your project.",
      },
    ],
    related: ["apartment-interiors", "villa-interiors", "interior-fit-out"],
    cover: photos.renovation,
    seo: {
      title: "Home Renovation Company in Ajman",
      description:
        "Home renovation and refurbishment in Ajman and across the UAE — kitchens, bathrooms, flooring, joinery and full-floor makeovers, planned before work begins.",
      keywords: ["home renovation Ajman", "villa renovation Ajman", "apartment renovation Ajman", "refurbishment UAE"],
    },
  },
  {
    slug: "interior-fit-out",
    name: "Interior Fit-Out",
    shortName: "fit-out",
    group: "Studio",
    index: "05",
    lede: "Where drawings become rooms.",
    summary:
      "Interior fit-out for residential and commercial spaces — partitions, ceilings, flooring, finishes and joinery, delivered to the approved design.",
    intro: [
      "Fit-out is where the design is tested. Ceilings have to clear services, partitions have to align with mullions, stone has to meet timber without an awkward gap. These are the moments that decide whether a space feels expensive or merely looks it.",
      "Because Canary also designs, we read the drawings with the intent behind them — and flag issues before they become site problems.",
    ],
    includes: [
      "Partitions and gypsum ceilings",
      "Flooring and wall finishes",
      "Joinery installation",
      "Doors, ironmongery and fixtures",
      "Coordination of MEP works with qualified trades, as agreed",
      "Site coordination to the agreed scope",
      "Snagging and handover",
    ],
    forWhom: [
      { title: "Shell-and-core spaces", text: "New units that need a full interior." },
      { title: "Businesses", text: "Offices, shops, salons and clinics preparing to open or relocate." },
      { title: "Homeowners", text: "Executing an approved design, whether ours or another designer's." },
    ],
    approach: [
      { title: "Review", text: "We check drawings against the site before ordering anything." },
      { title: "Programme", text: "Trades and deliveries are sequenced against your opening or move-in date." },
      { title: "Build", text: "Work is carried out and coordinated to the agreed scope." },
      { title: "Hand over", text: "We review the finished space with you and close out remaining items." },
    ],
    emphasis: "The quality of a space lives in its junctions.",
    faqs: [
      {
        q: "Can you fit out a design produced by another designer?",
        a: "Yes, subject to reviewing the drawings first. We'll raise any gaps or buildability questions before pricing.",
      },
      {
        q: "Do you handle commercial fit-outs?",
        a: "Yes — offices, shops, salons, hospitality and clinic spaces are all part of Canary's commercial work.",
      },
    ],
    related: ["commercial-interiors", "joinery", "renovation"],
    cover: photos.officeExecutive,
    seo: {
      title: "Interior Fit-Out Company in Ajman",
      description:
        "Residential and commercial interior fit-out in Ajman and across the UAE — ceilings, partitions, flooring, finishes and joinery delivered to the design.",
      keywords: ["interior fit-out Ajman", "fit-out company Ajman", "office fit-out Ajman", "commercial fit-out UAE"],
    },
  },
  {
    slug: "joinery",
    name: "Joinery & Custom Carpentry",
    shortName: "joinery",
    group: "Studio",
    index: "06",
    lede: "Made to fit the room, not the catalogue.",
    summary:
      "Bespoke wardrobes, kitchens, wall panelling, vanities and built-in furniture designed for each space.",
    intro: [
      "Joinery is where an interior becomes specific. A wardrobe that runs exactly wall to wall, a panelled majlis, a vanity cut around a window — these are the pieces that make a room feel designed rather than furnished.",
      "We draw joinery with the same care as the architecture around it: grain direction, reveal sizes, how a door meets the ceiling, where a handle should sit.",
    ],
    includes: [
      "Fitted wardrobes and dressing rooms",
      "Kitchen cabinetry",
      "Wall panelling and feature walls",
      "TV and media walls",
      "Vanities and bathroom cabinetry",
      "Doors and built-in furniture",
      "Commercial counters and display joinery",
    ],
    forWhom: [
      { title: "Homes", text: "Storage and furniture that fits exactly and lasts." },
      { title: "Retail and salons", text: "Counters, displays and stations built for daily use." },
      { title: "Offices", text: "Reception desks, storage walls and meeting-room joinery." },
    ],
    approach: [
      { title: "Measure", text: "Joinery starts with an accurate site measurement." },
      { title: "Draw", text: "Proportions, reveals and hardware are drawn before production." },
      { title: "Sample", text: "Finishes are confirmed with physical samples where possible." },
      { title: "Install", text: "Pieces are installed and aligned on site." },
    ],
    emphasis: "Good joinery disappears into the wall until you need it.",
    faqs: [
      {
        q: "Can I order joinery without a full interior project?",
        a: "Yes. Wardrobes, kitchens and feature walls are often standalone projects.",
      },
      {
        q: "Which finishes can you work with?",
        a: "Options typically include timber veneers, lacquers and laminates. We'll recommend finishes based on how the piece will be used and the look you want.",
      },
    ],
    related: ["interior-design", "villa-interiors", "interior-fit-out"],
    cover: photos.wardrobeTimber,
    seo: {
      title: "Custom Joinery & Carpentry, Ajman",
      description:
        "Bespoke joinery by Canary — fitted wardrobes, kitchens, wall panelling, vanities and commercial counters designed and installed to fit.",
      keywords: ["custom joinery Ajman", "carpentry Ajman", "fitted wardrobes Ajman", "joinery UAE"],
    },
  },
  {
    slug: "commercial-interiors",
    name: "Commercial Interiors",
    shortName: "commercial interior",
    group: "Commercial",
    index: "07",
    lede: "Spaces that work as hard as the business inside them.",
    summary:
      "Offices, shops, salons and hospitality spaces designed around brand, customer experience and daily operations.",
    intro: [
      "A commercial interior has to do three jobs at once: express the brand, serve customers or staff well, and survive heavy daily use. We design for all three, starting with how the business actually runs — where queues form, what staff need within reach, what a customer sees first.",
      "Canary works on offices, shops, salons and hospitality spaces, taking each from layout through to finished fit-out where required.",
    ],
    includes: [
      "Operational layout planning",
      "Brand expression through materials, light and signage zones",
      "Reception, counters and display joinery",
      "Workplace planning for offices",
      "Salon station and treatment-room layouts",
      "Hospitality seating and service planning",
      "Fit-out to the approved design",
    ],
    forWhom: [
      { title: "Offices", text: "Workplaces planned for focus, collaboration and growth." },
      { title: "Shops", text: "Retail spaces that guide customers and show product well." },
      { title: "Salons", text: "Stations, washing and treatment areas planned around service flow." },
      { title: "Hospitality", text: "Cafés and restaurants where seating, service and atmosphere are balanced." },
    ],
    approach: [
      { title: "Operations first", text: "We map how staff and customers move before designing surfaces." },
      { title: "Brand in space", text: "Identity is expressed through material and light, not just logos." },
      { title: "Durability", text: "Finishes are chosen for cleaning, wear and daily use." },
      { title: "Opening date", text: "The programme is planned around when you need to trade." },
    ],
    emphasis: "Customers notice atmosphere. Staff notice everything else.",
    faqs: [
      {
        q: "Which commercial spaces do you work on?",
        a: "Offices, shops, salons, hospitality spaces and clinics.",
      },
      {
        q: "Can you work with our brand guidelines?",
        a: "Yes. Share your guidelines at the start and we'll translate them into materials, colour and lighting.",
      },
    ],
    related: ["clinic-interiors", "interior-fit-out", "joinery"],
    cover: photos.officeWorkspace,
    seo: {
      title: "Commercial Interior Design, Ajman",
      description:
        "Commercial interiors for offices, shops, salons and hospitality spaces — planned around operations and brand, from layout to fit-out.",
      keywords: ["commercial interior design Ajman", "office fit-out Ajman", "shop interior design UAE", "salon interior design Ajman"],
    },
  },
  {
    slug: "clinic-interiors",
    name: "Clinic Interiors",
    shortName: "clinic interior",
    group: "Commercial",
    index: "08",
    lede: "Calm for patients. Clear for staff.",
    summary:
      "Clinic interiors planned around patient experience, staff workflow and practical, cleanable finishes.",
    intro: [
      "A good clinic interior lowers the pulse of everyone who walks in. Patients should understand where to go without asking; staff should move between reception, consultation and treatment rooms without crossing paths awkwardly.",
      "We plan the layout around that flow, choose finishes that are practical to clean, and work with your operator and licensing advisers so the design accommodates the requirements that apply to your clinic type.",
    ],
    includes: [
      "Patient journey and waiting-area planning",
      "Reception and records layout",
      "Consultation and treatment room planning",
      "Practical, cleanable material selection",
      "Lighting suited to waiting and treatment areas",
      "Accessibility considerations in layout",
      "Fit-out to the approved design",
    ],
    forWhom: [
      { title: "New clinics", text: "Practices fitting out a new unit." },
      { title: "Expanding practices", text: "Adding rooms or reorganising for higher patient numbers." },
      { title: "Aesthetic and wellness clinics", text: "Spaces where the patient experience is part of the service." },
    ],
    approach: [
      { title: "Workflow", text: "We map patient and staff routes before placing a single room." },
      { title: "Requirements", text: "We coordinate with your licensing advisers on what applies." },
      { title: "Materials", text: "Finishes are selected for hygiene, durability and warmth." },
      { title: "Atmosphere", text: "Light and material are used to make the space feel reassuring." },
    ],
    emphasis: "The best clinic layouts are understood without signage.",
    faqs: [
      {
        q: "Do you handle clinic licensing?",
        a: "Licensing requirements are set by the relevant health authority and depend on your clinic type. We coordinate the design with your licensing advisers or consultant so the layout can accommodate what's required.",
      },
      {
        q: "What kinds of clinics do you design?",
        a: "Tell us about your practice — clinic type affects room requirements significantly, and we'll advise on whether the project is a good fit.",
      },
    ],
    related: ["commercial-interiors", "interior-fit-out", "architecture-space-planning"],
    cover: photos.clinicReception,
    seo: {
      title: "Clinic Interior Design in Ajman",
      description:
        "Clinic interior design in Ajman and across the UAE — patient flow, staff workflow, practical finishes and calm, reassuring spaces.",
      keywords: ["clinic interior design Ajman", "clinic fit-out UAE", "medical clinic interior design"],
    },
  },
  {
    slug: "architecture-space-planning",
    name: "Architecture & Space Planning",
    shortName: "space planning",
    group: "Studio",
    index: "09",
    lede: "The decisions that every other decision depends on.",
    summary:
      "Space planning and architectural design input that set the layout, proportions and flow of a space.",
    intro: [
      "Before colour, before furniture, there is the plan: where walls go, how rooms connect, what the ceiling height allows. Most of what makes a space feel generous or cramped is decided here.",
      "Canary provides architectural and space-planning input for interiors and alterations, testing options on paper so you can compare layouts before committing to one.",
    ],
    includes: [
      "Measured survey review",
      "Layout options and test fits",
      "Zoning and circulation planning",
      "Ceiling and section studies",
      "Façade and opening studies, where relevant to the scope",
      "Drawings to support the agreed scope",
    ],
    forWhom: [
      { title: "Before buying or leasing", text: "Testing whether a space can work before you commit." },
      { title: "Before renovating", text: "Comparing layouts before demolition starts." },
      { title: "Commercial tenants", text: "Test fits for offices, shops and clinics." },
    ],
    approach: [
      { title: "Survey", text: "We start from accurate dimensions and existing services." },
      { title: "Options", text: "Alternative layouts are drawn and compared side by side." },
      { title: "Section", text: "Height and light are studied, not just the plan." },
      { title: "Decide", text: "One layout is developed into the basis for design." },
    ],
    emphasis: "Move a wall on paper. It's much cheaper there.",
    faqs: [
      {
        q: "Can you produce a test fit before we sign a lease?",
        a: "Yes — tell us about the space and your requirements and we'll discuss what a test fit would involve.",
      },
      {
        q: "Do you provide authority submission drawings?",
        a: "Ask us about your specific requirement. Submission responsibilities vary by project and authority, and we'll be clear about what's included in our scope.",
      },
    ],
    related: ["interior-design", "clinic-interiors", "villa-interiors"],
    cover: photos.blueprints,
    seo: {
      title: "Space Planning & Architecture, Ajman",
      description:
        "Space planning and architectural design input in Ajman — layout options, circulation and section studies before you build.",
      keywords: ["space planning Ajman", "architecture Ajman", "interior architecture UAE"],
    },
  },
  {
    slug: "pool-landscaping",
    name: "Pool & Landscaping",
    shortName: "pool and landscaping",
    group: "Residential",
    index: "10",
    lede: "The garden as the largest room in the house.",
    summary:
      "Pool and landscape design for villas — terraces, planting, shade and outdoor living planned with the interior.",
    intro: [
      "In the UAE, outdoor space is used differently through the year: shaded and sheltered in summer, fully lived in through the cooler months. A good garden plans for both.",
      "Canary designs pools, terraces and planting as an extension of the interior — with materials, lines and lighting that continue from inside to out.",
    ],
    includes: [
      "Garden layout and zoning",
      "Pool and pool-deck design",
      "Terraces, pergolas and shade structures",
      "Hard landscaping and paving",
      "Planting concepts suited to the climate",
      "Outdoor lighting",
      "Outdoor kitchens and seating areas",
    ],
    forWhom: [
      { title: "Villa owners", text: "Turning an empty plot into usable outdoor rooms." },
      { title: "Renovators", text: "Updating an existing pool and garden." },
      { title: "Entertainers", text: "Outdoor spaces designed for gatherings." },
    ],
    approach: [
      { title: "Sun and shade", text: "We study orientation and shade before placing the pool or seating." },
      { title: "Continuity", text: "Lines and materials continue from the interior outward." },
      { title: "Climate", text: "Planting and finishes are chosen for heat and sun." },
      { title: "Evening", text: "Lighting is designed for how the garden is used after dark." },
    ],
    emphasis: "Design for August. Live in it in January.",
    faqs: [
      {
        q: "Can the landscape be designed with the interior?",
        a: "Yes, and we recommend it — it lets floor levels, materials and views line up between inside and out.",
      },
      {
        q: "Do you work on existing pools?",
        a: "Tell us about the existing pool and what you'd like to change, and we'll discuss the options.",
      },
    ],
    related: ["villa-interiors", "architecture-space-planning", "renovation"],
    cover: photos.villaInfinity,
    seo: {
      title: "Pool & Landscape Design in Ajman",
      description:
        "Pool and landscape design for UAE villas — terraces, shade, planting and outdoor lighting planned as an extension of the interior.",
      keywords: ["landscaping Ajman", "pool design Ajman", "villa landscaping UAE"],
    },
  },
];

export function getService(slug: string) {
  return services.find((s) => s.slug === slug);
}

export const serviceGroups = ["Residential", "Commercial", "Studio"] as const;
