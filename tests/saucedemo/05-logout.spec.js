import { test, expect } from '@playwright/test';
import { menu_selectors } from '../../page-object-modeling/saucedemo-selectors.js';
import { USERS } from '../../fixtures/saucedemo/users.js';

/**
 * TC05 – Logout & Session Protection
 *
 * WHY THIS IS ESSENTIAL:
 * After logout, protected pages must not be accessible.
 * A session not properly destroyed lets anyone access the previous user's account.
 */

const USER = USERS.standard;

test.describe('TC05 – Logout & Session Protection', () => {

    test(`[${USER}] 05-A: Logout via hamburger menu redirects to login page`, async ({ page }) => {
        await page.goto('/inventory.html');

        await page.locator(menu_selectors.btn_open).click();
        await page.locator(menu_selectors.logout).waitFor({ state: 'visible' });
        await page.locator(menu_selectors.logout).click();

        await expect(page).toHaveURL('/');
        await expect(page.locator('[data-test="login-button"]')).toBeVisible();
    });

    test(`[${USER}] 05-B: Accessing /inventory.html after logout redirects back to login`, async ({ page }) => {
        await page.goto('/inventory.html');

        await page.locator(menu_selectors.btn_open).click();
        await page.locator(menu_selectors.logout).waitFor({ state: 'visible' });
        await page.locator(menu_selectors.logout).click();
        await expect(page).toHaveURL('/');

        // Bypass attempt – navigate directly to protected URL
        await page.goto('/inventory.html');

        await expect(page).toHaveURL('/');
        await expect(page.locator('[data-test="login-button"]')).toBeVisible();
    });

});
