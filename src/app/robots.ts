import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/config/site";

/**
 * Production allows crawling. Set NEXT_PUBLIC_ALLOW_INDEXING=false on
 * staging/preview deployments to block them.
 */
export default function robots(): MetadataRoute.Robots {
  if (process.env.NEXT_PUBLIC_ALLOW_INDEXING === "false") {
    return { rules: { userAgent: "*", disallow: "/" } };
  }
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/api/"] },
    sitemap: absoluteUrl("/sitemap.xml"),
    host: absoluteUrl("/"),
  };
}
