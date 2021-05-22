import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProductService } from 'src/app/product.service';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnDestroy  {
  products: any[];
  filteredProducts: any[];
  subscription: Subscription;
  constructor(private productService: ProductService) {
    this.subscription = this.productService.getAll()
    .snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({
          key: c.payload.key,
          val: c.payload.val()}))
      )
    ).subscribe(products => this.filteredProducts = this.products = products);
  }
  filter(query: string){
    this.filteredProducts = (query) ?
      this.products.filter(p => p.val.title.toLowerCase().includes(query.toLowerCase())) :
      this.products;
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
