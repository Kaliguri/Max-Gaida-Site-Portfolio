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

const AUTO_ROTATE_MS = 6000;
// After the pointer leaves, wait a beat before the countdown starts again, so a
// quick pass over the carousel doesn't yank the timer back to life instantly.
const RESUME_DELAY_MS = 500;

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
  // `interacting` = pointer over / keyboard focus inside the carousel. It pauses
  // the countdown and hides the timer bar; auto-rotate resumes after leaving.
  const [interacting, setInteracting] = useState(false);
  const [reduced, setReduced] = useState(false);
  const barRef = useRef<HTMLDivElement>(null);
  const resumeRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const elapsedRef = useRef(0);

  // Track reduced-motion reactively so the timer bar and auto-rotate stay in
  // sync with the OS setting even if it changes mid-session.
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // Single clock for the whole auto-rotate: one interval fills the progress bar
  // (imperatively, no per-frame re-render) AND flips to the next slide when it
  // reaches the end. Bar and switch share this timer by construction, so the
  // pager and the countdown can never drift apart. Restarts from zero whenever
  // `active` changes — auto-advance and manual dot/arrow clicks alike. An
  // interval (not rAF) so it keeps counting in a backgrounded tab.
  useEffect(() => {
    const bar = barRef.current;
    if (interacting || reduced || items.length <= 1) return;
    elapsedRef.current = 0;
    if (bar) bar.style.transform = "scaleX(0)";

    const TICK_MS = 40;
    const id = setInterval(() => {
      elapsedRef.current += TICK_MS;
      const p = Math.min(elapsedRef.current / AUTO_ROTATE_MS, 1);
      if (bar) bar.style.transform = `scaleX(${p})`;
      if (p >= 1) setActive((i) => (i + 1) % items.length);
    }, TICK_MS);
    return () => clearInterval(id);
  }, [interacting, reduced, items.length, active]);

  // Enter pauses immediately; leave waits RESUME_DELAY_MS before resuming.
  const clearResume = () => {
    if (resumeRef.current) clearTimeout(resumeRef.current);
    resumeRef.current = null;
  };
  const beginInteract = () => {
    clearResume();
    setInteracting(true);
  };
  const endInteract = () => {
    clearResume();
    resumeRef.current = setTimeout(() => setInteracting(false), RESUME_DELAY_MS);
  };
  useEffect(() => {
    return () => {
      if (resumeRef.current) clearTimeout(resumeRef.current);
    };
  }, []);

  if (items.length === 0) return null;
  const project = items[active];
  const showTimer = items.length > 1 && !reduced;

  return (
    <section
      id="showcase"
      aria-label="Витрина проектов"
      className="reveal scroll-mt-20 pb-4"
      onMouseEnter={beginInteract}
      onMouseLeave={endInteract}
      onFocus={beginInteract}
      onBlur={endInteract}
    >
      {/* Heading + divider align to the main max-w-5xl column (like the other
          section headers); the carousel below is intentionally wider (max-w-6xl). */}
      <div className="border-border mx-auto w-full max-w-5xl border-t px-6 pt-8 sm:px-10 sm:pt-10">
        <h2 className="text-foreground text-2xl font-semibold tracking-tight sm:text-3xl">
          Витрина проектов
        </h2>
      </div>

      <div className="mx-auto mt-8 flex w-full max-w-6xl items-center gap-3 px-6 sm:gap-6 sm:px-10">
        <button
          type="button"
          aria-label="Предыдущий проект"
          onClick={() => setActive((i) => (i - 1 + items.length) % items.length)}
          className="border-border bg-surface text-foreground hover:border-accent hover:text-accent flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition-colors sm:h-12 sm:w-12"
        >
          <ChevronIcon direction="left" />
        </button>

        {/* Whole card is one big button — clicking anywhere jumps to the project.
            The hover/focus accent outline lives here, on the entire carousel body
            (focus-within catches keyboard focus of the inner button); the native
            button outline is suppressed so we don't get a double ring. */}
        <div className="border-border bg-surface hover:border-accent focus-within:border-accent min-w-0 flex-1 overflow-hidden rounded-2xl border transition-colors">
          <button
            type="button"
            onClick={() => jumpToProject(project.slug)}
            aria-label={`Смотреть проект: ${project.title}`}
            className="block w-full cursor-pointer p-6 text-left focus:outline-none sm:p-10"
          >
            <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:gap-10">
              <div className="order-1 shrink-0 sm:order-2 sm:w-[46%]">
                {/* Frame with a fixed 3:2 ratio. Source art varies wildly in
                    aspect and resolution, so each slide is shown object-contain
                    (never cropped) over a blurred, blown-up copy of itself —
                    letterboxing reads as an intentional frame and the blur hides
                    low-res softness. All slides are stacked and crossfaded on
                    opacity; only the active one is visible. */}
                <div className="border-border relative aspect-[3/2] w-full overflow-hidden rounded-xl border-2">
                  {items.map((p, i) =>
                    p.image ? (
                      <div
                        key={p.slug}
                        aria-hidden={i !== active}
                        className={`absolute inset-0 transition-opacity duration-500 motion-reduce:transition-none ${
                          i === active ? "opacity-100" : "opacity-0"
                        }`}
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element -- static export, no image optimizer */}
                        <img
                          src={p.image}
                          alt=""
                          aria-hidden="true"
                          className="absolute inset-0 h-full w-full scale-110 object-cover opacity-45 blur-2xl"
                        />
                        <div className="bg-background/25 absolute inset-0" />
                        {/* eslint-disable-next-line @next/next/no-img-element -- static export, no image optimizer */}
                        <img
                          src={p.image}
                          alt=""
                          aria-hidden="true"
                          className="absolute inset-0 h-full w-full object-contain"
                        />
                      </div>
                    ) : null,
                  )}
                </div>
              </div>

              <div
                key={active}
                className="carousel-fade order-2 flex flex-col gap-4 sm:order-1 sm:flex-1"
              >
                <div>
                  <p className="text-accent text-sm font-medium tracking-wide uppercase">
                    {project.role}
                  </p>
                  <p className="text-foreground mt-1.5 text-2xl font-semibold tracking-tight sm:text-3xl">
                    {project.title}
                  </p>
                </div>
                <p className="text-muted max-w-lg text-sm leading-relaxed sm:text-base">
                  {project.description}
                </p>
              </div>
            </div>
          </button>

          <div className="flex items-center justify-center gap-2 pt-5 pb-4">
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

          {/* Auto-rotate countdown, driven by the rAF clock above. It fades out
              while interacting — which is exactly when the accent outline shows —
              so the amber bar and the amber outline never compete on screen. */}
          {showTimer && (
            <div
              className={`bg-border/40 h-[3px] w-full transition-opacity duration-300 ${
                interacting ? "opacity-0" : "opacity-100"
              }`}
              aria-hidden="true"
            >
              <div
                ref={barRef}
                className="bg-accent h-full w-full origin-left"
                style={{ transform: "scaleX(0)" }}
              />
            </div>
          )}
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
