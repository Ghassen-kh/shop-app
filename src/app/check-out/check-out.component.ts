import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth.service';
import { OrderService } from '../order.service';
import { ShoppingCartService } from '../product-card/shopping-cart.service';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit, OnDestroy{
  shipping: any = {};
  cart: any = {};
  userId: string;
  totalPrice: number;
  cartSubscription: Subscription;
  userSubscription: Subscription;

  constructor(
    private authService: AuthService,
    private shoppingCartService: ShoppingCartService,
    private orderService: OrderService
    ){

  }

  async ngOnInit(){
    let cart$ = await this.shoppingCartService.getCart();
    this.cartSubscription =  cart$.valueChanges().subscribe(cart => {
      this.cart.items = cart.items;
      this.totalPrice = 0;
      this.cart.totalQuantity = 0;
              // tslint:disable-next-line:forin
      for (let productId in cart.items){
                this.cart.totalQuantity += cart.items[productId].quantity ;
                this.cart.product = cart.items[productId].product;
                this.totalPrice += cart.items[productId].quantity * cart.items[productId].product.val.price;
              }
      this.cart.totalPrice = this.totalPrice;
    });
    this.authService.user$.subscribe(user => this.userId = user.uid);
  }

  ngOnDestroy(){
    this.cartSubscription.unsubscribe();
    this.userSubscription.unsubscribe();
  }

  placeOrder() {
    let order = {
      userId: this.userId,
      datePlaced: new Date().getTime(),
      shipping: this.shipping,
      items: this.cart.items,
      totalQuantity: this.cart.totalQuantity,
      totalPrice: this.cart.totalPrice
      };
    this.orderService.storeOrder(order);
  }

}