/**
 * Site-wide constants. Single source for metadata that several places need
 * (layout metadata, OG images, sitemap). Content data lives in `content/` later;
 * this is only structural config.
 */
export const SITE = {
  name: "Max Gaida",
  domain: "maxgaida.site",
  url: "https://maxgaida.site",
  /** Default + currently-shipped locale. EN is deferred (RU-only first). */
  defaultLocale: "ru",
  /** All locales the route tree is structured for, even if not all ship yet. */
  locales: ["ru", "en"] as const,
} as const;

export type Locale = (typeof SITE.locales)[number];

export function isLocale(value: string): value is Locale {
  return (SITE.locales as readonly string[]).includes(value);
}
