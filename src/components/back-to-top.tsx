"use client";

import { useEffect, useState } from "react";
import { prefersReducedMotion } from "@/lib/motion";
import { ChevronUpIcon } from "@/components/icons";

/** Appears after scrolling down; smooth-scrolls to top (honors reduced-motion). */
export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > 400);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function toTop() {
    window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? "auto" : "smooth" });
  }

  if (!visible) return null;

  return (
    <button
      type="button"
      onClick={toTop}
      aria-label="Наверх"
      className="border-border bg-surface text-foreground hover:border-accent hover:text-accent fixed right-8 bottom-8 z-40 flex h-[52px] w-[52px] items-center justify-center rounded-full border shadow-sm transition-colors"
    >
      <ChevronUpIcon />
    </button>
  );
}
