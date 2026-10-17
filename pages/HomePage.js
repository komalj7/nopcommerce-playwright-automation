class HomePage {
  constructor(page) {
    this.page = page;
    this.logo = page.locator('.header-logo a');
    this.registerLink = page.getByRole('link', { name: 'Register' });
    this.loginLink = page.getByRole('link', { name: 'Log in' });
    this.logoutLink = page.getByRole('link', { name: 'Log out' });
    this.myAccountLink = page.getByRole('link', { name: 'My account' });
    this.wishlistLink = page.locator('.header-links .ico-wishlist');
    this.shoppingCartLink = page.locator('.header-links .ico-cart');
    this.searchInput = page.getByPlaceholder('Search store');
    this.searchButton = page.getByRole('button', { name: 'Search' });
    this.topMenu = page.locator('.top-menu.notmobile');
  }

  async navigate() {
    await this.page.goto('/');
  }

  async clickRegister() {
    await this.registerLink.click();
  }

  async clickLogin() {
    await this.loginLink.click();
  }

  async clickLogout() {
    await this.logoutLink.click();
  }

  async clickWishlist() {
    await this.wishlistLink.click();
  }

  async clickShoppingCart() {
    await this.shoppingCartLink.click();
  }

  async searchProduct(keyword) {
    await this.searchInput.fill(keyword);
    await this.searchButton.click();
  }
}

module.exports = { HomePage };

