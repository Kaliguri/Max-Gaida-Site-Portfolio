import { profile } from "@content/index";
import { Projects } from "@/components/projects";
import { ResumePreview } from "@/components/resume-preview";
import { Education } from "@/components/education";
import { SiteChrome } from "@/components/site-chrome";
import { PageToc } from "@/components/page-toc";

const githubHref = profile.contacts.find((c) => c.icon === "github")?.href;

export default async function Home({ params }: Readonly<{ params: Promise<{ lang: string }> }>) {
  const { lang } = await params;
  return (
    <SiteChrome>
      <PageToc />
      <section className="mx-auto w-full max-w-5xl px-6 py-24 sm:px-10 sm:py-32">
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

        <div
          className="fade-up mt-8 flex flex-wrap items-center gap-2 text-sm"
          style={{ animationDelay: "0.15s" }}
        >
          <span className="text-foreground">{profile.location}</span>
          <span className="text-border">·</span>
          {profile.availability.map((a) => (
            <span
              key={a}
              className="border-border text-muted rounded-full border px-3 py-1 text-xs"
            >
              {a}
            </span>
          ))}
        </div>

        <div className="fade-up mt-10 flex flex-wrap gap-4" style={{ animationDelay: "0.2s" }}>
          <a
            href="#contacts"
            className="bg-accent text-accent-foreground hover:bg-accent-hover inline-flex items-center rounded-full px-6 py-3 text-sm font-medium transition-colors"
          >
            Связаться
          </a>
          {githubHref && (
            <a
              href={githubHref}
              target="_blank"
              rel="noopener noreferrer"
              className="border-border text-foreground hover:border-accent inline-flex items-center rounded-full border px-6 py-3 text-sm font-medium transition-colors"
            >
              GitHub
            </a>
          )}
        </div>
      </section>

      <section
        id="about"
        className="border-border mx-auto w-full max-w-5xl scroll-mt-20 border-t px-6 py-20 sm:px-10"
      >
        <h2 className="text-foreground text-2xl font-semibold tracking-tight sm:text-3xl">
          О себе
        </h2>

        <div className="reveal mt-10">
          <h3 className="text-muted text-sm font-medium tracking-wide uppercase">Основное</h3>
          <div className="mt-5 space-y-5">
            {profile.summary.map((para, i) => (
              <p key={i} className="text-muted leading-relaxed">
                {para}
              </p>
            ))}
          </div>
        </div>

        <div className="reveal mt-12">
          <h3 className="text-muted text-sm font-medium tracking-wide uppercase">
            Поиск работы
          </h3>
          <div className="mt-5 flex flex-wrap items-center gap-2 text-sm">
            <span className="text-foreground">{profile.location}</span>
            <span className="text-border">·</span>
            {profile.jobSearch.preferred.map((f) => (
              <span
                key={f}
                className="border-border bg-surface text-foreground rounded-full border px-3 py-1 text-xs"
              >
                {f}
              </span>
            ))}
            {profile.jobSearch.openTo.map((f) => (
              <span
                key={f}
                className="border-border text-muted rounded-full border border-dashed px-3 py-1 text-xs"
              >
                {f}
              </span>
            ))}
          </div>
          {profile.jobSearch.note && (
            <p className="text-muted mt-4 text-sm leading-relaxed">{profile.jobSearch.note}</p>
          )}
        </div>

        <div className="reveal mt-12">
          <h3 className="text-muted text-sm font-medium tracking-wide uppercase">
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
