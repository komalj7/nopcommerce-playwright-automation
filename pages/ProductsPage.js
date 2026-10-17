class ProductsPage {
  constructor(page) {
    this.page = page;
    this.productTitles = page.locator('.product-title a');
    this.searchKeywordInput = page.locator('#q');
    this.searchPageButton = page.locator('.search-input .search-button');
    this.productNameHeading = page.locator('.product-name h1');
    this.productPrice = page.locator('.product-price span');
    this.addToCartButton = page.locator('#add-to-cart-button-1, [id^="add-to-cart-button"]');
    this.addToWishlistButton = page.locator('#add-to-wishlist-button-1, [id^="add-to-wishlist-button"]');
    this.notificationSuccess = page.locator('.bar-notification.success');
    this.notificationClose = page.locator('.bar-notification.success .close');
  }

  async selectCategory(categoryName) {
    await this.page.locator('.top-menu.notmobile').getByRole('link', { name: categoryName, exact: true }).click();
  }

  async openProductByName(name) {
    await this.page.getByRole('link', { name: name, exact: true }).first().click();
  }

  async addCurrentProductToCart() {
    await this.addToCartButton.first().click();
  }

  async addCurrentProductToWishlist() {
    await this.addToWishlistButton.first().click();
  }
}

module.exports = { ProductsPage };

