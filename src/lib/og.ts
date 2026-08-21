/**
 * Social preview images.
 *
 * The PNGs are NOT emitted by Next: the `opengraph-image` file convention
 * writes an extension-less file under static export, and GitHub Pages types
 * those as `application/octet-stream`, which messengers refuse to preview.
 * Instead `/[lang]/og/...` routes render the card as ordinary HTML and
 * `scripts/render-og.mjs` screenshots them into `out/og/<lang>/<name>.png`
 * after the build — the same post-build pattern as the résumé PDFs.
 *
 * Consequence: the files exist only in a built `out/`, so previews are 404 in
 * `next dev`. That is expected; CI renders them before the Pages upload.
 */
import type { Metadata } from "next";

/** Facebook/Telegram/X all read 1.91:1 — one size covers every network. */
export const OG_SIZE = { width: 1200, height: 630 } as const;

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/** Card names, mirrored by the route tree and the render script. */
export const ogName = {
  home: () => "home",
  resume: (slug: string) => `resume-${slug}`,
  project: (slug: string) => `project-${slug}`,
} as const;

/** In-site path of a rendered card. basePath-aware; `metadataBase` makes it absolute. */
export function ogImagePath(lang: string, name: string): string {
  return `${BASE}/og/${lang}/${name}.png`;
}

/** Ready-made `openGraph.images` / `twitter.images` entry for a route's metadata. */
export function ogImageMeta(
  lang: string,
  name: string,
): NonNullable<Metadata["openGraph"]>["images"] {
  return [{ url: ogImagePath(lang, name), ...OG_SIZE, type: "image/png" }];
}
