
import faker = require("faker");
import { Browser, BrowserObject } from "@wdio/sync";

export class duckUtils  {
     performSearch(searchRequest) {
        let searchBlock = $('[data-type="search"]');
        if(searchRequest && searchBlock.isDisplayed()){
          searchBlock.setValue(searchRequest);
          searchBlock.addValue('Enter');
        }else{
          throw new Error("Search Request is empty");
        }
      }
      
       getRelativeUrl(browser : BrowserObject) {
            return browser.getUrl().substr(browser.options.baseUrl.length);
        }
}

export const DuckUtils = new duckUtils()