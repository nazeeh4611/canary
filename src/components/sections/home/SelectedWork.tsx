import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { projects, hasRealProjects } from "@/data/projects";
import { ProjectCard } from "@/components/portfolio/ProjectCard";
import { SheetLabel } from "@/components/ui/SheetLabel";

/** Asymmetric editorial sequence: one dominant project, one offset, two small. */
export function SelectedWork() {
  const [a, b, c, d] = projects;
  return (
    <section aria-labelledby="work-heading" className="border-t border-line bg-paper py-24 md:py-36">
      <div className="frame">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <SheetLabel sheet="A-03">Selected work</SheetLabel>
            <h2 id="work-heading" className="mt-6 max-w-xl text-h2">
              Homes and workplaces, <em>planned to be lived in.</em>
            </h2>
          </div>
          <Link href="/projects" className="btn btn-ghost self-start md:self-auto" data-track="cta_click" data-track-label="home_all_projects">
            View All Projects <ArrowUpRight size={16} aria-hidden />
          </Link>
        </div>

        {!hasRealProjects && (
          <p className="mt-8 max-w-2xl border-l-2 border-canary pl-4 text-[0.875rem] text-ink-soft">
            Project photography and case studies are being prepared. The entries below show how each project will be presented.
          </p>
        )}

        <div className="mt-14 grid gap-x-8 gap-y-16 md:grid-cols-12">
          {a && <ProjectCard project={a} index={0} aspect="aspect-[4/5] md:aspect-[5/4]" sizes="(min-width: 768px) 58vw, 100vw" className="md:col-span-7" />}
          {b && <ProjectCard project={b} index={1} aspect="aspect-[4/5]" sizes="(min-width: 768px) 38vw, 100vw" className="md:col-span-5 md:mt-32" />}
          {c && <ProjectCard project={c} index={2} aspect="aspect-[4/3]" sizes="(min-width: 768px) 38vw, 100vw" className="md:col-span-5 md:col-start-2" showSummary={false} />}
          {d && <ProjectCard project={d} index={3} aspect="aspect-[1/1]" sizes="(min-width: 768px) 33vw, 100vw" className="md:col-span-4 md:col-start-8 md:mt-24" showSummary={false} />}
        </div>
      </div>
    </section>
  );
}
