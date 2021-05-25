 
 import { Component, OnDestroy, AfterViewInit, OnInit, ViewChild  } from '@angular/core';
 import { Subscription } from 'rxjs';
 import { map } from 'rxjs/operators';
 import { ProductService } from 'src/app/product.service';
 import { MatPaginator } from '@angular/material/paginator';
 import { MatTableDataSource } from '@angular/material/table';
 import { MatSort } from '@angular/material/sort';
 @Component({
   selector: 'app-admin-products',
   templateUrl: './admin-products.component.html',
   styleUrls: ['./admin-products.component.css']
 })
 export class AdminProductsComponent implements OnDestroy{
  displayedColumns: string[] = ['title', 'price', 'edit'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
   products: any[] = [];
   dataSource: MatTableDataSource<object>;
   filteredProducts: any[] = [];
   subscription: Subscription;
   constructor(private productService: ProductService) {
     this.subscription = this.productService.getAll()
     .snapshotChanges().pipe(
       map(changes =>
         changes.map(c => ({
           key: c.payload.key,
           val: c.payload.val()}))
       )
     ).subscribe(products => {
      this.filteredProducts = this.products = products;
      this.dataSource = new MatTableDataSource(products);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
     });
   }
   applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    console.log(this.dataSource.filter);

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
 
   ngOnDestroy(){
     this.subscription.unsubscribe();
   }
   
 }
