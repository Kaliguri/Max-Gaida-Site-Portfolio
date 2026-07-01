import { profile } from "@content/index";
import { Projects } from "@/components/projects";
import { ProjectShowcase } from "@/components/project-showcase";
import { ResumePreview } from "@/components/resume-preview";
import { Education } from "@/components/education";
import { SiteChrome } from "@/components/site-chrome";
import { PageToc } from "@/components/page-toc";

export default async function Home({ params }: Readonly<{ params: Promise<{ lang: string }> }>) {
  const { lang } = await params;
  return (
    <SiteChrome>
      <PageToc />
      <section className="mx-auto w-full max-w-5xl px-6 pt-24 pb-10 sm:px-10 sm:pt-32 sm:pb-12">
        <p className="text-accent fade-up text-sm font-medium tracking-wide uppercase">
          {profile.eyebrow}
        </p>
        <h1
          className="text-foreground fade-up mt-5 max-w-3xl text-4xl leading-[1.05] font-semibold tracking-tight sm:text-6xl"
          style={{ animationDelay: "0.05s" }}
        >
          {profile.headline}
        </h1>
        <p
          className="text-muted fade-up mt-6 max-w-xl text-lg leading-relaxed"
          style={{ animationDelay: "0.1s" }}
        >
          {profile.lead}
        </p>
      </section>

      <ProjectShowcase />

      <section
        id="about"
        className="border-border mx-auto w-full max-w-5xl scroll-mt-20 border-t px-6 pt-8 pb-10 sm:px-10 sm:pt-10 sm:pb-12"
      >
        <h2 className="text-foreground text-2xl font-semibold tracking-tight sm:text-3xl">
          О себе
        </h2>

        <div id="about-summary" className="reveal mt-10 scroll-mt-24">
          <h3 className="text-accent text-sm font-medium tracking-wide uppercase">Основное</h3>
          <div className="mt-5 space-y-5">
            {profile.summary.map((para, i) => (
              <p key={i} className="text-muted leading-relaxed">
                {para}
              </p>
            ))}
          </div>
        </div>

        <div id="about-job-search" className="reveal mt-12 scroll-mt-24">
          <h3 className="text-accent text-sm font-medium tracking-wide uppercase">Поиск работы</h3>
          <p className="text-muted mt-5 text-sm leading-relaxed">
            <span className="text-foreground">{profile.location}</span> ·{" "}
            {profile.jobSearch.summary}
          </p>
        </div>

        <div id="about-soft-skills" className="reveal mt-12 scroll-mt-24">
          <h3 className="text-accent text-sm font-medium tracking-wide uppercase">
            Soft Skills и прочее
          </h3>
          <dl className="mt-5 grid gap-4 sm:grid-cols-2">
            {profile.softSkills.map((skill) => (
              <div key={skill.name}>
                <dt className="text-foreground text-sm font-medium">{skill.name}</dt>
                <dd className="text-muted mt-1 text-sm leading-relaxed">{skill.detail}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-8">
            <p className="text-muted text-sm">Языки</p>
            <p className="text-foreground mt-1 text-sm">
              {profile.languages.map((l) => `${l.name} — ${l.level}`).join(", ")}
            </p>
          </div>
        </div>
      </section>

      <ResumePreview lang={lang} />

      <Education />

      <Projects />
    </SiteChrome>
  );
}
