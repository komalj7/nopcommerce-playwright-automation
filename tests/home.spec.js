const { test, expect } = require('@playwright/test');
const { HomePage } = require('../pages/HomePage');

test.describe('Home Page Tests', () => {
  test('should load home page and verify navigation elements', async ({ page }) => {
    const homePage = new HomePage(page);

    await homePage.navigate();

    await expect(page).toHaveTitle(/Demo Web Shop/i);
    await expect(homePage.logo).toBeVisible();
    await expect(homePage.registerLink).toBeVisible();
    await expect(homePage.loginLink).toBeVisible();
    await expect(homePage.shoppingCartHeaderLink).toBeVisible();
    await expect(homePage.wishlistHeaderLink).toBeVisible();
    await expect(homePage.searchInput).toBeVisible();
    await expect(homePage.topMenu).toBeVisible();

    await page.screenshot({ path: 'screenshots/home-page.png', fullPage: true });
  });
});
