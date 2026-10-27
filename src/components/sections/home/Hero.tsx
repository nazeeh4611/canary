import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Figure } from "@/components/media/Figure";
import { heroCaption, heroMedia } from "@/data/home";
import { site } from "@/config/site";

/**
 * Editorial cover: a narrow text column against a dominant image, with a
 * drawing-set title block anchored to the image corner.
 */
export function Hero() {
  return (
    <section aria-labelledby="hero-heading" className="relative">
      <div className="frame grid gap-8 pb-10 pt-6 md:pt-10 lg:min-h-[calc(100svh-var(--header-h))] lg:grid-cols-12 lg:gap-0 lg:pb-0 lg:pt-0">
        <div className="flex flex-col justify-between lg:col-span-5 lg:py-14 lg:pr-12">
          <p className="label rise text-ink-soft">
            Interior design <span className="text-stone-deep">·</span> Renovation <span className="text-stone-deep">·</span> Fit-out
          </p>

          <div className="mt-8 lg:mt-0">
            <h1 id="hero-heading" className="rise rise-2 text-display">
              Spaces with a sense of <em>purpose.</em>
            </h1>
            <p className="rise rise-3 mt-6 max-w-[34ch] text-lede text-ink-soft">
              Canary is an interior design and fit-out studio in Ajman. We plan, design and build homes and commercial spaces
              across the UAE — from the first layout to the last joinery detail.
            </p>
            <div className="rise rise-3 mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/start-a-project" className="btn btn-solid" data-track="cta_click" data-track-label="hero_discuss">
                Discuss Your Project <ArrowUpRight size={16} aria-hidden />
              </Link>
              <Link href="/projects" className="btn btn-ghost" data-track="cta_click" data-track-label="hero_work">
                Explore Our Work <ArrowUpRight size={16} aria-hidden />
              </Link>
            </div>
          </div>

          <dl className="mt-12 hidden grid-cols-2 gap-6 border-t border-line pt-5 lg:grid">
            <div>
              <dt className="label text-ink-soft">Studio</dt>
              <dd className="mt-1.5 text-[0.9375rem]">{site.address.locality}, UAE</dd>
            </div>
            <div>
              <dt className="label text-ink-soft">Work</dt>
              <dd className="mt-1.5 text-[0.9375rem]">Residential &amp; commercial</dd>
            </div>
          </dl>
        </div>

        <div className="relative -mx-[var(--gutter)] lg:col-span-7 lg:mx-0 lg:-mr-[var(--gutter)]">
          <Figure media={heroMedia} fit="cover" priority sizes="(min-width: 1024px) 60vw, 100vw" className="aspect-[5/4] sm:aspect-[16/11] lg:absolute lg:inset-0 lg:aspect-auto" />
          <div className="absolute bottom-0 right-0 hidden border-l border-t border-ink/20 bg-ivory text-ink sm:grid sm:grid-cols-[auto_1fr]">
            <span className="sheet border-r border-ink/15 px-4 py-3">{heroCaption.sheet}</span>
            <span className="label px-4 py-3">{heroCaption.title}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
