import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { CategoryService } from 'src/app/category.service';
import { ProductService } from 'src/app/product.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  categories$;
  id;
  constructor(
    private router: Router,
    private categoryService: CategoryService,
    private productService: ProductService,
    private route: ActivatedRoute ) {
    this.categories$ = categoryService.getCategories();
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id){ this.productService.get(this.id).pipe(take(1))
      .subscribe(p =>
      this.product = p
      );
    }
  }
  save(product){
    if (this.id) { this.productService.update(this.id, product); }
    else { this.productService.create(product); }
    this.router.navigate(['/admin/products']);
  }

  ngOnInit(): void {
  }

}
