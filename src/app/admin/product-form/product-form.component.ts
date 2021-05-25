import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, take } from 'rxjs/operators';
import { CategoryService } from 'src/app/category.service';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/product.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  categories$;
  id;
  product: any = {};
    constructor(
    private router: Router,
    private categoryService: CategoryService,
    private productService: ProductService,
    private route: ActivatedRoute ) {
    this.categories$ = categoryService.getCategories();
    this.id = this.route.snapshot.paramMap.get('id');

    if (this.id) {this.productService.get(this.id)
      .valueChanges().pipe(take(1))
      .subscribe(p => { this.product = p;
                        console.log(this.product);
      }
      );
    }
  }
  save(product){
    if (this.id) { this.productService.update(this.id, product); }
    else { this.productService.create(product); }
    this.router.navigate(['/admin/products']);
  }
  delete(){
    if (!confirm('Are you sure you want to delete this product?')) { return; }
    this.productService.delete(this.id);
    this.router.navigate(['/admin/products']);
  }

  ngOnInit(): void {
  }

}
