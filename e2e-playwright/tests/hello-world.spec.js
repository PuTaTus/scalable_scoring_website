const { test, expect } = require('@playwright/test');

// test("Server responds with a page with the title 'Programming assignments'", async ({ page }) => {
//   console.log('TADA')
//   await page.goto("/");
//   expect(await page.title()).toBe("Programming assignments");
// });
test('has title', async ({ page }) => {
  await page.goto('/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle("Programming assignments");
});
