"use client";

import { useEffect, useState } from "react";
import { NAV, SITE } from "@/lib/site";

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
              {NAV.map((item) => (
                <li key={item.id}>
                  <a
                    href={`/${SITE.defaultLocale}/#${item.id}`}
                    onClick={() => setOpen(false)}
                    className="text-muted hover:text-foreground block py-3 text-sm transition-colors"
                  >
                    {item.label}
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
