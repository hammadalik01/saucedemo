// @ts-check
const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pageobjects/LoginPage');
const testData = require('../Utils/TestData');

test.describe('SauceDemo Login Tests', () => {

  test('Login with valid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto(testData.baseURL);
    await loginPage.login(testData.validUser.username, testData.validUser.password);
    await expect(page).toHaveURL(/inventory.html/);
  });

  test('Login With Locked Out User', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto(testData.baseURL);
    await loginPage.login(testData.lockedUser.username, testData.lockedUser.password);

    await loginPage.expectError(testData.loginErrors.lockedOut);
  });

  test('Enter valid username with empty password', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto(testData.baseURL);
    await loginPage.login(testData.emptyPasswordUser.username, testData.emptyPasswordUser.password);

    await loginPage.expectError(testData.loginErrors.emptyPassword);
  });

});
