"use client";

import { useEffect } from "react";

/**
 * Yandex Metrica. Chosen over Cloudflare/Google analytics because the audience
 * is partly in RF, where those are throttled or blocked.
 *
 * The counter id comes from `NEXT_PUBLIC_YM_ID` (set in CI). With no id the
 * component renders nothing at all — local dev and forks stay untracked without
 * needing a code change.
 *
 * Notice, not consent: the banner (see cookie-notice.tsx) informs rather than
 * gates, so the script loads on first paint. Deliberate call by Max — a gating
 * banner would drop a chunk of the stats. The privacy policy documents it.
 */
const YM_ID = process.env.NEXT_PUBLIC_YM_ID;

export function Metrika() {
  useEffect(() => {
    if (!YM_ID) return;
    // Guard against a second init across client-side navigations.
    if (window.ym) return;

    const script = document.createElement("script");
    script.src = "https://mc.yandex.ru/metrika/tag.js";
    script.async = true;
    document.head.appendChild(script);

    window.ym =
      window.ym ||
      function (...args: unknown[]) {
        (window.ym!.a = window.ym!.a || []).push(args);
      };
    window.ym.l = Date.now();
    window.ym(Number(YM_ID), "init", {
      webvisor: true,
      clickmap: true,
      trackLinks: true,
      accurateTrackBounce: true,
    });
  }, []);

  if (!YM_ID) return null;

  return (
    <noscript>
      <div>
        {/* eslint-disable-next-line @next/next/no-img-element -- tracking pixel, not content */}
        <img
          src={`https://mc.yandex.ru/watch/${YM_ID}`}
          style={{ position: "absolute", left: "-9999px" }}
          alt=""
        />
      </div>
    </noscript>
  );
}

declare global {
  interface Window {
    ym?: {
      (...args: unknown[]): void;
      a?: unknown[];
      l?: number;
    };
  }
}
