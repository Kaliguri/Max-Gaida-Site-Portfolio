// Screenshot each /[lang]/og/... route into out/og/<lang>/<name>.png.
// Run AFTER `next build` (needs out/). Used in CI before the Pages upload.
//
// Why not the Next `opengraph-image` convention: under `output: export` it
// emits an extension-less file, and GitHub Pages serves those as
// application/octet-stream — messengers then skip the preview. See src/lib/og.ts.
import { chromium } from "@playwright/test";
import { spawn } from "node:child_process";
import { existsSync, mkdirSync, readdirSync } from "node:fs";
import { join } from "node:path";

const OUT = "out";
const PORT = 4501;
const BASE = `http://127.0.0.1:${PORT}`;
const SIZE = { width: 1200, height: 630 };

function dirs(path) {
  return existsSync(path)
    ? readdirSync(path, { withFileTypes: true })
        .filter((d) => d.isDirectory())
        .map((d) => d.name)
    : [];
}

// Mirrors the route tree in src/app/[lang]/og and the names in src/lib/og.ts.
const targets = [];
for (const lang of dirs(OUT)) {
  const ogDir = join(OUT, lang, "og");
  if (!existsSync(join(ogDir, "index.html"))) continue;

  targets.push({ lang, route: `/${lang}/og/`, name: "home" });
  for (const role of dirs(join(ogDir, "resume"))) {
    targets.push({ lang, route: `/${lang}/og/resume/${role}/`, name: `resume-${role}` });
  }
  for (const slug of dirs(join(ogDir, "projects"))) {
    targets.push({ lang, route: `/${lang}/og/projects/${slug}/`, name: `project-${slug}` });
  }
}

if (targets.length === 0) {
  console.error("render-og: no og routes found in out/ — did you run `next build`?");
  process.exit(1);
}

const server = spawn("npx", ["serve", OUT, "-l", String(PORT), "--no-clipboard"], {
  shell: true,
  stdio: "ignore",
});

async function waitForServer() {
  for (let i = 0; i < 60; i++) {
    try {
      const res = await fetch(BASE);
      if (res.ok || res.status === 404) return;
    } catch {
      // not up yet
    }
    await new Promise((r) => setTimeout(r, 500));
  }
  throw new Error("render-og: static server did not start in time");
}

try {
  await waitForServer();
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: SIZE, deviceScaleFactor: 1 });

  for (const { lang, route, name } of targets) {
    await page.goto(`${BASE}${route}`, { waitUntil: "networkidle" });
    // Webfont swap would otherwise land after the shot.
    await page.evaluate(() => document.fonts.ready);
    const dir = join(OUT, "og", lang);
    mkdirSync(dir, { recursive: true });
    const out = join(dir, `${name}.png`);
    await page.screenshot({ path: out, clip: { x: 0, y: 0, ...SIZE } });
    console.log(`render-og: ${out}`);
  }

  await browser.close();
} finally {
  server.kill();
}

process.exit(0);
