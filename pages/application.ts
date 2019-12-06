import { ProductDetails } from './productDetails';
import { Checkout } from './checkout';
import { CustomerInfo } from './customerInfo';

export class Application {
    product = ProductDetails
    checkout = Checkout
    customerInfo = CustomerInfo

}

export const App: Application = new Application()