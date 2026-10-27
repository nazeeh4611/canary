"use client";

import { useEffect } from "react";
import { track, type TrackEvent } from "@/lib/analytics";

/**
 * One delegated listener for every element with `data-track`, so contact
 * links can stay in server components. Sends the event name and a label
 * (e.g. "footer", "service:villa-interiors") — never personal data.
 */
export function ClickTracker() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const el = (e.target as Element | null)?.closest<HTMLElement>("[data-track]");
      if (!el) return;
      track(el.dataset.track as TrackEvent, { label: el.dataset.trackLabel, page: window.location.pathname });
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);
  return null;
}
