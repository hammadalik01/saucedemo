// utils/PageManager.js
const { LoginPage } = require('../pageobjects/LoginPage');
const { ProductPage } = require('../pageobjects/ProductPage');
const { CartPage } = require('../pageobjects/CartPage');
const { CheckoutPage } = require('../pageobjects/CheckoutPage');
const { CheckoutOverviewPage } = require('../pageobjects/CheckoutOverviewPage');

class PageManager {
    constructor(page) {
        this.page = page;
        this.loginPage = new LoginPage(page);
        this.productPage = new ProductPage(page);
        this.cartPage = new CartPage(page);
        this.checkoutPage = new CheckoutPage(page);
        this.checkoutOverviewPage = new CheckoutOverviewPage(page);
    }
}

module.exports = { PageManager };
