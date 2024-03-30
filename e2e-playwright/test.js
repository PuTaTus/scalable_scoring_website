// example.spec.js
const { test, expect } = require('@playwright/test');

test('basic test', async ({ page }) => {
  // Navigate to a website
  await page.goto('https://example.com');

  // Check if the page title is correct
  const pageTitle = await page.title();
  expect(pageTitle).toBe('Example Domain');
});
