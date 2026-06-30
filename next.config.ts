import type { NextConfig } from "next";

/**
 * Static export for GitHub Pages.
 *
 * Deploy specifics stay OUT of app code: `basePath` / `assetPrefix` are derived
 * from the `NEXT_PUBLIC_BASE_PATH` env var, set by CI. Default is empty — the
 * production target is the custom domain `maxgaida.site`, which serves from root.
 * When deploying to the bare `*.github.io/<repo>` URL instead, CI sets
 * `NEXT_PUBLIC_BASE_PATH=/Max-Gaida-Site-Portfolio`.
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  // Emits `<route>/index.html` so static hosts resolve clean URLs without a server.
  trailingSlash: true,
  basePath: basePath || undefined,
  assetPrefix: basePath || undefined,
};

export default nextConfig;
