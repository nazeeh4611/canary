import Link from "next/link";
import { PageHeader } from "@/components/ui/PageHeader";
import { Figure } from "@/components/media/Figure";
import { SheetLabel } from "@/components/ui/SheetLabel";
import { EnquiryBand } from "@/components/sections/EnquiryBand";
import { ServiceArea } from "@/components/sections/ServiceArea";
import { JsonLd } from "@/components/ui/JsonLd";
import { pageMetadata } from "@/lib/seo";
import { webPageSchema } from "@/lib/schema";
import { principles } from "@/data/home";

const description =
  "Canary is an Ajman studio for interior design, renovation, fit-out and joinery — homes and commercial spaces across the UAE, designed and delivered by one team.";

export const metadata = pageMetadata({ title: "About the Studio", description, path: "/about" });

/*
 * Team, founder and history sections are intentionally omitted until the
 * business supplies verified information (see docs/CONTENT-CHECKLIST.md).
 */
export default function AboutPage() {
  return (
    <>
      <PageHeader
        crumbs={[{ name: "About", path: "/about" }]}
        sheet="B-00 — The studio"
        title={
          <>
            Design that carries through <em>to the last detail.</em>
          </>
        }
      />

      <div className="frame">
        <Figure media={{ kind: "drawing", motif: "joinery-elevation", alt: "Elevation drawing of a fitted wardrobe wall with an open shelving niche", tone: "stone" }} priority aspect="aspect-[4/3] md:aspect-[21/9]" sizes="(min-width: 1440px) 1360px, 100vw" showProvenance />
      </div>

      <section aria-labelledby="intro-heading" className="frame grid gap-12 py-20 md:py-28 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <SheetLabel sheet="B-01">Introduction</SheetLabel>
          <h2 id="intro-heading" className="sr-only">
            Introduction
          </h2>
        </div>
        <div className="lg:col-span-7">
          <p className="font-display text-h3">
            Canary Interior Design is an interior design and fit-out studio based in Ajman, working on homes and commercial
            spaces across the UAE.
          </p>
          <div className="prose-canary mt-8 text-[1.0625rem] leading-relaxed text-ink-soft">
            <p>
              Our residential work covers villas, apartments, penthouses and townhouses, along with the pools and gardens that
              surround them. Our commercial work includes offices, shops, salons, hospitality spaces and clinics.
            </p>
            <p>
              We work across interior design, architecture and space planning, renovation, fit-out and bespoke joinery. That
              range matters: it means the people who draw a detail are close to the people who build it, and a design idea
              doesn&rsquo;t get lost between consultants and contractors.
            </p>
          </div>
        </div>
      </section>

      <section aria-labelledby="philosophy-heading" className="bg-paper py-20 md:py-28">
        <div className="frame grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SheetLabel sheet="B-02">Philosophy</SheetLabel>
            <h2 id="philosophy-heading" className="mt-6 text-h2">
              Use first. <em>Then beauty.</em>
            </h2>
            <p className="mt-6 text-ink-soft">
              Not because beauty matters less — because it lasts longer when the space underneath it works.
            </p>
          </div>
          <ol className="grid gap-x-10 sm:grid-cols-2 lg:col-span-8">
            {principles.map((p) => (
              <li key={p.n} className="border-t border-ink/15 py-6">
                <p className="sheet text-ink-soft">0{p.n}</p>
                <h3 className="mt-2 font-display text-[1.5rem] leading-tight">{p.title}</h3>
                <p className="mt-2 text-ink-soft">{p.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section aria-labelledby="craft-heading" className="frame grid gap-12 py-20 md:py-28 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <Figure media={{ kind: "drawing", motif: "material-timber", alt: "Drawing of timber grain and board joints", tone: "stone" }} aspect="aspect-[4/5]" sizes="(min-width: 1024px) 45vw, 100vw" />
        </div>
        <div className="self-center lg:col-span-5 lg:col-start-8">
          <SheetLabel sheet="B-03">Craft &amp; delivery</SheetLabel>
          <h2 id="craft-heading" className="mt-6 text-h2">
            Drawn carefully. <em>Built the same way.</em>
          </h2>
          <div className="prose-canary mt-6 text-ink-soft">
            <p>
              The difference between an interior that looks good on handover day and one that still feels right years later is
              usually in the details: how a joinery door meets the ceiling, how stone turns a corner, how a light is concealed.
            </p>
            <p>
              We draw those details before work starts, coordinate them on site, and review the completed scope with you at
              handover.
            </p>
          </div>
          <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-[0.9375rem] font-semibold">
            <Link href="/process" className="link-rule">
              Our process
            </Link>
            <Link href="/services/joinery" className="link-rule">
              Joinery
            </Link>
            <Link href="/projects" className="link-rule">
              Projects
            </Link>
          </div>
        </div>
      </section>

      <ServiceArea sheet="B-04" />
      <EnquiryBand />
      <JsonLd data={webPageSchema({ name: "About", description, path: "/about" })} />
    </>
  );
}
