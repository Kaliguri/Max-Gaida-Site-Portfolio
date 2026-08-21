import { expect, test } from "@playwright/test";

test("root redirects to the ru locale", async ({ page }) => {
  await page.goto("/");
  await page.waitForURL("**/ru/**");
  await expect(page.locator("main")).toBeVisible();
});

test("ru home renders with the heading", async ({ page }) => {
  const response = await page.goto("/ru/");
  expect(response?.ok()).toBeTruthy();
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
});

test("resume role page renders and cross-links the other role", async ({ page }) => {
  const response = await page.goto("/ru/resume/unity-developer/");
  expect(response?.ok()).toBeTruthy();
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Опыт" })).toBeVisible();
  await page.getByRole("link", { name: "Game Designer" }).click();
  await page.waitForURL("**/resume/game-designer/**");
});

test("theme toggle flips the html class", async ({ page }) => {
  await page.goto("/ru/");
  const html = page.locator("html");
  await expect(html).toHaveClass(/dark/);
  // The button's visible label IS its accessible name — it carries no aria-label
  // (a differently-declined one tripped Lighthouse's label-content-name-mismatch).
  await page.getByRole("button", { name: /светлая тема/i }).click();
  await expect(html).toHaveClass(/light/);
});
