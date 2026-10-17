const { test, expect } = require('@playwright/test');
const { ProductsPage } = require('../pages/ProductsPage');
const { CartPage } = require('../pages/CartPage');

test.describe('Shopping Cart Tests', () => {
  test('should add product to cart and verify in cart', async ({ page }) => {
    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);

    await page.goto('/apple-macbook-pro-13-inch');
    await productsPage.addCurrentProductToCart();

    await expect(productsPage.notificationSuccess).toBeVisible();

    await cartPage.navigate();
    await expect(cartPage.pageTitle).toHaveText('Shopping cart');
    await expect(cartPage.productNames.first()).toContainText('Apple MacBook Pro 13-inch');

    await cartPage.removeItem();
    await expect(cartPage.emptyCartMessage).toBeVisible();
  });
});

