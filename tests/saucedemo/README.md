# SauceDemo – Playwright Test Suite


# 1. Spusti testy
npm run saucedemo

# 2. Vygeneruj a otvor Allure report
npm run saucedemo:allure

Automated end-to-end tests for **[https://www.saucedemo.com](https://www.saucedemo.com)** built with [Playwright](https://playwright.dev).

---

## 🧪 Test Cases Overview

### TC01 – Login Functionality (`01-login.spec.js`)
**Why essential:** Authentication is the entry point to the entire application. Without a working login, users cannot access any feature. A broken login equals 100% user lockout.

| ID | User | Scenario | Expected result |
|----|------|----------|-----------------|
| 01-A | `standard_user` | Valid credentials | Redirected to `/inventory.html`, "Products" heading visible |
| 01-B | `locked_out_user` | Locked-out user | Stays on login, error "*Sorry, this user has been locked out*" |
| 01-C | `wrong_user` | Invalid credentials | Stays on login, error "*Username and password do not match*" |

---

### TC02 – Product Listing & Sorting (`02-product-sorting.spec.js`)
**Why essential:** Customers rely on sorting to quickly find products by budget or preference. Broken sorting silently shows wrong results, hurting UX and conversion rates.

| ID | User | Scenario | Expected result |
|----|------|----------|-----------------|
| 02-A | `standard_user` | Load inventory | Exactly **6 products** visible |
| 02-B | `standard_user` | Sort "Price (low to high)" | Prices ascending: `$7.99 → … → $49.99` |
| 02-C | `standard_user` | Sort "Name (Z to A)" | Names in reverse alphabetical order |

---

### TC03 – Shopping Cart: Add & Remove Items (`03-shopping-cart.spec.js`)
**Why essential:** The cart is the core mechanism of any e-commerce site. If the badge is wrong, items are missing, or removal breaks state — users abandon their purchase.

| ID | User | Scenario | Expected result |
|----|------|----------|-----------------|
| 03-A | `standard_user` | Add 2 products | Cart badge shows `2` |
| 03-B | `standard_user` | Cart page contents | Correct item names and prices displayed |
| 03-C | `standard_user` | Remove one item | Cart shows `1` item, badge updated |
| 03-D | `standard_user` | Remove last item | Cart badge disappears |

---

### TC04 – End-to-End Checkout Flow (`04-checkout.spec.js`)
**Why essential:** The checkout is the critical business path — a broken checkout means zero revenue. Customer data is randomised with **Faker** on every run.

| ID | User | Scenario | Expected result |
|----|------|----------|-----------------|
| 04-A | `standard_user` | Full purchase flow (Faker data) | Lands on `/checkout-complete.html`, "Thank you for your order!" visible |
| 04-B | `standard_user` | Empty checkout form | Stays on step-one, error "*First Name is required*" |

---

### TC05 – Logout & Session Protection (`05-logout.spec.js`)
**Why essential:** Logout is a security-critical feature. After logout, protected pages must not be accessible without re-authentication.

| ID | User | Scenario | Expected result |
|----|------|----------|-----------------|
| 05-A | `standard_user` | Logout via menu | Redirected to login page |
| 05-B | `standard_user` | Navigate to `/inventory.html` after logout | Redirected back to login page |

---

### TC06 – Product Detail Page (`06-product-detail.spec.js`)
**Why essential:** The detail page is where purchase decisions are made. Price/name mismatches between listing and detail are critical data integrity bugs.

| ID | User | Scenario | Expected result |
|----|------|----------|-----------------|
| 06-A | `standard_user` | Click product → detail page | Correct name, description and price shown |
| 06-B | `standard_user` | Add to cart from detail page | Cart badge updates to `1`, Remove button appears |
| 06-C | `standard_user` | Back to Products button | Returns to `/inventory.html` |

---

### TC07 – Persistent Cart State (`07-persistent-cart.spec.js`)
**Why essential:** Losing cart contents on page reload means lost sales and a frustrating user experience.

| ID | User | Scenario | Expected result |
|----|------|----------|-----------------|
| 07-A | `standard_user` | Reload inventory page | Cart badge and items still present |
| 07-B | `standard_user` | Navigate away and back | Badge count preserved, Remove button visible |

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** v18 or higher
- **npm** v8 or higher

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd <project-folder>

# Install dependencies
npm install

# Install Playwright browsers (first time only)
npx playwright install chromium firefox webkit
```

---

## ▶️ Running the Tests

All commands use the dedicated SauceDemo config (`playwright.config.cjs`).

```bash
# Run ALL tests across Chromium + Firefox + WebKit (58 tests)
npx playwright test --config=playwright.config.cjs

# Run on a single browser only
npx playwright test --config=playwright.config.cjs --project=chromium
npx playwright test --config=playwright.config.cjs --project=firefox
npx playwright test --config=playwright.config.cjs --project=webkit

# Run a specific test file
npx playwright test --config=playwright.config.cjs tests/saucedemo/01-login.spec.js

# Run in headed mode (browser visible)
npx playwright test --config=playwright.config.cjs --project=chromium --headed

# Interactive UI mode
npx playwright test --config=playwright.config.cjs --ui
```

### View HTML Report

```bash
npx playwright show-report playwright-report/saucedemo
```

### Generate & Open Allure Report

```bash
npx allure generate allure-results/saucedemo -o allure-report/saucedemo --clean
npx allure open allure-report/saucedemo
```

---

## 📁 Project Structure

```
├── playwright.config.cjs         # Playwright config (3 browsers + Allure)
│
├── page-object-modeling/
│   └── saucedemo/
│       ├── LoginPage.js                    # Login page POM
│       ├── InventoryPage.js                # Product listing POM
│       ├── CartPage.js                     # Shopping cart POM
│       ├── CheckoutPage.js                 # Checkout flow POM (steps 1–3)
│       ├── MenuPage.js                     # Hamburger menu POM
│       └── ProductDetailPage.js            # Product detail POM
│
└── tests/
    └── saucedemo/
        ├── auth.setup.js                   # Login once → save storageState
        ├── 01-login.spec.js                # TC01 – Login functionality
        ├── 02-product-sorting.spec.js      # TC02 – Product listing & sorting
        ├── 03-shopping-cart.spec.js        # TC03 – Shopping cart add & remove
        ├── 04-checkout.spec.js             # TC04 – End-to-end checkout (Faker)
        ├── 05-logout.spec.js               # TC05 – Logout & session protection
        ├── 06-product-detail.spec.js       # TC06 – Product detail page
        └── 07-persistent-cart.spec.js      # TC07 – Persistent cart state
```

---

## 🔑 Test Credentials

Credentials are publicly available on the SauceDemo login page:

| Username | Password | Used in |
|----------|----------|---------|
| `standard_user` | `secret_sauce` | TC01-A, TC02–TC07 (all main tests) |
| `locked_out_user` | `secret_sauce` | TC01-B |
| `wrong_user` | `wrong_password` | TC01-C (invalid credentials test) |

---

## 🛠️ Tech Stack

| Tool | Version | Purpose |
|------|---------|---------|
| [Playwright](https://playwright.dev) | 1.59 | Test framework & browser automation |
| [@faker-js/faker](https://fakerjs.dev) | ^10 | Random customer data generation (TC04) |
| JavaScript | ES Modules | Test language |
| Chromium / Firefox / WebKit | latest | Cross-browser coverage |
| HTML Reporter | built-in | Local test results |
| Allure Playwright | ^3 | Rich CI/CD test reporting |

---

## 🏗️ Architecture Highlights

- **Page Object Model** – All selectors and page actions are encapsulated in `page-object-modeling/saucedemo/`. Tests contain zero raw selectors.
- **StorageState session reuse** – `auth.setup.js` logs in once and saves the session. All TC02–TC07 tests start already authenticated – no repeated login overhead.
- **Username in test names** – Every test title is prefixed with the user performing it, e.g. `[standard_user] 02-A: ...` for easy filtering in reports.
- **Faker for test data** – Checkout customer info is generated randomly on each run to surface edge cases.
- **Cross-browser** – The same 19 spec tests run on Chromium, Firefox, and WebKit (58 tests total).


Automated end-to-end tests for **[https://www.saucedemo.com](https://www.saucedemo.com)** built with [Playwright](https://playwright.dev).

---

## 🧪 Test Cases Overview

### TC01 – Login Functionality (`01-login.spec.js`)
**Why essential:** Authentication is the entry point to the entire application. Without a working login, users cannot access any feature. A broken login equals 100% user lockout.

| ID | Scenario | Expected result |
|----|----------|-----------------|
| 01-A | Valid credentials (`standard_user` / `secret_sauce`) | Redirected to `/inventory.html`, "Products" heading visible |
| 01-B | Locked-out user (`locked_out_user`) | Stays on login page, error "*Sorry, this user has been locked out*" |
| 01-C | Invalid credentials | Stays on login page, error "*Username and password do not match*" |

---

### TC02 – Product Listing & Sorting (`02-product-sorting.spec.js`)
**Why essential:** Customers rely on sorting to quickly find products by budget or preference. Broken sorting silently shows wrong results, hurting user experience and conversion rates.

| ID | Scenario | Expected result |
|----|----------|-----------------|
| 02-A | Load inventory | Exactly **6 products** visible |
| 02-B | Sort "Price (low to high)" | Prices ascending: `$7.99 → … → $49.99` |
| 02-C | Sort "Name (Z to A)" | Names in reverse alphabetical order |

---

### TC03 – Shopping Cart: Add & Remove Items (`03-shopping-cart.spec.js`)
**Why essential:** The cart is the core mechanism of any e-commerce site. If the badge is wrong, items are missing, or removal breaks state — users abandon their purchase.

| ID | Scenario | Expected result |
|----|----------|-----------------|
| 03-A | Add 2 products | Cart badge shows `2` |
| 03-B | Cart page contents | Correct item names and prices displayed |
| 03-C | Remove one item | Cart shows `1` item, badge updated |
| 03-D | Remove last item | Cart badge disappears |

---

### TC04 – End-to-End Checkout Flow (`04-checkout.spec.js`)
**Why essential:** The checkout is the critical business path — a broken checkout means zero revenue. Covers the full purchase journey and form validation.

| ID | Scenario | Expected result |
|----|----------|-----------------|
| 04-A | Full purchase flow | Lands on `/checkout-complete.html`, "Thank you for your order!" visible |
| 04-B | Empty checkout form | Stays on step-one, error "*First Name is required*" |

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** v18 or higher
- **npm** v8 or higher

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd <project-folder>

# Install dependencies
npm install

# Install Playwright browsers (first time only)
npx playwright install chromium
```

---

## ▶️ Running the Tests

All commands use the dedicated SauceDemo config (`playwright.config.cjs`).

```bash
# Run all SauceDemo tests
npx playwright test --config=playwright.config.cjs

# Run a specific test file
npx playwright test --config=playwright.config.cjs tests/saucedemo/01-login.spec.js
npx playwright test --config=playwright.config.cjs tests/saucedemo/02-product-sorting.spec.js
npx playwright test --config=playwright.config.cjs tests/saucedemo/03-shopping-cart.spec.js
npx playwright test --config=playwright.config.cjs tests/saucedemo/04-checkout.spec.js

# Run tests in headed mode (browser visible)
npx playwright test --config=playwright.config.cjs --headed

# Run with UI mode (interactive debugger)
npx playwright test --config=playwright.config.cjs --ui
```

### View HTML Report

After the test run, open the HTML report:

```bash
npx playwright show-report playwright-report/saucedemo
```

---

## 📁 Project Structure

```
├── playwright.config.cjs   # Playwright config for SauceDemo tests
└── tests/
    └── saucedemo/
        ├── 01-login.spec.js           # TC01 – Login functionality
        ├── 02-product-sorting.spec.js # TC02 – Product listing & sorting
        ├── 03-shopping-cart.spec.js   # TC03 – Shopping cart add & remove
        └── 04-checkout.spec.js        # TC04 – End-to-end checkout flow
```

---

## 🔑 Test Credentials

Credentials are publicly available on the SauceDemo login page:

| Username | Password | Notes |
|----------|----------|-------|
| `standard_user` | `secret_sauce` | Standard user - all tests pass |
| `locked_out_user` | `secret_sauce` | Cannot login - used in TC01-B |
| `problem_user` | `secret_sauce` | Images broken - not used in these tests |
| `performance_glitch_user` | `secret_sauce` | Slow responses - not used in these tests |

---

## 🛠️ Tech Stack

- **Framework:** [Playwright](https://playwright.dev) v1.59
- **Language:** JavaScript (ES Modules)
- **Browser:** Chromium (Desktop Chrome)
- **Reporter:** HTML (built-in Playwright reporter)

