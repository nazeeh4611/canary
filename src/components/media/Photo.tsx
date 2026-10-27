"use client";

import Image, { type ImageLoaderProps } from "next/image";
import { useState } from "react";
import type { DrawingMotif } from "@/types";

const PEXELS = "https://images.pexels.com/";

/**
 * Pexels' CDN resizes and compresses on request, so the browser downloads an
 * image sized for its slot (e.g. ~150 KB at 1080px) instead of the multi-megabyte
 * original. Works the same in the server build and the static export.
 */
function pexelsLoader({ src, width, quality }: ImageLoaderProps) {
  const url = new URL(src);
  url.search = "";
  url.searchParams.set("auto", "compress");
  url.searchParams.set("cs", "tinysrgb");
  url.searchParams.set("w", String(width));
  url.searchParams.set("q", String(quality ?? 70));
  return url.toString();
}

/**
 * Optimised photograph with responsive sizes. Pexels images are served by
 * Pexels' CDN; local images (e.g. Canary's own photos in /public) go through
 * Next.js image optimisation. If an image can't be loaded, it degrades to the
 * matching architectural drawing instead of a broken image.
 */
export function Photo({
  src,
  alt,
  sizes,
  priority,
  focus,
  fallback = "living-perspective",
}: {
  src: string;
  alt: string;
  sizes: string;
  priority?: boolean;
  focus?: string;
  fallback?: DrawingMotif;
}) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      // eslint-disable-next-line @next/next/no-img-element -- static vector fallback
      <img src={`/drawings/${fallback}-ink.svg`} alt={alt} className="absolute inset-[6%] h-[88%] w-[88%] object-contain" />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      priority={priority}
      loader={src.startsWith(PEXELS) ? pexelsLoader : undefined}
      className="object-cover"
      style={focus ? { objectPosition: focus } : undefined}
      onError={() => setFailed(true)}
    />
  );
}
