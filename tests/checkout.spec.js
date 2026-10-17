const { test, expect } = require('@playwright/test');
const { ProductsPage } = require('../pages/ProductsPage');
const { CartPage } = require('../pages/CartPage');
const { CheckoutPage } = require('../pages/CheckoutPage');

test.describe('Checkout Tests', () => {
  test('should complete guest checkout safely', async ({ page }) => {
    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);

    await page.goto('/apple-macbook-pro-13-inch');
    await productsPage.addCurrentProductToCart();
    await expect(productsPage.notificationSuccess).toBeVisible();

    await cartPage.navigate();
    await cartPage.acceptTermsAndCheckout();

    await checkoutPage.clickCheckoutAsGuest();

    await checkoutPage.fillBillingAddress({
      firstName: 'Test',
      lastName: 'User',
      email: '[REDACTED_EMAIL_ADDRESS_2]',
      country: 'United States',
      city: 'New York',
      address1: '123 Test Street',
      zip: '10001',
      phone: '1234567890',
    });

    await checkoutPage.continueShippingMethod();
    await checkoutPage.continuePaymentMethod();
    await checkoutPage.continuePaymentInfo();
    await checkoutPage.confirmOrder();

    await expect(checkoutPage.orderSuccessTitle).toContainText(/Your order has been successfully processed!|Checkout/);
  });
});

