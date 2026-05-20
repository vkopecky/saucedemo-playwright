// @ts-check
const { test, expect } = require('@playwright/test');
const { createUserTestData } = require('./test-data/create-user.data');

const RESPONSE_TIME_LIMIT_MS = 2000;

/**
 * Expected response schema for POST /api/users.
 * [bonus] Used to validate each field name, type and presence.
 */
const CREATE_USER_RESPONSE_SCHEMA = [
    { field: 'name',      type: 'string', required: true },
    { field: 'job',       type: 'string', required: true },
    { field: 'id',        type: 'string', required: true },
    { field: 'createdAt', type: 'string', required: true },
];

test.describe('TC2 – POST Create User', () => {
    for (const userData of createUserTestData) {
        test(`should create user "${userData.name}" (${userData.job})`, async ({ request }) => {
            const startTime = Date.now();

            const response = await request.post('/api/users', {
                data: { name: userData.name, job: userData.job },
            });

            const responseTimeMs = Date.now() - startTime;

            // ── HTTP status code ──────────────────────────────────────────────
            expect(response.status()).toBe(201);

            const body = await response.json();

            // ID present and non-empty
            expect(body.id).toBeDefined();
            expect(body.id).not.toBe('');

            // createdAt is a valid ISO timestamp
            expect(body.createdAt).toBeDefined();
            expect(new Date(body.createdAt).getTime()).not.toBeNaN();

            // Echoed fields match sent data
            expect(body.name).toBe(userData.name);
            expect(body.job).toBe(userData.job);

            // ── Response time ─────────────────────────────────────────────────
            expect(
                responseTimeMs,
                `Response time ${responseTimeMs} ms exceeded limit of ${RESPONSE_TIME_LIMIT_MS} ms`
            ).toBeLessThan(RESPONSE_TIME_LIMIT_MS);

            // ── [bonus] Schema validation ─────────────────────────────────────
            // Every required field must be present with the correct type
            for (const { field, type, required } of CREATE_USER_RESPONSE_SCHEMA) {
                if (required) {
                    expect(body, `Missing required field: "${field}"`).toHaveProperty(field);
                }
                if (body[field] !== undefined) {
                    expect(
                        typeof body[field],
                        `Field "${field}" expected type "${type}", got "${typeof body[field]}"`
                    ).toBe(type);
                }
            }
            // Verify no REQUIRED fields are missing from the response
            // (We intentionally do not reject extra fields – external APIs like
            //  reqres.in may append internal metadata such as "_meta".)
            const presentFields = Object.keys(body);
            for (const { field, required } of CREATE_USER_RESPONSE_SCHEMA) {
                if (required) {
                    expect(
                        presentFields,
                        `Required field "${field}" is missing from response`
                    ).toContain(field);
                }
            }
        });
    }
});

