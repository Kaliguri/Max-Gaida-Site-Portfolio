import { profile } from "@content/index";
import { Projects } from "@/components/projects";
import { ProjectShowcase } from "@/components/project-showcase";
import { ResumePreview } from "@/components/resume-preview";
import { Education } from "@/components/education";
import { SiteChrome } from "@/components/site-chrome";
import { PageToc } from "@/components/page-toc";
import { HeroPortrait } from "@/components/hero-portrait";
import { bentoSpan } from "@/lib/bento";

// Bento spans for the "Основное" facets, keyed by label (not index) so
// reordering `profile.summary` can't silently shift the mosaic. Any facet not
// listed gets a default 1×1 cell. Wide lead + one tall column = uneven mosaic.
const SUMMARY_SPANS: Record<string, string> = {
  Подход: "sm:col-span-2 lg:col-span-2", // wide lead
  "Стек и склад ума": "lg:row-span-2", // tall column (longest body)
  "Работа с ИИ": "sm:col-span-2 lg:col-span-1",
};

// Asymmetric bento spans for the stack mosaic, keyed by group label. The accent
// "Ядро" anchor tile carries its own span inline. The grid is
// `grid-flow-row-dense`, so wide tiles (the content-heavy ones) get span-2 and
// the browser backfills the leftover column with the next narrow tile — no gaps
// without hand-placing every cell. Keyed, so content order is free to change.
const STACK_SPANS: Record<string, string> = {
  "Архитектура и паттерны": "sm:col-span-2 lg:col-span-2",
  "Unity-инструментарий": "sm:col-span-2 lg:col-span-2",
  "Инструменты и процесс": "sm:col-span-2 lg:col-span-2",
  Веб: "sm:col-span-2 lg:col-span-2",
};

export default async function Home({ params }: Readonly<{ params: Promise<{ lang: string }> }>) {
  const { lang } = await params;
  return (
    <SiteChrome>
      <PageToc />
      <section
        id="intro"
        className="relative isolate mx-auto w-full max-w-5xl scroll-mt-20 overflow-hidden px-6 pt-24 pb-10 sm:px-10 sm:pt-32 sm:pb-12"
      >
        <div className="hero-grid">
          <div>
            <p className="text-muted fade-up text-base sm:text-lg">
              Hi, I&apos;m <span className="text-foreground font-medium">{profile.name}</span>
            </p>
            <p
              className="text-foreground/90 fade-up mt-1 text-sm sm:text-base"
              style={{ animationDelay: "0.05s" }}
            >
              {profile.roleLine}
            </p>
            <h1
              className="text-foreground fade-up mt-5 text-4xl leading-[1.06] font-semibold tracking-tight sm:text-5xl"
              style={{ animationDelay: "0.1s" }}
            >
              {profile.headline}
            </h1>
            <p
              className="text-muted fade-up mt-6 max-w-xl text-lg leading-relaxed"
              style={{ animationDelay: "0.15s" }}
            >
              {profile.lead}
            </p>
            <p
              className="text-accent fade-up mt-6 text-sm font-medium tracking-wide uppercase"
              style={{ animationDelay: "0.2s" }}
            >
              {profile.eyebrow}
            </p>
          </div>
          <HeroPortrait />
        </div>
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
          {/* Asymmetric "bento" of self-contained facets: a wide lead statement,
              a tall card, and two regular ones. The first facet is the value
              statement, so it gets the foreground pull-quote treatment; the rest
              stay muted body. Spans by index — keep in sync with content order. */}
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {profile.summary.map((facet, i) => (
              <div
                key={facet.label}
                className={`${SUMMARY_SPANS[facet.label] ?? ""} surface-tile flex flex-col p-6`}
              >
                <span className="text-accent text-xs font-medium tracking-wide uppercase">
                  {facet.label}
                </span>
                <p
                  className={`mt-3 leading-relaxed ${
                    i === 0 ? "text-foreground text-lg" : "text-muted text-sm"
                  }`}
                >
                  {facet.body}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div id="about-stack" className="reveal mt-12 scroll-mt-24">
          <h3 className="text-accent text-sm font-medium tracking-wide uppercase">Стек</h3>
          {/* Dev-focused stack as the same asymmetric "bento" mosaic used for
              "Основное": each category is a tile with an uneven span (STACK_SPANS),
              the accent "Ядро" tile anchors it, and a `muted` group (web) reads as
              a secondary strength. Tech tokens sit inside the tiles. */}
          <div className="mt-6 grid auto-rows-min grid-flow-row-dense grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {/* Accent "Ядро" anchor — its own span (not in STACK_SPANS). */}
            <div className="border-accent/40 bg-accent/[0.06] rounded-xl border p-5 sm:col-span-2 lg:col-span-2">

              <p className="text-accent text-xs font-medium tracking-wide uppercase">Ядро</p>
              <div className="mt-3 flex flex-wrap gap-2.5">
                {profile.stack.core.map((tech) => (
                  <div
                    key={tech.name}
                    className="border-accent/25 flex flex-col rounded-lg border px-3 py-2"
                  >
                    <span className="text-foreground text-sm font-medium">{tech.name}</span>
                    {tech.detail && (
                      <span className="text-muted mt-0.5 text-xs leading-snug">{tech.detail}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {profile.stack.groups.map((group) => (
              <div
                key={group.label}
                className={`${STACK_SPANS[group.label] ?? ""} surface-tile p-5`}
              >
                <p className="text-accent text-xs font-medium tracking-wide uppercase">
                  {group.label}
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {group.items.map((name) => (
                    <span
                      key={name}
                      className={
                        group.muted
                          ? "border-border/50 text-muted rounded-md border px-2.5 py-1 text-xs"
                          : "border-border/70 text-foreground/85 rounded-md border px-2.5 py-1 text-xs font-medium"
                      }
                    >
                      {name}
                    </span>
                  ))}
                </div>
              </div>
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
          <dl className="mt-4 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
            {profile.softSkills.map((skill, i) => (
              <div
                key={skill.name}
                className={`${bentoSpan(i)} surface-chip p-3`}
              >
                <dt className="text-foreground text-xs font-medium">{skill.name}</dt>
                <dd className="text-muted mt-1 text-xs leading-snug">{skill.detail}</dd>
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
