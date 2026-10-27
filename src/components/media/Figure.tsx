import { Photo } from "./Photo";
import type { Media } from "@/types";
import { cn } from "@/lib/utils";

const tones = {
  stone: { bg: "bg-stone", ink: "ink" },
  ivory: { bg: "bg-white ring-1 ring-inset ring-line", ink: "ink" },
  olive: { bg: "bg-olive", ink: "light" },
  charcoal: { bg: "bg-ink", ink: "light" },
} as const;

type Props = {
  media: Media;
  /** Tailwind aspect class, e.g. "aspect-[4/5]". Omit when the parent sizes the figure. */
  aspect?: string;
  sizes?: string;
  priority?: boolean;
  className?: string;
  /** Label drawings / stock photos as illustrative (use wherever an image could read as Canary's own project). */
  showProvenance?: boolean;
  /** Drawings only: "contain" mounts the whole sheet with a margin; "cover" crops to fill. */
  fit?: "cover" | "contain";
};

/** URL of a drawing pre-rendered to public/drawings by scripts/build-drawings.tsx. */
export function drawingSrc(motif: string, ink: "ink" | "light" = "ink") {
  return `/drawings/${motif}-${ink}.svg`;
}

export function Figure({ media, aspect, sizes = "100vw", priority, className, showProvenance = false, fit = "contain" }: Props) {
  if (media.kind === "drawing") {
    const tone = tones[media.tone ?? "stone"];
    return (
      <div className={cn("relative overflow-hidden", tone.bg, aspect, className)}>
        {/* Static SVG file: kept out of the DOM, cached, and lazy-loaded below the fold */}
        {/* eslint-disable-next-line @next/next/no-img-element -- vector drawing, no raster optimisation needed */}
        <img
          src={drawingSrc(media.motif, tone.ink)}
          alt={media.alt}
          width={1200}
          height={900}
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : undefined}
          decoding="async"
          className={cn("absolute", fit === "cover" ? "inset-0 h-full w-full object-cover" : "inset-[6%] h-[88%] w-[88%] object-contain")}
        />
        {showProvenance && <Provenance>Drawing · photography to follow</Provenance>}
      </div>
    );
  }

  return (
    <div className={cn("relative overflow-hidden bg-stone", aspect, className)}>
      <Photo src={media.src} alt={media.alt} sizes={sizes} priority={priority} focus={media.focus} fallback={media.fallback} />
      {/* Stock images are labelled where they could be mistaken for Canary's own work */}
      {media.kind === "stock" && showProvenance && <Provenance>Illustrative photo{media.credit ? ` · ${media.credit}` : ""}</Provenance>}
    </div>
  );
}

function Provenance({ children }: { children: React.ReactNode }) {
  return <span className="label absolute bottom-3 left-3 bg-ivory/90 px-2 py-1 text-[0.625rem] text-ink-soft">{children}</span>;
}
