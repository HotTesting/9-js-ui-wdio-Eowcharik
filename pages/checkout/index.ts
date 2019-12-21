import { BasePage } from "../base";
import { ShoppingCart } from "./components/shoppingCart";
import { Shipping } from "./components/shipping";
import { Payment } from "./components/payment";
import { Summary } from "./components/summary";
import { customerInfo } from "./components/customerInfo";

export class CheckoutPage extends BasePage {
	shoppingCart: ShoppingCart = new ShoppingCart();
	shipping: Shipping = new Shipping();
	payment: Payment = new Payment();
	summary: Summary = new Summary();
	customerInfo: customerInfo = new customerInfo();

	private get noItemsLabel() {
		return $(".cart.wrapper em");
	}

	open() {
		super.open("/checkout");
	}

	isNoItemsInCart() {
		if (this.noItemsLabel.isDisplayed()) {
			return this.noItemsLabel
				.getText()
				.includes("There are no items in your cart.");
		} else {
			return false;
		}
	}

	isItemsInCart() {
		return !this.isNoItemsInCart();
	}
}

export const Checkout = new CheckoutPage();
