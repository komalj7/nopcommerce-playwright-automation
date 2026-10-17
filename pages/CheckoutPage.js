class CheckoutPage {
  constructor(page) {
    this.page = page;
    this.pageTitle = page.locator('.page-title h1');
    this.checkoutAsGuestButton = page.locator('input[value="Checkout as Guest"]');
    this.billingFirstNameInput = page.locator('#BillingNewAddress_FirstName');
    this.billingLastNameInput = page.locator('#BillingNewAddress_LastName');
    this.billingEmailInput = page.locator('#BillingNewAddress_Email');
    this.billingCountrySelect = page.locator('#BillingNewAddress_CountryId');
    this.billingCityInput = page.locator('#BillingNewAddress_City');
    this.billingAddress1Input = page.locator('#BillingNewAddress_Address1');
    this.billingZipInput = page.locator('#BillingNewAddress_ZipPostalCode');
    this.billingPhoneInput = page.locator('#BillingNewAddress_PhoneNumber');
    this.billingContinueButton = page.locator('#billing-buttons-container input[value="Continue"]');
    this.shippingAddressContinueButton = page.locator('#shipping-buttons-container input[value="Continue"]');
    this.shippingMethodContinueButton = page.locator('#shipping-method-buttons-container input[value="Continue"]');
    this.paymentMethodContinueButton = page.locator('#payment-method-buttons-container input[value="Continue"]');
    this.paymentInfoContinueButton = page.locator('#payment-info-buttons-container input[value="Continue"]');
    this.confirmOrderButton = page.locator('#confirm-order-buttons-container input[value="Confirm"]');
    this.orderSuccessTitle = page.locator('.section.order-completed .title');
    this.orderSuccessMessage = page.locator('.section.order-completed');
  }

  async clickCheckoutAsGuest() {
    if (await this.checkoutAsGuestButton.isVisible()) {
      await this.checkoutAsGuestButton.click();
    }
  }

  async fillBillingAddress(details) {
    await this.billingCountrySelect.selectOption({ label: details.country });
    await this.page.waitForTimeout(500); // brief wait for state list to adjust if needed
    await this.billingCityInput.fill(details.city);
    await this.billingAddress1Input.fill(details.address1);
    await this.billingZipInput.fill(details.zip);
    await this.billingPhoneInput.fill(details.phone);
    await this.billingContinueButton.click();
  }

  async continueShippingAddress() {
    await this.shippingAddressContinueButton.waitFor({ state: 'visible', timeout: 15000 });
    await this.shippingAddressContinueButton.click();
  }

  async continueShippingMethod() {
    await this.shippingMethodContinueButton.waitFor({ state: 'visible', timeout: 15000 });
    await this.shippingMethodContinueButton.click();
  }

  async continuePaymentMethod() {
    await this.paymentMethodContinueButton.waitFor({ state: 'visible', timeout: 15000 });
    await this.paymentMethodContinueButton.click();
  }

  async continuePaymentInfo() {
    await this.paymentInfoContinueButton.waitFor({ state: 'visible', timeout: 15000 });
    await this.paymentInfoContinueButton.click();
  }

  async confirmOrder() {
    await this.confirmOrderButton.waitFor({ state: 'visible', timeout: 15000 });
    await this.confirmOrderButton.click();
  }
}

module.exports = { CheckoutPage };
