import { ArrowUpRight } from "lucide-react";
import { confirmedEmirates, site } from "@/config/site";
import { SheetLabel } from "@/components/ui/SheetLabel";

/**
 * Service area. Only emirates confirmed in config/site.ts are named;
 * everything else is covered by Canary's own "across the UAE" positioning.
 */
export function ServiceArea({ sheet = "A-09" }: { sheet?: string }) {
  return (
    <section aria-labelledby="area-heading" className="frame py-24 md:py-32">
      <div className="grid gap-12 border-t border-ink pt-10 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <SheetLabel sheet={sheet}>Where we work</SheetLabel>
        </div>
        <div className="lg:col-span-8">
          <h2 id="area-heading" className="text-h2">
            Studio in {site.serviceArea.base}. <span className="text-ink-soft">Projects across the UAE.</span>
          </h2>
          <div className="mt-10 grid gap-10 sm:grid-cols-2">
            <div>
              <p className="label text-ink-soft">The studio</p>
              <address className="mt-3 not-italic leading-relaxed">
                {site.name}
                <br />
                {site.address.street}
                <br />
                {site.address.locality}, {site.address.country}
              </address>
              <a
                href={site.mapsUrl}
                target="_blank"
                rel="noopener"
                className="mt-4 inline-flex items-center gap-1.5 text-[0.9375rem] font-semibold"
                data-track="directions_click"
                data-track-label="service_area"
              >
                <span className="link-rule">Get Directions</span> <ArrowUpRight size={15} aria-hidden />
              </a>
            </div>
            <div>
              <p className="label text-ink-soft">Projects</p>
              <p className="mt-3 leading-relaxed">
                We take on residential and commercial projects in {confirmedEmirates.join(", ")} and across the UAE. Tell us
                where your project is when you get in touch.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
