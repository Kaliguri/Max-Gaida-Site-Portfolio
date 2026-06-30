import { z } from "zod";

/**
 * Content schemas. `content/` is the single typed source of truth for site
 * data (profile now; projects + résumés next). Data is RU-only for now — when
 * EN lands, localized fields gain a locale dimension. Schemas are parsed at
 * import time so invalid data fails the build, not the runtime.
 */

export const contactIconSchema = z.enum(["telegram", "mail", "github"]);
export type ContactIcon = z.infer<typeof contactIconSchema>;

export const contactSchema = z.object({
  label: z.string(),
  href: z.string(),
  icon: contactIconSchema,
  external: z.boolean(),
});
export type Contact = z.infer<typeof contactSchema>;

export const profileSchema = z.object({
  /** Public brand name. */
  name: z.string(),
  /** Hero headline (h1). */
  headline: z.string(),
  /** Small kicker above the headline — the facets. */
  eyebrow: z.string(),
  /** Hero one-liner under the headline. */
  lead: z.string(),
  /** "About" paragraphs, in order. */
  summary: z.array(z.string()).min(1),
  location: z.string(),
  /** Work formats: relocation / remote / hybrid. */
  availability: z.array(z.string()).min(1),
  grade: z.string(),
  education: z.object({
    place: z.string(),
    program: z.string(),
    year: z.number().int(),
  }),
  languages: z.array(z.object({ name: z.string(), level: z.string() })).min(1),
  brand: z.object({ name: z.string(), note: z.string() }),
  contacts: z.array(contactSchema).min(1),
});
export type Profile = z.infer<typeof profileSchema>;

export const projectStatusSchema = z.enum(["released", "in-progress", "jam", "educational"]);
export type ProjectStatus = z.infer<typeof projectStatusSchema>;

export const projectLinkSchema = z.object({
  label: z.string(),
  href: z.string().url(),
});
export type ProjectLink = z.infer<typeof projectLinkSchema>;

export const projectSchema = z.object({
  slug: z.string(),
  title: z.string(),
  /** Max's role + context, e.g. "Технический геймдизайнер · RedBoon". */
  role: z.string(),
  description: z.string(),
  /** One-line standout fact (commercial release, award, metric). */
  highlight: z.string().optional(),
  tags: z.array(z.string()).min(1),
  links: z.array(projectLinkSchema).default([]),
  status: projectStatusSchema,
  /** Featured = first shelf (cards); others render as a compact "more" list. */
  featured: z.boolean().default(false),
});
export type Project = z.infer<typeof projectSchema>;

export const projectsSchema = z.array(projectSchema);
