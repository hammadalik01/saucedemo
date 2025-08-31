// @ts-check
import { test, expect } from '@playwright/test';

const BASE_URL = 'https://www.saucedemo.com/';
const USERNAME = 'standard_user';
const PASSWORD = 'secret_sauce';

test.describe('SauceDemo E2E Tests', () => {

  // Login before each test
  test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL);
    await page.locator('#user-name').fill(USERNAME);
    await page.locator('#password').fill(PASSWORD);
    await page.locator('#login-button').click();

    // Ensure we are on products page
    await expect(page).toHaveURL(/inventory.html/);

  });

  test('User can add product to cart and complete checkout', async ({ page }) => {
    const targetProductName = 'Sauce Labs Backpack';
    const TAX = 2.40;

    //Products start Here
    const products = page.locator('.inventory_item');
    const count = await products.count();
    let productInfo = {};

    for (let i = 0; i < count; i++) {
      const product = products.nth(i);
      const name = await product.locator('.inventory_item_name').innerText();

      if (name === targetProductName) {
        const price = await product.locator('.inventory_item_price').innerText();
        await product.locator('.btn_inventory').click();
        productInfo = { name, price };
        break;
      }
    }
    //Products end here

    //Go to cart page
    await page.locator('#shopping_cart_container').click();
    await expect(page).toHaveURL(/cart.html/);

    //Cart Start here
    const cartItem = page.locator('.cart_item');
    const cartItemName = await cartItem.locator('.inventory_item_name').innerText();
    const cartItemPrice = await cartItem.locator('.inventory_item_price').innerText();

    expect(cartItemName).toBe(productInfo.name);
    expect(cartItemPrice).toBe(productInfo.price);

    await page.locator('[data-test="checkout"]').click();
    await expect(page).toHaveURL(/checkout-step-one.html/);
    //Cart End here

    //Checkout page start here
    await page.locator('#first-name').fill('John');
    await page.locator('#last-name').fill('Doe');
    await page.locator('#postal-code').fill('12345');
    await page.locator('#continue').click();
    //Checkout page End here

    //Checkout-Overview page start here
    const cartItems = page.locator('.cart_item');
    const itemCount = await cartItems.count();
    let totalProductPrice = 0;

    for (let i = 0; i < itemCount; i++) {
      const item = cartItems.nth(i);
      const priceText = await item.locator('.inventory_item_price').innerText();
      const price = Number(priceText.split('$')[1]);
      totalProductPrice += price;
    }

    const expectedTotal = totalProductPrice + TAX;
    const totalText = await page.locator('.summary_total_label').innerText();
    const actualTotal = Number(totalText.split('$')[1]);

    expect(actualTotal).toBe(expectedTotal);
    //expect(actualTotal).toBeCloseTo(expectedTotal, 2);

    await page.locator('#finish').click();
    await expect(page.locator('.complete-header')).toHaveText('Thank you for your order!');
    //Checkout-Overview page End here
  });

  test('Verify Add to Cart button text changes after click', async ({ page }) => {
    //Products start Here
    const product = page.locator('.inventory_item').filter({ hasText: 'Sauce Labs Backpack' });
    const button = product.locator('.btn_inventory');

    await expect(button).toHaveText('Add to cart');
    await button.click();
    await expect(button).toHaveText('Remove');

    // Optional: toggle back
    await button.click();
    await expect(button).toHaveText('Add to cart');
    //Products end here
  });

});
