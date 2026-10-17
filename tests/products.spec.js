const { test, expect } = require('@playwright/test');
const { HomePage } = require('../pages/HomePage');
const { ProductsPage } = require('../pages/ProductsPage');
const productsData = require('../test-data/products.json');

test.describe('Products Category Tests', () => {
  test('should open product category, select product and verify details', async ({ page }) => {
    const homePage = new HomePage(page);
    const productsPage = new ProductsPage(page);

    await homePage.navigate();
    await productsPage.selectCategory(productsData.categoryName);

    await expect(page).toHaveURL(/.*computers/);
    await expect(page.locator('.page-title h1')).toContainText(productsData.categoryName);
  });
});

