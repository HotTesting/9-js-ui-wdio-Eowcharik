import { App } from "../../pages/application";
import * as chai from "chai";
const expect = chai.expect;


describe("User", function() {
  it("can register", function() {
    App.product.open("/create_account");
    App.customerInfo.fillCustomerInfo(true);
    $("#notices").waitForDisplayed();
    expect($("#notices").getText()).includes(
      "Your customer account has been created."
    );
  });
});
