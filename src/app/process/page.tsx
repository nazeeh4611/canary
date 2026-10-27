import { PageHeader } from "@/components/ui/PageHeader";
import { ProcessLine } from "@/components/sections/ProcessLine";
import { FaqList } from "@/components/ui/FaqList";
import { SheetLabel } from "@/components/ui/SheetLabel";
import { Figure } from "@/components/media/Figure";
import { EnquiryBand } from "@/components/sections/EnquiryBand";
import { JsonLd } from "@/components/ui/JsonLd";
import { pageMetadata } from "@/lib/seo";
import { webPageSchema } from "@/lib/schema";
import { generalFaqs } from "@/data/faqs";

const description =
  "How an interior design project with Canary works — discovery, concept, design development, execution and handover — and what to prepare before you start.";

export const metadata = pageMetadata({ title: "Our Interior Design Process", description, path: "/process" });

const bring = [
  "Property type, location and approximate size",
  "Floor plans or photos of the existing space, if you have them",
  "Images of interiors you like — and ones you don’t",
  "How you want to use the space, and who will use it",
  "Your timeline, and any fixed dates such as a move-in or opening",
  "An honest idea of budget",
];

export default function ProcessPage() {
  return (
    <>
      <PageHeader
        crumbs={[{ name: "Process", path: "/process" }]}
        sheet="D-00 — Process"
        title={
          <>
            How a project <em>comes together.</em>
          </>
        }
        intro="Five stages from first conversation to handover. The exact scope of each is agreed with you at the start."
      />

      <section aria-label="Project stages" className="frame border-t border-ink pb-20 pt-14 md:pb-28">
        <ProcessLine detailed headingLevel="h2" />
      </section>

      <section aria-labelledby="prepare-heading" className="bg-sand py-20 md:py-28">
        <div className="frame grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SheetLabel sheet="D-01">Before we meet</SheetLabel>
            <h2 id="prepare-heading" className="mt-6 text-h2">
              What helps us <em>help you.</em>
            </h2>
            <p className="mt-6 text-ink-soft">None of this is required to start a conversation — but each item makes the first meeting more useful.</p>
          </div>
          <ul className="lg:col-span-6 lg:col-start-7">
            {bring.map((b, i) => (
              <li key={b} className="grid grid-cols-[2.5rem_1fr] border-t border-ink/15 py-4">
                <span className="sheet text-ink-soft">{String(i + 1).padStart(2, "0")}</span>
                {b}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="decisions-heading" className="frame grid gap-12 py-20 md:py-28 lg:grid-cols-12">
        <div className="self-center lg:col-span-5">
          <SheetLabel sheet="D-02">A note on decisions</SheetLabel>
          <h2 id="decisions-heading" className="mt-6 text-h2">
            Decide on paper, <em>not on site.</em>
          </h2>
          <p className="mt-6 text-ink-soft">
            Most delays and cost surprises in interior projects come from decisions made late — a tile chosen after the floor is
            screeded, a socket moved after the wall is finished. We work to settle layouts, finishes and details during design
            development, so execution can follow a plan instead of improvising one.
          </p>
        </div>
        <div className="lg:col-span-6 lg:col-start-7">
          <Figure media={{ kind: "drawing", motif: "apartment-plan", alt: "Annotated apartment plan with dimensions", tone: "ivory" }} aspect="aspect-[4/3]" sizes="(min-width: 1024px) 50vw, 100vw" />
        </div>
      </section>

      <section aria-labelledby="faq-heading" className="frame grid gap-10 border-t border-line py-20 md:py-28 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <h2 id="faq-heading" className="text-h2">
            Common questions
          </h2>
        </div>
        <div className="lg:col-span-7 lg:col-start-6">
          <FaqList faqs={generalFaqs} />
        </div>
      </section>

      <EnquiryBand />
      <JsonLd data={webPageSchema({ name: "Process", description, path: "/process" })} />
    </>
  );
}
