import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale } from "@/lib/site";
import { projects } from "@content/index";
import { ProjectVideo } from "@/components/project-video";
import { ProjectGallery } from "@/components/project-gallery";
import { CaseStudyToc } from "@/components/case-study-toc";
import { CountUpText } from "@/components/count-up-text";
import { ArrowUpRightIcon } from "@/components/icons";
import { SiteChrome } from "@/components/site-chrome";

export const dynamicParams = false;

// Only projects with a full write-up get a static case-study page.
const caseStudies = projects.filter((p) => p.caseStudy);

export function generateStaticParams() {
  return caseStudies.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: Readonly<{ params: Promise<{ slug: string }> }>): Promise<Metadata> {
  const { slug } = await params;
  const project = caseStudies.find((p) => p.slug === slug);
  if (!project) return {};
  return {
    title: `${project.title} — разбор проекта`,
    description: project.caseStudy?.intro ?? project.description,
  };
}

export default async function ProjectCaseStudyPage({
  params,
}: Readonly<{ params: Promise<{ lang: string; slug: string }> }>) {
  const { lang, slug } = await params;
  if (!isLocale(lang)) notFound();

  const project = caseStudies.find((p) => p.slug === slug);
  if (!project || !project.caseStudy) notFound();
  const cs = project.caseStudy;

  const tocItems = cs.sections.map((s, i) => ({ id: `section-${i}`, label: s.heading }));

  return (
    <SiteChrome>
      {/* Second-level sticky bar — under the main header. Back link + what this
          article is, kept visible while reading. */}
      <div className="border-border bg-background/80 sticky top-[70px] z-30 border-b backdrop-blur">
        <div className="mx-auto flex max-w-[88rem] items-center gap-4 px-6 py-3 sm:px-10">
          <Link
            href={`/${lang}#projects`}
            className="text-accent hover:text-accent-hover shrink-0 text-sm font-medium transition-colors"
          >
            ← К проектам
          </Link>
          <div className="border-border min-w-0 border-l pl-4">
            <p className="text-accent truncate text-sm leading-tight font-semibold">
              {project.title}
            </p>
            <p className="text-muted truncate text-xs leading-tight">
              {project.role}
              {project.highlight ? ` · ${project.highlight}` : ""}
            </p>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[88rem] px-6 pt-10 pb-20 sm:px-10 lg:grid lg:grid-cols-[13rem_minmax(0,1fr)] lg:gap-12 xl:gap-20">
        {tocItems.length > 0 && <CaseStudyToc items={tocItems} />}

        <article className="min-w-0">
          {/* Header — asymmetric: wide intro column + a narrow facts card. */}
          <header className="border-border border-b pb-10">
            <div className="lg:grid lg:grid-cols-[1.7fr_1fr] lg:items-start lg:gap-10">
              <div>
                <p
                  className="fade-up text-accent text-sm font-medium tracking-wide uppercase"
                  style={{ animationDelay: "0s" }}
                >
                  {project.role}
                </p>
                <h1
                  className="fade-up text-accent mt-2 text-4xl font-semibold tracking-tight sm:text-5xl"
                  style={{ animationDelay: "0.06s" }}
                >
                  {project.title}
                </h1>
                {project.highlight && (
                  <p
                    className="fade-up text-foreground/80 mt-4 text-base font-medium"
                    style={{ animationDelay: "0.12s" }}
                  >
                    {project.highlight}
                  </p>
                )}
                <p
                  className="fade-up text-muted mt-5 leading-relaxed"
                  style={{ animationDelay: "0.18s" }}
                >
                  {cs.intro}
                </p>

                {project.links.length > 0 && (
                  <div
                    className="fade-up mt-6 flex flex-wrap gap-2.5"
                    style={{ animationDelay: "0.24s" }}
                  >
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
              </div>

              {cs.facts.length > 0 && (
                <dl
                  className="fade-up surface-card mt-8 grid gap-4 p-5 lg:mt-1"
                  style={{ animationDelay: "0.14s" }}
                >
                  {cs.facts.map((fact) => (
                    <div key={fact.label}>
                      <dt className="text-muted text-xs tracking-wide uppercase">{fact.label}</dt>
                      <dd className="text-foreground mt-1 text-sm leading-snug">
                        <CountUpText>{fact.value}</CountUpText>
                      </dd>
                    </div>
                  ))}
                </dl>
              )}
            </div>
          </header>

          {project.video && (
            <div className="reveal mt-8">
              <ProjectVideo
                src={project.video.src}
                poster={project.video.poster}
                title={project.video.title ?? project.title}
              />
            </div>
          )}

          {/* Sections — zig-zag: image sections alternate text/image sides; the
              text-only ones sit in a narrow reading column for rhythm. */}
          {cs.sections.map((section, i) => {
            const hasImages = section.images.length > 0;
            const flip = i % 2 === 1;
            const heading = (
              <h2 className="text-foreground text-xl font-semibold tracking-tight">
                {section.heading}
              </h2>
            );
            const prose = section.body.map((paragraph, j) => (
              <p key={j} className="text-muted mt-3 leading-relaxed">
                {paragraph}
              </p>
            ));

            return (
              <section key={i} id={`section-${i}`} className="mt-14 scroll-mt-36">
                {hasImages ? (
                  <div className="lg:grid lg:grid-cols-2 lg:items-center lg:gap-8">
                    <div className={flip ? "reveal reveal-right lg:order-2" : "reveal reveal-left"}>
                      {heading}
                      {prose}
                    </div>
                    <div
                      className={`reveal mt-5 space-y-3 lg:mt-0 ${flip ? "reveal-left lg:order-1" : "reveal-right"}`}
                    >
                      {section.images.map((img) => (
                        <figure key={img.src} className="min-w-0">
                          <div className="media-frame overflow-hidden">
                            {/* eslint-disable-next-line @next/next/no-img-element -- static export, no image optimizer */}
                            <img
                              src={img.src}
                              alt={img.caption}
                              loading="lazy"
                              className="aspect-video w-full object-contain"
                            />
                          </div>
                          <figcaption className="text-muted mt-2.5 text-sm leading-snug">
                            {img.caption}
                          </figcaption>
                        </figure>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="reveal max-w-2xl">
                    {heading}
                    {prose}
                  </div>
                )}
              </section>
            );
          })}

          {project.gallery.length > 0 && (
            <section className="reveal border-border mt-16 border-t pt-8">
              <h2 className="text-foreground text-xl font-semibold tracking-tight">
                Все материалы
              </h2>
              <p className="text-muted mt-2 text-sm">
                Скриншоты, дев-кадры и метрики проекта — наведи, чтобы рассмотреть.
              </p>
              <ProjectGallery images={project.gallery} title={project.title} startOpen />
            </section>
          )}

          <div className="border-border mt-14 border-t pt-8">
            <Link
              href={`/${lang}#projects`}
              className="text-accent hover:text-accent-hover text-sm font-medium transition-colors"
            >
              ← Вернуться к проектам
            </Link>
          </div>
        </article>
      </div>
    </SiteChrome>
  );
}
