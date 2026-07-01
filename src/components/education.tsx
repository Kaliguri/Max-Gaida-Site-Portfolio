import { profile, projects } from "@content/index";
import { ProjectCard } from "@/components/projects";
import { bentoSpan } from "@/lib/bento";

const { education } = profile;
const educationProjects = projects.filter((p) => p.status === "educational");

/**
 * Education section — full block under "Резюме", split into three anchored
 * subsections (program / skills / ПД projects) so the left-side TOC
 * (PageToc, fed by NAV's `education.children`) can deep-link into each.
 */
export function Education() {
  return (
    <section
      id="education"
      className="border-border mx-auto w-full max-w-5xl scroll-mt-20 border-t px-6 pt-8 pb-10 sm:px-10 sm:pt-10 sm:pb-12"
    >
      <h2 className="text-foreground text-2xl font-semibold tracking-tight sm:text-3xl">
        Образование
      </h2>

      <div id="education-program" className="reveal mt-10 scroll-mt-24">
        <h3 className="text-accent text-sm font-medium tracking-wide uppercase">
          Программа обучения
        </h3>
        <dl className="mt-5 grid gap-5 text-sm sm:grid-cols-2">
          <div>
            <dt className="text-muted">Программа</dt>
            <dd className="text-foreground mt-1">{education.program}</dd>
          </div>
          <div>
            <dt className="text-muted">Вуз</dt>
            <dd className="text-foreground mt-1">
              {education.place} · {education.year}
            </dd>
          </div>
          <div>
            <dt className="text-muted">Факультет</dt>
            <dd className="text-foreground mt-1">{education.faculty}</dd>
          </div>
          <div>
            <dt className="text-muted">Направление</dt>
            <dd className="text-foreground mt-1">
              {education.direction.name} · {education.direction.code}
            </dd>
          </div>
        </dl>
      </div>

      <div id="education-skills" className="reveal mt-12 scroll-mt-24">
        <h3 className="text-accent text-sm font-medium tracking-wide uppercase">
          Полученные навыки
        </h3>
        <dl className="mt-4 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
          {education.skills.map((skill, i) => (
            <div
              key={skill.name}
              className={`${bentoSpan(i)} border-border bg-surface/40 rounded-lg border p-3`}
            >
              <dt className="text-foreground text-xs font-medium">{skill.name}</dt>
              <dd className="text-muted mt-1 text-xs leading-snug">{skill.detail}</dd>
            </div>
          ))}
        </dl>
      </div>

      {educationProjects.length > 0 && (
        <div id="education-projects" className="mt-12 scroll-mt-24">
          <h3 className="text-accent text-sm font-medium tracking-wide uppercase">
            Проекты в рамках ПД
          </h3>
          {education.note && (
            <p className="text-muted mt-3 text-sm leading-relaxed">{education.note}</p>
          )}
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {educationProjects.map((project) => (
              <div key={project.slug} className="reveal">
                <ProjectCard project={project} />
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
