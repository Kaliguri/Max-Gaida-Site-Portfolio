import { projects } from "@content/index";
import type { Project } from "@content/index";
import { ProjectVideo } from "@/components/project-video";

function ArrowOut() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M7 17 17 7" />
      <path d="M8 7h9v9" />
    </svg>
  );
}

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article
      id={`project-${project.slug}`}
      className="border-border bg-surface hover:border-accent flex scroll-mt-24 flex-col rounded-xl border p-6 transition-colors"
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
        <div className="mt-auto flex flex-wrap gap-4 pt-5">
          {project.links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground hover:text-accent inline-flex items-center gap-1 text-sm font-medium transition-colors"
            >
              {link.label}
              <ArrowOut />
            </a>
          ))}
        </div>
      )}
    </article>
  );
}

export function Projects() {
  // Educational-status projects (Few Seconds, The Silent Eclipse) are shown
  // under "Образование" instead — exclude them here to avoid duplication.
  const shelf = projects.filter((p) => p.status !== "educational");
  const featured = shelf.filter((p) => p.featured);
  const more = shelf.filter((p) => !p.featured);

  return (
    <section
      id="projects"
      className="border-border mx-auto w-full max-w-5xl scroll-mt-20 border-t px-6 py-20 sm:px-10"
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
                className="flex flex-col gap-1 py-4 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
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
                    <ArrowOut />
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
