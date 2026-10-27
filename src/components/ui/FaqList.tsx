import { Plus } from "lucide-react";
import type { FAQ } from "@/types";
import { JsonLd } from "./JsonLd";
import { faqSchema } from "@/lib/schema";

/** Native disclosure widgets — keyboard accessible with no JavaScript. */
export function FaqList({ faqs, withSchema = true }: { faqs: FAQ[]; withSchema?: boolean }) {
  return (
    <>
      <div className="border-t border-ink">
        {faqs.map((f) => (
          <details key={f.q} className="group border-b border-line">
            <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-5 text-[1.0625rem] font-medium [&::-webkit-details-marker]:hidden">
              {f.q}
              <Plus size={18} aria-hidden className="mt-1 shrink-0 transition-transform duration-300 group-open:rotate-45" />
            </summary>
            <p className="max-w-2xl pb-6 text-ink-soft">{f.a}</p>
          </details>
        ))}
      </div>
      {withSchema && <JsonLd data={faqSchema(faqs)} />}
    </>
  );
}
