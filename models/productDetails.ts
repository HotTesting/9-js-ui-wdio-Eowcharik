
export class ProductDetailsModel {
    name: string;
    price: number;
    priceWithoutDiscount:number;
    
    toString() {
        return JSON.stringify(this, null, 2)
    }
}