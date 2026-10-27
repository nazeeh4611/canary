import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * Typographic wordmark. Stand-in until Canary's official logo files
 * (SVG preferred) are supplied — then replace the contents of this component.
 */
export function Logo({ className, inverted = false }: { className?: string; inverted?: boolean }) {
  return (
    <Link href="/" aria-label="Canary Interior Design — home" className={cn("group inline-flex items-end gap-3", className)}>
      <span className={cn("font-display text-[1.5rem] leading-none tracking-[-0.04em]", inverted ? "text-ivory" : "text-ink")}>
        Canary<span className="text-canary">.</span>
      </span>
      <span className={cn("label hidden pb-[0.3rem] text-[0.5625rem] sm:block", inverted ? "text-stone" : "text-ink-soft")}>
        Interior
        <br />
        Design
      </span>
    </Link>
  );
}
