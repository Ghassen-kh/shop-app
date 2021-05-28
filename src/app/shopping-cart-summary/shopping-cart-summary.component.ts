import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'shopping-cart-summary',
  templateUrl: './shopping-cart-summary.component.html',
  styleUrls: ['./shopping-cart-summary.component.css']
})
export class ShoppingCartSummaryComponent {
  // tslint:disable-next-line:no-input-rename
  @Input('cart') cart;
  // tslint:disable-next-line:no-input-rename
  @Input('productIds') productIds;

  constructor() { }

}
