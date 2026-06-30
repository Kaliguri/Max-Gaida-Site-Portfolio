import Link from "next/link";
import { resumeRoles } from "@content/index";

export function ResumePreview({ lang }: { lang: string }) {
  return (
    <section
      id="resume"
      className="border-border mx-auto w-full max-w-5xl scroll-mt-20 border-t px-6 py-20 sm:px-10"
    >
      <h2 className="text-foreground text-2xl font-semibold tracking-tight sm:text-3xl">Резюме</h2>
      <p className="text-muted mt-2">Две грани одной работы — выбери под задачу.</p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {resumeRoles.map((role) => (
          <Link
            key={role.slug}
            href={`/${lang}/resume/${role.slug}`}
            className="group border-border bg-surface hover:border-accent flex flex-col rounded-xl border p-6 transition-colors"
          >
            <h3 className="text-foreground text-lg font-semibold tracking-tight">{role.title}</h3>
            <p className="text-muted mt-2 text-sm leading-relaxed">{role.focus}</p>

            <ul className="mt-4 flex flex-wrap gap-2">
              {role.skills.slice(0, 4).map((s) => (
                <li
                  key={s}
                  className="border-border text-muted rounded-full border px-2.5 py-1 text-xs"
                >
                  {s}
                </li>
              ))}
            </ul>

            <span className="text-accent group-hover:text-accent-hover mt-5 inline-flex items-center gap-1 text-sm font-medium transition-colors">
              Открыть резюме →
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
