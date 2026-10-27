import Link from "next/link";
import { SheetLabel } from "@/components/ui/SheetLabel";

/** Typography-led introduction: one large statement, two short columns. */
export function StudioIntro() {
  return (
    <section id="studio" aria-labelledby="studio-heading" className="frame py-24 md:py-36">
      <SheetLabel sheet="A-02">The studio</SheetLabel>
      <div className="mt-10 grid gap-12 lg:grid-cols-12">
        <h2 id="studio-heading" className="text-h2 lg:col-span-9">
          We begin with how a space will be used — the routines, the light, the things that need a place — and only then
          decide how it should look. <span className="text-ink-soft">The finishes follow the thinking, not the other way round.</span>
        </h2>
      </div>
      <div className="mt-14 grid gap-10 border-t border-line pt-10 md:grid-cols-12">
        <p className="text-ink-soft md:col-span-4 md:col-start-6">
          Canary works on villas, apartments, penthouses and townhouses, and on offices, shops, salons, hospitality spaces
          and clinics. Each project starts with a conversation about how you live or work, then moves through space
          planning, material selection and detailed design.
        </p>
        <div className="md:col-span-3">
          <p className="text-ink-soft">
            Because the same studio handles renovation, fit-out and joinery, the design carries through to site — and the
            details are built the way they were drawn.
          </p>
          <Link href="/about" className="link-rule mt-6 inline-block text-[0.9375rem] font-semibold">
            About the studio
          </Link>
        </div>
      </div>
    </section>
  );
}
