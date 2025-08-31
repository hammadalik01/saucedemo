// @ts-check
import {test, expect} from '@playwright/test';
const testData = require('../Utils/TestData'); // relative path to your TestData.js

async function login(page, username, password) {
  // Open Sauce Demo website

  
  await page.goto(testData.baseURL);
  // Fill username
  await page.locator('#user-name').fill(username);
  // Fill password
  await page.locator('#password').fill(password);
  // Click login button
  await page.locator('#login-button').click();
}

test.describe('Login Tests', () => {

  test('Login with valid credentials', async ({ page }) => {
    await login(page, testData.validUser.username, testData.validUser.password);
    await expect(page).toHaveURL(/inventory.html/);
  });

  test('Login With Locked Out User', async ({ page }) => {
    await login(page, testData.lockedUser.username, testData.lockedUser.password);

    const errorLocator = page.locator('h3[data-test="error"]');
    console.log(await errorLocator.allTextContents());

    await expect(errorLocator).toHaveText(testData.loginErrors.lockedOut);
  });

  test('Enter valid username with empty password', async ({ page }) => {
    
    await login(page, testData.emptyPasswordUser.username, testData.emptyPasswordUser.password);

    
    const errorLocator = page.locator('h3[data-test="error"]');
    console.log(await errorLocator.allTextContents());

    await expect(errorLocator).toHaveText(testData.loginErrors.emptyPassword);
  });

});
