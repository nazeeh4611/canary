import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { hasRealProjects, projects } from "@/data/projects";
import { PageHeader } from "@/components/ui/PageHeader";
import { ProjectCard } from "@/components/portfolio/ProjectCard";
import { EnquiryBand } from "@/components/sections/EnquiryBand";
import { JsonLd } from "@/components/ui/JsonLd";
import { pageMetadata } from "@/lib/seo";
import { itemListSchema, webPageSchema } from "@/lib/schema";
import { site } from "@/config/site";

const description =
  "Residential and commercial interior projects by Canary Interior Design — villas, apartments, penthouses, offices, clinics and gardens in the UAE.";

export const metadata = pageMetadata({ title: "Interior Design Projects & Portfolio", description, path: "/projects" });

/**
 * Portfolio index. Layout alternates column spans in a repeating rhythm so the
 * grid never reads as uniform cards. Category filters are intentionally omitted
 * until there are enough real projects for filtering to be useful (~9+).
 */
const rhythm = [
  { span: "md:col-span-7", aspect: "aspect-[4/3]" },
  { span: "md:col-span-5 md:mt-32", aspect: "aspect-[4/5]" },
  { span: "md:col-span-5", aspect: "aspect-[4/5]" },
  { span: "md:col-span-6 md:col-start-7 md:mt-20", aspect: "aspect-[5/4]" },
];

export default function ProjectsPage() {
  const residential = projects.filter((p) => p.sector === "Residential").length;
  const commercial = projects.length - residential;

  return (
    <>
      <PageHeader
        crumbs={[{ name: "Projects", path: "/projects" }]}
        sheet="P-00 — Portfolio"
        title={
          <>
            Selected <em>projects.</em>
          </>
        }
        intro="Homes and commercial spaces across the UAE — each presented with its brief, scope and materials."
        aside={
          <p className="sheet mt-6 text-ink-soft">
            {residential} residential · {commercial} commercial
          </p>
        }
      />

      {!hasRealProjects && (
        <div className="frame">
          <p className="max-w-3xl border-l-2 border-canary pl-4 text-[0.9375rem] text-ink-soft">
            Our project case studies and photography are being prepared for this site. Until they&rsquo;re published, the entries
            below are samples showing how each project will be presented. To see recent work now, visit{" "}
            <a href={site.social.instagram} target="_blank" rel="noopener" className="link-rule text-ink">
              Canary on Instagram
            </a>
            .
          </p>
        </div>
      )}

      <section aria-label="Projects" className="frame grid gap-x-8 gap-y-16 py-16 md:grid-cols-12 md:py-24">
        {projects.map((p, i) => {
          const r = rhythm[i % rhythm.length];
          return <ProjectCard key={p.slug} project={p} index={i} aspect={r.aspect} className={r.span} headingLevel="h2" sizes="(min-width: 768px) 55vw, 100vw" />;
        })}
      </section>

      <section className="frame pb-20">
        <Link href="/services" className="group flex items-center justify-between gap-6 border-y border-ink py-8">
          <span className="font-display text-h3">Looking for a particular kind of project? Browse services.</span>
          <ArrowUpRight size={22} aria-hidden className="shrink-0" />
        </Link>
      </section>

      <EnquiryBand />
      <JsonLd data={webPageSchema({ name: "Projects", description, path: "/projects" })} />
      <JsonLd data={itemListSchema("Interior design projects", projects.map((p) => ({ name: p.title, path: `/projects/${p.slug}` })))} />
    </>
  );
}
