const { test, expect } = require('@playwright/test');
const { HomePage } = require('../pages/HomePage');
const { ProductsPage } = require('../pages/ProductsPage');
const productsData = require('../test-data/products.json');

test.describe('Product Search Tests', () => {
  test('should search for a product and view its details', async ({ page }) => {
    const homePage = new HomePage(page);
    const productsPage = new ProductsPage(page);

    await homePage.navigate();
    await homePage.searchProduct(productsData.searchKeyword);

    await expect(productsPage.productTitles.first()).toBeVisible();
    await expect(productsPage.productTitles.first()).toContainText(productsData.searchKeyword);

    await productsPage.openProductByName(productsData.productName);

    await expect(productsPage.productNameHeading).toHaveText(productsData.productName);
    await expect(productsPage.productPrice).toBeVisible();
  });
});

