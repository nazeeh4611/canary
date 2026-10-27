"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { Media } from "@/types";
import { Figure } from "@/components/media/Figure";
import { cn } from "@/lib/utils";

/**
 * Project gallery with an accessible lightbox built on <dialog>:
 * focus is trapped by the browser, Esc closes, arrow keys navigate,
 * and focus returns to the thumbnail that opened it.
 */
export function Gallery({ items, title }: { items: Media[]; title: string }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [active, setActive] = useState(0);

  const open = (i: number) => {
    setActive(i);
    dialogRef.current?.showModal();
  };

  const step = useCallback((d: number) => setActive((a) => (a + d + items.length) % items.length), [items.length]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    const onClose = () => triggerRefs.current[active]?.focus();
    dialog.addEventListener("keydown", onKey);
    dialog.addEventListener("close", onClose);
    return () => {
      dialog.removeEventListener("keydown", onKey);
      dialog.removeEventListener("close", onClose);
    };
  }, [active, step]);

  // Editorial rhythm: wide, then two narrower, repeating
  const layout = ["md:col-span-12 aspect-[16/9]", "md:col-span-7 aspect-[4/3]", "md:col-span-5 aspect-[4/5]"];

  return (
    <>
      <ul className="grid gap-4 md:grid-cols-12 md:gap-6">
        {items.map((m, i) => {
          const [span, aspect] = layout[i % layout.length].split(" ");
          return (
            <li key={i} className={span}>
              <button
                type="button"
                ref={(el) => {
                  triggerRefs.current[i] = el;
                }}
                onClick={() => open(i)}
                className="group block w-full text-left"
                aria-label={`Open image ${i + 1} of ${items.length}: ${m.alt}`}
              >
                <span className="zoom-media block overflow-hidden">
                  <Figure media={m} aspect={aspect} sizes="(min-width: 768px) 60vw, 100vw" showProvenance />
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      <dialog
        ref={dialogRef}
        aria-label={`${title} — gallery`}
        className="m-0 h-dvh max-h-none w-full max-w-none bg-ink p-0 text-ivory backdrop:bg-ink"
      >
        <div className="flex h-full flex-col">
          <div className="frame flex h-16 items-center justify-between">
            <p className="sheet text-stone" aria-live="polite">
              {active + 1} / {items.length}
            </p>
            <button type="button" onClick={() => dialogRef.current?.close()} className="inline-flex h-11 w-11 items-center justify-center" autoFocus>
              <X size={22} aria-hidden />
              <span className="sr-only">Close gallery</span>
            </button>
          </div>
          <div className="relative flex-1 px-[var(--gutter)] pb-6">
            <Figure media={items[active]} className="h-full w-full" sizes="100vw" />
          </div>
          <div className="frame flex items-center justify-between gap-4 pb-[calc(1.25rem+env(safe-area-inset-bottom))]">
            <p className="text-[0.875rem] text-stone">{items[active]?.alt}</p>
            <div className="flex gap-2">
              {[
                { d: -1, label: "Previous image", Icon: ChevronLeft },
                { d: 1, label: "Next image", Icon: ChevronRight },
              ].map(({ d, label, Icon }) => (
                <button
                  key={d}
                  type="button"
                  onClick={() => step(d)}
                  className={cn("inline-flex h-11 w-11 items-center justify-center border border-stone/40 hover:bg-ivory hover:text-ink")}
                >
                  <Icon size={20} aria-hidden />
                  <span className="sr-only">{label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
}
