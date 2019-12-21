import { App } from "../../pages/application";
import * as chai from "chai";
import { registration } from "../../pages/registration";

const expect = chai.expect;

describe("User", function() {
	it("can register", function() {
		App.product.open("/create_account");
		registration.fillCustomerInfo();
		$("#notices").waitForDisplayed();
		expect($("#notices").getText()).includes(
			"Your customer account has been created."
		);
	});
});
