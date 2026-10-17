class CheckoutPage {
  constructor(page) {
    this.page = page;
    this.pageTitle = page.locator('.page-title h1');
    this.checkoutAsGuestButton = page.getByRole('button', { name: 'Checkout as Guest' });
    this.billingFirstNameInput = page.locator('#BillingNewAddress_FirstName');
    this.billingLastNameInput = page.locator('#BillingNewAddress_LastName');
    this.billingEmailInput = page.locator('#BillingNewAddress_Email');
    this.billingCountrySelect = page.locator('#BillingNewAddress_CountryId');
    this.billingCityInput = page.locator('#BillingNewAddress_City');
    this.billingAddress1Input = page.locator('#BillingNewAddress_Address1');
    this.billingZipInput = page.locator('#BillingNewAddress_ZipPostalCode');
    this.billingPhoneInput = page.locator('#BillingNewAddress_PhoneNumber');
    this.billingContinueButton = page.locator('#billing-buttons-container .new-address-next-step-button, button.new-address-next-step-button');
    this.shippingMethodContinueButton = page.locator('#shipping-method-buttons-container .shipping-method-next-step-button, button.shipping-method-next-step-button');
    this.paymentMethodContinueButton = page.locator('#payment-method-buttons-container .payment-method-next-step-button, button.payment-method-next-step-button');
    this.paymentInfoContinueButton = page.locator('#payment-info-buttons-container .payment-info-next-step-button, button.payment-info-next-step-button');
    this.confirmOrderButton = page.locator('#confirm-order-buttons-container .confirm-order-next-step-button, button.confirm-order-next-step-button');
    this.orderSuccessTitle = page.locator('.order-completed .title, .page-title h1');
    this.orderSuccessMessage = page.locator('.section.order-completed .details');
  }

  async clickCheckoutAsGuest() {
    await this.checkoutAsGuestButton.click();
  }

  async fillBillingAddress(details) {
    await this.billingFirstNameInput.fill(details.firstName);
    await this.billingLastNameInput.fill(details.lastName);
    await this.billingEmailInput.fill(details.email);
    await this.billingCountrySelect.selectOption({ label: details.country });
    await this.billingCityInput.fill(details.city);
    await this.billingAddress1Input.fill(details.address1);
    await this.billingZipInput.fill(details.zip);
    await this.billingPhoneInput.fill(details.phone);
    await this.billingContinueButton.click();
  }

  async continueShippingMethod() {
    await this.shippingMethodContinueButton.click();
  }

  async continuePaymentMethod() {
    await this.paymentMethodContinueButton.click();
  }

  async continuePaymentInfo() {
    await this.paymentInfoContinueButton.click();
  }

  async confirmOrder() {
    await this.confirmOrderButton.click();
  }
}

module.exports = { CheckoutPage };

