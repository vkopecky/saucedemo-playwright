/**
 * SauceDemo test user data
 * Source: https://www.saucedemo.com (visible on login page)
 */

export const PASSWORD = 'secret_sauce';

export const USERS = {
    standard:           'standard_user',
    locked_out:         'locked_out_user',
    problem:            'problem_user',
    performance_glitch: 'performance_glitch_user',
    error:              'error_user',
    visual:             'visual_user',
};

// Users that can successfully authenticate and reach /inventory.html
export const VALID_USERS = [
    USERS.standard,
    USERS.problem,
    USERS.performance_glitch,
    USERS.error,
    USERS.visual,
];

// Users blocked from logging in
export const LOCKED_USERS = [
    USERS.locked_out,
];

