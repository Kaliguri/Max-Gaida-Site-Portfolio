"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";
import { SITE } from "@/lib/site";

const STORAGE_KEY = "cookie-notice-ack";

// Module-level store instead of useState+useEffect: the "have they dismissed
// it" answer lives in localStorage, which is external state, and reading it in
// an effect means a synchronous setState during the effect. Same shape as
// lib/motion.ts.
let dismissed: boolean | null = null;
const listeners = new Set<() => void>();

function isDismissed(): boolean {
  if (dismissed === null) {
    try {
      dismissed = localStorage.getItem(STORAGE_KEY) !== null;
    } catch {
      // Private mode / storage blocked — don't nag on every page.
      dismissed = true;
    }
  }
  return dismissed;
}

function subscribe(onChange: () => void) {
  listeners.add(onChange);
  return () => listeners.delete(onChange);
}

function dismiss() {
  try {
    localStorage.setItem(STORAGE_KEY, "1");
  } catch {
    // Nothing to persist to — the notice simply returns next visit.
  }
  dismissed = true;
  listeners.forEach((l) => l());
}

/**
 * Cookie notice — informs, does not gate. Analytics loads regardless; this
 * strip says so and links the policy, which is what the Metrica terms require.
 * A consent-gating variant was considered and rejected: it would silently drop
 * the visitors who ignore the banner from the stats, and stats are the whole
 * point of adding analytics to a portfolio.
 *
 * The server snapshot is "dismissed", so the strip is absent from the static
 * HTML and only appears after hydration for people who haven't seen it.
 */
export function CookieNotice() {
  const hidden = useSyncExternalStore(subscribe, isDismissed, () => true);
  if (hidden) return null;

  return (
    <div
      role="region"
      aria-label="Уведомление об использовании cookie"
      className="fade-up fixed inset-x-0 bottom-0 z-40 px-4 pb-4 sm:px-6 sm:pb-6"
    >
      <div className="surface-card mx-auto flex max-w-3xl flex-col gap-3 p-4 shadow-lg sm:flex-row sm:items-center sm:gap-5 sm:p-5">
        <p className="text-muted flex-1 text-sm leading-snug">
          Сайт использует cookie и Яндекс.Метрику, чтобы понимать, какие разделы читают.{" "}
          <Link
            href={`/${SITE.defaultLocale}/privacy`}
            className="text-accent hover:text-accent-hover underline underline-offset-2 transition-colors"
          >
            Политика обработки данных
          </Link>
          .
        </p>
        <button
          type="button"
          onClick={dismiss}
          className="bg-accent text-accent-foreground hover:bg-accent-hover shrink-0 rounded-full px-5 py-2 text-sm font-semibold transition-colors"
        >
          Понятно
        </button>
      </div>
    </div>
  );
}
