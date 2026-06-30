import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";
import { resumeRoles } from "@content/index";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const lang = SITE.defaultLocale;
  const now = new Date();

  return [
    { url: `${SITE.url}/${lang}/`, lastModified: now, priority: 1 },
    ...resumeRoles.map((r) => ({
      url: `${SITE.url}/${lang}/resume/${r.slug}/`,
      lastModified: now,
      priority: 0.8,
    })),
  ];
}
