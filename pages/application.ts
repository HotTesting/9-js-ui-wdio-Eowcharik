import { ProductDetails } from './productDetails';
import { Checkout } from './checkout';
import { CustomerInfo } from './customerInfo';
import { orderSuccess } from './orderSuccess'

export class Application {
    product = ProductDetails
    checkout = Checkout
    customerInfo = CustomerInfo
    orderSuccess = orderSuccess

}

export const App: Application = new Application()