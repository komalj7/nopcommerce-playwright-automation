const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { RegisterPage } = require('../pages/RegisterPage');
const { HomePage } = require('../pages/HomePage');
const { generateRandomEmail } = require('../utils/helpers');
const usersData = require('../test-data/users.json');

test.describe('Login Tests', () => {
  test('should login successfully with valid registered credentials and logout', async ({ page }) => {
    const registerPage = new RegisterPage(page);
    const loginPage = new LoginPage(page);
    const homePage = new HomePage(page);
    const uniqueEmail = generateRandomEmail();

    await registerPage.navigate();
    await registerPage.fillRegistrationForm(
      usersData.validUser.firstName,
      usersData.validUser.lastName,
      uniqueEmail,
      usersData.validUser.password
    );
    await registerPage.submitRegistration();

    await homePage.clickLogout();

    await loginPage.navigate();
    await loginPage.login(uniqueEmail, usersData.validUser.password);

    await expect(homePage.myAccountLink).toBeVisible();
    await expect(homePage.logoutLink).toBeVisible();

    await page.screenshot({ path: 'screenshots/login-success.png', fullPage: true });

    await homePage.clickLogout();
    await expect(homePage.loginLink).toBeVisible();
  });

  test('should display error message with invalid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.navigate();
    await loginPage.login(usersData.invalidUser.email, usersData.invalidUser.password);

    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toContainText('Login was unsuccessful');

    await page.screenshot({ path: 'screenshots/login-invalid-error.png', fullPage: true });
  });

  test('should display validation error when submitting empty credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.navigate();
    await loginPage.login('', '');

    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toContainText('Login was unsuccessful');

    await page.screenshot({ path: 'screenshots/login-empty-error.png', fullPage: true });
  });
});
