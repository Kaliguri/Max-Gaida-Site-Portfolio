import { defineConfig, devices } from "@playwright/test";

/**
 * E2E + PDF-render suite. Boots the static export via `next start`-equivalent
 * preview of `out/`. CI builds first, then serves `out/` on port 3000.
 */
const PORT = 3000;
const baseURL = `http://127.0.0.1:${PORT}`;

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: process.env.CI ? "html" : "list",
  use: {
    baseURL,
    trace: "on-first-retry",
  },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
  webServer: {
    // Serve the static export. `npx serve out -l 3000` mirrors GH Pages.
    command: `npx serve out -l ${PORT} --no-clipboard`,
    url: baseURL,
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
