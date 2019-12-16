import { expect } from "chai";
import { App } from "../../pages/application";
import { CustomerInfo } from "../../pages/components/customerInfo";

const regularDuck = "rubber-ducks-c-1/red-duck-p-3";
const soldOutDuck = "rubber-ducks-c-1/purple-duck-p-5";
const discountedDuck = "rubber-ducks-c-1/blue-duck-p-4";
const vipDuck = "rubber-ducks-c-1/premium-ducks-c-2/vip-yellow-duck-p-6";




function checkoutAndBuy(productNames: string[], totalSum: number) {
	//open checkout:
	App.checkout.open();
	expect(App.checkout.isItemsInCart()).to.be.true;
	expect(App.checkout.shoppingCart.items.length).to.equal(productNames.length);
	CustomerInfo.fillCustomerInfo(true);
	const shippingPrice = App.checkout.shipping.price;
	const paymentPrice = App.checkout.payment.price;
	const summarySubtotal = App.checkout.summary.subtotal;
	const SummaryPayment = App.checkout.summary.payment;
	const SummaryFinalPrice = App.checkout.summary.paymentDue;

	//get total price of all ducks:
	let totalPriceOfProductsInTable = 0;
	App.checkout.shoppingCart.items.forEach(element => {
		totalPriceOfProductsInTable =
			totalPriceOfProductsInTable +
			element.getProductPrice() * element.getProductCount();
	});

	//check all prices:
	expect(totalSum).to.be.equal(totalPriceOfProductsInTable);
	expect(totalPriceOfProductsInTable).to.equal(summarySubtotal);
	expect(shippingPrice + paymentPrice).to.equal(SummaryPayment);
	expect(totalPriceOfProductsInTable + shippingPrice + paymentPrice).to.equal(
		SummaryFinalPrice
	);

	//confrm order:
	const confirmButton = App.checkout.summary.confirmButton;
	confirmButton.waitForEnabled(5000);
	confirmButton.click();

	//order success page test:
	expect(App.orderSuccess.isOrderSuccess()).to.be.true;
	expect(App.orderSuccess.TotalPrice).is.equal(SummaryFinalPrice);
	expect(App.orderSuccess.ProductNames.length).is.equal(productNames.length);

	App.orderSuccess.ProductNames.forEach(element => {
		let product = element.getAttribute("data-name");
		expect(productNames.indexOf(product)).to.not.equal(-1);
	});
}


/*
 - verify prices in cart, and after order created
 - verify order is successful

 - Prefer css selectors 
 - Try to implement as much tests as you can
 - Do not overload tests with logic, be simple
 - You SHOULD use PageObjects for this tests
 - Use mocha before/after hooks to reuse pre/post conditions
 - Use ChaiJS (expect, should or assert style) to make assertions
*/

// Each implemented test gives you 15 points

describe("Order", function() {
	beforeEach(function() {
		browser.deleteCookies();
	});

	afterEach(function() {
		browser.deleteCookies();
	});

	it("is successful for regular item", function() {
		// Just regular duck without discounts, parameters, or sold out
		App.product.open(regularDuck);
		const productDetail = App.product.getProductDetails();
		App.product.addToCart();

		const products = [productDetail.name];
		const totalSum = productDetail.price;
		checkoutAndBuy(products, totalSum);
	});

	it("is successful for discounted item", function() {
		// this duck always has discount 20%
		App.product.open(discountedDuck);
		const productDetail = App.product.getProductDetails();
		expect(App.product.saleBadgePresent()).to.be.true;

		App.product.addToCart();

		const products = [productDetail.name];
		const totalSum = productDetail.price;
		checkoutAndBuy(products, totalSum);
	});

	it("is successful for sold out item", function() {
		// now can be added to cart and bought successfully
		// this duck always sold out
		App.product.open(soldOutDuck);
		const productDetail = App.product.getProductDetails();
		App.product.addToCart();

		const products = [productDetail.name];
		const totalSum = productDetail.price;
		checkoutAndBuy(products, totalSum);
	});

	it("is successful for 2 same items in card", function() {
		// Just regular duck without discounts, parameters, or sold our
		App.product.open(regularDuck);
		const productDetail = App.product.getProductDetails();

		App.product.addToCart();
		App.product.addToCart();

		const products = [productDetail.name];
		const totalSum = productDetail.price * 2;
		checkoutAndBuy(products, totalSum);
	});

	it("is successful for 2 different items in card", function() {
		App.product.open(regularDuck);
		const productDetailFirst = App.product.getProductDetails();
		App.product.addToCart();

		App.product.open(discountedDuck);
		const productDetailSecond = App.product.getProductDetails();
		expect(App.product.saleBadgePresent()).to.be.true;
		App.product.addToCart();

		const products = [productDetailFirst.name, productDetailSecond.name];
		const totalSum = productDetailFirst.price + productDetailSecond.price;

		checkoutAndBuy(products, totalSum);
	});

	it("is successful for items with parameters", function() {
		// this duck has 3 sizes - small, medium, large. Each size has own price. Verify that price calculated correctly

		App.product.open(vipDuck);
		const additionalPrice = App.product.getProductSizes();
		const productDetail = App.product.getProductDetails();
		App.product.addToCart(1);
		App.product.addToCart(2);
		App.product.addToCart(3);
		const products = [
			productDetail.name,
			productDetail.name,
			productDetail.name
		];
		let additionalPrices = 0;
		additionalPrice.forEach(price => {
			additionalPrices = additionalPrices + price;
		});
		const totalSum = productDetail.price * 3 + additionalPrices;
		checkoutAndBuy(products, totalSum);
	});
});
