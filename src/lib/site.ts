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

/** Contact channels. Phone is intentionally never shown. */
export const CONTACTS = [
  { label: "Telegram", href: "https://t.me/kaliguri", external: true },
  { label: "Email", href: "mailto:maxgaida.work@gmail.com", external: false },
  { label: "GitHub", href: "https://github.com/Kaliguri", external: true },
] as const;

/**
 * Top-nav items. Anchor links to home sections — the list grows as Phase 3
 * adds sections (about/projects/resume). Labels are RU for now (RU-only ship);
 * they move into i18n dictionaries when EN lands.
 */
export const NAV = [{ label: "Контакты", href: "#contacts" }] as const;
