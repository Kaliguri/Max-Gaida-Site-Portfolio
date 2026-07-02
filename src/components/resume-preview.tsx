import Link from "next/link";
import { profile, resumeRoles } from "@content/index";

export function ResumePreview({ lang }: { lang: string }) {
  return (
    <section
      id="resume"
      className="border-border mx-auto w-full max-w-5xl scroll-mt-20 border-t px-6 pt-8 pb-10 sm:px-10 sm:pt-10 sm:pb-12"
    >
      <h2 className="text-foreground text-2xl font-semibold tracking-tight sm:text-3xl">Резюме</h2>
      <p className="text-muted mt-2">Две грани одной работы — выбери под задачу.</p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {resumeRoles.map((role) => (
          <Link
            key={role.slug}
            href={`/${lang}/resume/${role.slug}`}
            className="group reveal surface-card flex flex-col p-6"
          >
            <h3 className="text-foreground text-lg font-semibold tracking-tight">{role.title}</h3>
            <p className="text-muted mt-2 text-sm leading-relaxed">{role.focus}</p>

            <p className="text-muted mt-4 text-sm leading-relaxed">
              <span className="text-foreground">{profile.location}</span> ·{" "}
              {profile.jobSearch.summary}
            </p>

            <span className="text-accent group-hover:text-accent-hover mt-5 inline-flex items-center gap-1 text-sm font-medium transition-colors">
              Открыть резюме →
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
