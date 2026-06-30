"use client";

import { useSyncExternalStore } from "react";

type Theme = "dark" | "light";

// Subscribe to the explicit theme class on <html>, which is the single source
// of truth (set by the anti-flash script and mutated by toggle()).
function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
  return () => observer.disconnect();
}

function getSnapshot(): Theme {
  return document.documentElement.classList.contains("light") ? "light" : "dark";
}

function getServerSnapshot(): Theme {
  return "dark"; // matches the default the anti-flash script applies
}

/**
 * Flips the explicit theme class on <html> and persists the choice.
 * Mirrors the anti-flash init script in the root layout.
 */
export function ThemeToggle() {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  function toggle() {
    const next: Theme = theme === "dark" ? "light" : "dark";
    const root = document.documentElement;
    root.classList.remove("dark", "light");
    root.classList.add(next);
    try {
      localStorage.setItem("theme", next);
    } catch {
      // ignore storage failures (private mode, etc.)
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={theme === "dark" ? "Включить светлую тему" : "Включить тёмную тему"}
      className="border-border text-muted hover:border-accent hover:text-foreground rounded-full border px-4 py-2 text-sm transition-colors"
    >
      {theme === "dark" ? "Светлая тема" : "Тёмная тема"}
    </button>
  );
}
