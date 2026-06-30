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

/**
 * Top-nav items. Anchor links to home sections — the list grows as Phase 3
 * adds sections (projects/resume). Labels are RU for now (RU-only ship);
 * they move into i18n dictionaries when EN lands. Profile data (incl. contacts)
 * lives in `content/`, not here.
 */
export const NAV = [
  { label: "О себе", href: "#about" },
  { label: "Проекты", href: "#projects" },
  { label: "Контакты", href: "#contacts" },
] as const;
