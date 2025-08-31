const { expect } = require('@playwright/test');

class LoginPage {
    constructor(page) {
        this.page = page;
        this.usernameInput = page.locator('#user-name');
        this.passwordInput = page.locator('#password');
        this.loginButton = page.locator('#login-button');
        this.errorMessage = page.locator('h3[data-test="error"]');
    }

    async goto(url) {
        await this.page.goto(url);
    }

    async login(username, password) {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }

    getErrorLocator() {
        return this.errorMessage;
    }

    async expectError(expectedMessage) {
        await expect(this.errorMessage).toHaveText(expectedMessage);
    }
}

module.exports = { LoginPage };
