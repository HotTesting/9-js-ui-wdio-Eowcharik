export class Shipping {
  private get container(): WebdriverIO.Element {
    return $('div[class="shipping wrapper"]');
  }

  public get price() {
    const priceBlock = this.container.$(" .price").getText();

    if (priceBlock.includes("No fee")) {
      return 0;
    } else {
      return parseFloat(priceBlock.replace("$", ""));
    }
  }

  public get shippingTitle() {
    return this.container.$(" .title").getText();
  }

  public get shippingCountry() {
    return this.container.$(" .name").getText();
  }
}
