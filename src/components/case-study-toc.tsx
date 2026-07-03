"use client";

import { useEffect, useState } from "react";

/**
 * In-article table of contents for a case-study page — mirrors the home
 * PageToc's scroll-spy, but scoped to one article's sections and rendered as a
 * sticky left rail inside the content grid (not a fixed overlay). Hidden below
 * lg, where the article goes single-column.
 */
export function CaseStudyToc({ items }: { items: { id: string; label: string }[] }) {
  const [active, setActive] = useState(items[0]?.id);

  useEffect(() => {
    const els = items
      .map((i) => document.getElementById(i.id))
      .filter((el): el is HTMLElement => el !== null);
    if (els.length === 0) return;

    const visible = new Map<string, boolean>();
    const pick = () => {
      const atBottom =
        window.innerHeight + Math.ceil(window.scrollY) >= document.documentElement.scrollHeight - 2;
      if (atBottom) {
        setActive(items[items.length - 1].id);
        return;
      }
      const top = items.find((i) => visible.get(i.id));
      if (top) setActive(top.id);
    };

    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) visible.set(e.target.id, e.isIntersecting);
        pick();
      },
      { rootMargin: "-25% 0px -65% 0px", threshold: 0 },
    );
    els.forEach((el) => obs.observe(el));
    window.addEventListener("scroll", pick, { passive: true });
    return () => {
      obs.disconnect();
      window.removeEventListener("scroll", pick);
    };
  }, [items]);

  return (
    <aside className="hidden lg:block">
      {/* Same visual language as the home PageToc: a growing accent line marks
          the active section; labels are the uppercase tracking style. */}
      <nav aria-label="Содержание" className="sticky top-[132px]">
        <ul className="space-y-4">
          {items.map((it) => {
            const on = it.id === active;
            return (
              <li key={it.id}>
                <a
                  href={`#${it.id}`}
                  aria-current={on ? "true" : undefined}
                  className={`group flex items-center gap-3 text-xs font-medium tracking-wide uppercase transition-colors ${
                    on ? "text-foreground" : "text-muted hover:text-foreground"
                  }`}
                >
                  <span
                    className={`h-px shrink-0 transition-all ${
                      on ? "bg-accent w-6" : "bg-border w-3 group-hover:w-4"
                    }`}
                  />
                  {it.label}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
