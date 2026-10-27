import Link from "next/link";
import { ProcessLine } from "@/components/sections/ProcessLine";
import { SheetLabel } from "@/components/ui/SheetLabel";

export function ProcessSection() {
  return (
    <section aria-labelledby="process-heading" className="border-t border-line py-24 md:py-36">
      <div className="frame">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <SheetLabel sheet="A-07">Process</SheetLabel>
            <h2 id="process-heading" className="mt-6 max-w-2xl text-h2">
              From first visit to <em>finished space.</em>
            </h2>
          </div>
          <Link href="/process" className="link-rule self-start text-[0.9375rem] font-semibold md:self-auto">
            How a project works
          </Link>
        </div>
        <div className="mt-16">
          <ProcessLine />
        </div>
      </div>
    </section>
  );
}
