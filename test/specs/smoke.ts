import { App } from "../../pages/application";
import * as chai from "chai";
import { DuckUtils } from "../../pages/duckUtils";
const faker = require("faker");

const assert = chai.assert;
const expect = chai.expect;

describe("Website", function() {
  it("should be alive", function() {
    browser.url("/");
    const img = $(
      'img[src="http://ip-5236.sunline.net.ua:38015/images/logotype.png"]'
    );
    expect(img.isExisting()).to.be.true;
  });
});

/**
 - Try to implement as much tests as you can
 - Do not overload tests with logic, be simple
 - browser.pause() allowed
 - copy/paste is allowed
 - prefer css selectors
 */

// Each implemented test gives you 15 points (max total - 45)
describe("Items search", function() {
  beforeEach(function() {
    browser.url("/");
  });

  it("should show results in case multiple items matches", function() {
    DuckUtils.performSearch("Duck");
    //get search results:
    let searchBlock = $("#box-search-results .products.row.half-gutter");
    let blueDuck = searchBlock.$('a[title="Blue Duck"]');
    let yellowDuck = searchBlock.$('a[title="VIP Yellow Duck"]');
    let redDuck = searchBlock.$('a[title="Red Duck"]');
    let purpleDuck = searchBlock.$('a[title="Purple Duck"]');

    //check that all results are present and displayed:
    expect(blueDuck.isDisplayed()).to.be.true;
    expect(yellowDuck.isDisplayed()).to.be.true;
    expect(redDuck.isDisplayed()).to.be.true;
    expect(purpleDuck.isDisplayed()).to.be.true;
  });

  it("should redirect to item page in case only one result matches", function() {
    DuckUtils.performSearch("Yellow");
    //check that URL is correct:
    assert.equal(
      DuckUtils.getRelativeUrl(browser),
      "/rubber-ducks-c-1/premium-ducks-c-2/vip-yellow-duck-p-6",
      "URL should match"
    );

    //check that product block is displayed:
    const productBlock = $('#content [data-name="VIP Yellow Duck"]');
    assert(productBlock.isDisplayed(), "Product block should be displayed");
  });

  it("should redirect to 'no matching results' in case no items matched", function() {
    DuckUtils.performSearch("blabla");
    const noResults = $("div > em").getText();
    assert.equal(noResults, "No matching results", "Text should match");
  });
});

// Each implemented test gives you 20 points (max total - 40)
describe("Search results sorting", function() {
  it("correctly arranges items when using 'by price' sorting", function() {
    DuckUtils.performSearch("Duck");
    //sort by Price:
    $('#box-search-results a[href*="sort=price"]').waitForDisplayed();
    $('#box-search-results a[href*="sort=price"]').click();

    const allDucks = $$("#box-search-results .product");
    const arrayDucksPrices = allDucks.map(duck =>
      parseInt(duck.getAttribute("data-price"))
    );
    const sortByPrice = arrayDucksPrices.map(duck => duck);
    sortByPrice.sort((a, b) => a - b);

    for (let i = 0; i < arrayDucksPrices.length; i++) {
      assert.equal(
        arrayDucksPrices[i],
        sortByPrice[i],
        "sorting results does not match"
      );
    }
  });

  it("correctly arranges items when using 'by name' sorting", function() {
    DuckUtils.performSearch("Duck");
    //sort by Name:
    $('#box-search-results a[href*="sort=name"]').waitForDisplayed();
    $('#box-search-results a[href*="sort=name"]').click();

    const allDucks = $$("#box-search-results .product");
    const arrayDuck = allDucks.map(duck => duck.getAttribute("data-name"));
    const sortByName = arrayDuck.sort();

    for (let i = 0; i < arrayDuck.length; i++) {
      assert.equal(
        arrayDuck[i],
        sortByName[i],
        "sorting results does not match"
      );
    }
  });
});

// BONUS LEVEL - this test gives you 15 points
describe("Contact us form", function() {
  beforeEach(function() {
    browser.url("/customer-service-s-0");
  });

  it("must send messages to shop administration", function() {
    const ContactBox = $('form[name="contact_form"]');
    ContactBox.$('input[name="name"]').setValue(faker.name.findName());
    ContactBox.$('input[name="email"]').setValue(faker.internet.email());
    ContactBox.$('input[name="subject"]').setValue(faker.lorem.words());
    ContactBox.$('textarea[name="message"]').setValue(faker.lorem.words(20));
    ContactBox.$('button[value="Send"]').click();
    $("#notices").waitForDisplayed(
      undefined,
      undefined,
      "Alert about success should be displayed"
    );
    assert(
      $("#notices")
        .getText()
        .includes("Your email has successfully been sent")
    );
  });
});
