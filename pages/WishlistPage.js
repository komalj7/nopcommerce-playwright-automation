class WishlistPage {
  constructor(page) {
    this.page = page;
    this.pageTitle = page.locator('.page-title h1');
    this.wishlistItems = page.locator('.wishlist-content tbody tr');
    this.productNames = page.locator('.wishlist-content .product a');
    this.removeCheckboxes = page.locator('input[name="removefromcart"]');
    this.updateWishlistButton = page.locator('input[name="updatecart"]');
    this.emptyWishlistMessage = page.locator('.wishlist-content');
  }

  async navigate() {
    await this.page.goto('/wishlist');
  }

  async removeItem() {
    await this.removeCheckboxes.first().check();
    await this.updateWishlistButton.click();
  }
}

module.exports = { WishlistPage };
