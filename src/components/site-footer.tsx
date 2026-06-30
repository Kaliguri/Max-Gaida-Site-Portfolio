import { CONTACTS, SITE } from "@/lib/site";
import { ContactIcon } from "./contact-icon";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer id="contacts" className="border-border border-t">
      <div className="mx-auto max-w-5xl px-6 py-14 sm:px-10">
        <div className="flex flex-col gap-6">
          <div>
            <p className="text-foreground text-xl font-semibold tracking-tight">{SITE.name}</p>
            <p className="text-muted mt-1.5 text-sm">Технический геймдизайнер · Unity / C#</p>
          </div>

          <ul className="flex flex-wrap gap-3">
            {CONTACTS.map((c) => (
              <li key={c.href}>
                <a
                  href={c.href}
                  target={c.external ? "_blank" : undefined}
                  rel={c.external ? "noopener noreferrer" : undefined}
                  className="border-border text-muted hover:border-accent hover:text-foreground inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition-colors"
                >
                  <ContactIcon name={c.icon} />
                  {c.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <p className="border-border text-muted mt-10 border-t pt-6 text-xs">
          © {year} {SITE.name} · {SITE.domain} · в разработке
        </p>
      </div>
    </footer>
  );
}
