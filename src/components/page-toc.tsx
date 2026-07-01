"use client";

import { useEffect, useState } from "react";
import { NAV } from "@/lib/site";

/**
 * Left-side section nav for the home page's long scroll. Only fits on very
 * wide viewports (content is a centered max-w-5xl column); hidden below that.
 * NAV entries may carry `children` (currently "О себе", "Образование" and
 * "Проекты") — those render as a nested sub-list and are tracked by the same
 * observer, so a parent item lights up whenever any of its children is in view.
 */
export function PageToc() {
  const observedIds = NAV.flatMap((item) =>
    "children" in item && item.children ? [item.id, ...item.children.map((c) => c.id)] : [item.id],
  );
  const [active, setActive] = useState<string>(NAV[0].id);

  useEffect(() => {
    const sections = observedIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-20% 0px -70% 0px", threshold: 0 },
    );

    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <nav
      aria-label="Содержание"
      className="fixed top-1/2 left-10 z-30 hidden -translate-y-1/2 2xl:block"
    >
      <ul className="space-y-4">
        {NAV.map((item) => {
          const children = "children" in item ? item.children : undefined;
          const isActive = item.id === active || (children?.some((c) => c.id === active) ?? false);
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                aria-current={isActive ? "true" : undefined}
                className={`group flex items-center gap-3 text-xs font-medium tracking-wide uppercase transition-colors ${
                  isActive ? "text-foreground" : "text-muted hover:text-foreground"
                }`}
              >
                <span
                  className={`h-px transition-all ${
                    isActive ? "bg-accent w-6" : "bg-border w-3 group-hover:w-4"
                  }`}
                />
                {item.label}
              </a>

              {children && (
                <ul className="border-border mt-2 ml-1.5 space-y-2 border-l pl-3">
                  {children.map((child) => {
                    const childActive = child.id === active;
                    return (
                      <li key={child.id}>
                        <a
                          href={`#${child.id}`}
                          aria-current={childActive ? "true" : undefined}
                          className={`text-[11px] normal-case transition-colors ${
                            childActive
                              ? "text-foreground font-medium"
                              : "text-muted hover:text-foreground"
                          }`}
                        >
                          {child.label}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
