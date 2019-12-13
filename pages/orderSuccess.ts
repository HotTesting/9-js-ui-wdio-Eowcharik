import { BasePage } from "./base";
import { AssertionError } from "assert";

export class OrderSuccessPage extends BasePage {
	public get TotalPrice(): number {
		return parseFloat(
			$("#box-order-success p:nth-child(4)")
				.getText()
				.replace("Order Total: $", "")
		);
	}

	public get ProductNames(): WebdriverIO.Element[] {
		return $$(".item");
	}

	isOrderSuccess(): boolean {
		const orderSuccessBox = $("#box-order-success .title");
		orderSuccessBox.waitForDisplayed(
			5000,
			false,
			"order success message is not displayed"
		);

		return orderSuccessBox.getText().endsWith("successfully completed!");
	}
}

export const orderSuccess = new OrderSuccessPage();
