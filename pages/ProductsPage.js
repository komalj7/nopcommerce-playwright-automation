class ProductsPage {
  constructor(page) {
    this.page = page;
    this.productTitles = page.locator('.product-title a');
    this.searchKeywordInput = page.locator('#small-searchterms');
    this.searchPageButton = page.locator('input.search-box-button');
    this.productNameHeading = page.locator('.product-name h1');
    this.productPrice = page.locator('.product-price span');
    this.addToCartButton = page.locator('input[value="Add to cart"], .add-to-cart-button');
    this.addToWishlistButton = page.locator('input[value="Add to wishlist"], .add-to-wishlist-button');
    this.notificationSuccess = page.locator('#bar-notification');
    this.notificationClose = page.locator('#bar-notification .close');
  }

  async selectCategory(categoryName) {
    await this.page.locator('.top-menu > li > a', { hasText: categoryName }).first().click();
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
