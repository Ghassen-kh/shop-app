export class Order {
    datePlaced: number;
    items: any[];
    totalPrice: number;
    totalQuantity: number;
    constructor(public userId: string, public shipping: any, shoppingCart: any){
        this.datePlaced = new Date().getTime();
        this.items =  shoppingCart.items,
        this.totalQuantity = shoppingCart.totalQuantity;
        this.totalPrice = shoppingCart.totalPrice;
    }
}