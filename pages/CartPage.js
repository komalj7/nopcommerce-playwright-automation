class CartPage {
  constructor(page) {
    this.page = page;
    this.pageTitle = page.locator('.page-title h1');
    this.cartItems = page.locator('.cart tbody tr');
    this.productNames = page.locator('.product-name');
    this.quantityInputs = page.locator('.qty-input');
    this.removeButtons = page.locator('.remove-btn, button.remove-from-cart');
    this.emptyCartMessage = page.locator('.no-data');
    this.termsCheckbox = page.locator('#termsofservice');
    this.checkoutButton = page.locator('#checkout');
  }

  async navigate() {
    await this.page.goto('/cart');
  }

  async removeItem() {
    await this.removeButtons.first().click();
  }

  async acceptTermsAndCheckout() {
    await this.termsCheckbox.check();
    await this.checkoutButton.click();
  }
}

module.exports = { CartPage };

