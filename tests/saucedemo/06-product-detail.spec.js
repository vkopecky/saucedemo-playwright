import { test, expect } from '@playwright/test';
import { inventory_selectors, detail_selectors } from '../../page-object-modeling/saucedemo-selectors.js';
import { USERS } from '../../fixtures/saucedemo/users.js';

/**
 * TC06 – Product Detail Page
 *
 * WHY THIS IS ESSENTIAL:
 * The detail page is where purchase decisions are made. A name/price mismatch
 * between the listing and the detail page is a critical data integrity bug.
 */

const USER = USERS.standard;

test.describe('TC06 – Product Detail Page', () => {

    test(`[${USER}] 06-A: Clicking a product navigates to its detail page with correct info`, async ({ page }) => {
        await page.goto('/inventory.html');
        await page.locator(inventory_selectors.product_name).filter({ hasText: 'Sauce Labs Backpack' }).click();

        await expect(page).toHaveURL(/inventory-item\.html/);
        await expect(page.locator(detail_selectors.product_name)).toHaveText('Sauce Labs Backpack');
        await expect(page.locator(detail_selectors.product_price)).toHaveText('$29.99');
        await expect(page.locator(detail_selectors.product_desc)).not.toBeEmpty();
    });

    test(`[${USER}] 06-B: Adding to cart from detail page updates cart badge`, async ({ page }) => {
        await page.goto('/inventory.html');
        await page.locator(inventory_selectors.product_name).filter({ hasText: 'Sauce Labs Bike Light' }).click();

        await expect(page).toHaveURL(/inventory-item\.html/);
        await expect(page.locator(detail_selectors.cart_badge)).not.toBeVisible();

        await page.locator(detail_selectors.add_to_cart).click();

        await expect(page.locator(detail_selectors.cart_badge)).toHaveText('1');
        await expect(page.locator(detail_selectors.btn_remove)).toBeVisible();
        await expect(page.locator(detail_selectors.add_to_cart)).not.toBeVisible();
    });

    test(`[${USER}] 06-C: "Back to Products" button returns to inventory`, async ({ page }) => {
        await page.goto('/inventory.html');
        await page.locator(inventory_selectors.product_name).filter({ hasText: 'Sauce Labs Onesie' }).click();

        await expect(page).toHaveURL(/inventory-item\.html/);
        await page.locator(detail_selectors.btn_back).click();

        await expect(page).toHaveURL(/inventory\.html/);
        await expect(page.locator(inventory_selectors.title)).toHaveText('Products');
    });

});
