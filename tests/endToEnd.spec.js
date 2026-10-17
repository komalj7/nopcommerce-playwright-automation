const { test, expect } = require('@playwright/test');
const { HomePage } = require('../pages/HomePage');
const { ProductsPage } = require('../pages/ProductsPage');
const { CartPage } = require('../pages/CartPage');
const { CheckoutPage } = require('../pages/CheckoutPage');

test.describe('End-to-End Shopping Flow', () => {
  test('Complete purchase flow from search to checkout confirmation', async ({ page }) => {
    const homePage = new HomePage(page);
    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);

    await homePage.navigate();
    await expect(homePage.logo).toBeVisible();

    await page.goto('/apple-macbook-pro-13-inch');
    await expect(productsPage.productNameHeading).toHaveText('Apple MacBook Pro 13-inch');

    await productsPage.addCurrentProductToCart();
    await expect(productsPage.notificationSuccess).toBeVisible();

    await cartPage.navigate();
    await expect(cartPage.pageTitle).toHaveText('Shopping cart');
    await expect(cartPage.productNames.first()).toContainText('Apple MacBook Pro 13-inch');

    await cartPage.acceptTermsAndCheckout();

    await checkoutPage.clickCheckoutAsGuest();

    await checkoutPage.fillBillingAddress({
      firstName: 'Jane',
      lastName: 'Doe',
      email: '[REDACTED_EMAIL_ADDRESS_3]',
      country: 'United States',
      city: 'Boston',
      address1: '456 Sample Ave',
      zip: '02108',
      phone: '9876543210',
    });

    await checkoutPage.continueShippingMethod();
    await checkoutPage.continuePaymentMethod();
    await checkoutPage.continuePaymentInfo();
    await checkoutPage.confirmOrder();

    await expect(checkoutPage.orderSuccessTitle).toBeVisible();
  });
});

