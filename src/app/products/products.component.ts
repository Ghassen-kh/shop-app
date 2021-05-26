import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { ShoppingCartService } from '../product-card/shopping-cart.service';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {
  products: any[] = [];
  filteredProducts: any[] = [];
  category: string;
  cart: any;
  subscription: Subscription;
  constructor(
    route: ActivatedRoute,
    productService: ProductService,
    private shoppingCartService: ShoppingCartService
    ){
    productService
    .getAll()
    .snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({
          key: c.payload.key,
          val: c.payload.val()}))
      )
    )
    .pipe(switchMap(products => {
        this.products = products;
        return route.queryParamMap;
      }))
        .subscribe(params => {
          this.category = params.get('category');
          this.filteredProducts = (this.category) ?
            this.products.filter(p => p.category === this.category) :
            this.products;
      });
  }
  async ngOnInit(){
    this.subscription = (await  this.shoppingCartService.getCart())
    .valueChanges()
    .subscribe(cart => this.cart = cart);
  }
  ngOnDestroy(){
    this.subscription.unsubscribe();
  }


}
