import { Component, Input, OnInit } from '@angular/core';
import { ShoppingCartService } from 'src/app/product-card/shopping-cart.service';

@Component({
  selector: 'product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.css']
})
export class ProductQuantityComponent  {
  // tslint:disable-next-line:no-input-rename
  @Input('product') product;
  // tslint:disable-next-line:no-input-rename
  @Input('shopping-cart') shoppingCart;

  constructor(private cartService: ShoppingCartService) {}
 
  addToCart(){
    this.cartService.addToCart(this.product);
  }

  removeFromCart(){
    this.cartService.removeFromCart(this.product);
  }

  getQuantity(){
    if (!this.shoppingCart) { return 0; }
    let item = this.shoppingCart.items[this.product.key];
    return item ? item.quantity : 0;
  }

}
