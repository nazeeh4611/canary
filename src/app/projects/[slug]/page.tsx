import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { getProject, projects, relatedProjects } from "@/data/projects";
import { getService } from "@/data/services";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Figure } from "@/components/media/Figure";
import { Gallery } from "@/components/portfolio/Gallery";
import { ProjectCard } from "@/components/portfolio/ProjectCard";
import { EnquiryBand } from "@/components/sections/EnquiryBand";
import { SheetLabel } from "@/components/ui/SheetLabel";
import { JsonLd } from "@/components/ui/JsonLd";
import { pageMetadata } from "@/lib/seo";
import { webPageSchema } from "@/lib/schema";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Params) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) return {};
  return pageMetadata({
    title: `${p.title}${p.location ? `, ${p.location}` : ""} Project`,
    description: p.summary,
    path: `/projects/${p.slug}`,
    type: "article",
    // Sample entries must not be indexed
    noindex: p.placeholder,
  });
}

export default async function ProjectPage({ params }: Params) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) notFound();

  const path = `/projects/${p.slug}`;
  const index = projects.findIndex((x) => x.slug === p.slug);
  const serviceLinks = p.services.map(getService).filter((s): s is NonNullable<typeof s> => Boolean(s));
  const related = relatedProjects(p);

  // Title block: only metadata that exists
  const meta = [
    { k: "Category", v: p.category },
    { k: "Sector", v: p.sector },
    p.location && { k: "Location", v: p.location },
    p.year && { k: "Completed", v: p.year },
  ].filter((m): m is { k: string; v: string } => Boolean(m));

  return (
    <>
      <article>
        <header className="frame pt-10 md:pt-14">
          <Breadcrumbs items={[{ name: "Projects", path: "/projects" }, { name: p.title, path }]} />
          {p.placeholder && (
            <p className="mt-8 inline-block border border-stone-deep px-3 py-2 text-[0.8125rem] text-ink-soft">
              Sample entry — this page shows how a project will be presented. Project details and photography to follow.
            </p>
          )}
          <div className="mt-12 grid gap-10 md:mt-16 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <p className="sheet text-ink-soft">P-{String(index + 1).padStart(2, "0")}</p>
              <h1 className="mt-4 text-h1">{p.title}</h1>
            </div>
            <p className="self-end text-lede text-ink-soft lg:col-span-4">{p.summary}</p>
          </div>
        </header>

        <div className="frame mt-12">
          <Figure media={p.cover} priority aspect="aspect-[4/3] md:aspect-[16/8]" sizes="(min-width: 1440px) 1360px, 100vw" showProvenance />
          {/* Title block, as on a drawing sheet */}
          <dl className="grid grid-cols-2 border-x border-b border-ink sm:grid-cols-4">
            {meta.map((m) => (
              <div key={m.k} className="border-r border-ink/15 px-4 py-3 last:border-r-0">
                <dt className="label text-ink-soft">{m.k}</dt>
                <dd className="mt-1 text-[0.9375rem]">{m.v}</dd>
              </div>
            ))}
          </dl>
        </div>

        <section aria-labelledby="scope-heading" className="frame grid gap-12 py-20 md:py-28 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SheetLabel sheet="01">Scope of work</SheetLabel>
            <h2 id="scope-heading" className="sr-only">
              Scope of work
            </h2>
            <ul className="mt-6 border-t border-ink">
              {p.scope.map((s) => (
                <li key={s} className="border-b border-line py-3">
                  {s}
                </li>
              ))}
            </ul>
            {serviceLinks.length > 0 && (
              <div className="mt-8">
                <p className="label text-ink-soft">Related services</p>
                <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-[0.9375rem]">
                  {serviceLinks.map((s) => (
                    <li key={s.slug}>
                      <Link href={`/services/${s.slug}`} className="link-rule">
                        {s.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          {p.concept && (
            <div className="lg:col-span-7 lg:col-start-6">
              <SheetLabel sheet="02">Design concept</SheetLabel>
              <h2 className="sr-only">Design concept</h2>
              <p className="mt-6 font-display text-h3">{p.concept}</p>
            </div>
          )}
        </section>

        {p.materials && p.materials.length > 0 && (
          <section aria-labelledby="materials-heading" className="bg-paper py-20 md:py-24">
            <div className="frame">
              <SheetLabel sheet="03">Material palette</SheetLabel>
              <h2 id="materials-heading" className="sr-only">
                Material palette
              </h2>
              <ul className="mt-10 grid grid-cols-2 gap-6 md:grid-cols-4">
                {p.materials.map((m) => (
                  <li key={m.name}>
                    <div className="aspect-square border border-ink/10" style={{ backgroundColor: m.swatch }} />
                    <p className="mt-3 font-medium">{m.name}</p>
                    {m.note && <p className="text-[0.875rem] text-ink-soft">{m.note}</p>}
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        {p.gallery.length > 0 && (
          <section aria-labelledby="gallery-heading" className="frame py-20 md:py-28">
            <SheetLabel sheet="04">Gallery</SheetLabel>
            <h2 id="gallery-heading" className="sr-only">
              Project gallery
            </h2>
            <div className="mt-10">
              <Gallery items={p.gallery} title={p.title} />
            </div>
          </section>
        )}
      </article>

      <section aria-labelledby="related-heading" className="border-t border-line py-20 md:py-28">
        <div className="frame">
          <div className="flex items-end justify-between gap-6">
            <h2 id="related-heading" className="text-h2">
              More projects
            </h2>
            <Link href="/projects" className="link-rule text-[0.9375rem] font-semibold">
              All projects
            </Link>
          </div>
          <div className="mt-12 grid gap-10 md:grid-cols-3">
            {related.map((r) => (
              <ProjectCard key={r.slug} project={r} index={projects.indexOf(r)} aspect="aspect-[4/3]" showSummary={false} sizes="(min-width: 768px) 33vw, 100vw" />
            ))}
          </div>
        </div>
      </section>

      <section className="frame pb-20">
        <Link href="/start-a-project" className="group flex items-center justify-between gap-6 border-y border-ink py-8" data-track="cta_click" data-track-label={`project:${p.slug}`}>
          <span className="font-display text-h3">Planning something similar? Tell us about your project.</span>
          <ArrowUpRight size={22} aria-hidden className="shrink-0" />
        </Link>
      </section>

      <EnquiryBand context={p.category === "Landscape" ? "landscaping" : `${p.category.toLowerCase()} interior`} trackLabel={`project_band:${p.slug}`} />
      <JsonLd data={webPageSchema({ name: p.title, description: p.summary, path })} />
    </>
  );
}
