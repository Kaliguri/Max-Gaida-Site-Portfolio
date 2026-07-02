"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { HEADER_NAV, SITE, localeHash } from "@/lib/site";
import { profile, resumeRoles } from "@content/index";
import { ContactLink } from "./contact-link";
import { MenuIcon } from "./icons";

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

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
        <MenuIcon open={open} />
      </button>

      {open && (
        <>
          <button
            type="button"
            aria-label="Закрыть меню"
            tabIndex={-1}
            onClick={close}
            className="fixed inset-0 top-[57px] z-30 cursor-default bg-black/20"
          />
          <nav className="border-border bg-background absolute inset-x-0 top-full z-40 border-b">
            <ul className="mx-auto flex max-w-5xl flex-col px-6 py-2">
              {HEADER_NAV.map((item) => (
                <li key={item.hash}>
                  <a
                    href={localeHash(item.hash)}
                    onClick={close}
                    className="text-muted hover:text-foreground block py-3 text-sm transition-colors"
                  >
                    {item.label}
                  </a>
                  {"submenu" in item && (
                    <ul className="border-border ml-3 space-y-1 border-l pb-2 pl-3">
                      {resumeRoles.map((role) => (
                        <li key={role.slug}>
                          <Link
                            href={`/${SITE.defaultLocale}/resume/${role.slug}`}
                            onClick={close}
                            className="text-muted hover:text-foreground block py-2 text-sm transition-colors"
                          >
                            {role.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>

            <ul className="border-border mx-auto flex max-w-5xl flex-wrap gap-2 border-t px-6 py-4">
              {profile.contacts.map((c) => (
                <li key={c.href}>
                  <ContactLink contact={c} variant="pill" onClick={close} />
                </li>
              ))}
            </ul>
          </nav>
        </>
      )}
    </div>
  );
}
