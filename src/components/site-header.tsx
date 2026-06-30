import Link from "next/link";
import { NAV, SITE } from "@/lib/site";
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
            {NAV.map((item) => (
              <li key={item.id}>
                <a
                  href={`/${SITE.defaultLocale}/#${item.id}`}
                  className="text-muted hover:text-foreground text-sm transition-colors"
                >
                  {item.label}
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
