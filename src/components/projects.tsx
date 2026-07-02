import { projects } from "@content/index";
import type { Project } from "@content/index";
import { ProjectVideo } from "@/components/project-video";
import { ArrowUpRightIcon } from "@/components/icons";

export function ProjectCard({
  project,
  detailHref,
  anchored = true,
}: {
  project: Project;
  /** When set, render a "Подробнее в проектах →" link jumping to the canonical
   *  entry (used by the Education section for its cross-listed study projects). */
  detailHref?: string;
  /** Owns the canonical `#project-<slug>` anchor. Set false for a duplicate
   *  render (Education) so the id stays unique to the Projects-section card. */
  anchored?: boolean;
}) {
  return (
    <article
      id={anchored ? `project-${project.slug}` : undefined}
      className="surface-card flex scroll-mt-24 flex-col p-6"
    >
      <h3 className="text-foreground text-lg font-semibold tracking-tight">{project.title}</h3>
      <p className="text-muted mt-1 text-sm">{project.role}</p>

      {project.highlight && (
        <p className="text-accent mt-3 text-sm font-medium">{project.highlight}</p>
      )}

      <p className="text-muted mt-3 text-sm leading-relaxed">{project.description}</p>

      {project.video && (
        <ProjectVideo
          src={project.video.src}
          poster={project.video.poster}
          title={project.video.title ?? project.title}
        />
      )}

      {project.links.length > 0 && (
        <div className="mt-auto flex flex-wrap gap-2.5 pt-5">
          {project.links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="border-border text-muted hover:border-accent hover:text-accent inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors"
            >
              {link.label}
              <ArrowUpRightIcon />
            </a>
          ))}
        </div>
      )}

      {detailHref && (
        <a
          href={detailHref}
          className={`text-accent hover:text-foreground inline-flex items-center gap-1 text-sm font-medium transition-colors ${
            project.links.length > 0 ? "mt-4" : "mt-auto pt-5"
          }`}
        >
          Подробнее в проектах
          <span aria-hidden="true">→</span>
        </a>
      )}
    </article>
  );
}

export function Projects() {
  // Educational-status projects (Few Seconds, The Silent Eclipse) are shown
  // under "Образование" instead — exclude them here to avoid duplication.
  const shelf = projects.filter((p) => p.status !== "educational" || p.inShowcase);
  const featured = shelf.filter((p) => p.featured);
  const more = shelf.filter((p) => !p.featured);

  return (
    <section
      id="projects"
      className="border-border mx-auto w-full max-w-5xl scroll-mt-20 border-t px-6 pt-8 pb-20 sm:px-10 sm:pt-10"
    >
      <h2 className="text-foreground text-2xl font-semibold tracking-tight sm:text-3xl">Проекты</h2>

      <div id="projects-featured" className="mt-10 scroll-mt-24">
        <h3 className="text-accent text-sm font-medium tracking-wide uppercase">Основное</h3>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          {featured.map((project, i) => (
            <div key={project.slug} className={i === 0 ? "reveal sm:col-span-2" : "reveal"}>
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
      </div>

      {more.length > 0 && (
        <div id="projects-more" className="mt-12 scroll-mt-24">
          <h3 className="text-accent text-sm font-medium tracking-wide uppercase">Дополнительно</h3>
          <ul className="divide-border border-border mt-5 divide-y border-t">
            {more.map((project) => (
              <li
                key={project.slug}
                id={`project-${project.slug}`}
                className="flex scroll-mt-24 flex-col gap-1 py-4 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
              >
                <p className="text-muted text-sm">
                  <span className="text-foreground font-medium">{project.title}</span> —{" "}
                  {project.description}
                </p>
                {project.links[0] && (
                  <a
                    href={project.links[0].href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-foreground hover:text-accent inline-flex shrink-0 items-center gap-1 text-sm font-medium transition-colors"
                  >
                    {project.links[0].label}
                    <ArrowUpRightIcon />
                  </a>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
