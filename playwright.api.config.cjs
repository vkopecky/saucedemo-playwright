// @ts-check
const { defineConfig } = require('@playwright/test');
const path = require('path');

// Load .env so developers can store REQRES_API_KEY locally without committing it.
try {
    require('dotenv').config({ path: path.resolve(__dirname, '.env') });
} catch (_) { /* dotenv is optional */ }

// Read proxy from standard env variables (set by the OS / corporate network).
const proxyServer = process.env.HTTPS_PROXY || process.env.HTTP_PROXY || undefined;

/**
 * API Tests – reqres.in
 *
 * npm run api          – run all API tests
 * npm run api:report   – open HTML report
 */
module.exports = defineConfig({
    timeout: 30 * 1000,
    testDir: './tests/api',
    fullyParallel: true,
    forbidOnly: !!process.env.CI,
    retries: 0,
    workers: 4,

    reporter: [
        ['list'],
        ['html', { outputFolder: 'playwright-report/api', open: 'never' }],
        ['allure-playwright', { outputFolder: 'allure-results', detail: true, suiteTitle: true }],
    ],

    use: {
        baseURL: 'https://reqres.in',
        // Send x-api-key only when the env variable is actually provided.
        // Sending an empty value causes reqres.in to return 401.
        extraHTTPHeaders: {
            ...(process.env.REQRES_API_KEY
                ? { 'x-api-key': process.env.REQRES_API_KEY }
                : {}),
        },
        // Use the system proxy when present (common in corporate environments).
        ...(proxyServer ? { proxy: { server: proxyServer } } : {}),
    },
});

