import { principles } from "@/data/home";
import { Figure } from "@/components/media/Figure";
import { SheetLabel } from "@/components/ui/SheetLabel";

/**
 * "The Canary approach" presented as a drawing with numbered callouts and
 * its legend — principles read like notes on a construction detail.
 */
export function Approach() {
  // Callout positions on the detail drawing (viewBox 1200×900), as percentages
  const pins = [
    [12, 16], // slab
    [33, 35], // suspension
    [67, 41], // cove light
    [25, 50], // ceiling board
    [77, 70], // plaster finish
    [86, 30], // wall
  ];
  return (
    <section aria-labelledby="approach-heading" className="bg-sand py-24 md:py-36">
      <div className="frame grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <SheetLabel sheet="A-05">The Canary approach</SheetLabel>
          <h2 id="approach-heading" className="mt-6 text-h2">
            Notes on <em>how we work.</em>
          </h2>
          <ol className="mt-12 space-y-0">
            {principles.map((p) => (
              <li key={p.n} className="grid grid-cols-[2.25rem_1fr] gap-x-4 border-t border-ink/15 py-5">
                <span aria-hidden className="flex h-7 w-7 items-center justify-center rounded-full border border-ink text-[0.75rem] font-semibold">
                  {p.n}
                </span>
                <div>
                  <h3 className="text-[1.0625rem] font-sans font-semibold">{p.title}</h3>
                  <p className="mt-1 text-ink-soft">{p.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
        <div className="relative lg:col-span-7">
          <div className="relative lg:sticky lg:top-[calc(var(--header-h)+2rem)]">
            <Figure media={{ kind: "drawing", motif: "detail-section", alt: "Construction detail of a ceiling cove with numbered notes", tone: "ivory" }} fit="cover" aspect="aspect-[4/3]" sizes="(min-width: 1024px) 55vw, 100vw" />
            {pins.map(([x, y], i) => (
              <span
                key={i}
                aria-hidden
                className="absolute flex h-7 w-7 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-ink text-[0.75rem] font-semibold text-ivory ring-4 ring-ivory"
                style={{ left: `${x}%`, top: `${y}%` }}
              >
                {i + 1}
              </span>
            ))}
            <p className="label mt-3 text-ink-soft">Detail 04 — ceiling cove. Every principle ends up in a drawing like this.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
