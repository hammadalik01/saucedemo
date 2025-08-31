class CartPage  {

    constructor(page) {
        this.page = page;
        this.cartItem = page.locator('.cart_item');
        this.checkoutButton = page.locator('[data-test="checkout"]');
    }

    async getCartItemName() {
        return await this.cartItem.locator('.inventory_item_name').innerText();
    }

    async getCartItemPrice() {
        return await this.cartItem.locator('.inventory_item_price').innerText();
    }

    async proceedToCheckout() {
        await this.checkoutButton.click();
    }

}

module.exports = {CartPage};