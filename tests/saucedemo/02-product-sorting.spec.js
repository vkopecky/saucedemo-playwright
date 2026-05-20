import { test, expect } from '@playwright/test';
import { inventory_selectors } from '../../page-object-modeling/saucedemo-selectors.js';
import { USERS } from '../../fixtures/saucedemo/users.js';

/**
 * TC02 – Product Listing & Sorting
 *
 * WHY THIS IS ESSENTIAL:
 * Customers rely on sorting to quickly find products by budget or preference.
 * Broken sorting silently shows wrong results, hurting UX and conversion rates.
 */

const USER = USERS.standard; // session loaded via storageState in playwright config

test.describe('TC02 – Product Listing & Sorting', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('/inventory.html');
    });

    test(`[${USER}] 02-A: Inventory page shows exactly 6 products`, async ({ page }) => {
        await expect(page.locator(inventory_selectors.products)).toHaveCount(6);
    });

    test(`[${USER}] 02-B: Sort by "Price (low to high)" produces ascending price order`, async ({ page }) => {
        await page.locator(inventory_selectors.sort_container).selectOption('lohi');

        const texts = await page.locator(inventory_selectors.product_price).allTextContents();
        const prices = texts.map(t => parseFloat(t.replace('$', '')));

        for (let i = 1; i < prices.length; i++) {
            expect(prices[i]).toBeGreaterThanOrEqual(prices[i - 1]);
        }
        expect(prices[0]).toBe(7.99);
        expect(prices[prices.length - 1]).toBe(49.99);
    });

    test(`[${USER}] 02-C: Sort by "Name (Z to A)" produces reverse alphabetical order`, async ({ page }) => {
        await page.locator(inventory_selectors.sort_container).selectOption('za');

        const names = await page.locator(inventory_selectors.product_name).allTextContents();

        for (let i = 1; i < names.length; i++) {
            expect(names[i].localeCompare(names[i - 1])).toBeLessThanOrEqual(0);
        }
        expect(names[0]).toBe('Test.allTheThings() T-Shirt (Red)');
        expect(names[names.length - 1]).toBe('Sauce Labs Backpack');
    });

});
