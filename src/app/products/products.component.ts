import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent  {
  products: any[] = [];
  filteredProducts: any[] = [];
  category: string;
  constructor(
    route: ActivatedRoute,
    productService: ProductService
    ){
    productService
    .getAll()
    .snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({
          key: c.payload.key,
          val: c.payload.val()}))
      )
      ).pipe(switchMap(products => {
        this.products = products;
        return route.queryParamMap;
      }))
        .subscribe(params => {
          this.category = params.get('category');
          this.filteredProducts = (this.category) ?
            this.products.filter(p => p.val.category === this.category) :
            this.products;
      });
  }


}
