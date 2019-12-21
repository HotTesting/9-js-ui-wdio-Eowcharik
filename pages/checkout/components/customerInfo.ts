import faker = require("faker");
import { DuckUtils } from "../../duckUtils";

export class customerInfo {
	public fill() {
		const email = faker.internet.email();
		const customerCheckout = $("div[id=box-checkout-customer]");
		customerCheckout
			.$('input[name="firstname"]')
			.setValue(faker.name.firstName());
		customerCheckout
			.$('input[name="lastname"]')
			.setValue(faker.name.lastName());
		customerCheckout
			.$('select[name="country_code"]')
			.selectByVisibleText("Ukraine");
		customerCheckout.$('input[name="email"]').waitForDisplayed();
		customerCheckout.$('input[name="email"]').setValue(email);
		customerCheckout
			.$('input[name="phone"]')
			.setValue(faker.phone.phoneNumber("+380#########"));
		customerCheckout
			.$('input[name="address1"]')
			.setValue(faker.address.streetAddress());
		customerCheckout.$('input[name="city"]').setValue(faker.address.city());
		customerCheckout
			.$('input[name="postcode"]')
			.setValue(faker.address.zipCode("#####"));
		customerCheckout.$('input[name="create_account"]').click();
		customerCheckout.$('input[name="password"]').waitForDisplayed();
		customerCheckout.$('input[name="confirmed_password"]').waitForDisplayed();

		customerCheckout.$('input[name="password"]').setValue(email);
		customerCheckout.$('input[name="confirmed_password"]').setValue(email);

		customerCheckout.$('button[name="save_customer_details"]').click();
	}
}
