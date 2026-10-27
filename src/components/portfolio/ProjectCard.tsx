import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Figure } from "@/components/media/Figure";
import type { Project } from "@/types";
import { cn } from "@/lib/utils";

type Props = {
  project: Project;
  index: number;
  aspect?: string;
  sizes?: string;
  className?: string;
  headingLevel?: "h2" | "h3";
  showSummary?: boolean;
};

/** Project entry: image, then a title-block style caption. */
export function ProjectCard({ project, index, aspect = "aspect-[4/5]", sizes = "(min-width: 768px) 50vw, 100vw", className, headingLevel = "h3", showSummary = true }: Props) {
  const Heading = headingLevel;
  const meta = [project.category, project.location].filter(Boolean).join(" · ");
  return (
    <article className={cn("group relative", className)}>
      <div className="zoom-media overflow-hidden">
        <Figure media={project.cover} aspect={aspect} sizes={sizes} showProvenance={project.placeholder} />
      </div>
      <div className="mt-4 grid grid-cols-[auto_1fr_auto] items-baseline gap-x-4 border-t border-ink pt-3">
        <span className="sheet text-ink-soft">P-{String(index + 1).padStart(2, "0")}</span>
        <div>
          <Heading className="font-display text-h3">
            <Link href={`/projects/${project.slug}`} className="after:absolute after:inset-0">
              {project.title}
            </Link>
          </Heading>
          <p className="label mt-2 text-ink-soft">
            {meta}
            {project.placeholder && <span className="ml-2 border border-stone-deep px-1.5 py-0.5 text-[0.5625rem]">Sample entry</span>}
          </p>
          {showSummary && <p className="mt-3 max-w-md text-[0.9375rem] text-ink-soft">{project.summary}</p>}
        </div>
        <ArrowUpRight size={20} aria-hidden className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      </div>
    </article>
  );
}
