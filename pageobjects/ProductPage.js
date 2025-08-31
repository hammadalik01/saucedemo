class ProductPage {
    constructor(page) {
        this.page = page;
        this.productCards = page.locator('.inventory_item');
        this.cartIcon = page.locator('#shopping_cart_container');
    }

    async addProductToCartByName(targetProductName) {
        const count = await this.productCards.count();

        for (let i = 0; i < count; i++) {
            const card = this.productCards.nth(i);
            const name = await card.locator('.inventory_item_name').innerText();

            if (name === targetProductName) {
                const price = await card.locator('.inventory_item_price').innerText();
                await card.locator('.btn_inventory').click();
                return { name, price };
            }
        }
        throw new Error(`Product "${targetProductName}" not found on Products page.`);
    }

    getProductButton(targetProductName) {
        const product = this.page.locator('.inventory_item').filter({ hasText: targetProductName });
        return product.locator('.btn_inventory');
    }
    async goToCart() {
        await this.cartIcon.click();
    } 
}

module.exports = { ProductPage };