const faker = require('faker');
const assert = require("assert");

//ToDo: move away from here
function performSearch(searchRequest) {
  let searchBlock = $('[data-type="search"]');
  if(searchRequest){
    searchBlock.setValue(searchRequest);
    searchBlock.addValue('Enter');
  }else{
    throw new Error("Search Request is empty");
  }
}
//ToDo: move away from here
function getRelativeUrl() {
      return browser.getUrl().substr(browser.options.baseUrl.length);
  }
  

describe("Website", function() {
  it("should be alive", function() {
    browser.url("/");
    const img = $(
      'img[src="http://ip-5236.sunline.net.ua:38015/images/logotype.png"]'
    );
    assert(img.isExisting(), "Website should be opened, and logo displayed");
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
    performSearch("Duck");
    //get search results:
    let searchBlock = $('#box-search-results .products.row.half-gutter');
    
    let blueDuck = searchBlock.$('a[title="Blue Duck"]');
    let yellowDuck = searchBlock.$('a[title="VIP Yellow Duck"]');
    let redDuck = searchBlock.$('a[title="Red Duck"]');
    let purpleDuck = searchBlock.$('a[title="Purple Duck"]');
    
//check that all results are present and displayed:
    assert(blueDuck.isDisplayed(), "Blue Duck should be displayed");
    assert(yellowDuck.isDisplayed(), "Yellow Duck should be displayed");
    assert(redDuck.isDisplayed(), "Red Duck should be displayed");
    assert(purpleDuck.isDisplayed(), "Purple Duck should be displayed");
  });


  it("should redirect to item page in case only one result matches", function() {
    performSearch("Yellow");
    //check that URL is correct:
    assert.equal(getRelativeUrl(),"/rubber-ducks-c-1/premium-ducks-c-2/vip-yellow-duck-p-6", 'URL should match');
    
    //check that product block is displayed:
    const productBlock = $('#content [data-name="VIP Yellow Duck"]');
    assert(productBlock.isDisplayed(), "Product block should be displayed");
  });

  it("should redirect to 'no matching results' in case no items matched", function() {
    performSearch("blabla");
    const noResults= $('div > em').getText();
    assert.equal(noResults,'No matching results', 'Text should match')
  });
});

// Each implemented test gives you 20 points (max total - 40)
describe("Search results sorting", function() {
  it("correctly arranges items when using 'by price' sorting", function() {
    performSearch("Duck");
    //sort by Price: 
      $('#box-search-results a[href*="sort=price"]').waitForDisplayed();
      $('#box-search-results a[href*="sort=price"]').click();


    const allDucks = $$("#box-search-results .product");
    const arrayDucksPrices = allDucks.map(duck => parseInt(duck.getAttribute("data-price")));
    const sortByPrice = arrayDucksPrices.map(duck => duck);
    sortByPrice.sort((a, b) => a - b);

    for (let i = 0; i < arrayDucksPrices.length; i++) {
      assert.equal(arrayDucksPrices[i],sortByPrice[i],'sorting results does not match');
    }

  });


  

  it("correctly arranges items when using 'by name' sorting", function() {
    performSearch("Duck");
    //sort by Name: 
    $('#box-search-results a[href*="sort=name"]').waitForDisplayed();
    $('#box-search-results a[href*="sort=name"]').click();

    const allDucks = $$("#box-search-results .product");
    const arrayDuck = allDucks.map(duck => duck.getAttribute("data-name"));
    const sortByName = arrayDuck.sort();

    for (let i = 0; i < arrayDuck.length; i++) {
      assert.equal(arrayDuck[i],sortByName[i],'sorting results does not match');
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
    $('#notices').waitForDisplayed(undefined,undefined,'Alert about success should be displayed');
    assert($('#notices').getText().includes('Your email has successfully been sent'));
  });
});