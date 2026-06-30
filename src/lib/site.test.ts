import { describe, expect, it } from "vitest";
import { SITE, isLocale } from "./site";

describe("site config", () => {
  it("ships ru as the default locale", () => {
    expect(SITE.defaultLocale).toBe("ru");
    expect(SITE.locales).toContain("ru");
  });

  it("recognizes known locales", () => {
    expect(isLocale("ru")).toBe(true);
    expect(isLocale("en")).toBe(true);
    expect(isLocale("de")).toBe(false);
  });
});
