import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { serviceGroups, services } from "@/data/services";
import { PageHeader } from "@/components/ui/PageHeader";
import { Figure } from "@/components/media/Figure";
import { EnquiryBand } from "@/components/sections/EnquiryBand";
import { JsonLd } from "@/components/ui/JsonLd";
import { pageMetadata } from "@/lib/seo";
import { itemListSchema, webPageSchema } from "@/lib/schema";
import { whatsappUrl } from "@/config/site";

const description =
  "Interior design, renovation, fit-out and joinery for villas, apartments, offices, salons and clinics — plus space planning and landscaping, from Ajman.";

export const metadata = pageMetadata({ title: "Interior Design & Fit-Out Services", description, path: "/services" });

const groupIntro: Record<(typeof serviceGroups)[number], string> = {
  Residential: "For villas, apartments, penthouses, townhouses — and the gardens around them.",
  Commercial: "For offices, shops, salons, hospitality spaces and clinics.",
  Studio: "The disciplines behind every project, available together or on their own.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        crumbs={[{ name: "Services", path: "/services" }]}
        sheet="S-00 — Index of services"
        title={
          <>
            What we <em>design and build.</em>
          </>
        }
        intro="Ten services across homes and businesses. Choose one, or let one project run from design to fit-out with the same team."
      />

      {serviceGroups.map((group) => {
        const list = services.filter((s) => s.group === group);
        return (
          <section key={group} aria-labelledby={`group-${group}`} className="border-t border-ink">
            <div className="frame grid gap-10 py-14 md:py-20 lg:grid-cols-12">
              <div className="lg:col-span-3">
                <div className="lg:sticky lg:top-[calc(var(--header-h)+2rem)]">
                  <h2 id={`group-${group}`} className="text-h3">
                    {group}
                  </h2>
                  <p className="mt-3 max-w-xs text-[0.9375rem] text-ink-soft">{groupIntro[group]}</p>
                </div>
              </div>
              <ul className="space-y-14 lg:col-span-9">
                {list.map((s) => (
                  <li key={s.slug} className="grid gap-6 md:grid-cols-9">
                    <Link href={`/services/${s.slug}`} className="group md:col-span-4" tabIndex={-1} aria-hidden>
                      <div className="zoom-media overflow-hidden">
                        <Figure media={s.cover} aspect="aspect-[4/3]" sizes="(min-width: 768px) 33vw, 100vw" />
                      </div>
                    </Link>
                    <div className="md:col-span-5">
                      <p className="sheet text-ink-soft">{s.index}</p>
                      <h3 className="mt-2 font-display text-h3">
                        <Link href={`/services/${s.slug}`} className="hover:text-umber">
                          {s.name}
                        </Link>
                      </h3>
                      <p className="mt-3 text-ink-soft">{s.summary}</p>
                      <ul className="mt-5 grid gap-x-6 gap-y-1.5 text-[0.875rem] sm:grid-cols-2">
                        {s.includes.slice(0, 4).map((inc) => (
                          <li key={inc} className="flex gap-2">
                            <span aria-hidden className="mt-[0.6em] h-px w-3 shrink-0 bg-ink" />
                            {inc}
                          </li>
                        ))}
                      </ul>
                      <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 text-[0.9375rem] font-semibold">
                        <Link href={`/services/${s.slug}`} className="inline-flex items-center gap-1.5">
                          <span className="link-rule">Service details</span>
                          <ArrowUpRight size={15} aria-hidden />
                        </Link>
                        <a
                          href={whatsappUrl(s.shortName)}
                          target="_blank"
                          rel="noopener"
                          className="text-ink-soft hover:text-ink"
                          data-track="whatsapp_click"
                          data-track-label={`services_index:${s.slug}`}
                        >
                          Enquire on WhatsApp
                        </a>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        );
      })}

      <EnquiryBand />
      <JsonLd data={webPageSchema({ name: "Services", description, path: "/services" })} />
      <JsonLd data={itemListSchema("Interior design and fit-out services", services.map((s) => ({ name: s.name, path: `/services/${s.slug}` })))} />
    </>
  );
}
