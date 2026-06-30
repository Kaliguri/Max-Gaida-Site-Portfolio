import { projects } from "@content/index";
import type { Project, ProjectStatus } from "@content/index";

const STATUS_LABEL: Record<ProjectStatus, string> = {
  released: "Релиз",
  "in-progress": "В работе",
  jam: "Геймджем",
  educational: "Учебный",
};

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

function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="border-border bg-surface hover:border-accent flex flex-col rounded-xl border p-6 transition-colors">
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-foreground text-lg font-semibold tracking-tight">{project.title}</h3>
        <span className="border-border text-muted shrink-0 rounded-full border px-2.5 py-0.5 text-xs">
          {STATUS_LABEL[project.status]}
        </span>
      </div>
      <p className="text-muted mt-1 text-sm">{project.role}</p>

      {project.highlight && (
        <p className="text-accent mt-3 text-sm font-medium">{project.highlight}</p>
      )}

      <p className="text-muted mt-3 text-sm leading-relaxed">{project.description}</p>

      <ul className="mt-4 flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <li
            key={tag}
            className="border-border text-muted rounded-full border px-2.5 py-1 text-xs"
          >
            {tag}
          </li>
        ))}
      </ul>

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
  const featured = projects.filter((p) => p.featured);
  const more = projects.filter((p) => !p.featured);

  return (
    <section
      id="projects"
      className="border-border mx-auto w-full max-w-5xl scroll-mt-20 border-t px-6 py-20 sm:px-10"
    >
      <h2 className="text-foreground text-2xl font-semibold tracking-tight sm:text-3xl">Проекты</h2>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {featured.map((project, i) => (
          <div key={project.slug} className={i === 0 ? "reveal sm:col-span-2" : "reveal"}>
            <ProjectCard project={project} />
          </div>
        ))}
      </div>

      {more.length > 0 && (
        <>
          <h3 className="text-muted mt-12 text-sm font-medium tracking-wide uppercase">
            Ещё проекты
          </h3>
          <ul className="divide-border border-border mt-4 divide-y border-t">
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
        </>
      )}
    </section>
  );
}
