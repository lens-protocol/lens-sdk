import { devices, test, expect } from "@playwright/test";

test.use(devices["Desktop Chrome"]);

test.describe("Given a desktop browser", async () => {
  test.describe("When opening the default page", async () => {
    test("Then the welcome text should appear", async ({ page }) => {
      await page.goto("/");

      await expect(page.getByRole("heading", { name: "Welcome to Lens" })).toBeVisible();
    });
  });
});
