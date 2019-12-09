export class Summary {
  private get container(): WebdriverIO.Element {
    return $(" .summary.wrapper");
  }

  public get subtotal() {
    const priceBlock = this.container
      .$('//*[@id="box-checkout-summary"]//tbody/tr[1]/td[2]')
      .getText();
    return parseFloat(priceBlock.replace("$", ""));
  }

  public get payment() {
    const priceBlock = this.container
      .$('//*[@id="box-checkout-summary"]//tbody/tr[2]/td[2]')
      .getText();
    return parseFloat(priceBlock.replace("$", ""));
  }

  public get paymentDue() {
    const priceBlock = this.container
      .$('//*[@id="box-checkout-summary"]//tr/td[2]/strong')
      .getText();
    return parseFloat(priceBlock.replace("$", ""));
  }

  public get confirmButton() {
    return this.container.$('  button[name="confirm_order"]');
  }
}
