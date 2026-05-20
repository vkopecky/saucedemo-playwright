import { test, expect } from '@playwright/test';
import { inventory_selectors, cart_selectors } from '../../page-object-modeling/saucedemo-selectors.js';
import { USERS } from '../../fixtures/saucedemo/users.js';

/**
 * TC07 – Persistent Cart State
 *
 * WHY THIS IS ESSENTIAL:
 * If a user adds items and then refreshes or navigates away, their cart must survive.
 * Losing cart contents on reload means lost sales and a frustrating UX.
 */

const USER = USERS.standard;

test.describe('TC07 – Persistent Cart State', () => {

    test(`[${USER}] 07-A: Cart items and badge count persist after page reload`, async ({ page }) => {
        await page.goto('/inventory.html');
        await page.locator(inventory_selectors.add_to_cart('sauce-labs-backpack')).click();
        await page.locator(inventory_selectors.add_to_cart('sauce-labs-fleece-jacket')).click();
        await expect(page.locator(inventory_selectors.cart_badge)).toHaveText('2');

        await page.reload();

        await expect(page.locator(inventory_selectors.cart_badge)).toHaveText('2');

        await page.locator(inventory_selectors.cart_link).click();
        await expect(page.locator(cart_selectors.item)).toHaveCount(2);
        await expect(page.locator(cart_selectors.item_name).filter({ hasText: 'Sauce Labs Backpack' })).toBeVisible();
        await expect(page.locator(cart_selectors.item_name).filter({ hasText: 'Sauce Labs Fleece Jacket' })).toBeVisible();
    });

    test(`[${USER}] 07-B: Cart persists after navigating away and back`, async ({ page }) => {
        await page.goto('/inventory.html');
        await page.locator(inventory_selectors.add_to_cart('sauce-labs-onesie')).click();
        await expect(page.locator(inventory_selectors.cart_badge)).toHaveText('1');

        await page.locator(inventory_selectors.cart_link).click();
        await page.goBack();

        await expect(page.locator(inventory_selectors.cart_badge)).toHaveText('1');
        await expect(page.locator(inventory_selectors.remove_from_cart('sauce-labs-onesie'))).toBeVisible();
    });

});
