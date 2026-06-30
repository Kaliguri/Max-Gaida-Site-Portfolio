# Max Gaida — portfolio site

Personal portfolio + two résumés (Game Designer, Unity Developer). Static site,
bilingual (RU/EN), dark/light themes, animation-heavy. Audience includes RF.

## Stack

- **Next.js 16 (App Router) + React 19 + TypeScript + Tailwind v4**, static export
  (`output: "export"`, `images.unoptimized: true`). Mirrors the Posleslovie setup.
- **Deploy: GitHub Pages** via Actions, publishing `out/`. `basePath` is derived from the repo
  name at build time (`/Max-Gaida-Site-Portfolio`). `.nojekyll` in `public/`.
  - RF-access note: GitHub is degrading in Russia (no hard block as of 2026-06); Cloudflare is
    throttled there and was rejected for that reason. The site is host-agnostic — moving to a
    Russian static host (Yandex Object Storage / Timeweb) later is a config change only. Keep
    deploy specifics out of app code.
- Tooling mirrors Posleslovie: ESLint, Prettier, Vitest (unit), Playwright (e2e + PDF render),
  Lighthouse CI, Zod. Script pattern: `check` / `check:full`.

## Layout (planned)

- `src/` — app code (App Router under `src/app/[lang]/...`).
- `content/` — single source of truth for data: résumé entries, projects. Typed + Zod-validated.
  Feeds the site, the PDF résumés, and the OG images. Do not duplicate this data elsewhere.
- `public/` — pre-optimized static assets (compressed images, mp4/webm + posters), `.nojekyll`.
- `docs/` — reference docs (RU design/process notes). Index: [`docs/README.md`](docs/README.md).
- `.githooks/` — repo-local git hooks (co-author stripper).

## Key decisions (locked)

- **i18n**: RU/EN via route segment `src/app/[lang]/...` (no middleware on static export).
  Strings live in typed dictionaries, Zod-validated. Language pick on first visit → `localStorage`.
- **Theme**: dark default + light, CSS-variable design tokens. Anti-flash inline script in `<head>`.
- **Design**: code-first tokens (Tailwind theme + CSS vars) from the Dribbble refs — no Figma file yet.
- **Animations**: Framer Motion for reveals/hover/slide-ins; GSAP + ScrollTrigger only for the heavy
  hero scroll-scrub. Always respect `prefers-reduced-motion`.
- **PDF résumés**: print routes `src/app/[lang]/resume/[role]/print/` rendered to PDF via Playwright
  in CI — both themes. Selectable text → doubles as the ATS-friendly CV. Same `content/` data source.

## Conventions

- Code, naming, commits: **English**. README / user-facing docs: **bilingual (RU + EN)**.
  Design / process docs in `docs/` are Russian (`*-ru.md`).
- **i18n content: keep RU + EN in sync** — this site ships both by default (unlike the Unity repos).
- On static export the Next image optimizer is off: pre-compress assets; videos get a poster and
  lazy-load, no autoplay-with-sound.
- Commit + push after each completed phase; end a phase with a manual-test checklist.
- **No agent co-author trailers.** Commits are authored as Max Gaida. Enforced three ways:
  `.claude/settings.json` (`includeCoAuthoredBy: false`), the Cursor app setting, and the
  `.githooks/commit-msg` stripper. Never add `Co-Authored-By: Claude/Cursor` or a "Generated with" line.

## Where the plan lives

The **auto-memory is the single live source of truth** for roadmap, status, and locked decisions
(`memory/MEMORY.md` + linked notes) — check it before starting feature work. Repo docs are
reference, not status: [`docs/README.md`](docs/README.md) is the index. When a doc disagrees with
the memory, the memory wins.
