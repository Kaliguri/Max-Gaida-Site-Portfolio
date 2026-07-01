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
