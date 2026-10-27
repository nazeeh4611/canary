import { palette } from "@/data/home";
import { drawingSrc } from "@/components/media/Figure";
import { SheetLabel } from "@/components/ui/SheetLabel";

/**
 * A material board: tall swatches of differing widths, labelled like a
 * specification schedule. Presented as a typical starting palette — not a project.
 */
export function MaterialPalette() {
  const spans = ["md:col-span-3", "md:col-span-2", "md:col-span-2", "md:col-span-1", "md:col-span-2", "md:col-span-2"];
  return (
    <section aria-labelledby="materials-heading" className="frame py-24 md:py-36">
      <div className="grid gap-8 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <SheetLabel sheet="A-06">Materials</SheetLabel>
          <h2 id="materials-heading" className="mt-6 text-h2">
            Few materials, <em>chosen well.</em>
          </h2>
        </div>
        <p className="self-end text-ink-soft lg:col-span-5 lg:col-start-8">
          A considered interior usually rests on a small palette, repeated with discipline. This is a typical starting point;
          every project&rsquo;s palette is chosen with the client, for the light and the way the space will be used.
        </p>
      </div>

      <ul className="mt-14 grid grid-cols-2 gap-px border border-line bg-line md:grid-cols-12">
        {palette.map((m, i) => (
          <li key={m.name} className={`flex flex-col bg-ivory ${spans[i]}`}>
            <div className="relative aspect-[3/4] overflow-hidden md:aspect-auto md:h-80" style={{ backgroundColor: m.swatch }}>
              {m.texture && (
                // eslint-disable-next-line @next/next/no-img-element -- decorative vector texture
                <img src={drawingSrc(m.texture)} alt="" loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover opacity-60 mix-blend-multiply" />
              )}
            </div>
            <div className="flex-1 p-4">
              <p className="sheet text-ink-soft">M-{String(i + 1).padStart(2, "0")}</p>
              <h3 className="mt-2 text-[1rem] font-sans font-semibold leading-snug">{m.name}</h3>
              <p className="mt-1 text-[0.875rem] text-ink-soft">{m.use}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
