import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { services } from "@/data/services";
import { Figure } from "@/components/media/Figure";
import { SheetLabel } from "@/components/ui/SheetLabel";

/**
 * Two image-led entry points (homes / businesses) followed by a ruled
 * table-of-contents index. On wide screens, hovering or focusing a row reveals
 * its drawing in the sticky preview (pure CSS, see globals.css).
 */
export function ServicesIndex() {
  const residential = services.find((s) => s.slug === "villa-interiors")!;
  const commercial = services.find((s) => s.slug === "commercial-interiors")!;

  return (
    <section aria-labelledby="services-heading" className="py-24 md:py-36">
      <div className="frame">
        <SheetLabel sheet="A-04">Services</SheetLabel>
        <div className="mt-6 grid gap-8 lg:grid-cols-12">
          <h2 id="services-heading" className="text-h2 lg:col-span-7">
            One studio for design, renovation, fit-out and joinery.
          </h2>
          <p className="self-end text-ink-soft lg:col-span-4 lg:col-start-9">
            Take one service or several. Many projects begin with design and continue through to a finished, fitted space.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {[
            { s: residential, kicker: "For homes", line: "Villas, apartments, penthouses, townhouses, pools and gardens." },
            { s: commercial, kicker: "For businesses", line: "Offices, shops, salons, hospitality spaces and clinics." },
          ].map(({ s, kicker, line }) => (
            <Link key={s.slug} href={`/services/${s.slug}`} className="group relative block">
              <div className="zoom-media overflow-hidden">
                <Figure media={s.cover} aspect="aspect-[16/10]" sizes="(min-width: 768px) 50vw, 100vw" />
              </div>
              <div className="flex items-end justify-between gap-6 border-b border-ink py-4">
                <div>
                  <p className="label text-ink-soft">{kicker}</p>
                  <p className="mt-2 font-display text-h3">{line}</p>
                </div>
                <ArrowUpRight size={20} aria-hidden className="shrink-0" />
              </div>
            </Link>
          ))}
        </div>

        <div className="svc-index mt-20 grid gap-12 lg:grid-cols-12">
          <ol className="border-t border-ink lg:col-span-7">
            {services.map((s) => (
              <li key={s.slug} className="border-b border-line">
                <Link href={`/services/${s.slug}`} className="svc-row group grid grid-cols-[2.25rem_minmax(0,1fr)_auto] items-baseline gap-x-3 py-5 md:grid-cols-[3rem_minmax(0,1fr)_9rem_auto] md:gap-x-4">
                  <span className="sheet text-ink-soft">{s.index}</span>
                  <span>
                    <span className="block font-display text-[1.25rem] leading-tight transition-transform duration-300 [overflow-wrap:anywhere] group-hover:translate-x-1 sm:text-[1.5rem] md:text-[1.75rem]">
                      {s.name}
                    </span>
                    <span className="mt-1 block max-w-md text-[0.9375rem] text-ink-soft">{s.lede}</span>
                  </span>
                  <span className="label hidden text-ink-soft md:block">{s.group}</span>
                  <ArrowUpRight size={18} aria-hidden className="text-ink-soft group-hover:text-ink" />
                </Link>
              </li>
            ))}
          </ol>
          <div aria-hidden className="hidden lg:col-span-5 lg:block">
            <div className="sticky top-[calc(var(--header-h)+2rem)] aspect-[4/5]">
              {services.map((s, i) => (
                <div key={s.slug} className="svc-preview absolute inset-0 opacity-0 transition-opacity duration-500" data-i={i}>
                  <Figure media={s.cover} className="h-full" sizes="40vw" />
                  <p className="label absolute bottom-0 right-0 bg-ivory px-4 py-3">{s.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
