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

test("theme toggle flips the html class", async ({ page }) => {
  await page.goto("/ru/");
  const html = page.locator("html");
  await expect(html).toHaveClass(/dark/);
  await page.getByRole("button", { name: /светлую тему/i }).click();
  await expect(html).toHaveClass(/light/);
});
