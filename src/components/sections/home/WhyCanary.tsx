import { SheetLabel } from "@/components/ui/SheetLabel";

/** Credibility built only on verifiable capabilities — no counts, awards or guarantees. */
const strengths = [
  {
    title: "Design and delivery in one studio",
    text: "Interior design, renovation, fit-out and joinery under one roof, so the design intent reaches site intact.",
  },
  {
    title: "Residential and commercial",
    text: "Villas, apartments, penthouses and townhouses — and offices, shops, salons, hospitality spaces and clinics.",
  },
  {
    title: "Bespoke joinery",
    text: "Wardrobes, kitchens, panelling and counters drawn and made for the space, not chosen from a catalogue.",
  },
  {
    title: "Practical space planning",
    text: "Layouts tested on paper first — circulation, storage and daily routines resolved before finishes.",
  },
  {
    title: "Material and finish coordination",
    text: "A considered palette, specified and coordinated so stone, timber, metal and light work together.",
  },
  {
    title: "A personal brief",
    text: "Each project starts from your routines, preferences and budget — not from a house style.",
  },
];

export function WhyCanary() {
  return (
    <section aria-labelledby="why-heading" className="bg-umber py-24 text-ivory md:py-36">
      <div className="frame grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <SheetLabel sheet="A-08" inverted>
            Why Canary
          </SheetLabel>
          <h2 id="why-heading" className="mt-6 text-h2">
            One team from the first sketch to the <em className="text-stone">final fixing.</em>
          </h2>
        </div>
        <dl className="grid gap-x-10 sm:grid-cols-2 lg:col-span-7">
          {strengths.map((s) => (
            <div key={s.title} className="border-t border-ivory/20 py-6">
              <dt className="font-display text-[1.5rem] leading-tight">{s.title}</dt>
              <dd className="mt-2 text-[0.9375rem] text-stone/85">{s.text}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
