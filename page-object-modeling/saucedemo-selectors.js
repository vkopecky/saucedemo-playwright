/**
 * saucedemo-selectors.js
 * Pure selector objects for https://www.saucedemo.com
 * No logic, no classes, no `this` – only strings.
 * Pattern matches application-selectors.js.
 */

// Login page
export const login_selectors = {
    username:     '[data-test="username"]',
    password:     '[data-test="password"]',
    login_button: '[data-test="login-button"]',
    error:        '[data-test="error"]',
};

// Inventory / product list
export const inventory_selectors = {
    title:          '[data-test="title"]',
    products:       '.inventory_item',
    product_name:   '.inventory_item_name',
    product_price:  '.inventory_item_price',
    sort_container: '[data-test="product-sort-container"]',
    cart_badge:     '.shopping_cart_badge',
    cart_link:      '.shopping_cart_link',
    // Dynamic – call as function: inventory_selectors.add_to_cart('sauce-labs-backpack')
    add_to_cart:      (slug) => `[data-test="add-to-cart-${slug}"]`,
    remove_from_cart: (slug) => `[data-test="remove-${slug}"]`,
};

// Cart
export const cart_selectors = {
    item:              '.cart_item',
    item_name:         '[data-test="inventory-item-name"]',
    item_price:        '.inventory_item_price',
    cart_badge:        '.shopping_cart_badge',
    btn_checkout:      '[data-test="checkout"]',
    btn_continue_shop: '[data-test="continue-shopping"]',
    // Dynamic – call as function: cart_selectors.btn_remove('sauce-labs-backpack')
    btn_remove: (slug) => `[data-test="remove-${slug}"]`,
};

// Checkout – step 1 (info) / step 2 (overview) / step 3 (complete)
export const checkout_selectors = {
    // Step 1
    first_name:   '[data-test="firstName"]',
    last_name:    '[data-test="lastName"]',
    postal_code:  '[data-test="postalCode"]',
    btn_continue: '[data-test="continue"]',
    error:        '[data-test="error"]',
    // Step 2
    subtotal:     '.summary_subtotal_label',
    tax:          '.summary_tax_label',
    total:        '.summary_total_label',
    btn_finish:   '[data-test="finish"]',
    // Step 3
    confirm_heading: '.complete-header',
    dispatch_msg:    '.complete-text',
};

// Hamburger menu (present on all authenticated pages)
export const menu_selectors = {
    btn_open:  '#react-burger-menu-btn',
    btn_close: '#react-burger-cross-btn',
    logout:    '#logout_sidebar_link',
    all_items: '#inventory_sidebar_link',
    about:     '#about_sidebar_link',
    reset:     '#reset_sidebar_link',
};

// Product detail page (/inventory-item.html?id=X)
export const detail_selectors = {
    product_name:  '.inventory_details_name',
    product_desc:  '.inventory_details_desc',
    product_price: '.inventory_details_price',
    add_to_cart:   '[data-test^="add-to-cart"]',
    btn_remove:    '[data-test^="remove"]',
    btn_back:      '[data-test="back-to-products"]',
    cart_badge:    '.shopping_cart_badge',
};
