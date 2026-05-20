import { test, expect }  from '@playwright/test';
import { faker }          from '@faker-js/faker';
import { inventory_selectors, cart_selectors, checkout_selectors } from '../../page-object-modeling/saucedemo-selectors.js';
import { USERS } from '../../fixtures/saucedemo/users.js';

/**
 * TC04 – Complete End-to-End Checkout Flow
 *
 * WHY THIS IS ESSENTIAL:
 * The checkout is the critical business path – a broken step = zero revenue.
 * Customer data is randomised with Faker on every run to catch edge cases.
 */

const USER = USERS.standard;

test.describe('TC04 – Complete End-to-End Checkout Flow', () => {

    test(`[${USER}] 04-A: Full checkout flow ends with order confirmation`, async ({ page }) => {
        const customer = {
            firstName:  faker.person.firstName(),
            lastName:   faker.person.lastName(),
            postalCode: faker.location.zipCode('#####'),
        };

        // Step 1 – Add product
        await page.goto('/inventory.html');
        await page.locator(inventory_selectors.add_to_cart('sauce-labs-backpack')).click();
        await expect(page.locator(inventory_selectors.cart_badge)).toHaveText('1');

        // Step 2 – Cart → checkout
        await page.locator(inventory_selectors.cart_link).click();
        await expect(page).toHaveURL(/cart\.html/);
        await expect(page.locator(cart_selectors.item_name).filter({ hasText: 'Sauce Labs Backpack' })).toBeVisible();
        await page.locator(cart_selectors.btn_checkout).click();
        await expect(page).toHaveURL(/checkout-step-one\.html/);

        // Step 3 – Customer information (Faker data)
        await page.locator(checkout_selectors.first_name).fill(customer.firstName);
        await page.locator(checkout_selectors.last_name).fill(customer.lastName);
        await page.locator(checkout_selectors.postal_code).fill(customer.postalCode);
        await page.locator(checkout_selectors.btn_continue).click();
        await expect(page).toHaveURL(/checkout-step-two\.html/);

        // Step 4 – Order overview
        await expect(page.locator(cart_selectors.item_name).filter({ hasText: 'Sauce Labs Backpack' })).toBeVisible();
        await expect(page.locator(checkout_selectors.subtotal)).toContainText('$29.99');
        await expect(page.locator(checkout_selectors.tax)).toContainText('Tax:');
        await expect(page.locator(checkout_selectors.total)).toContainText('Total:');

        // Step 5 – Finish
        await page.locator(checkout_selectors.btn_finish).click();
        await expect(page).toHaveURL(/checkout-complete\.html/);
        await expect(page.getByRole('heading', { name: 'Thank you for your order!' })).toBeVisible();
        await expect(page.getByText('Your order has been dispatched')).toBeVisible();
    });

    test(`[${USER}] 04-B: Empty checkout form shows "First Name is required" validation error`, async ({ page }) => {
        await page.goto('/inventory.html');
        await page.locator(inventory_selectors.add_to_cart('sauce-labs-onesie')).click();
        await page.locator(inventory_selectors.cart_link).click();
        await page.locator(cart_selectors.btn_checkout).click();
        await expect(page).toHaveURL(/checkout-step-one\.html/);

        // Submit empty form
        await page.locator(checkout_selectors.btn_continue).click();

        await expect(page.locator(checkout_selectors.error)).toBeVisible();
        await expect(page.locator(checkout_selectors.error)).toContainText('First Name is required');
        await expect(page).toHaveURL(/checkout-step-one\.html/);
    });

});
