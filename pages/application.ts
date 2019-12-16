import { ProductDetails } from "./productDetails";
import { Checkout } from "./checkout";
import { orderSuccess } from "./orderSuccess";

export class Application {
	product = ProductDetails;
	checkout = Checkout;
	orderSuccess = orderSuccess;
}

export const App: Application = new Application();
