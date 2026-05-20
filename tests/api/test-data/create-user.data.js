// @ts-check
const { faker } = require('@faker-js/faker');

/**
 * Use a fixed seed so that Faker produces the same names every run.
 * Playwright discovers tests in the main process and executes them in worker
 * processes – without a fixed seed the generated names would differ and
 * Playwright would report "Test not found in the worker process".
 */
faker.seed(42);

/**
 * External data source for TC2 – POST Create User.
 * Each run generates fresh realistic data via @faker-js/faker.
 *
 * Shape: { name: string, job: string }
 */
const createUserTestData = [
    {
        name: faker.person.firstName() + ' ' + faker.person.lastName(),
        job: faker.person.jobTitle(),
    },
    {
        name: faker.person.firstName() + ' ' + faker.person.lastName(),
        job: faker.person.jobTitle(),
    },
    {
        name: faker.person.firstName() + ' ' + faker.person.lastName(),
        job: faker.person.jobTitle(),
    },
];

module.exports = { createUserTestData };


