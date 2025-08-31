# SauceDemo Playwright Automation Framework

## Overview
This project is an automation framework for [SauceDemo](https://www.saucedemo.com/) using **Playwright** and JavaScript.  
It follows the **Page Object Model (POM)** design pattern for maintainable, reusable, and scalable automation.

---

## Architecture

- **Language & Test Runner:** JavaScript + Playwright Test
- **Design Pattern:** Page Object Model (POM)
- **Page Manager:** Centralized access to all page objects for cleaner test code
- **Test Organization:**
  - `tests/Login.spec.js` → Login tests
  - `tests/e2eCartCheckout.spec.js` → End-to-end cart and checkout tests
- **Assertions:** Performed in test files to keep tests readable
- **Reporting:** Allure Reports integrated for detailed results (screenshots, videos, logs)

---

## Page Objects

- **LoginPage.js** – Login actions and error messages  
- **ProductPage.js** – Product interactions (add to cart, go to cart)  
- **CartPage.js** – Cart page actions and assertions  
- **CheckoutPage.js** – Checkout form interactions  
- **CheckoutOverviewPage.js** – Order overview, total calculation, finish order  
- **PageManager.js** – Provides a single access point to all page objects

---

## Test Data

- Stored in `Utils/TestData.js`  
- Sensitive information (username/password) is **not committed**  
- Example structure:
```javascript
module.exports = {
  baseURL: 'https://www.saucedemo.com/',
  productName: 'Sauce Labs Backpack',
  checkoutInfo: { firstName: "John", lastName: "Doe", postalCode: "12345" },
  tax: 2.40,
  loginErrors: {
    lockedOut: 'Epic sadface: Sorry, this user has been locked out.',
    emptyPassword: 'Epic sadface: Password is required'
  }
};
```

---

## Security

- Create a `.env` file in the project root:
```
SAUCE_USERNAME=your-username
SAUCE_PASSWORD=your-password
```
- Add `.env` to `.gitignore` to prevent committing credentials
- Update `TestData.js` to read credentials from environment variables:
```javascript
validUser: {
  username: process.env.SAUCE_USERNAME,
  password: process.env.SAUCE_PASSWORD
}
```

---

## Setup & Running Tests

1. Clone the repository:
```bash
git clone <repo-url>
cd saucedemo
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` with your SauceDemo credentials (see Security section)

4. Run UI tests:
```bash
npm run test:ui
```

5. Generate Allure report:
```bash
npm run allure:generate
```

6. Open Allure report:
```bash
npm run allure:open
```

---

## NPM Scripts

```json
"scripts": {
  "test:ui": "npx playwright test --config=playwright.config.js --reporter=line,allure-playwright",
  "allure:generate": "allure generate ./allure-results --clean",
  "allure:open": "allure open ./allure-report"
}
```

---

## Notes

- Ensure `.env` exists with valid credentials before running tests
- Non-sensitive test data is stored in `Utils/TestData.js`
- Allure reports include screenshots, videos, and trace logs for failed tests
- Assertions are kept in test files for clarity and ease of debugging

