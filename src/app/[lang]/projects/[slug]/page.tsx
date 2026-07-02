import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale } from "@/lib/site";
import { projects } from "@content/index";
import { ProjectVideo } from "@/components/project-video";
import { ProjectGallery } from "@/components/project-gallery";
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

  return (
    <SiteChrome>
      {/* Second-level sticky bar — sits under the main header (≈71px). Keeps the
          back link + what-this-article-is visible while reading. */}
      <div className="border-border bg-background/80 sticky top-[70px] z-30 border-b backdrop-blur">
        <div className="mx-auto flex max-w-3xl items-center gap-4 px-6 py-3 sm:px-10">
          <Link
            href={`/${lang}#projects`}
            className="text-muted hover:text-foreground shrink-0 text-sm transition-colors"
          >
            ← К проектам
          </Link>
          <div className="border-border min-w-0 border-l pl-4">
            <p className="text-foreground truncate text-sm font-semibold leading-tight">
              {project.title}
            </p>
            <p className="text-muted truncate text-xs leading-tight">
              {project.role}
              {project.highlight ? ` · ${project.highlight}` : ""}
            </p>
          </div>
        </div>
      </div>

      <article className="mx-auto w-full max-w-3xl px-6 pt-10 pb-16 sm:px-10">
        <header className="border-border border-b pb-8">
          <p className="text-accent text-sm font-medium tracking-wide uppercase">{project.role}</p>
          <h1 className="text-foreground mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
            {project.title}
          </h1>
          {project.highlight && (
            <p className="text-accent mt-3 text-sm font-medium">{project.highlight}</p>
          )}
          <p className="text-muted mt-4 leading-relaxed">{cs.intro}</p>

          {project.links.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-2.5">
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
        </header>

        {cs.facts.length > 0 && (
          <dl className="border-border mt-8 grid gap-x-6 gap-y-4 border-b pb-8 sm:grid-cols-2">
            {cs.facts.map((fact) => (
              <div key={fact.label}>
                <dt className="text-muted text-xs tracking-wide uppercase">{fact.label}</dt>
                <dd className="text-foreground mt-1 text-sm">{fact.value}</dd>
              </div>
            ))}
          </dl>
        )}

        {project.video && (
          <div className="mt-8">
            <ProjectVideo
              src={project.video.src}
              poster={project.video.poster}
              title={project.video.title ?? project.title}
            />
          </div>
        )}

        <div className="mt-4">
          {cs.sections.map((section) => (
            <section key={section.heading} className="mt-10">
              <h2 className="text-foreground text-xl font-semibold tracking-tight">
                {section.heading}
              </h2>
              {section.body.map((paragraph, i) => (
                <p key={i} className="text-muted mt-3 leading-relaxed">
                  {paragraph}
                </p>
              ))}
              {section.images.length > 0 && (
                <div
                  className={`mt-5 grid gap-3 ${
                    section.images.length > 1 ? "sm:grid-cols-2" : ""
                  }`}
                >
                  {section.images.map((img) => (
                    <figure key={img.src} className="min-w-0">
                      <div className="border-border bg-background overflow-hidden rounded-lg border">
                        {/* eslint-disable-next-line @next/next/no-img-element -- static export, no image optimizer */}
                        <img
                          src={img.src}
                          alt={img.caption}
                          loading="lazy"
                          className="aspect-video w-full object-contain"
                        />
                      </div>
                      <figcaption className="text-muted mt-2 text-xs leading-snug">
                        {img.caption}
                      </figcaption>
                    </figure>
                  ))}
                </div>
              )}
            </section>
          ))}
        </div>

        {project.gallery.length > 0 && (
          <section className="border-border mt-12 border-t pt-8">
            <h2 className="text-foreground text-xl font-semibold tracking-tight">Все материалы</h2>
            <p className="text-muted mt-2 text-sm">
              Скриншоты, дев-кадры и метрики проекта — наведи, чтобы рассмотреть.
            </p>
            <ProjectGallery images={project.gallery} title={project.title} startOpen />
          </section>
        )}

        <div className="border-border mt-12 border-t pt-8">
          <Link href={`/${lang}#projects`} className="text-accent hover:underline text-sm">
            ← Вернуться к проектам
          </Link>
        </div>
      </article>
    </SiteChrome>
  );
}
