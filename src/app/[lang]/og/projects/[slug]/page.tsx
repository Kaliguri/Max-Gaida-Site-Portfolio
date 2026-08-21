import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { isLocale } from "@/lib/site";
import { projects } from "@content/index";
import { OgCard } from "@/components/og-card";

// Social-card source for the case-study pages. Same filter as the case-study
// route: only projects with a write-up have a page worth previewing.
export const dynamicParams = false;
export const metadata: Metadata = { robots: { index: false, follow: false } };

const caseStudies = projects.filter((p) => p.caseStudy);

export function generateStaticParams() {
  return caseStudies.map((p) => ({ slug: p.slug }));
}

export default async function OgProject({
  params,
}: Readonly<{ params: Promise<{ lang: string; slug: string }> }>) {
  const { lang, slug } = await params;
  if (!isLocale(lang)) notFound();

  const project = caseStudies.find((p) => p.slug === slug);
  if (!project) notFound();

  // The highlight already carries the standout fact; drop any quick-fact that
  // repeats it so the card doesn't say the same thing twice.
  const subtitle = project.highlight ?? project.blurb ?? project.description;
  const facts = (project.caseStudy?.facts ?? [])
    .filter((f) => !subtitle.includes(f.value))
    .slice(0, 3);

  return (
    <OgCard
      eyebrow={project.role}
      title={project.title}
      subtitle={subtitle}
      facts={facts}
      cover={project.image}
    />
  );
}
