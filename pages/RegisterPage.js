class RegisterPage {
  constructor(page) {
    this.page = page;
    this.genderMaleRadio = page.locator('#gender-male');
    this.firstNameInput = page.getByLabel('First name:');
    this.lastNameInput = page.getByLabel('Last name:');
    this.emailInput = page.getByLabel('Email:');
    this.passwordInput = page.locator('#Password');
    this.confirmPasswordInput = page.locator('#ConfirmPassword');
    this.registerButton = page.getByRole('button', { name: 'Register' });
    this.resultMessage = page.locator('.result');
    this.continueButton = page.getByRole('link', { name: 'Continue' });
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

