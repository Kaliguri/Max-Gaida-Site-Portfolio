import Link from "next/link";
import { SITE } from "@/lib/site";
import { profile, resumeRoles } from "@content/index";
import { ContactIcon } from "./contact-icon";
import { ThemeToggle } from "./theme-toggle";
import { MobileNav } from "./mobile-nav";

export function SiteHeader() {
  return (
    <header className="border-border bg-background/70 sticky top-0 z-40 border-b backdrop-blur">
      <div className="relative mx-auto flex max-w-5xl items-center justify-between px-6 py-4 sm:px-10">
        <Link
          href={`/${SITE.defaultLocale}`}
          className="text-foreground text-lg font-semibold tracking-tight"
        >
          {SITE.name}
        </Link>

        <nav className="flex items-center gap-6">
          <ul className="hidden items-center gap-6 sm:flex">
            <li>
              <a
                href={`/${SITE.defaultLocale}/#about`}
                className="text-muted hover:text-foreground text-sm transition-colors"
              >
                Основное
              </a>
            </li>
            <li className="group relative">
              <a
                href={`/${SITE.defaultLocale}/#resume`}
                className="text-muted hover:text-foreground text-sm transition-colors"
              >
                Резюме
              </a>
              <ul className="border-border bg-surface invisible absolute top-full left-0 z-50 mt-2 min-w-[200px] -translate-y-1 rounded-lg border p-1.5 opacity-0 shadow-lg transition-all group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                {resumeRoles.map((role) => (
                  <li key={role.slug}>
                    <Link
                      href={`/${SITE.defaultLocale}/resume/${role.slug}`}
                      className="text-muted hover:bg-background hover:text-foreground block rounded-md px-3 py-2 text-sm transition-colors"
                    >
                      {role.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          </ul>

          <ul className="hidden items-center gap-2 sm:flex">
            {profile.contacts.map((c) => (
              <li key={c.href}>
                <a
                  href={c.href}
                  target={c.external ? "_blank" : undefined}
                  rel={c.external ? "noopener noreferrer" : undefined}
                  aria-label={c.label}
                  title={c.label}
                  className="border-border text-muted hover:border-accent hover:text-foreground inline-flex h-8 w-8 items-center justify-center rounded-full border transition-colors"
                >
                  <ContactIcon name={c.icon} />
                </a>
              </li>
            ))}
          </ul>

          <ThemeToggle />
          <MobileNav />
        </nav>
      </div>
    </header>
  );
}
