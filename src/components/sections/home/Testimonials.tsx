import { testimonials } from "@/data/testimonials";
import { SheetLabel } from "@/components/ui/SheetLabel";

/** Renders only verified testimonials from data/testimonials.ts. No ratings are shown or marked up. */
export function Testimonials() {
  if (testimonials.length === 0) return null;
  const [lead, ...rest] = testimonials;
  return (
    <section aria-labelledby="testimonials-heading" className="frame py-24 md:py-36">
      <SheetLabel sheet="A-06">Clients</SheetLabel>
      <h2 id="testimonials-heading" className="sr-only">
        What clients say
      </h2>
      <figure className="mt-10 max-w-4xl">
        <blockquote className="font-display text-h2">&ldquo;{lead.quote}&rdquo;</blockquote>
        <figcaption className="label mt-6 text-ink-soft">
          {lead.name}
          {lead.context && ` · ${lead.context}`}
          {lead.sourceUrl && (
            <a href={lead.sourceUrl} target="_blank" rel="noopener" className="link-rule ml-3">
              Source
            </a>
          )}
        </figcaption>
      </figure>
      {rest.length > 0 && (
        <div className="mt-16 grid gap-10 border-t border-line pt-10 md:grid-cols-2">
          {rest.map((t) => (
            <figure key={t.name + t.quote.slice(0, 12)}>
              <blockquote className="text-lede">&ldquo;{t.quote}&rdquo;</blockquote>
              <figcaption className="label mt-4 text-ink-soft">
                {t.name}
                {t.context && ` · ${t.context}`}
                {t.sourceUrl && (
                  <a href={t.sourceUrl} target="_blank" rel="noopener" className="link-rule ml-3">
                    Source
                  </a>
                )}
              </figcaption>
            </figure>
          ))}
        </div>
      )}
    </section>
  );
}
