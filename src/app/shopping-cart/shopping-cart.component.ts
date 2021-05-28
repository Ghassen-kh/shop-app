import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from '../product-card/shopping-cart.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  cart = {};
  cart$;
  shoppingCartItemCount: number;
  productIds: any[] = [];
  totalPrice: number;

  constructor(private shoppingCartService: ShoppingCartService) { }

  async ngOnInit() {
    this.cart$ = await this.shoppingCartService.getCart();
    this.cart$.valueChanges().subscribe(cart => {
        this.cart = cart;
        this.shoppingCartItemCount = 0;
        this.totalPrice = 0;
        // tslint:disable-next-line:forin
        for (let productId in cart.items){
          this.shoppingCartItemCount += cart.items[productId].quantity;
          this.totalPrice += cart.items[productId].quantity * cart.items[productId].product.val.price;
        }
        this.productIds = Object.keys(cart.items);
  
      });

  }
  clearCart(){
    this.shoppingCartService.clearCart();
  }
}
