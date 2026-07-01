"use client";

import { useEffect, useState } from "react";
import { NAV } from "@/lib/site";

/**
 * Left-side section nav for the home page's long scroll. Only fits on very
 * wide viewports (content is a centered max-w-5xl column); hidden below that.
 * NAV entries may carry `children` (currently "О себе", "Образование" and
 * "Проекты"); a parent lights up whenever any of its children is active.
 *
 * Scroll-spy: we observe ONLY the leaf targets — each item's children, or the
 * item itself when it has none. Observing the parent wrappers too was the old
 * bug: a wrapper `<section>` spans its whole subtree, so it and its child were
 * intersecting at once and the "topmost" pick flickered between them, leaving
 * the active subchapter randomly unlit. Leaves don't overlap, so the topmost
 * intersecting leaf in document order is unambiguous.
 */
export function PageToc() {
  const observedIds = NAV.flatMap((item) =>
    "children" in item && item.children ? item.children.map((c) => c.id) : [item.id],
  );
  const [active, setActive] = useState<string>(observedIds[0]);

  useEffect(() => {
    const sections = observedIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (sections.length === 0) return;

    // Track every observed leaf's visibility, then pick the topmost visible one
    // in document order. Using the full map (not just the changed entries) keeps
    // the active item stable no matter which boundary a scroll step crosses.
    const visible = new Map<string, boolean>();

    const pickActive = () => {
      // The last, short section can never scroll high enough to become the
      // topmost in the detection band — the preceding section stays pinned
      // there. At page bottom, force-activate the final leaf so it still lights.
      const atBottom =
        window.innerHeight + Math.ceil(window.scrollY) >= document.documentElement.scrollHeight - 2;
      if (atBottom) {
        setActive(observedIds[observedIds.length - 1]);
        return;
      }
      const topmost = observedIds.find((id) => visible.get(id));
      if (topmost) setActive(topmost);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) visible.set(e.target.id, e.isIntersecting);
        pickActive();
      },
      { rootMargin: "-20% 0px -70% 0px", threshold: 0 },
    );

    sections.forEach((el) => observer.observe(el));
    window.addEventListener("scroll", pickActive, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", pickActive);
    };
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
