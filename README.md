# NopCommerce Playwright Automation (JavaScript)

A beginner-friendly Playwright test automation project using plain JavaScript and the Page Object Model (POM) pattern for testing the [nopCommerce Demo Store](https://demo.nopcommerce.com/).

---

## 1. Project Overview

This project demonstrates clean, realistic, and beginner-friendly automated end-to-end tests for an e-commerce website using Playwright and standard JavaScript. It uses accessible built-in locators (`getByRole`, `getByLabel`, `getByPlaceholder`, `getByText`) and separates web element selectors and actions into clean Page Object classes.

---

## 2. Website Under Test

- **Target Website**: [nopCommerce Demo Store](https://demo.nopcommerce.com/)
- **Note on Cloudflare Protection**: The live public demo domain (`demo.nopcommerce.com`) frequently serves an automated Cloudflare bot challenge ("Just a moment... Performing security verification" / HTTP 403) against automated test runners. See the [Known Environmental Note](#known-environmental-note) section below for details.

---

## 3. Technologies Used

- **Runtime**: Node.js
- **Test Framework**: Playwright Test (`@playwright/test`)
- **Language**: Plain JavaScript (CommonJS syntax: `require` / `module.exports`, `async/await`)
- **Pattern**: Simple Page Object Model (POM)

---

## 4. Project Structure

```text
NopCommercePlaywrightAutomation/
│
├── pages/
│   ├── HomePage.js          # Locators and interactions for header & navigation
│   ├── RegisterPage.js      # User registration form fields and submit action
│   ├── LoginPage.js         # Login inputs, buttons, and error messages
│   ├── ProductsPage.js      # Category navigation, product listings & actions
│   ├── CartPage.js          # Cart items, quantity, removal, and checkout trigger
│   ├── WishlistPage.js      # Wishlist verification and item removal
│   └── CheckoutPage.js      # Guest checkout steps and order confirmation
│
├── tests/
│   ├── home.spec.js         # Homepage load and navigation element tests
│   ├── registration.spec.js # User registration with dynamic email
│   ├── login.spec.js        # Valid, invalid, empty credentials & logout tests
│   ├── search.spec.js       # Product search and product details verification
│   ├── products.spec.js     # Category navigation and product title tests
│   ├── cart.spec.js         # Add to cart, verify cart item, and remove item
│   ├── wishlist.spec.js     # Add to wishlist and remove from wishlist
│   ├── checkout.spec.js     # Complete safe guest checkout flow
│   └── endToEnd.spec.js     # End-to-end purchasing scenario
│
├── test-data/
│   ├── users.json           # Sample valid and invalid user credentials
│   └── products.json        # Test product keywords and category names
│
├── utils/
│   └── helpers.js           # Helper functions (e.g., dynamic unique email generator)
│
├── playwright.config.js     # Playwright configuration (Chromium, Firefox, WebKit, reports)
├── package.json             # Node dependencies and npm run scripts
├── .gitignore               # Git ignore rules for node_modules and test reports
└── README.md                # Project documentation and execution instructions
```

---

## 5. Test Scenarios Covered

1. **Home Page (`tests/home.spec.js`)**:
   - Opens the homepage.
   - Verifies the title and key navigation links (Logo, Register, Login, Cart, Wishlist, Search, Top Menu).

2. **Registration (`tests/registration.spec.js`)**:
   - Opens the register page.
   - Fills personal details using a dynamically generated unique email to prevent collision.
   - Verifies successful registration confirmation message.

3. **Login (`tests/login.spec.js`)**:
   - Valid login using newly registered credentials followed by logout verification.
   - Invalid credentials login check with error banner validation.
   - Empty credentials submission check with input validation message.

4. **Product Search (`tests/search.spec.js`)**:
   - Searches for a keyword from `test-data/products.json`.
   - Verifies that results display matching products and opens the product details.

5. **Products Category (`tests/products.spec.js`)**:
   - Navigates through category menu links.
   - Verifies current category page title and URL.

6. **Cart (`tests/cart.spec.js`)**:
   - Adds a product to the cart.
   - Opens the shopping cart and verifies the item is present.
   - Removes the item and verifies the empty cart message.

7. **Wishlist (`tests/wishlist.spec.js`)**:
   - Adds a product to the wishlist.
   - Verifies item presence and removes it from the wishlist.

8. **Checkout (`tests/checkout.spec.js`)**:
   - Safely tests the guest checkout flow.
   - Enters billing address, proceeds through standard shipping and payment method steps, and verifies order confirmation.

9. **End-to-End (`tests/endToEnd.spec.js`)**:
   - Covers complete flow: Homepage → Product selection → Add to cart → Cart verification → Guest checkout → Order confirmation.

---

## 6. Installation Steps

1. Clone or open the project folder in your terminal:
   ```bash
   cd PlaywrightAutomation
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Ensure Playwright browser binaries are installed:
   ```bash
   npx playwright install
   ```

---

## 7. How to Run All Tests

To execute the entire test suite in headless mode:

```bash
npx playwright test
```

---

## 8. How to Run a Single Test

To run a specific test file:

```bash
npx playwright test tests/home.spec.js
```

Or run against a specific browser (e.g. Chromium):

```bash
npx playwright test tests/home.spec.js --project=chromium
```

---

## 9. How to Run Tests in Headed Mode

To view the browser window while tests are running:

```bash
npx playwright test tests/home.spec.js --headed --project=chromium
```

---

## 10. How to Open Playwright HTML Report

After any test run, open the generated interactive HTML report:

```bash
npx playwright show-report
```

---

## Known Environmental Note

The live public demo store (`https://demo.nopcommerce.com/`) is protected by **Cloudflare Managed Challenge / Bot Detection** (`CF-Mitigated: challenge` / HTTP 403 / "Just a moment... Performing security verification"). When automated browser sessions launch in standard automation mode, Cloudflare intercepts the request and presents a security verification check rather than loading the nopCommerce page content. 

The Page Objects and test specifications in this repository are written and verified to conform to standard nopCommerce web elements and Playwright best practices.

