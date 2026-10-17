const { test, expect } = require('@playwright/test');
const { HomePage } = require('../pages/HomePage');
const { ProductsPage } = require('../pages/ProductsPage');
const productsData = require('../test-data/products.json');

test.describe('Product Search Tests', () => {
  test('should search for a product and view its details', async ({ page }) => {
    const homePage = new HomePage(page);
    const productsPage = new ProductsPage(page);

    await homePage.navigate();
    await homePage.searchProduct(productsData.searchProduct.keyword);

    await expect(productsPage.productTitles.first()).toBeVisible();
    await expect(productsPage.productTitles.first()).toContainText(productsData.searchProduct.keyword);

    await productsPage.openProductByName(productsData.searchProduct.name);

    await expect(productsPage.productNameHeading).toHaveText(productsData.searchProduct.name);
    await expect(productsPage.productPrice).toBeVisible();

    await page.screenshot({ path: 'screenshots/product-search-details.png', fullPage: true });
  });
});
