const { test, expect } = require('@playwright/test');
const { ProductsPage } = require('../pages/ProductsPage');
const { CartPage } = require('../pages/CartPage');
const productsData = require('../test-data/products.json');

test.describe('Shopping Cart Tests', () => {
  test('should add product to cart and verify in cart', async ({ page }) => {
    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);

    await page.goto(productsData.searchProduct.url);
    await productsPage.addCurrentProductToCart();

    await expect(productsPage.notificationSuccess).toBeVisible();
    await expect(productsPage.notificationSuccess).toContainText('The product has been added to your shopping cart');

    await cartPage.navigate();
    await expect(cartPage.pageTitle).toHaveText('Shopping cart');
    await expect(cartPage.productNames.first()).toContainText(productsData.searchProduct.name);

    await page.screenshot({ path: 'screenshots/cart-with-items.png', fullPage: true });

    await cartPage.removeItem();
    await expect(cartPage.emptyCartMessage).toContainText('Your Shopping Cart is empty!');

    await page.screenshot({ path: 'screenshots/cart-empty.png', fullPage: true });
  });
});
