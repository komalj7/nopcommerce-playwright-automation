const { test, expect } = require('@playwright/test');
const { ProductsPage } = require('../pages/ProductsPage');
const { CartPage } = require('../pages/CartPage');
const { CheckoutPage } = require('../pages/CheckoutPage');
const { RegisterPage } = require('../pages/RegisterPage');
const { generateRandomEmail } = require('../utils/helpers');
const usersData = require('../test-data/users.json');
const productsData = require('../test-data/products.json');

test.describe('Checkout Tests', () => {
  test('should complete guest checkout safely', async ({ page }) => {
    const registerPage = new RegisterPage(page);
    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);
    const uniqueEmail = generateRandomEmail();

    // Register user first to checkout smoothly
    await registerPage.navigate();
    await registerPage.fillRegistrationForm(
      usersData.validUser.firstName,
      usersData.validUser.lastName,
      uniqueEmail,
      usersData.validUser.password
    );
    await registerPage.submitRegistration();
    await expect(registerPage.resultMessage).toHaveText('Your registration completed');

    // Add product to cart
    await page.goto(productsData.searchProduct.url);
    await productsPage.addCurrentProductToCart();
    await expect(productsPage.notificationSuccess).toBeVisible();

    // Go to cart & proceed
    await cartPage.navigate();
    await cartPage.acceptTermsAndCheckout();

    // One page checkout
    await checkoutPage.fillBillingAddress({
      firstName: usersData.validUser.firstName,
      lastName: usersData.validUser.lastName,
      email: uniqueEmail,
      country: 'United States',
      city: 'New York',
      address1: '123 Test Street',
      zip: '10001',
      phone: '1234567890',
    });

    await checkoutPage.continueShippingAddress();
    await checkoutPage.continueShippingMethod();
    await checkoutPage.continuePaymentMethod();
    await checkoutPage.continuePaymentInfo();
    await checkoutPage.confirmOrder();

    await expect(checkoutPage.orderSuccessTitle).toContainText(/Your order has been successfully processed!|Thank you/i);

    await page.screenshot({ path: 'screenshots/checkout-order-success.png', fullPage: true });
  });
});
