class RegisterPage {
  constructor(page) {
    this.page = page;
    this.genderMaleRadio = page.locator('#gender-male');
    this.firstNameInput = page.locator('#FirstName');
    this.lastNameInput = page.locator('#LastName');
    this.emailInput = page.locator('#Email');
    this.passwordInput = page.locator('#Password');
    this.confirmPasswordInput = page.locator('#ConfirmPassword');
    this.registerButton = page.locator('#register-button');
    this.resultMessage = page.locator('.result');
    this.continueButton = page.locator('input[value="Continue"], .register-continue-button');
  }

  async navigate() {
    await this.page.goto('/register');
  }

  async fillRegistrationForm(firstName, lastName, email, password) {
    await this.genderMaleRadio.check();
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.confirmPasswordInput.fill(password);
  }

  async submitRegistration() {
    await this.registerButton.click();
  }
}

module.exports = { RegisterPage };
