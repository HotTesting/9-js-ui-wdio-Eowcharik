import { expect } from "chai";
import { App } from "../../pages/application";
import { DuckUtils } from "../../pages/duckUtils";
import { AssertionError } from "assert";

const regularDuck = "rubber-ducks-c-1/red-duck-p-3";
const soldOutDuck = "rubber-ducks-c-1/purple-duck-p-5";
const discountedDuck = "rubber-ducks-c-1/blue-duck-p-4";
const vipDuck = "rubber-ducks-c-1/premium-ducks-c-2/vip-yellow-duck-p-6";

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
    App.checkout.open();
    expect(App.checkout.isItemsInCart()).to.be.true;
    expect(App.checkout.shoppingCart.items.length).to.equal(1);
    const productNameInCart = App.checkout.shoppingCart.items[0].getProductName();
    const productPriceInCart = App.checkout.shoppingCart.items[0].getProductPrice();

    expect(productNameInCart).to.equal(productDetail.name);
    expect(productPriceInCart).to.equal(productDetail.price);
    App.customerInfo.fillCustomerInfo(true);

    const shippingPrice = App.checkout.shipping.price;
    const paymentPrice = App.checkout.payment.price;
    const summarySubtotal = App.checkout.summary.subtotal;
    const SummaryPayment = App.checkout.summary.payment;
    const SummaryFinalPrice = App.checkout.summary.paymentDue;

    expect(productPriceInCart).to.equal(summarySubtotal);
    expect(shippingPrice + paymentPrice).to.equal(SummaryPayment);
    expect(productPriceInCart + shippingPrice + paymentPrice).to.equal(
      SummaryFinalPrice
    );

    const confirmButton = App.checkout.summary.confirmButton;
    confirmButton.waitForEnabled(5000);
    confirmButton.click();

    expect(App.orderSuccess.isOrderSuccess()).to.be.true;
    expect(App.orderSuccess.TotalPrice).is.equal(SummaryFinalPrice);
    expect(
      App.orderSuccess.ProductNames[0].getAttribute("data-name")
    ).to.be.equal(productNameInCart);
  });

  it("is successful for discounted item", function() {
    // this duck always has discount 20%
    App.product.open(discountedDuck);
    const productDetail = App.product.getProductDetails();
    expect(App.product.saleBadgePresent()).to.be.true;

    App.product.addToCart();
    App.checkout.open();
    expect(App.checkout.isItemsInCart()).to.be.true;
    expect(App.checkout.shoppingCart.items.length).to.equal(1);
    const productNameInCart = App.checkout.shoppingCart.items[0].getProductName();
    const productPriceInCart = App.checkout.shoppingCart.items[0].getProductPrice();

    expect(productDetail.priceWithoutDiscount).to.be.not.equal(
      productDetail.price
    );

    expect(productNameInCart).to.equal(productDetail.name);
    expect(productPriceInCart).to.equal(productDetail.price);
    App.customerInfo.fillCustomerInfo(true);

    const shippingPrice = App.checkout.shipping.price;
    const paymentPrice = App.checkout.payment.price;
    const summarySubtotal = App.checkout.summary.subtotal;
    const SummaryPayment = App.checkout.summary.payment;
    const SummaryFinalPrice = App.checkout.summary.paymentDue;

    expect(productPriceInCart).to.equal(summarySubtotal);
    expect(shippingPrice + paymentPrice).to.equal(SummaryPayment);
    expect(productPriceInCart + shippingPrice + paymentPrice).to.equal(
      SummaryFinalPrice
    );

    const confirmButton = App.checkout.summary.confirmButton;
    confirmButton.waitForEnabled(5000);
    confirmButton.click();

    expect(App.orderSuccess.isOrderSuccess()).to.be.true;
    expect(App.orderSuccess.TotalPrice).is.equal(SummaryFinalPrice);
    expect(
      App.orderSuccess.ProductNames[0].getAttribute("data-name")
    ).to.be.equal(productNameInCart);
  });

  it.skip("is successful for sold out item", function() {
    // now can be added to cart and bought successfully
    // this duck always sold out
    App.product.open(soldOutDuck);
    const productDetail = App.product.getProductDetails();

    try {
      App.product.addToCart();
    } catch (error) {
      expect(error).contains("Button 'Add to Cart' is not displayed");
    }
  });

  it("is successful for 2 same items in card", function() {
    // Just regular duck without discounts, parameters, or sold our
    App.product.open(regularDuck);
    const productDetail = App.product.getProductDetails();

    App.product.addToCart();
    App.product.addToCart();

    App.checkout.open();
    expect(App.checkout.isItemsInCart()).to.be.true;
    expect(App.checkout.shoppingCart.items.length).to.equal(1);
    const productNameInCart = App.checkout.shoppingCart.items[0].getProductName();
    const productPriceInCart = App.checkout.shoppingCart.items[0].getProductPrice();
    const productCountInCart = App.checkout.shoppingCart.items[0].getProductCount();

    expect(productNameInCart).to.equal(productDetail.name);
    expect(productPriceInCart).to.equal(productDetail.price);
    App.customerInfo.fillCustomerInfo(true);

    const shippingPrice = App.checkout.shipping.price;
    const paymentPrice = App.checkout.payment.price;
    const summarySubtotal = App.checkout.summary.subtotal;
    const SummaryPayment = App.checkout.summary.payment;
    const SummaryFinalPrice = App.checkout.summary.paymentDue;

    expect(productPriceInCart * productCountInCart).to.equal(summarySubtotal);
    expect(shippingPrice + paymentPrice).to.equal(SummaryPayment);
    expect(
      productPriceInCart * productCountInCart + shippingPrice + paymentPrice
    ).to.equal(SummaryFinalPrice);

    const confirmButton = App.checkout.summary.confirmButton;
    confirmButton.waitForEnabled(5000);
    confirmButton.click();

    expect(App.orderSuccess.isOrderSuccess()).to.be.true;
    expect(App.orderSuccess.TotalPrice).is.equal(SummaryFinalPrice);
    expect(
      App.orderSuccess.ProductNames[0].getAttribute("data-name")
    ).to.be.equal(productNameInCart);
  });

  it("is successful for 2 different items in card", function() {
    App.product.open(regularDuck);
    App.product.addToCart();

    App.product.open(discountedDuck);
    expect(App.product.saleBadgePresent()).to.be.true;
    App.product.addToCart();
    //open checkout:
    App.checkout.open();
    expect(App.checkout.isItemsInCart()).to.be.true;
    expect(App.checkout.shoppingCart.items.length).to.equal(2);

    //get data for first duck:
    const regularProductNameInCart = App.checkout.shoppingCart.items[0].getProductName();
    const regularProductPriceInCart = App.checkout.shoppingCart.items[0].getProductPrice();
    //get data for second duck:
    const discountedProductNameInCart = App.checkout.shoppingCart.items[1].getProductName();
    const discountedProductPriceInCart = App.checkout.shoppingCart.items[1].getProductPrice();

    App.customerInfo.fillCustomerInfo(true);

    const shippingPrice = App.checkout.shipping.price;
    const paymentPrice = App.checkout.payment.price;
    const summarySubtotal = App.checkout.summary.subtotal;
    const SummaryPayment = App.checkout.summary.payment;
    const SummaryFinalPrice = App.checkout.summary.paymentDue;

    expect(regularProductPriceInCart + discountedProductPriceInCart).to.equal(
      summarySubtotal
    );
    expect(shippingPrice + paymentPrice).to.equal(SummaryPayment);
    expect(
      regularProductPriceInCart +
        discountedProductPriceInCart +
        shippingPrice +
        paymentPrice
    ).to.equal(SummaryFinalPrice);

    const confirmButton = App.checkout.summary.confirmButton;
    confirmButton.waitForEnabled(5000);
    confirmButton.click();

    expect(App.orderSuccess.isOrderSuccess()).to.be.true;
    expect(App.orderSuccess.TotalPrice).is.equal(SummaryFinalPrice);
    expect(
      App.orderSuccess.ProductNames[0].getAttribute("data-name")
    ).to.be.equal(regularProductNameInCart);
    expect(
      App.orderSuccess.ProductNames[1].getAttribute("data-name")
    ).to.be.equal(discountedProductNameInCart);
  });

  it("is successful for items with parameters", function() {
    // this duck has 3 sizes - small, medium, large. Each size has own price. Verify that price calculated correctly

    App.product.open(vipDuck);
    const additionalPrice = App.product.getProductSizes();
    const productDetail = App.product.getProductDetails();

    App.product.addToCart(1);
    App.product.addToCart(2);
    App.product.addToCart(3);

    //open checkout:
    App.checkout.open();
    expect(App.checkout.isItemsInCart()).to.be.true;
    expect(App.checkout.shoppingCart.items.length).to.equal(3);

    //get prices of all ducks:
    const smallDuckPrice = App.checkout.shoppingCart.items[0].getProductPrice();
    const mediumDuckPrice = App.checkout.shoppingCart.items[1].getProductPrice();
    const largeDuckPrice = App.checkout.shoppingCart.items[2].getProductPrice();

    expect(productDetail.price + additionalPrice[0]).to.be.equal(
      smallDuckPrice
    );
    expect(productDetail.price + additionalPrice[1]).to.be.equal(
      mediumDuckPrice
    );
    expect(productDetail.price + additionalPrice[2]).to.be.equal(
      largeDuckPrice
    );

    App.customerInfo.fillCustomerInfo(true);

    const shippingPrice = App.checkout.shipping.price;
    const paymentPrice = App.checkout.payment.price;
    const summarySubtotal = App.checkout.summary.subtotal;
    const SummaryPayment = App.checkout.summary.payment;
    const SummaryFinalPrice = App.checkout.summary.paymentDue;

    expect(smallDuckPrice + mediumDuckPrice + largeDuckPrice).to.equal(
      summarySubtotal
    );
    expect(shippingPrice + paymentPrice).to.equal(SummaryPayment);
    expect(
      smallDuckPrice +
        mediumDuckPrice +
        largeDuckPrice +
        shippingPrice +
        paymentPrice
    ).to.equal(SummaryFinalPrice);

    const confirmButton = App.checkout.summary.confirmButton;
    confirmButton.waitForEnabled(5000);
    confirmButton.click();

    expect(App.orderSuccess.isOrderSuccess()).to.be.true;
    expect(App.orderSuccess.TotalPrice).is.equal(SummaryFinalPrice);

    App.orderSuccess.ProductNames.forEach(element => {
      expect(element.getAttribute("data-name")).to.be.equal(productDetail.name);
    });
  });
});
