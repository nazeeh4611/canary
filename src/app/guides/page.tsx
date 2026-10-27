import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { guides } from "@/data/guides";
import { PageHeader } from "@/components/ui/PageHeader";
import { Figure } from "@/components/media/Figure";
import { EnquiryBand } from "@/components/sections/EnquiryBand";
import { JsonLd } from "@/components/ui/JsonLd";
import { pageMetadata } from "@/lib/seo";
import { itemListSchema, webPageSchema } from "@/lib/schema";

const description =
  "Practical guides to interior design, renovation and fit-out in the UAE — planning a villa renovation, apartment space planning, clinic layouts and more.";

export const metadata = pageMetadata({ title: "Interior Design Guides & Advice", description, path: "/guides" });

const dateFmt = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long", year: "numeric" });

export default function GuidesPage() {
  const [lead, ...rest] = guides;
  return (
    <>
      <PageHeader
        crumbs={[{ name: "Guides", path: "/guides" }]}
        sheet="G-00 — Guides"
        title={
          <>
            Notes from <em>the studio.</em>
          </>
        }
        intro="Straight answers to the questions clients ask before a project starts — written by an interior design and fit-out studio in Ajman."
      />

      {lead && (
        <section aria-label="Featured guide" className="frame">
          <Link href={`/guides/${lead.slug}`} className="group grid gap-8 border-t border-ink pt-8 lg:grid-cols-12">
            <div className="zoom-media overflow-hidden lg:col-span-7">
              <Figure media={lead.cover} aspect="aspect-[16/10]" sizes="(min-width: 1024px) 58vw, 100vw" priority />
            </div>
            <div className="flex flex-col justify-between gap-6 lg:col-span-5">
              <div>
                <p className="label text-ink-soft">
                  Guide · {lead.readingMinutes} min read
                </p>
                <h2 className="mt-4 text-h2 group-hover:text-umber">{lead.title}</h2>
                <p className="mt-4 text-lede text-ink-soft">{lead.excerpt}</p>
              </div>
              <span className="inline-flex items-center gap-2 text-[0.9375rem] font-semibold">
                <span className="link-rule">Read the guide</span> <ArrowUpRight size={16} aria-hidden />
              </span>
            </div>
          </Link>
        </section>
      )}

      <section aria-label="All guides" className="frame py-16 md:py-24">
        <ul className="grid gap-x-8 gap-y-14 md:grid-cols-3">
          {rest.map((g) => (
            <li key={g.slug}>
              <Link href={`/guides/${g.slug}`} className="group block">
                <div className="zoom-media overflow-hidden">
                  <Figure media={g.cover} aspect="aspect-[4/3]" sizes="(min-width: 768px) 33vw, 100vw" />
                </div>
                <p className="label mt-5 text-ink-soft">
                  <time dateTime={g.published}>{dateFmt.format(new Date(g.published))}</time> · {g.readingMinutes} min
                </p>
                <h2 className="mt-3 text-h3 group-hover:text-umber">{g.title}</h2>
                <p className="mt-3 text-[0.9375rem] text-ink-soft">{g.excerpt}</p>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <EnquiryBand />
      <JsonLd data={webPageSchema({ name: "Guides", description, path: "/guides" })} />
      <JsonLd data={itemListSchema("Interior design guides", guides.map((g) => ({ name: g.title, path: `/guides/${g.slug}` })))} />
    </>
  );
}
