import { CONTACTS, SITE } from "@/lib/site";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer id="contacts" className="border-border border-t">
      <div className="mx-auto max-w-5xl px-6 py-12 sm:px-10">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-foreground text-lg font-semibold">{SITE.name}</p>
            <p className="text-muted mt-1 text-sm">Технический геймдизайнер · Unity / C#</p>
          </div>

          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            {CONTACTS.map((c) => (
              <li key={c.href}>
                <a
                  href={c.href}
                  target={c.external ? "_blank" : undefined}
                  rel={c.external ? "noopener noreferrer" : undefined}
                  className="text-muted hover:text-accent text-sm transition-colors"
                >
                  {c.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <p className="text-muted mt-10 text-xs">
          © {year} {SITE.name} · {SITE.domain} · в разработке
        </p>
      </div>
    </footer>
  );
}
