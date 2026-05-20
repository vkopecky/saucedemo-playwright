import { test, expect } from '@playwright/test';
import { login_selectors } from '../../page-object-modeling/saucedemo-selectors.js';
import { VALID_USERS, LOCKED_USERS, PASSWORD } from '../../fixtures/saucedemo/users.js';

/**
 * TC01 – Login Functionality
 *
 * WHY THIS IS ESSENTIAL:
 * Authentication is the entry point to the entire application.
 * Without a working login, no other feature is accessible to users.
 * Tests are data-driven – user list is loaded from fixtures/saucedemo/users.js.
 * A broken login means 100% of users are locked out.
 */

test.use({ storageState: { cookies: [], origins: [] } });

test.describe('TC01 – Login Functionality', () => {

    // ── 01-A: Each valid user can login and reach /inventory.html ─────────────
    for (const USER of VALID_USERS) {
        test(`[${USER}] 01-A: Successful login navigates to inventory page`, async ({ page }) => {
            await page.goto('/');
            await page.locator(login_selectors.username).fill(USER);
            await page.locator(login_selectors.password).fill(PASSWORD);
            await page.locator(login_selectors.login_button).click();

            await expect(page).toHaveURL(/inventory\.html/);
            await expect(page.locator(login_selectors.error)).not.toBeVisible();
        });
    }

    // ── 01-B: Each locked user sees a descriptive error ───────────────────────
    for (const USER of LOCKED_USERS) {
        test(`[${USER}] 01-B: Locked-out user sees error and stays on login page`, async ({ page }) => {
            await page.goto('/');
            await page.locator(login_selectors.username).fill(USER);
            await page.locator(login_selectors.password).fill(PASSWORD);
            await page.locator(login_selectors.login_button).click();

            await expect(page).toHaveURL('/');
            await expect(page.locator(login_selectors.error)).toBeVisible();
            await expect(page.locator(login_selectors.error)).toContainText('Sorry, this user has been locked out');
        });
    }

    // ── 01-C: Unknown user with wrong password sees mismatch error ────────────
    test(`[unknown_user] 01-C: Invalid credentials show a generic mismatch error`, async ({ page }) => {
        const USER = 'unknown_user';
        await page.goto('/');
        await page.locator(login_selectors.username).fill(USER);
        await page.locator(login_selectors.password).fill('wrong_password');
        await page.locator(login_selectors.login_button).click();

        await expect(page).toHaveURL('/');
        await expect(page.locator(login_selectors.error)).toBeVisible();
        await expect(page.locator(login_selectors.error)).toContainText('Username and password do not match');
    });

});
