export class Payment {
	private get container(): WebdriverIO.Element {
		return $('div[class="payment wrapper"]');
	}

	public get price() {
		let priceBlock = this.container.$(" .price").getText();
		priceBlock = priceBlock.replace("$", "");

		return parseFloat(priceBlock.replace("+", ""));
	}

	public get paymentTitle() {
		return this.container.$(" .title").getText();
	}

	public get paymentCountry() {
		return this.container.$(" .name").getText();
	}
}
