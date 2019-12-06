 import faker = require("faker");
//  import assert = require("assert");
 import * as chai from 'chai'
const assert = chai.assert;
const expect = chai.expect;

describe("User", function() {
    it.only("can register", function() {
        browser.url("/create_account");
        const email = faker.internet.email();

        const registationBox = $('form[name="customer_form"]');
        registationBox.$('input[name="firstname"]').setValue(faker.name.firstName());
        registationBox.$('input[name="lastname"]').setValue(faker.name.lastName());
        registationBox.$('select[name="country_code"]').selectByVisibleText('Ukraine');
        registationBox.$('input[name="email"]').waitForDisplayed();
        registationBox.$('input[name="email"]').setValue(email);
        registationBox.$('input[name="phone"]').setValue(faker.phone.phoneNumber('+380#########'));
        registationBox.$('input[name="password"]').setValue(email);
        registationBox.$('input[name="confirmed_password"]').setValue(email);
        registationBox.$('button[value="Create Account"]').click();

        $('#notices').waitForDisplayed();
        expect($('#notices').getText()).includes('Your customer account has been created.');
    }
    );
  });
  