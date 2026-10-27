import { cn } from "@/lib/utils";

/**
 * Section marker styled like a drawing-sheet reference: "A-02 — Selected work".
 * The recurring device that ties the editorial system together.
 */
export function SheetLabel({ sheet, children, className, inverted }: { sheet: string; children: React.ReactNode; className?: string; inverted?: boolean }) {
  return (
    <p className={cn("flex items-center gap-3", inverted ? "text-stone" : "text-ink-soft", className)}>
      <span className="sheet">{sheet}</span>
      <span aria-hidden className={cn("h-px w-8", inverted ? "bg-stone/50" : "bg-stone-deep")} />
      <span className="label">{children}</span>
    </p>
  );
}
