import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale } from "@/lib/site";
import { experience, profile, resumeRoles } from "@content/index";
import { ContactLink } from "@/components/contact-link";
import { SiteChrome } from "@/components/site-chrome";

export const dynamicParams = false;

export function generateStaticParams() {
  return resumeRoles.map((r) => ({ role: r.slug }));
}

export async function generateMetadata({
  params,
}: Readonly<{ params: Promise<{ role: string }> }>): Promise<Metadata> {
  const { role: roleSlug } = await params;
  const role = resumeRoles.find((r) => r.slug === roleSlug);
  if (!role) return {};
  return {
    title: `Резюме — ${role.title}`,
    description: role.focus,
  };
}

export default async function ResumePage({
  params,
}: Readonly<{ params: Promise<{ lang: string; role: string }> }>) {
  const { lang, role: roleSlug } = await params;
  if (!isLocale(lang)) notFound();

  const role = resumeRoles.find((r) => r.slug === roleSlug);
  if (!role) notFound();
  const other = resumeRoles.find((r) => r.slug !== roleSlug)!;

  return (
    <SiteChrome>
      <article className="mx-auto w-full max-w-3xl px-6 py-16 sm:px-10">
        <div className="flex items-center justify-between gap-4">
          <Link
            href={`/${lang}`}
            className="text-muted hover:text-foreground text-sm transition-colors"
          >
            ← На главную
          </Link>
          <a
            href={`/${lang}/resume/${role.slug}.pdf`}
            target="_blank"
            rel="noopener noreferrer"
            className="border-border text-foreground hover:border-accent inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-medium transition-colors"
          >
            Скачать PDF
          </a>
        </div>

        <header className="border-border mt-8 border-b pb-8">
          <h1 className="text-foreground text-3xl font-semibold tracking-tight sm:text-4xl">
            {profile.name}
          </h1>
          <p className="text-accent mt-2 text-lg font-medium">{role.title}</p>
          <p className="text-muted mt-4 max-w-2xl leading-relaxed">{role.focus}</p>

          <div className="text-muted mt-5 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm">
            <span className="text-foreground">{profile.location}</span>
            <span className="text-border">·</span>
            <span>{profile.availability.join(" · ")}</span>
          </div>

          <ul className="mt-4 flex flex-wrap gap-3">
            {profile.contacts.map((c) => (
              <li key={c.href}>
                <ContactLink contact={c} variant="text" />
              </li>
            ))}
          </ul>
        </header>

        <section className="mt-10">
          <h2 className="text-foreground text-xl font-semibold tracking-tight">Опыт</h2>
          <div className="mt-6 space-y-8">
            {experience.map((job) => (
              <div key={`${job.company}-${job.role}`}>
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <h3 className="text-foreground font-medium">
                    {job.role} · {job.company}
                  </h3>
                  <span className="text-muted text-sm">{job.period}</span>
                </div>
                <ul className="mt-3 space-y-2">
                  {job.bullets.map((b, i) => (
                    <li key={i} className="text-muted flex gap-2.5 text-sm leading-relaxed">
                      <span className="text-accent mt-2 h-1 w-1 shrink-0 rounded-full bg-current" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
                {job.stack.length > 0 && (
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {job.stack.map((s) => (
                      <li
                        key={s}
                        className="border-border text-muted rounded-full border px-2.5 py-0.5 text-xs"
                      >
                        {s}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-foreground text-xl font-semibold tracking-tight">Навыки</h2>
          <ul className="mt-4 grid gap-2 sm:grid-cols-2">
            {role.skills.map((s) => (
              <li key={s} className="text-muted flex gap-2.5 text-sm">
                <span className="text-accent mt-2 h-1 w-1 shrink-0 rounded-full bg-current" />
                <span>{s}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-10">
          <h2 className="text-foreground text-xl font-semibold tracking-tight">Образование</h2>
          <p className="text-foreground mt-3 text-sm">{profile.education.program}</p>
          <p className="text-muted text-sm">
            {profile.education.place} · {profile.education.year}
          </p>
          {profile.education.skills.length > 0 && (
            <ul className="mt-3 flex flex-wrap gap-2">
              {profile.education.skills.map((s) => (
                <li
                  key={s.name}
                  className="border-border text-muted rounded-full border px-2.5 py-0.5 text-xs"
                >
                  {s.name}
                </li>
              ))}
            </ul>
          )}
          {profile.education.note && (
            <p className="text-muted mt-3 text-sm leading-relaxed">{profile.education.note}</p>
          )}
        </section>

        <section className="mt-10">
          <h2 className="text-foreground text-xl font-semibold tracking-tight">Языки</h2>
          <p className="text-muted mt-3 text-sm">
            {profile.languages.map((l) => `${l.name} — ${l.level}`).join(", ")}
          </p>
        </section>

        <aside className="border-border bg-surface mt-12 rounded-xl border p-5 text-sm">
          <span className="text-muted">Я также работаю как </span>
          <Link href={`/${lang}/resume/${other.slug}`} className="text-accent hover:underline">
            {other.title}
          </Link>
          <span className="text-muted"> — посмотреть второе резюме.</span>
        </aside>
      </article>
    </SiteChrome>
  );
}
