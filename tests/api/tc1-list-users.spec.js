// @ts-check
const { test, expect } = require('@playwright/test');

/**
 * TC1 – GET List Users
 * SUT: https://reqres.in/api/users?page=2
 */
test.describe('TC1 – GET List Users', () => {
    /** @type {import('@playwright/test').APIResponse} */
    let response;
    /** @type {any} */
    let body;

    test.beforeAll(async ({ request }) => {
        response = await request.get('/api/users?page=2');
        body = await response.json();
    });

    test('should return HTTP 200', async () => {
        expect(response.status()).toBe(200);
    });

    test('should return expected "total" value', async () => {
        expect(body.total).toBe(12);
    });

    test('should return correct "last_name" for the first user in data', async () => {
        expect(body.data[0].last_name).toBe('Lawson');
    });

    test('should return correct "last_name" for the second user in data', async () => {
        expect(body.data[1].last_name).toBe('Ferguson');
    });

    test('count of received users in "data" should not exceed "total"', async () => {
        expect(body.data.length).toBeGreaterThan(0);
        expect(body.data.length).toBeLessThanOrEqual(body.total);
    });

    // ──────────────────────────────────────────────────────────────────────────
    // Optional bonus: data-type assertions
    // ──────────────────────────────────────────────────────────────────────────
    test('[bonus] top-level numeric fields should be of type number', async () => {
        expect(typeof body.page).toBe('number');
        expect(typeof body.per_page).toBe('number');
        expect(typeof body.total).toBe('number');
        expect(typeof body.total_pages).toBe('number');
    });

    test('[bonus] "data" should be an array', async () => {
        expect(Array.isArray(body.data)).toBe(true);
    });

    test('[bonus] every user object should have correct field types', async () => {
        for (const user of body.data) {
            expect(typeof user.id).toBe('number');
            expect(typeof user.email).toBe('string');
            expect(typeof user.first_name).toBe('string');
            expect(typeof user.last_name).toBe('string');
            expect(typeof user.avatar).toBe('string');
            expect(user.avatar).toMatch(/^https?:\/\/.+/);
            expect(user.email).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
        }
    });

    test('[bonus] "support" object should contain url and text strings', async () => {
        expect(typeof body.support.url).toBe('string');
        expect(typeof body.support.text).toBe('string');
    });
});

