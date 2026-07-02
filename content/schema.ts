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
  /** Role line directly under the greeting, above the headline (e.g. "Game
   *  Developer & Game Designer"). */
  roleLine: z.string(),
  /** Facet kicker rendered under the hero lead (the "Unity / C# · …" line). */
  eyebrow: z.string(),
  /** Hero one-liner under the headline. */
  lead: z.string(),
  /** "About" → "Основное": self-contained facets, in order. Each is a labelled
   *  block rendered as a bento card (label = short kicker, body = the prose). */
  summary: z.array(z.object({ label: z.string(), body: z.string() })).min(1),
  /** "О себе" → "Стек": dev-stack chips. Dev-focused only — design competencies
   *  (systems, balance, level) live in Projects, not here. `core` is the
   *  emphasized headline tier (large chips, conceptual, each with an optional
   *  detail subtitle); `groups` are labelled chip clusters with the concrete
   *  tech. A `muted` group (e.g. web) renders dimmed as a secondary strength. */
  stack: z.object({
    core: z.array(z.object({ name: z.string(), detail: z.string().optional() })).min(1),
    groups: z
      .array(z.object({ label: z.string(), items: z.array(z.string()).min(1), muted: z.boolean().optional() }))
      .min(1),
  }),
  location: z.string(),
  /** Work formats: relocation / remote / hybrid. Shown as flat chips in the hero. */
  availability: z.array(z.string()).min(1),
  grade: z.string(),
  /** "О себе" → "Поиск работы": prose write-up (format, relocation stance) —
   *  shown instead of chips, also reused on the résumé-picker cards. */
  jobSearch: z.object({
    summary: z.string(),
  }),
  /** "О себе" → "Soft Skills и прочее". */
  softSkills: z.array(z.object({ name: z.string(), detail: z.string() })).min(1),
  education: z.object({
    place: z.string(),
    program: z.string(),
    faculty: z.string(),
    direction: z.object({ name: z.string(), code: z.string() }),
    year: z.number().int(),
    /** Concrete competencies the program covered, each with a one-line gloss of what it means in practice. */
    skills: z.array(z.object({ name: z.string(), detail: z.string() })).default([]),
    /** Intro line for the program's team-project list (ПД), shown above that list. */
    note: z.string().optional(),
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
  /** Max's role + context, e.g. "Game Designer · RedBoon". */
  role: z.string(),
  description: z.string(),
  /** One-line standout fact (commercial release, award, metric). */
  highlight: z.string().optional(),
  /** Cover art for the homepage showcase carousel — path under `public/`. */
  image: z.string().optional(),
  links: z.array(projectLinkSchema).default([]),
  status: projectStatusSchema,
  /** Featured = first shelf (cards); others render as a compact "more" list. */
  featured: z.boolean().default(false),
  /** Promo/gameplay clip — path under `public/`. No poster yet (placeholder; final media pass adds one). */
  /** `title` overrides the lightbox header — falls back to the project title when absent. */
  video: z
    .object({ src: z.string(), poster: z.string().optional(), title: z.string().optional() })
    .optional(),
});
export type Project = z.infer<typeof projectSchema>;

export const projectsSchema = z.array(projectSchema);

export const experienceSchema = z.object({
  company: z.string(),
  role: z.string(),
  period: z.string(),
  bullets: z.array(z.string()).min(1),
  stack: z.array(z.string()).default([]),
});
export type Experience = z.infer<typeof experienceSchema>;
export const experiencesSchema = z.array(experienceSchema);

export const resumeRoleSlugSchema = z.enum(["unity-developer", "game-designer"]);
export type ResumeRoleSlug = z.infer<typeof resumeRoleSlugSchema>;

export const resumeRoleSchema = z.object({
  slug: resumeRoleSlugSchema,
  title: z.string(),
  /** Short framing of this facet. */
  focus: z.string(),
  /** Key skills for this role. */
  skills: z.array(z.string()).min(1),
});
export type ResumeRole = z.infer<typeof resumeRoleSchema>;
export const resumeRolesSchema = z.array(resumeRoleSchema);
