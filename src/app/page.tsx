/**
 * Locale entry point. The site is RU-first; `/` forwards to `/ru/`.
 * Uses a relative meta-refresh so it works under any basePath (custom domain
 * or `*.github.io/<repo>`) without server-side redirects (static export).
 * A first-visit language overlay will replace this in a later Phase-2 step.
 */
export default function RootRedirect() {
  return (
    <>
      <meta httpEquiv="refresh" content="0; url=./ru/" />
      <noscript>
        <a href="./ru/">Перейти на сайт</a>
      </noscript>
    </>
  );
}
