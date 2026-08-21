import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale } from "@/lib/site";
import { privacy } from "@content/index";
import { SiteChrome } from "@/components/site-chrome";

export const dynamicParams = false;

export const metadata: Metadata = {
  title: "Политика обработки данных",
  description:
    "Какие данные собирает сайт maxgaida.site, зачем они нужны и как отказаться от сбора статистики.",
};

export default async function PrivacyPage({
  params,
}: Readonly<{ params: Promise<{ lang: string }> }>) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  return (
    <SiteChrome>
      <article className="mx-auto w-full max-w-3xl px-6 pt-10 pb-20 sm:px-10 sm:pt-14">
        <h1 className="text-foreground text-3xl font-semibold tracking-tight sm:text-4xl">
          Политика обработки персональных данных
        </h1>
        <p className="text-muted mt-3 text-sm">Редакция от {privacy.updated}</p>

        <div className="mt-10 space-y-10">
          {privacy.sections.map((section) => (
            <section key={section.heading}>
              <h2 className="text-foreground text-xl font-semibold tracking-tight">
                {section.heading}
              </h2>
              <div className="mt-3 space-y-3">
                {section.body.map((paragraph) => (
                  <p key={paragraph} className="text-muted text-sm leading-relaxed sm:text-base">
                    {paragraph}
                  </p>
                ))}
              </div>
            </section>
          ))}
        </div>
      </article>
    </SiteChrome>
  );
}
