const { test, expect } = require('@playwright/test');
const { ProductsPage } = require('../pages/ProductsPage');
const { WishlistPage } = require('../pages/WishlistPage');
const productsData = require('../test-data/products.json');

test.describe('Wishlist Tests', () => {
  test('should add product to wishlist, verify and remove it', async ({ page }) => {
    const productsPage = new ProductsPage(page);
    const wishlistPage = new WishlistPage(page);

    await page.goto(productsData.wishlistProduct.url);
    await productsPage.addCurrentProductToWishlist();

    await expect(productsPage.notificationSuccess).toBeVisible();
    await expect(productsPage.notificationSuccess).toContainText('The product has been added to your wishlist');

    await wishlistPage.navigate();
    await expect(wishlistPage.pageTitle).toHaveText('Wishlist');
    await expect(wishlistPage.productNames.first()).toContainText(productsData.wishlistProduct.name);

    await page.screenshot({ path: 'screenshots/wishlist-with-items.png', fullPage: true });

    await wishlistPage.removeItem();
    await expect(wishlistPage.emptyWishlistMessage).toContainText('The wishlist is empty!');

    await page.screenshot({ path: 'screenshots/wishlist-empty.png', fullPage: true });
  });
});
