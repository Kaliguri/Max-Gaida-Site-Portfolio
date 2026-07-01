"use client";

import { useEffect, useState } from "react";
import { SITE } from "@/lib/site";
import { profile, resumeRoles } from "@content/index";
import { ContactIcon } from "./contact-icon";

export function MobileNav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className="sm:hidden">
      <button
        type="button"
        aria-label={open ? "Закрыть меню" : "Открыть меню"}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="text-foreground inline-flex h-9 w-9 items-center justify-center"
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          {open ? (
            <>
              <path d="M6 6 18 18" />
              <path d="M18 6 6 18" />
            </>
          ) : (
            <>
              <path d="M4 7h16" />
              <path d="M4 12h16" />
              <path d="M4 17h16" />
            </>
          )}
        </svg>
      </button>

      {open && (
        <>
          <button
            type="button"
            aria-label="Закрыть меню"
            tabIndex={-1}
            onClick={() => setOpen(false)}
            className="fixed inset-0 top-[57px] z-30 cursor-default bg-black/20"
          />
          <nav className="border-border bg-background absolute inset-x-0 top-full z-40 border-b">
            <ul className="mx-auto flex max-w-5xl flex-col px-6 py-2">
              <li>
                <a
                  href={`/${SITE.defaultLocale}/#about`}
                  onClick={() => setOpen(false)}
                  className="text-muted hover:text-foreground block py-3 text-sm transition-colors"
                >
                  Основное
                </a>
              </li>
              <li>
                <a
                  href={`/${SITE.defaultLocale}/#resume`}
                  onClick={() => setOpen(false)}
                  className="text-muted hover:text-foreground block py-3 text-sm transition-colors"
                >
                  Резюме
                </a>
                <ul className="border-border ml-3 space-y-1 border-l pb-2 pl-3">
                  {resumeRoles.map((role) => (
                    <li key={role.slug}>
                      <a
                        href={`/${SITE.defaultLocale}/resume/${role.slug}`}
                        onClick={() => setOpen(false)}
                        className="text-muted hover:text-foreground block py-2 text-sm transition-colors"
                      >
                        {role.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </li>
            </ul>

            <ul className="border-border mx-auto flex max-w-5xl flex-wrap gap-2 border-t px-6 py-4">
              {profile.contacts.map((c) => (
                <li key={c.href}>
                  <a
                    href={c.href}
                    target={c.external ? "_blank" : undefined}
                    rel={c.external ? "noopener noreferrer" : undefined}
                    onClick={() => setOpen(false)}
                    className="border-border text-muted hover:border-accent hover:text-foreground inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm transition-colors"
                  >
                    <ContactIcon name={c.icon} />
                    {c.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </>
      )}
    </div>
  );
}
