import { test, expect } from "@playwright/test";

test("home page loads without console errors and shows key content", async ({ page }) => {
  const errors: string[] = [];
  page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await expect(page.getByText("varun.codes")).toBeVisible();
  await expect(page.getByRole("link", { name: /LinkedIn/ })).toBeVisible();
  expect(errors).toEqual([]);
});

test("no horizontal overflow on mobile", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
  expect(overflow).toBe(false);
});

// Visual regression: add baseline via `npx playwright test --update-snapshots` once reference
// screenshots are converted to baselines, then enable:
// await expect(page).toHaveScreenshot("home-1568x746.png", { maxDiffPixelRatio: 0.02 });
