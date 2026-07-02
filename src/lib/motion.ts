"use client";

import { useSyncExternalStore } from "react";

// Single source for the reduced-motion check. Previously inlined in
// project-showcase, back-to-top and jumpToProject — kept drifting. Use
// `prefersReducedMotion()` inside event handlers / module-level helpers, and the
// `useReducedMotion()` hook where a component must re-render on OS setting change.

const QUERY = "(prefers-reduced-motion: reduce)";

/** Imperative one-shot read. Safe on the server (returns false — motion allowed). */
export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia(QUERY).matches;
}

function subscribe(onChange: () => void) {
  const mq = window.matchMedia(QUERY);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

/** Reactive variant: re-renders when the OS setting flips mid-session. */
export function useReducedMotion(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(QUERY).matches,
    () => false,
  );
}
