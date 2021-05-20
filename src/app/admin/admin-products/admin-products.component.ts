import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { ProductService } from 'src/app/product.service';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent  {
  products$;
  constructor(private productService: ProductService) {
    this.products$ = this.productService.getAll()
    .snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({
          key: c.payload.key,
          val: c.payload.val()}))
      )
    );
  }
}
