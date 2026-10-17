class WishlistPage {
  constructor(page) {
    this.page = page;
    this.pageTitle = page.locator('.page-title h1');
    this.wishlistItems = page.locator('.wishlist-content tbody tr');
    this.productNames = page.locator('.product-name');
    this.removeButtons = page.locator('.remove-btn, button.remove-from-cart');
    this.emptyWishlistMessage = page.locator('.no-data');
  }

  async navigate() {
    await this.page.goto('/wishlist');
  }

  async removeItem() {
    await this.removeButtons.first().click();
  }
}

module.exports = { WishlistPage };

