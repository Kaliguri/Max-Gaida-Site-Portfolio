import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { isLocale } from "@/lib/site";
import { experience, profile, resumeRoles } from "@content/index";

// Print/PDF source: always light, single-column, ATS-friendly, no site chrome.
// Rendered to PDF by scripts/render-pdf.mjs. Not for indexing.
export const dynamicParams = false;
export const metadata: Metadata = { robots: { index: false, follow: false } };

export function generateStaticParams() {
  return resumeRoles.map((r) => ({ role: r.slug }));
}

function readable(href: string) {
  return href.replace(/^https?:\/\//, "").replace(/^mailto:/, "");
}

export default async function ResumePrintPage({
  params,
}: Readonly<{ params: Promise<{ lang: string; role: string }> }>) {
  const { lang, role: roleSlug } = await params;
  if (!isLocale(lang)) notFound();

  const role = resumeRoles.find((r) => r.slug === roleSlug);
  if (!role) notFound();

  return (
    <div className="min-h-screen bg-white px-10 py-8 text-[12.5px] leading-normal text-neutral-900">
      {/* Force a light page regardless of the site theme; keep blocks unsplit. */}
      <style>{`body{background:#fff}section{break-inside:avoid}h2{break-after:avoid}`}</style>

      <header className="border-b border-neutral-300 pb-4">
        <h1 className="text-2xl font-semibold tracking-tight">{profile.name}</h1>
        <p className="mt-1 text-base font-medium text-neutral-700">{role.title}</p>
        <p className="mt-3 max-w-2xl text-neutral-700">{role.focus}</p>
        <p className="mt-3 text-neutral-600">
          {profile.location} · {profile.availability.join(" · ")}
        </p>
        <p className="mt-1 text-neutral-600">
          {profile.contacts.map((c, i) => (
            <span key={c.href}>
              {i > 0 && " · "}
              {c.label}: {readable(c.href)}
            </span>
          ))}
        </p>
      </header>

      <section className="mt-5">
        <h2 className="text-sm font-semibold tracking-wide text-neutral-900 uppercase">Опыт</h2>
        <div className="mt-3 space-y-3">
          {experience.map((job) => (
            <div key={`${job.company}-${job.role}`}>
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="font-semibold">
                  {job.role} · {job.company}
                </h3>
                <span className="text-neutral-600">{job.period}</span>
              </div>
              <ul className="mt-1.5 list-disc space-y-1 pl-5 text-neutral-800">
                {job.bullets.map((b, i) => (
                  <li key={i}>{b}</li>
                ))}
              </ul>
              {job.stack.length > 0 && (
                <p className="mt-1.5 text-neutral-600">{job.stack.join(" · ")}</p>
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="mt-5">
        <h2 className="text-sm font-semibold tracking-wide text-neutral-900 uppercase">Навыки</h2>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-neutral-800">
          {role.skills.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>
      </section>

      <section className="mt-5">
        <h2 className="text-sm font-semibold tracking-wide text-neutral-900 uppercase">
          Образование
        </h2>
        <p className="mt-2">{profile.education.program}</p>
        <p className="text-neutral-600">
          {profile.education.place} · {profile.education.year}
        </p>
        {profile.education.skills.length > 0 && (
          <p className="mt-1.5 text-neutral-600">
            {profile.education.skills.map((s) => s.name).join(" · ")}
          </p>
        )}
        {profile.education.note && (
          <p className="mt-1.5 text-neutral-700">{profile.education.note}</p>
        )}
      </section>

      <section className="mt-5">
        <h2 className="text-sm font-semibold tracking-wide text-neutral-900 uppercase">Языки</h2>
        <p className="mt-2 text-neutral-800">
          {profile.languages.map((l) => `${l.name} — ${l.level}`).join(", ")}
        </p>
      </section>
    </div>
  );
}
