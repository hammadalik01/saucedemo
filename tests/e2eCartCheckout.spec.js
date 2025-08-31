// @ts-check
import { test, expect } from '@playwright/test';
import testData from '../Utils/TestData.js';
const { PageManager } = require('../pageobjects/PageManager');

test.describe('SauceDemo E2E Tests', () => {
  let pm; // Declare PageManager at suite level

  // Login before each test
  test.beforeEach(async ({ page }) => {

    pm = new PageManager(page);

    await pm.loginPage.goto(testData.baseURL);
    await pm.loginPage.login(
      testData.validUser.username,
      testData.validUser.password
    );

    // Ensure we are on products page
    await expect(page).toHaveURL(/inventory.html/);
  });

  test('User can add product to cart and complete checkout', async ({ page }) => {
    const targetProductName = 'Sauce Labs Backpack'; // Or move to TestData.js
    const TAX = testData.tax;

    // --- Product section ---
    const productInfo = await pm.productPage.addProductToCartByName(targetProductName);
    await pm.productPage.goToCart();
    await expect(page).toHaveURL(/cart.html/);

    // --- Cart section ---
    const cartItemName = await pm.cartPage.getCartItemName();
    const cartItemPrice = await pm.cartPage.getCartItemPrice();
    expect(cartItemName).toBe(productInfo.name);
    expect(cartItemPrice).toBe(productInfo.price);

    await pm.cartPage.proceedToCheckout();
    await expect(page).toHaveURL(/checkout-step-one.html/);

    // --- Checkout section ---
    await pm.checkoutPage.fillCheckoutForm(
      testData.checkoutInfo.firstName,
      testData.checkoutInfo.lastName,
      testData.checkoutInfo.postalCode
    );
    await pm.checkoutPage.continue();
    await expect(page).toHaveURL(/checkout-step-two.html/);

    // --- Checkout Overview section ---
    const totalProductPrice = await pm.checkoutOverviewPage.calculateTotalWithoutTax();
    const displayedTotal = await pm.checkoutOverviewPage.getDisplayedTotal();
    const expectedTotal = totalProductPrice + TAX;
    expect(displayedTotal).toBe(expectedTotal);

    await pm.checkoutOverviewPage.finishOrder();
    const confirmationText = await pm.checkoutOverviewPage.getOrderConfirmationText();
    expect(confirmationText).toBe('Thank you for your order!');
  });

  test('Verify Add to Cart button text changes after click', async () => {

    const button = pm.productPage.getProductButton(testData.productName);
    await expect(button).toHaveText('Add to cart');
    await button.click();
    await expect(button).toHaveText('Remove');
    await button.click();
    await expect(button).toHaveText('Add to cart');

  });
});
