// Render each résumé print route to a selectable-text PDF next to its route in
// out/. Run AFTER `next build` (needs out/). Used in CI before the Pages upload.
import { chromium } from "@playwright/test";
import { spawn } from "node:child_process";
import { existsSync, readdirSync } from "node:fs";
import { join } from "node:path";

const OUT = "out";
const PORT = 4500;
const BASE = `http://127.0.0.1:${PORT}`;

function dirs(path) {
  return existsSync(path)
    ? readdirSync(path, { withFileTypes: true })
        .filter((d) => d.isDirectory())
        .map((d) => d.name)
    : [];
}

// Discover out/<lang>/resume/<role>/print/index.html
const targets = [];
for (const lang of dirs(OUT)) {
  const resumeDir = join(OUT, lang, "resume");
  for (const role of dirs(resumeDir)) {
    if (existsSync(join(resumeDir, role, "print", "index.html"))) {
      targets.push({ lang, role });
    }
  }
}

if (targets.length === 0) {
  console.error("render-pdf: no print routes found in out/ — did you run `next build`?");
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
  throw new Error("render-pdf: static server did not start in time");
}

try {
  await waitForServer();
  const browser = await chromium.launch();
  const page = await browser.newPage();

  for (const { lang, role } of targets) {
    await page.goto(`${BASE}/${lang}/resume/${role}/print/`, { waitUntil: "networkidle" });
    const out = join(OUT, lang, "resume", `${role}.pdf`);
    await page.pdf({
      path: out,
      format: "A4",
      printBackground: true,
      margin: { top: "12mm", bottom: "12mm", left: "12mm", right: "12mm" },
    });
    console.log(`render-pdf: ${out}`);
  }

  await browser.close();
} finally {
  server.kill();
}

process.exit(0);
