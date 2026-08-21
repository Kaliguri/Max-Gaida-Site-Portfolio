import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { isLocale } from "@/lib/site";
import { profile, resumeRoles } from "@content/index";
import { OgCard } from "@/components/og-card";

// Social-card source for the two role résumés — the links Max actually sends
// out, so they get their own card with the role title carrying the message.
export const dynamicParams = false;
export const metadata: Metadata = { robots: { index: false, follow: false } };

export function generateStaticParams() {
  return resumeRoles.map((r) => ({ role: r.slug }));
}

export default async function OgResume({
  params,
}: Readonly<{ params: Promise<{ lang: string; role: string }> }>) {
  const { lang, role: roleSlug } = await params;
  if (!isLocale(lang)) notFound();

  const role = resumeRoles.find((r) => r.slug === roleSlug);
  if (!role) notFound();

  return (
    <OgCard
      eyebrow="Резюме"
      title={role.title}
      subtitle={role.focus}
      stats={profile.highlights.slice(0, 3)}
    />
  );
}
