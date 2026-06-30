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
  /** Bridge identity shown as the hero headline. */
  role: z.string(),
  /** Secondary role line. */
  roleSub: z.string(),
  /** Hero one-liner. */
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
