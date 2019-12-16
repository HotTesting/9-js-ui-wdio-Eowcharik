import { expect } from "chai";
import { App } from "../../pages/application";

describe("Cart", function() {
	beforeEach(function() {
		browser.deleteCookies();
	});

	afterEach(function() {
		browser.deleteCookies();
	});

	it("can add item", function() {
		App.product.open("/rubber-ducks-c-1/red-duck-p-3");
		App.product.addToCart();
		App.checkout.open();
		expect(App.checkout.isItemsInCart()).to.be.true;
	});

	it("can add correct item", function() {
		App.product.open("/rubber-ducks-c-1/red-duck-p-3");
		const productDetails = App.product.getProductDetails();

		App.product.addToCart();

		App.checkout.open();
		expect(App.checkout.isItemsInCart()).to.be.true;

		expect(App.checkout.shoppingCart.items.length).to.equal(1);
		const productNameInCart = App.checkout.shoppingCart.items[0].getProductName();
		const productPriceInCart = App.checkout.shoppingCart.items[0].getProductPrice();
		expect(productNameInCart).to.equal(productDetails.name);
		expect(productPriceInCart).to.equal(productDetails.price);
	});
});
