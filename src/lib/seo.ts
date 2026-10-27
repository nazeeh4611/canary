import type { Metadata } from "next";
import { absoluteUrl, site } from "@/config/site";

type PageMeta = {
  title: string;
  description: string;
  path: string;
  /** Absolute or root-relative OG image. Defaults to the generated site image. */
  image?: string;
  noindex?: boolean;
  type?: "website" | "article";
};

/**
 * Per-page metadata with canonical, Open Graph and Twitter tags.
 * Titles are composed by the root layout template: "<title> | Canary Interior Design".
 */
export function pageMetadata({ title, description, path, image, noindex, type = "website" }: PageMeta): Metadata {
  const url = absoluteUrl(path);
  const ogImage = image ?? "/opengraph-image";
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type,
      url,
      title: `${title} | ${site.name}`,
      description,
      siteName: site.name,
      locale: site.locale,
      images: [{ url: ogImage, width: 1200, height: 630, alt: site.name }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${site.name}`,
      description,
      images: [ogImage],
    },
    robots: noindex ? { index: false, follow: true } : undefined,
  };
}
