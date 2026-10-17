class CartPage {
  constructor(page) {
    this.page = page;
    this.pageTitle = page.locator('.page-title h1');
    this.cartItems = page.locator('.cart tbody tr');
    this.productNames = page.locator('.cart .product a');
    this.quantityInputs = page.locator('.qty-input');
    this.removeCheckboxes = page.locator('input[name="removefromcart"]');
    this.updateCartButton = page.locator('input[name="updatecart"]');
    this.emptyCartMessage = page.locator('.order-summary-content');
    this.termsCheckbox = page.locator('#termsofservice');
    this.checkoutButton = page.locator('#checkout');
  }

  async navigate() {
    await this.page.goto('/cart');
  }

  async removeItem() {
    await this.removeCheckboxes.first().check();
    await this.updateCartButton.click();
  }

  async acceptTermsAndCheckout() {
    await this.termsCheckbox.check();
    await this.checkoutButton.click();
  }
}

module.exports = { CartPage };
