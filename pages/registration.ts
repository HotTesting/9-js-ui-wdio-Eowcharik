import faker = require("faker");

export class Registration {
	public fillCustomerInfo() {
		const email = faker.internet.email();
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
		customerRegistration.$('input[name="confirmed_password"]').setValue(email);
		customerRegistration.$('button[value="Create Account"]').click();
	}
}
export const registration = new Registration();
