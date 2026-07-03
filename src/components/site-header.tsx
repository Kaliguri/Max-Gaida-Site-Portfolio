import Link from "next/link";
import { HEADER_NAV, SITE, localeHash } from "@/lib/site";
import { profile, projects, resumeRoles } from "@content/index";
import { ContactLink } from "./contact-link";
import { ChevronDownIcon } from "./icons";
import { ThemeToggle } from "./theme-toggle";
import { MobileNav } from "./mobile-nav";

export function SiteHeader() {
  const caseStudies = projects.filter((p) => p.caseStudy);
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
            {HEADER_NAV.map((item) => {
              const submenu =
                "submenu" in item
                  ? item.submenu === "resumeRoles"
                    ? resumeRoles.map((r) => ({
                        key: r.slug,
                        label: r.title,
                        href: `/${SITE.defaultLocale}/resume/${r.slug}`,
                      }))
                    : caseStudies.map((p) => ({
                        key: p.slug,
                        label: p.title,
                        href: `/${SITE.defaultLocale}/projects/${p.slug}`,
                      }))
                  : null;
              return (
                <li key={item.hash} className={submenu ? "group relative" : undefined}>
                  <a
                    href={localeHash(item.hash)}
                    className="text-muted hover:text-foreground inline-flex items-center gap-1 text-sm transition-colors"
                  >
                    {item.label}
                    {submenu && (
                      <span className="mt-px opacity-60 transition-transform duration-200 group-hover:-rotate-180 group-focus-within:-rotate-180">
                        <ChevronDownIcon />
                      </span>
                    )}
                  </a>
                  {submenu && (
                    <ul className="border-border bg-surface invisible absolute top-full left-0 z-50 mt-2 min-w-[220px] -translate-y-1 rounded-lg border p-1.5 opacity-0 shadow-lg transition-all group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                      {submenu.map((sub) => (
                        <li key={sub.key}>
                          <Link
                            href={sub.href}
                            className="text-muted hover:bg-background hover:text-foreground block rounded-md px-3 py-2 text-sm transition-colors"
                          >
                            {sub.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              );
            })}
          </ul>

          <ul className="hidden items-center gap-2 sm:flex">
            {profile.contacts.map((c) => (
              <li key={c.href}>
                <ContactLink contact={c} variant="icon" />
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
