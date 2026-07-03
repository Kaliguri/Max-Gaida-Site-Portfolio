"use client";

import { useEffect, useRef, useState } from "react";
import { prefersReducedMotion } from "@/lib/motion";

/**
 * Renders a string, counting every numeric token up from 0 to its value once
 * the element scrolls into view. Non-numeric text (labels, ~, k, %, · …) is
 * passed through untouched, so "~77k показов · 36% CTR" animates the 77 and 36.
 * SSR / no-JS / reduced-motion just show the final string.
 */
export function CountUpText({ children, className }: { children: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [run, setRun] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setRun(true);
          io.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const parts = children.split(/(\d+(?:\.\d+)?)/);
  return (
    <span ref={ref} className={className}>
      {parts.map((part, i) =>
        /^\d/.test(part) ? <CountNum key={i} target={part} run={run} /> : part,
      )}
    </span>
  );
}

function CountNum({ target, run }: { target: string; run: boolean }) {
  const decimals = target.includes(".") ? target.split(".")[1].length : 0;
  const end = parseFloat(target);
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!run) return;
    let raf = 0;
    let start = 0;
    const duration = 1000;
    const tick = (t: number) => {
      if (!start) start = t;
      const p = Math.min((t - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(end * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [run, end]);

  // Until it runs, render the literal target (SSR/no-JS safe, no flash of 0).
  return <>{run ? val.toFixed(decimals) : target}</>;
}
