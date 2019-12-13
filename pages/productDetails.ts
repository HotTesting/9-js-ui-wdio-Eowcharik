import { BasePage } from "./base";
import { ProductDetailsModel } from "../models/productDetails";

export class ProductDetailsPage extends BasePage {
	public getProductPrice(): number {
		return parseFloat($("#box-product").getAttribute("data-price"));
	}

	public getPriceWithoutDiscount(): number {
		return parseFloat($(".price-wrapper .regular-price").getText());
	}

	public getProductName(): string {
		return $("h1.title").getText();
	}

	getProductDetails(): ProductDetailsModel {
		const productDetails = new ProductDetailsModel();

		productDetails.name = this.getProductName();
		productDetails.price = this.getProductPrice();
		productDetails.priceWithoutDiscount = this.getPriceWithoutDiscount();
		return productDetails;
	}

	public getProductSizes(): number[] {
		const values = $$(".form-control [data-price-adjust]");
		return values.map(item => {
			return parseFloat(item.getAttribute("data-price-adjust"));
		});
	}

	saleBadgePresent() {
		return $('#box-product div[class="sticker sale"]').isDisplayed();
	}

	addToCart(size?: number) {
		const currentItemsInCart = this.header.getQuantity();
		if (size) {
			$('select[class="form-control"]').selectByIndex(size);
		}
		$('button[name="add_cart_product"]').click();

		browser.waitUntil(
			() => {
				return this.header.getQuantity() > currentItemsInCart;
			},
			null,
			`Expected items in cart to be changed. 
  Current items: ${this.header.getQuantity()} items before ${currentItemsInCart}`
		);
	}
}

export const ProductDetails = new ProductDetailsPage();
