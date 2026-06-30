import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  // Resolve `@/*` tsconfig paths natively (no vite-tsconfig-paths plugin needed).
  resolve: { tsconfigPaths: true },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./vitest.setup.ts"],
    include: ["src/**/*.{test,spec}.{ts,tsx}"],
    // Playwright specs live under e2e/ and run via their own runner.
    exclude: ["node_modules", "e2e", ".next", "out"],
  },
});
