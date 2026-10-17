const { test, expect } = require('@playwright/test');
const { ProductsPage } = require('../pages/ProductsPage');
const { WishlistPage } = require('../pages/WishlistPage');

test.describe('Wishlist Tests', () => {
  test('should add product to wishlist, verify and remove it', async ({ page }) => {
    const productsPage = new ProductsPage(page);
    const wishlistPage = new WishlistPage(page);

    await page.goto('/apple-macbook-pro-13-inch');
    await productsPage.addCurrentProductToWishlist();

    await expect(productsPage.notificationSuccess).toBeVisible();

    await wishlistPage.navigate();
    await expect(wishlistPage.pageTitle).toHaveText('Wishlist');
    await expect(wishlistPage.productNames.first()).toContainText('Apple MacBook Pro 13-inch');

    await wishlistPage.removeItem();
    await expect(wishlistPage.emptyWishlistMessage).toBeVisible();
  });
});

