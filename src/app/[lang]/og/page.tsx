import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { isLocale } from "@/lib/site";
import { profile } from "@content/index";
import { OgCard } from "@/components/og-card";

// Social-card source for the home page. Screenshotted by scripts/render-og.mjs;
// never linked from the site and never indexed. See src/lib/og.ts.
export const dynamicParams = false;
export const metadata: Metadata = { robots: { index: false, follow: false } };

export default async function OgHome({ params }: Readonly<{ params: Promise<{ lang: string }> }>) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  return (
    <OgCard
      eyebrow={profile.roleLine}
      title={profile.headline}
      subtitle={profile.eyebrow}
      stats={profile.highlights.slice(0, 3)}
    />
  );
}
