import { test, expect } from "@playwright/test";

test("Has title", async ({ page }) => {
  await page.goto("http://localhost:3000");

  await expect
    .soft(page.getByRole("heading", { name: "Redesign your home with AI" }))
    .toBeVisible();
});

test("Redesign Room Button Visible ", async ({ page }) => {
  await page.goto("http://localhost:3000");

  await expect(
    page.getByRole("button", { name: "Redesign Room" })
  ).toBeVisible();
});

test("Redesign Building Button Visible ", async ({ page }) => {
  await page.goto("http://localhost:3000");

  await expect(
    page.getByRole("button", { name: "Redesign Building" })
  ).toBeVisible();
});
