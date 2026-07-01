"use client";

import { useEffect, useRef, useState } from "react";
import { projects } from "@content/index";

// Curated set for the top-of-page carousel — credibility-first, mirrors the
// "Основное" shelf order. Keep in sync with content/projects.ts slugs.
const SHOWCASE_SLUGS = [
  "knock-on-the-coffin-lid",
  "bloodlines-ui",
  "few-seconds-many-deaths",
  "metalhead",
] as const;

// Per-image crop bias for object-fit: cover — most art is centered, but the
// METALHEAD logo's wordmark sits high in a near-square source, so a centered
// 16:9 crop clips it; bias the visible window upward for that one.
const IMAGE_POSITION: Record<string, string> = {
  metalhead: "50% 30%",
};

const AUTO_ROTATE_MS = 6000;

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function jumpToProject(slug: string) {
  const el = document.getElementById(`project-${slug}`);
  if (!el) return;
  el.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth", block: "center" });
  el.classList.remove("project-highlight");
  void el.offsetWidth; // reflow so the animation can restart on repeat clicks
  el.classList.add("project-highlight");
}

function ChevronIcon({ direction }: { direction: "left" | "right" }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={direction === "left" ? "M15 6 9 12l6 6" : "M9 6l6 6-6 6"} />
    </svg>
  );
}

/**
 * Steam-front-page-style hero carousel: one wide banner at a time, edge
 * arrows, dot pager below. Clicking the banner jumps down to that project's
 * card in the Projects section and flashes it via `.project-highlight`.
 */
export function ProjectShowcase() {
  const items = SHOWCASE_SLUGS.map((slug) => projects.find((p) => p.slug === slug)).filter(
    (p): p is NonNullable<typeof p> => p !== undefined,
  );
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (paused || items.length <= 1 || prefersReducedMotion()) return;
    timerRef.current = setInterval(() => {
      setActive((i) => (i + 1) % items.length);
    }, AUTO_ROTATE_MS);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [paused, items.length]);

  if (items.length === 0) return null;
  const project = items[active];

  return (
    <section
      aria-label="Витрина проектов"
      className="reveal mx-auto w-full max-w-6xl px-6 pb-4 sm:px-10"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="flex items-center gap-3 sm:gap-6">
        <button
          type="button"
          aria-label="Предыдущий проект"
          onClick={() => setActive((i) => (i - 1 + items.length) % items.length)}
          className="border-border bg-surface text-foreground hover:border-accent hover:text-accent flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition-colors sm:h-12 sm:w-12"
        >
          <ChevronIcon direction="left" />
        </button>

        <div className="border-border bg-surface min-w-0 flex-1 overflow-hidden rounded-2xl border">
          <button
            type="button"
            onClick={() => jumpToProject(project.slug)}
            aria-label={`Смотреть: ${project.title}`}
            className="group block w-full p-6 text-left sm:p-10"
          >
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:gap-10">
              <div className="order-1 shrink-0 sm:order-2 sm:w-[46%]">
                {project.image && (
                  <div className="border-border group-hover:border-accent group-hover:shadow-accent/20 aspect-[4/3] w-full overflow-hidden rounded-xl border-2 transition-colors duration-300 group-hover:shadow-lg">
                    {/* eslint-disable-next-line @next/next/no-img-element -- static export, no image optimizer */}
                    <img
                      src={project.image}
                      alt={project.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      style={{ objectPosition: IMAGE_POSITION[project.slug] ?? "center" }}
                    />
                  </div>
                )}
              </div>

              <div className="order-2 flex flex-col gap-4 sm:order-1 sm:flex-1">
                <div>
                  <p className="text-accent text-xs font-medium tracking-widest uppercase">
                    {project.role}
                  </p>
                  <p className="text-foreground mt-1.5 text-2xl font-semibold tracking-tight sm:text-3xl">
                    {project.title}
                  </p>
                </div>
                <p className="text-muted max-w-lg text-sm leading-relaxed sm:text-base">
                  {project.description}
                </p>
                <span className="text-accent mt-1 inline-flex items-center gap-1.5 text-sm font-medium transition-transform group-hover:translate-x-1">
                  Смотреть проект
                  <ChevronIcon direction="right" />
                </span>
              </div>
            </div>
          </button>

          <div className="flex items-center justify-center gap-2 py-5">
            {items.map((p, i) => (
              <button
                key={p.slug}
                type="button"
                aria-label={p.title}
                aria-current={i === active ? "true" : undefined}
                onClick={() => setActive(i)}
                className={`h-2 rounded-full transition-all ${
                  i === active ? "bg-accent w-6" : "bg-border hover:bg-muted w-2"
                }`}
              />
            ))}
          </div>
        </div>

        <button
          type="button"
          aria-label="Следующий проект"
          onClick={() => setActive((i) => (i + 1) % items.length)}
          className="border-border bg-surface text-foreground hover:border-accent hover:text-accent flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition-colors sm:h-12 sm:w-12"
        >
          <ChevronIcon direction="right" />
        </button>
      </div>
    </section>
  );
}
