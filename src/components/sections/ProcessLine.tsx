import { processStages } from "@/data/faqs";

/**
 * The project journey drawn as a dimension string: a ruled line with 45° ticks,
 * each stage measured off along it. Vertical on small screens.
 */
export function ProcessLine({ detailed = false, headingLevel = "h3" }: { detailed?: boolean; headingLevel?: "h2" | "h3" }) {
  const Heading = headingLevel;
  const tick = "absolute top-[-3px] h-[21px] w-px rotate-45 bg-ink";
  return (
    <ol className="grid md:grid-cols-5">
      {processStages.map((s, i) => (
        <li key={s.n} className="relative pb-12 pl-10 md:pb-0 md:pl-0 md:pr-8 md:pt-10">
          <span aria-hidden className="absolute bottom-0 left-[7px] top-[7px] w-px bg-ink/30 md:left-0 md:right-0 md:top-[7px] md:bottom-auto md:h-px md:w-auto" />
          <span aria-hidden className={`${tick} left-[7px]`} />
          {i === processStages.length - 1 && <span aria-hidden className={`${tick} right-0 hidden md:block`} />}

          <p aria-hidden data-n={s.n} className="ghost-num font-display text-[3.5rem] leading-none text-ink/15 md:text-[4.5rem]" />
          <Heading className="-mt-2 text-[1.25rem] font-sans font-semibold">
            <span className="sr-only">Stage {s.n}: </span>
            {s.title}
          </Heading>
          <p className="mt-3 text-[0.9375rem] text-ink-soft">{s.text}</p>
          {detailed && <p className="label mt-4 text-olive">{s.outcome}</p>}
        </li>
      ))}
    </ol>
  );
}
