// @ts-check
const { defineConfig, devices } = require('@playwright/test');

/**
 * SauceDemo Playwright config
 *
 * npm run saucedemo          – run all tests
 * npm run saucedemo:ui       – interactive UI mode
 * npm run saucedemo:report   – open HTML report
 * npm run saucedemo:allure   – generate & open Allure report
 */
module.exports = defineConfig({
    timeout: 30 * 1000,
    outputDir: 'test-results/saucedemo',
    testDir: './tests/saucedemo',
    fullyParallel: false,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 1 : 0,
    workers: 1,

    reporter: [
        ['html', { outputFolder: 'playwright-report/saucedemo', open: 'never' }],
        ['allure-playwright', { outputFolder: 'allure-results', detail: true, suiteTitle: true }],
    ],

    use: {
        baseURL: 'https://www.saucedemo.com',
        trace: 'on',
        screenshot: 'only-on-failure',
        video: 'retain-on-failure',
        actionTimeout: 15000,
        navigationTimeout: 15000,
    },

    projects: [
        {
            name: 'setup',
            testMatch: '**/auth.setup.js',
        },
        {
            name: 'chromium',
            use: {
                ...devices['Desktop Chrome'],
                storageState: 'support/login-sessions/saucedemo-standard-user.json',
            },
            dependencies: ['setup'],
        },
    ],
});
