
class CheckoutOverviewPage {
  constructor(page) {
    this.page = page;
    this.cartItems = page.locator('.cart_item');
    this.totalLabel = page.locator('.summary_total_label');
    this.finishButton = page.locator('#finish');
    this.orderConfirmation = page.locator('.complete-header');
  }

  async calculateTotalWithoutTax() {
    const itemCount = await this.cartItems.count();
    let totalProductPrice = 0;

    for (let i = 0; i < itemCount; i++) {
      const item = this.cartItems.nth(i);
      const priceText = await item.locator('.inventory_item_price').innerText();
      const price = Number(priceText.split('$')[1]);
      totalProductPrice += price;
    }

    return totalProductPrice;
  }

  async getDisplayedTotal() {
    const totalText = await this.totalLabel.innerText();
    return Number(totalText.split('$')[1]);
  }

  async finishOrder() {
    await this.finishButton.click();
  }

  async getOrderConfirmationText() {
    return await this.orderConfirmation.innerText();
  }
}

module.exports = { CheckoutOverviewPage };
