import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/config/site";
import { services } from "@/data/services";
import { projects } from "@/data/projects";
import { guides } from "@/data/guides";

/** Content last changed — update when site copy changes materially. */
const SITE_UPDATED = new Date("2026-10-27");

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: { path: string; priority: number; freq: "weekly" | "monthly" | "yearly" }[] = [
    { path: "/", priority: 1, freq: "weekly" },
    { path: "/services", priority: 0.9, freq: "monthly" },
    { path: "/projects", priority: 0.9, freq: "weekly" },
    { path: "/about", priority: 0.7, freq: "monthly" },
    { path: "/process", priority: 0.6, freq: "monthly" },
    { path: "/guides", priority: 0.7, freq: "weekly" },
    { path: "/contact", priority: 0.8, freq: "monthly" },
    { path: "/start-a-project", priority: 0.8, freq: "monthly" },
    { path: "/privacy-policy", priority: 0.2, freq: "yearly" },
    { path: "/terms", priority: 0.2, freq: "yearly" },
  ];

  return [
    ...pages.map((p) => ({ url: absoluteUrl(p.path), lastModified: SITE_UPDATED, changeFrequency: p.freq, priority: p.priority })),
    ...services.map((s) => ({ url: absoluteUrl(`/services/${s.slug}`), lastModified: SITE_UPDATED, changeFrequency: "monthly" as const, priority: 0.8 })),
    ...guides.map((g) => ({ url: absoluteUrl(`/guides/${g.slug}`), lastModified: new Date(g.updated), changeFrequency: "monthly" as const, priority: 0.6 })),
    // Sample (placeholder) projects are noindex and deliberately excluded
    ...projects
      .filter((p) => !p.placeholder)
      .map((p) => ({ url: absoluteUrl(`/projects/${p.slug}`), changeFrequency: "monthly" as const, priority: 0.7 })),
  ];
}
