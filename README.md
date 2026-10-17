# NopCommerce / Demo Web Shop Playwright Automation (JavaScript)

A beginner-friendly Playwright test automation project using plain JavaScript and the Page Object Model (POM) pattern for testing the nopCommerce store (`https://demowebshop.tricentis.com`).

---

## 1. Project Overview

This project demonstrates clean, realistic, and beginner-friendly automated end-to-end tests for an e-commerce website using Playwright and standard JavaScript. It uses accessible built-in locators (`getByRole`, `getByLabel`, `locator`), separates web element selectors into Page Object classes, and captures screenshots for all key user actions.

---

## 2. Website Under Test

- **Target Website**: [Demo Web Shop (Tricentis nopCommerce)](https://demowebshop.tricentis.com/)
- **Note**: The live `demo.nopcommerce.com` public domain is protected by Cloudflare bot challenge verification walls which block automated browser sessions. This project uses `https://demowebshop.tricentis.com`, the official older nopCommerce demo platform that has the exact same feature set (register, login, cart, wishlist, checkout) without bot blocks.

---

## 3. Technologies Used

- **Runtime**: Node.js
- **Test Framework**: Playwright Test (`@playwright/test`)
- **Language**: Plain JavaScript (CommonJS syntax: `require` / `module.exports`, `async/await`)
- **Pattern**: Simple Page Object Model (POM)

---

## 4. Project Structure

```text
PlaywrightAutomation/
│
├── pages/
│   ├── HomePage.js          # Header navigation, search, and logo locators
│   ├── RegisterPage.js      # Form fields and actions for user registration
│   ├── LoginPage.js         # Email/password inputs, login button & error messages
│   ├── ProductsPage.js      # Category navigation, product view, add to cart/wishlist
│   ├── CartPage.js          # Cart item inspection, quantity, item removal, checkout
│   ├── WishlistPage.js      # Wishlist verification and item removal
│   └── CheckoutPage.js      # Safe guest checkout form and order confirmation
│
├── tests/
│   ├── home.spec.js         # Homepage load and navigation element tests
│   ├── registration.spec.js # User registration flow with dynamic unique email
│   ├── login.spec.js        # Valid login, logout, invalid credentials, and empty inputs
│   ├── search.spec.js       # Product search and product details verification
│   ├── products.spec.js     # Category navigation and product title verification
│   ├── cart.spec.js         # Add product to cart, check presence, remove item
│   ├── wishlist.spec.js     # Add product to wishlist and remove item
│   ├── checkout.spec.js     # Safe guest checkout flow (no real payment cards)
│   └── endToEnd.spec.js     # Complete journey: search -> cart -> guest checkout
│
├── test-data/
│   ├── users.json           # User credentials for testing
│   └── products.json        # Test search terms and category names
│
├── utils/
│   └── helpers.js           # Dynamic timestamp-based unique email generator
│
├── screenshots/             # Automatically saved screenshots from test executions
│
├── playwright.config.js     # Pure JavaScript Playwright configuration
├── package.json             # NPM dependencies & test scripts
└── README.md                # Project documentation and execution instructions
```

---

## 5. Test Scenarios Covered

1. **Home Page (`tests/home.spec.js`)**:
   - Opens homepage, verifies title and navigation links (Logo, Register, Login, Cart, Wishlist, Search, Top Menu).
   - Screenshot: `screenshots/home-page.png`

2. **Registration (`tests/registration.spec.js`)**:
   - Fills personal details using a dynamically generated unique email to prevent collision.
   - Verifies successful registration confirmation message.
   - Screenshot: `screenshots/registration-success.png`

3. **Login (`tests/login.spec.js`)**:
   - 1. Valid login using newly registered credentials + logout verification.
   - 2. Invalid credentials login check with error banner validation.
   - 3. Empty credentials submission check with validation message.
   - Screenshots: `screenshots/login-success.png`, `screenshots/login-invalid-error.png`, `screenshots/login-empty-error.png`

4. **Product Search (`tests/search.spec.js`)**:
   - Searches for product keyword, verifies search results, and opens product details.
   - Screenshot: `screenshots/product-search-details.png`

5. **Products Category (`tests/products.spec.js`)**:
   - Navigates through category menu links and verifies current category page title and URL.
   - Screenshot: `screenshots/category-page.png`

6. **Cart (`tests/cart.spec.js`)**:
   - Adds a product to cart, verifies success notification bar, checks item in cart, removes item, and checks empty cart message.
   - Screenshots: `screenshots/cart-with-items.png`, `screenshots/cart-empty.png`

7. **Wishlist (`tests/wishlist.spec.js`)**:
   - Adds product to wishlist, verifies presence in table, removes item, and checks empty wishlist message.
   - Screenshots: `screenshots/wishlist-with-items.png`, `screenshots/wishlist-empty.png`

8. **Checkout (`tests/checkout.spec.js`)**:
   - Safely tests checkout flow: enters billing address, shipping method, cash on delivery payment method, and confirms order.
   - Screenshot: `screenshots/checkout-order-success.png`

9. **End-to-End (`tests/endToEnd.spec.js`)**:
   - Full flow: Register account -> Search product -> Add to cart -> Cart verification -> Agree to Terms -> Complete Checkout -> Order Confirmation.
   - Screenshot: `screenshots/end-to-end-success.png`

---

## 6. How to Run Tests

1. **Run all tests (Headed mode - opens browser so you can watch):**
   ```bash
   npx playwright test --project=chromium
   ```

2. **Run in headless mode:**
   ```bash
   npx playwright test --project=chromium --headed=false
   ```

3. **Run a single test file:**
   ```bash
   npx playwright test tests/home.spec.js --project=chromium
   ```

4. **Open interactive Playwright UI Mode:**
   ```bash
   npx playwright test --ui
   ```

5. **Open HTML Test Report:**
   ```bash
   npx playwright show-report
   ```
