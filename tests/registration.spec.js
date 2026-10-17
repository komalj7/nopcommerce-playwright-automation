const { test, expect } = require('@playwright/test');
const { RegisterPage } = require('../pages/RegisterPage');
const { generateRandomEmail } = require('../utils/helpers');
const usersData = require('../test-data/users.json');

test.describe('Registration Tests', () => {
  test('should register a new user successfully', async ({ page }) => {
    const registerPage = new RegisterPage(page);
    const uniqueEmail = generateRandomEmail();

    await registerPage.navigate();
    await registerPage.fillRegistrationForm(
      usersData.validUser.firstName,
      usersData.validUser.lastName,
      uniqueEmail,
      usersData.validUser.password
    );
    await registerPage.submitRegistration();

    await expect(registerPage.resultMessage).toBeVisible();
    await expect(registerPage.resultMessage).toHaveText('Your registration completed');
    await expect(registerPage.continueButton).toBeVisible();

    await page.screenshot({ path: 'screenshots/registration-success.png', fullPage: true });
  });
});
