import { ShoppingCartItem } from "./shopping-cart-item";

export interface ShoppingCart{
    items: { [key: string]: ShoppingCartItem};
}