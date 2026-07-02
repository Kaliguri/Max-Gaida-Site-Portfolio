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
 * Deploy base path, inlined at build from CI (empty on the custom domain,
 * `/Max-Gaida-Site-Portfolio` on the bare github.io URL). See next.config.ts.
 * Next only rewrites `<Link>` / `next/image` for basePath — raw `<a>` anchors
 * are NOT rewritten, so any hand-written in-site href must go through `localeHash`.
 */
const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/**
 * Absolute in-site href to a home-page section anchor — basePath- and
 * locale-aware. For raw `<a>` (native hash scroll from any page). Do NOT feed
 * this to `<Link>` / route navigation: those apply basePath themselves, so pass
 * them the app-relative `/${defaultLocale}/...` path instead.
 */
export function localeHash(hash: string): string {
  return `${BASE}/${SITE.defaultLocale}/#${hash}`;
}

/**
 * Left-side page TOC (PageToc). Anchor links to home sections. Labels are RU
 * for now (RU-only ship); they move into i18n dictionaries when EN lands.
 * Profile data (incl. contacts) lives in `content/`, not here. The top header
 * nav is a separate, deliberately shorter set defined in SiteHeader/MobileNav.
 */
export const NAV = [
  { label: "Приветствие", id: "intro" },
  { label: "Витрина проектов", id: "showcase" },
  {
    label: "О себе",
    id: "about",
    children: [
      { label: "Основное", id: "about-summary" },
      { label: "Стек", id: "about-stack" },
      { label: "Поиск работы", id: "about-job-search" },
      { label: "Soft Skills и прочее", id: "about-soft-skills" },
    ],
  },
  { label: "Резюме", id: "resume" },
  {
    label: "Образование",
    id: "education",
    children: [
      { label: "Программа обучения", id: "education-program" },
      { label: "Полученные навыки", id: "education-skills" },
      { label: "Проекты в рамках ПД", id: "education-projects" },
    ],
  },
  {
    label: "Проекты",
    id: "projects",
    children: [
      { label: "Основное", id: "projects-featured" },
      { label: "Дополнительно", id: "projects-more" },
    ],
  },
] as const;

/**
 * Top header / mobile nav — a deliberately shorter, curated set than the TOC
 * `NAV`. Single source for both layouts (they render different chrome but the
 * same links). `submenu: "resumeRoles"` expands the résumé role list from
 * content. `hash` targets a home-page section via `localeHash`.
 */
export const HEADER_NAV = [
  { label: "Основное", hash: "about" },
  { label: "Резюме", hash: "resume", submenu: "resumeRoles" },
] as const;
