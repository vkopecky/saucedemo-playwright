import { test, expect } from '@playwright/test';
import { inventory_selectors, cart_selectors } from '../../page-object-modeling/saucedemo-selectors.js';
import { USERS } from '../../fixtures/saucedemo/users.js';

/**
 * TC03 – Shopping Cart: Add & Remove Items
 *
 * WHY THIS IS ESSENTIAL:
 * The cart is the core mechanism of any e-commerce site.
 * Wrong badge counts, missing items, or broken removal = abandoned purchases.
 */

const USER = USERS.standard;

test.describe('TC03 – Shopping Cart: Add & Remove Items', () => {

    test(`[${USER}] 03-A: Adding two products updates cart badge to "2"`, async ({ page }) => {
        await page.goto('/inventory.html');

        await page.locator(inventory_selectors.add_to_cart('sauce-labs-backpack')).click();
        await expect(page.locator(inventory_selectors.cart_badge)).toHaveText('1');

        await page.locator(inventory_selectors.add_to_cart('sauce-labs-bike-light')).click();
        await expect(page.locator(inventory_selectors.cart_badge)).toHaveText('2');
    });

    test(`[${USER}] 03-B: Cart page shows correct item names and prices`, async ({ page }) => {
        await page.goto('/inventory.html');
        await page.locator(inventory_selectors.add_to_cart('sauce-labs-bolt-t-shirt')).click();
        await page.locator(inventory_selectors.add_to_cart('sauce-labs-onesie')).click();
        await page.locator(inventory_selectors.cart_link).click();

        await expect(page).toHaveURL(/cart\.html/);
        await expect(page.locator(cart_selectors.item)).toHaveCount(2);
        await expect(page.locator(cart_selectors.item_name).filter({ hasText: 'Sauce Labs Bolt T-Shirt' })).toBeVisible();
        await expect(page.locator(cart_selectors.item_name).filter({ hasText: 'Sauce Labs Onesie' })).toBeVisible();
        await expect(page.locator(cart_selectors.item_price).filter({ hasText: '$15.99' })).toBeVisible();
        await expect(page.locator(cart_selectors.item_price).filter({ hasText: '$7.99' })).toBeVisible();
    });

    test(`[${USER}] 03-C: Removing one item from cart leaves the other intact`, async ({ page }) => {
        await page.goto('/inventory.html');
        await page.locator(inventory_selectors.add_to_cart('sauce-labs-backpack')).click();
        await page.locator(inventory_selectors.add_to_cart('sauce-labs-bike-light')).click();
        await page.locator(inventory_selectors.cart_link).click();

        await expect(page.locator(cart_selectors.item)).toHaveCount(2);
        await page.locator(cart_selectors.btn_remove('sauce-labs-backpack')).click();

        await expect(page.locator(cart_selectors.item)).toHaveCount(1);
        await expect(page.locator(cart_selectors.item_name).filter({ hasText: 'Sauce Labs Backpack' })).not.toBeVisible();
        await expect(page.locator(cart_selectors.item_name).filter({ hasText: 'Sauce Labs Bike Light' })).toBeVisible();
        await expect(page.locator(cart_selectors.cart_badge)).toHaveText('1');
    });

    test(`[${USER}] 03-D: Removing the last item hides the cart badge`, async ({ page }) => {
        await page.goto('/inventory.html');
        await page.locator(inventory_selectors.add_to_cart('sauce-labs-onesie')).click();
        await expect(page.locator(inventory_selectors.cart_badge)).toHaveText('1');

        await page.locator(inventory_selectors.cart_link).click();
        await page.locator(cart_selectors.btn_remove('sauce-labs-onesie')).click();

        await expect(page.locator(cart_selectors.item)).toHaveCount(0);
        await expect(page.locator(cart_selectors.cart_badge)).not.toBeVisible();
    });

});
