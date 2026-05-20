import { test as setup } from '@playwright/test';
import { USERS, PASSWORD } from '../../fixtures/saucedemo/users.js';

/**
 * Authentication setup – runs once before the test projects.
 * Logs in as standard_user and saves the browser session (cookies + localStorage)
 * so that all subsequent tests skip the login step entirely.
 *
 * The saved file is loaded automatically via `storageState` in playwright.config.cjs.
 */

const STORAGE_STATE = 'support/login-sessions/saucedemo-standard-user.json';

setup(`save [${USERS.standard}] session to storageState`, async ({ page }) => {
    await page.goto('/');
    await page.locator('[data-test="username"]').fill(USERS.standard);
    await page.locator('[data-test="password"]').fill(PASSWORD);
    await page.locator('[data-test="login-button"]').click();
    await page.waitForURL('**/inventory.html');
    await page.context().storageState({ path: STORAGE_STATE });
});
