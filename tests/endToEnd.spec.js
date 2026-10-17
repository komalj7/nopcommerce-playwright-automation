const { test, expect } = require('@playwright/test');
const { HomePage } = require('../pages/HomePage');
const { ProductsPage } = require('../pages/ProductsPage');
const { CartPage } = require('../pages/CartPage');
const { CheckoutPage } = require('../pages/CheckoutPage');
const { RegisterPage } = require('../pages/RegisterPage');
const { generateRandomEmail } = require('../utils/helpers');
const usersData = require('../test-data/users.json');
const productsData = require('../test-data/products.json');

test.describe('End-to-End Shopping Flow', () => {
  test('Complete purchase flow from search to checkout confirmation', async ({ page }) => {
    const homePage = new HomePage(page);
    const registerPage = new RegisterPage(page);
    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);
    const uniqueEmail = generateRandomEmail();

    // 1. Open website & register
    await registerPage.navigate();
    await registerPage.fillRegistrationForm(
      usersData.validUser.firstName,
      usersData.validUser.lastName,
      uniqueEmail,
      usersData.validUser.password
    );
    await registerPage.submitRegistration();
    await expect(registerPage.resultMessage).toHaveText('Your registration completed');

    // 2. Search for product & open details
    await homePage.searchProduct(productsData.searchProduct.keyword);
    await productsPage.openProductByName(productsData.searchProduct.name);
    await expect(productsPage.productNameHeading).toHaveText(productsData.searchProduct.name);

    // 3. Add product to cart
    await productsPage.addCurrentProductToCart();
    await expect(productsPage.notificationSuccess).toBeVisible();

    // 4. Open cart & verify product
    await cartPage.navigate();
    await expect(cartPage.pageTitle).toHaveText('Shopping cart');
    await expect(cartPage.productNames.first()).toContainText(productsData.searchProduct.name);

    // 5. Agree to terms & proceed to checkout
    await cartPage.acceptTermsAndCheckout();

    // 6. Complete checkout steps
    await checkoutPage.fillBillingAddress({
      firstName: usersData.validUser.firstName,
      lastName: usersData.validUser.lastName,
      email: uniqueEmail,
      country: 'United States',
      city: 'Boston',
      address1: '456 Sample Ave',
      zip: '02108',
      phone: '9876543210',
    });

    await checkoutPage.continueShippingAddress();
    await checkoutPage.continueShippingMethod();
    await checkoutPage.continuePaymentMethod();
    await checkoutPage.continuePaymentInfo();
    await checkoutPage.confirmOrder();

    // 7. Verify order completion & capture screenshot
    await expect(checkoutPage.orderSuccessTitle).toContainText('Your order has been successfully processed!');

    await page.screenshot({ path: 'screenshots/end-to-end-success.png', fullPage: true });
  });
});
