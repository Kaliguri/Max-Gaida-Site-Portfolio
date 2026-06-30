import { profile } from "@content/index";
import { Projects } from "@/components/projects";
import { ResumePreview } from "@/components/resume-preview";

const githubHref = profile.contacts.find((c) => c.icon === "github")?.href;

export default async function Home({ params }: Readonly<{ params: Promise<{ lang: string }> }>) {
  const { lang } = await params;
  return (
    <>
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

        <div className="reveal mt-8 grid gap-12 lg:grid-cols-[1.5fr_1fr]">
          <div className="space-y-5">
            {profile.summary.map((para, i) => (
              <p key={i} className="text-muted leading-relaxed">
                {para}
              </p>
            ))}
          </div>

          <dl className="space-y-5 text-sm">
            <div>
              <dt className="text-muted">Грейд</dt>
              <dd className="text-foreground mt-1">{profile.grade}</dd>
            </div>
            <div>
              <dt className="text-muted">Образование</dt>
              <dd className="text-foreground mt-1">
                {profile.education.program}
                <span className="text-muted block">
                  {profile.education.place} · {profile.education.year}
                </span>
              </dd>
            </div>
            <div>
              <dt className="text-muted">Языки</dt>
              <dd className="text-foreground mt-1">
                {profile.languages.map((l) => `${l.name} — ${l.level}`).join(", ")}
              </dd>
            </div>
            <div>
              <dt className="text-muted">Студия</dt>
              <dd className="text-foreground mt-1">
                {profile.brand.name}
                <span className="text-muted block">{profile.brand.note}</span>
              </dd>
            </div>
          </dl>
        </div>
      </section>

      <Projects />

      <ResumePreview lang={lang} />
    </>
  );
}
