import { SITE } from "@/lib/site";
import { profile } from "@content/index";
import { ContactLink } from "./contact-link";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer id="contacts" className="border-border border-t">
      <div className="mx-auto max-w-5xl px-6 py-14 sm:px-10">
        <div className="flex flex-col gap-6">
          <div>
            <p className="text-foreground text-xl font-semibold tracking-tight">{SITE.name}</p>
            <p className="text-muted mt-1.5 text-sm">{profile.eyebrow}</p>
          </div>

          <ul className="flex flex-wrap gap-3">
            {profile.contacts.map((c) => (
              <li key={c.href}>
                <ContactLink contact={c} variant="pill" />
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
