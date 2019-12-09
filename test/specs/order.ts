import { expect } from "chai";
import { App } from "../../pages/application";
import { DuckUtils } from "../../pages/duckUtils";

const regularDuck = "rubber-ducks-c-1/red-duck-p-3";
const soldOutDuck = "rubber-ducks-c-1/purple-duck-p-5";
const discountedDuck = "rubber-ducks-c-1/blue-duck-p-4";

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





        
      });

  //     it("is successful for sold out item", function() {
  //         // this duck always sold out
  //         throw new Error("NOT IMPLEMENTED");
  //     });

  //     it("is successful for 2 same items in card", function() {
  //         // Just regular duck without discounts, parameters, or sold our
  //         throw new Error("NOT IMPLEMENTED");
  //     });

  //     it("is successful for 2 different items in card", function() {
  //         throw new Error("NOT IMPLEMENTED");
  //     });

  //     it("is successful for items with parameters", function() {
  //         // http://ip-5236.sunline.net.ua:38015/rubber-ducks-c-1/premium-ducks-c-2/vip-yellow-duck-p-6
  //         // this duck has 3 sizes - small, medium, large. Each size has own price. Verify that price calculated correctly
  //         throw new Error("NOT IMPLEMENTED");
  //     });
});
