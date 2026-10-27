import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { getService, services } from "@/data/services";
import { projectsForService } from "@/data/projects";
import { guidesForService } from "@/data/guides";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Figure } from "@/components/media/Figure";
import { FaqList } from "@/components/ui/FaqList";
import { ProjectCard } from "@/components/portfolio/ProjectCard";
import { EnquiryBand } from "@/components/sections/EnquiryBand";
import { SheetLabel } from "@/components/ui/SheetLabel";
import { JsonLd } from "@/components/ui/JsonLd";
import { pageMetadata } from "@/lib/seo";
import { serviceSchema, webPageSchema } from "@/lib/schema";
import { whatsappUrl } from "@/config/site";
import { cn } from "@/lib/utils";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Params) {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) return {};
  return pageMetadata({ title: s.seo.title, description: s.seo.description, path: `/services/${s.slug}` });
}

/** Group-specific band colour gives each family of services its own register. */
const bandTone = {
  Residential: "bg-sand",
  Commercial: "bg-olive-deep text-ivory",
  Studio: "bg-paper",
} as const;

export default async function ServicePage({ params }: Params) {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) notFound();

  const related = s.related.map(getService).filter((r): r is NonNullable<typeof r> => Boolean(r));
  const work = projectsForService(s.slug).slice(0, 2);
  const reading = guidesForService(s.slug);
  const path = `/services/${s.slug}`;
  const isDark = s.group === "Commercial";

  return (
    <>
      <header className="frame pt-10 md:pt-14">
        <Breadcrumbs items={[{ name: "Services", path: "/services" }, { name: s.name, path }]} />
        <div className="mt-12 grid gap-10 md:mt-20 lg:grid-cols-12">
          <p aria-hidden data-n={s.index} className="ghost-num font-display text-[7rem] leading-[0.8] text-ink/10 lg:col-span-2 lg:text-[10rem]" />
          <div className="lg:col-span-7">
            <p className="label text-ink-soft">{s.group} · Service</p>
            <h1 className="mt-4 text-h1">
              {s.name} <em className="block">in Ajman &amp; across the UAE</em>
            </h1>
            <p className="mt-6 max-w-xl text-lede text-ink-soft">{s.lede} {s.summary}</p>
          </div>
          <div className="flex flex-col gap-3 self-end lg:col-span-3">
            <Link href={`/start-a-project?service=${s.slug}`} className="btn btn-solid" data-track="cta_click" data-track-label={`service:${s.slug}`}>
              Discuss Your Project <ArrowUpRight size={16} aria-hidden />
            </Link>
            <a href={whatsappUrl(s.shortName)} target="_blank" rel="noopener" className="btn btn-ghost" data-track="whatsapp_click" data-track-label={`service:${s.slug}`}>
              WhatsApp Our Team <ArrowUpRight size={16} aria-hidden />
            </a>
          </div>
        </div>
      </header>

      <div className="frame mt-14 md:mt-20">
        <Figure media={s.cover} priority aspect="aspect-[4/3] md:aspect-[21/9]" sizes="(min-width: 1440px) 1360px, 100vw" showProvenance />
      </div>

      {/* Intro + emphasis */}
      <section aria-label="Overview" className="frame grid gap-12 py-20 md:py-28 lg:grid-cols-12">
        <div className="prose-canary text-[1.0625rem] leading-relaxed lg:col-span-6">
          {s.intro.map((p) => (
            <p key={p.slice(0, 20)}>{p}</p>
          ))}
        </div>
        <blockquote className="border-l border-ink pl-6 font-display text-h3 !font-light lg:col-span-5 lg:col-start-8 lg:self-center">
          {s.emphasis}
        </blockquote>
      </section>

      {/* What it includes */}
      <section aria-labelledby="includes-heading" className={cn("py-20 md:py-28", bandTone[s.group])}>
        <div className="frame grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SheetLabel sheet={`S-${s.index}.1`} inverted={isDark}>
              Scope
            </SheetLabel>
            <h2 id="includes-heading" className="mt-6 text-h2">
              What the service includes
            </h2>
            <p className={cn("mt-4 text-[0.9375rem]", isDark ? "text-stone" : "text-ink-soft")}>
              The final scope is agreed for each project — this is what it can cover.
            </p>
          </div>
          <ol className="grid gap-x-10 sm:grid-cols-2 lg:col-span-8">
            {s.includes.map((inc, i) => (
              <li key={inc} className={cn("grid grid-cols-[2.5rem_1fr] border-t py-4", isDark ? "border-ivory/25" : "border-ink/15")}>
                <span className={cn("sheet", isDark ? "text-stone" : "text-ink-soft")}>{String(i + 1).padStart(2, "0")}</span>
                <span>{inc}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Who it's for */}
      <section aria-labelledby="for-heading" className="frame py-20 md:py-28">
        <SheetLabel sheet={`S-${s.index}.2`}>Who it&rsquo;s for</SheetLabel>
        <h2 id="for-heading" className="sr-only">
          Who this service is for
        </h2>
        <ul className={cn("mt-10 grid gap-px bg-line sm:grid-cols-2", s.forWhom.length > 3 ? "lg:grid-cols-4" : "lg:grid-cols-3")}>
          {s.forWhom.map((f) => (
            <li key={f.title} className="bg-ivory py-6 pr-6 sm:p-8">
              <h3 className="font-display text-h3">{f.title}</h3>
              <p className="mt-3 text-ink-soft">{f.text}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* Approach */}
      <section aria-labelledby="approach-heading" className="border-t border-line py-20 md:py-28">
        <div className="frame">
          <SheetLabel sheet={`S-${s.index}.3`}>Approach</SheetLabel>
          <h2 id="approach-heading" className="mt-6 max-w-2xl text-h2">
            How we approach {s.name.toLowerCase()}
          </h2>
          <ol className="mt-12 grid gap-10 md:grid-cols-2 lg:grid-cols-4">
            {s.approach.map((a, i) => (
              <li key={a.title}>
                <div className="flex items-center gap-3">
                  <span className="sheet">{String(i + 1).padStart(2, "0")}</span>
                  <span aria-hidden className="h-px flex-1 bg-ink/25" />
                </div>
                <h3 className="mt-5 text-[1.125rem] font-sans font-semibold">{a.title}</h3>
                <p className="mt-2 text-ink-soft">{a.text}</p>
              </li>
            ))}
          </ol>
          <Link href="/process" className="link-rule mt-12 inline-block text-[0.9375rem] font-semibold">
            See the full project process
          </Link>
        </div>
      </section>

      {/* Relevant projects */}
      {work.length > 0 && (
        <section aria-labelledby="work-heading" className="bg-paper py-20 md:py-28">
          <div className="frame">
            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <div>
                <SheetLabel sheet={`S-${s.index}.4`}>Related work</SheetLabel>
                <h2 id="work-heading" className="mt-6 text-h2">
                  Projects
                </h2>
              </div>
              <Link href="/projects" className="link-rule self-start text-[0.9375rem] font-semibold md:self-auto">
                View all projects
              </Link>
            </div>
            <div className="mt-12 grid gap-10 md:grid-cols-2">
              {work.map((p, i) => (
                <ProjectCard key={p.slug} project={p} index={i} aspect="aspect-[4/3]" />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQs */}
      <section aria-labelledby="faq-heading" className="frame grid gap-10 py-20 md:py-28 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <SheetLabel sheet={`S-${s.index}.5`}>Questions</SheetLabel>
          <h2 id="faq-heading" className="mt-6 text-h2">
            {s.name}: common questions
          </h2>
        </div>
        <div className="lg:col-span-7 lg:col-start-6">
          <FaqList faqs={s.faqs} />
        </div>
      </section>

      {reading.length > 0 && (
        <section aria-labelledby="guides-heading" className="frame pb-16">
          <h2 id="guides-heading" className="label text-ink-soft">
            Further reading
          </h2>
          <ul className="mt-5 grid gap-6 border-t border-ink pt-6 md:grid-cols-2">
            {reading.map((g) => (
              <li key={g.slug}>
                <Link href={`/guides/${g.slug}`} className="group flex items-start justify-between gap-4">
                  <span>
                    <span className="block text-h3 group-hover:text-umber">{g.title}</span>
                    <span className="mt-2 block text-[0.9375rem] text-ink-soft">{g.excerpt}</span>
                  </span>
                  <ArrowUpRight size={18} aria-hidden className="mt-1 shrink-0" />
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Related services */}
      <section aria-labelledby="related-heading" className="frame pb-20 md:pb-28">
        <h2 id="related-heading" className="label text-ink-soft">
          Related services
        </h2>
        <ul className="mt-5 grid border-t border-ink md:grid-cols-3">
          {related.map((r) => (
            <li key={r.slug} className="border-b border-line md:border-b-0 md:border-r md:last:border-r-0">
              <Link href={`/services/${r.slug}`} className="group flex items-start justify-between gap-4 py-6 md:px-6 md:first:pl-0">
                <span>
                  <span className="sheet text-ink-soft">{r.index}</span>
                  <span className="mt-2 block font-display text-[1.625rem] leading-tight group-hover:text-umber">{r.name}</span>
                </span>
                <ArrowUpRight size={18} aria-hidden className="mt-6 shrink-0" />
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <EnquiryBand context={s.shortName} trackLabel={`service_band:${s.slug}`} />
      <JsonLd data={serviceSchema(s)} />
      <JsonLd data={webPageSchema({ name: s.seo.title, description: s.seo.description, path })} />
    </>
  );
}
