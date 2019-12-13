import faker = require("faker");
import { DuckUtils } from "../duckUtils";

export class customerInfo {
	fillCustomerInfo(createAccount: boolean = true) {
		const email = faker.internet.email();
		if (DuckUtils.getRelativeUrl(browser) === "/create_account") {
			const customerRegistration = $('form[name="customer_form"]');
			customerRegistration
				.$('input[name="firstname"]')
				.setValue(faker.name.firstName());
			customerRegistration
				.$('input[name="lastname"]')
				.setValue(faker.name.lastName());
			customerRegistration
				.$('select[name="country_code"]')
				.selectByVisibleText("Ukraine");
			customerRegistration.$('input[name="email"]').waitForDisplayed();
			customerRegistration.$('input[name="email"]').setValue(email);
			customerRegistration
				.$('input[name="phone"]')
				.setValue(faker.phone.phoneNumber("+380#########"));
			customerRegistration.$('input[name="password"]').setValue(email);
			customerRegistration
				.$('input[name="confirmed_password"]')
				.setValue(email);
			if (createAccount) {
				customerRegistration.$('button[value="Create Account"]').click();
			}
		} else if (DuckUtils.getRelativeUrl(browser) === "/checkout") {
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

			if (createAccount) {
				customerCheckout.$('input[name="create_account"]').click();
				customerCheckout.$('input[name="password"]').waitForDisplayed();
				customerCheckout
					.$('input[name="confirmed_password"]')
					.waitForDisplayed();

				customerCheckout.$('input[name="password"]').setValue(email);
				customerCheckout.$('input[name="confirmed_password"]').setValue(email);
			}

			customerCheckout.$('button[name="save_customer_details"]').click();
		} else {
			throw new Error(
				`should be called only on a registration or checkout pages! `
			);
		}
	}
}

export const CustomerInfo = new customerInfo();
