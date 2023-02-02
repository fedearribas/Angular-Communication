import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProductService } from '../product.service';

@Component({
  templateUrl: './product-shell.component.html'
})
export class ProductShellComponent implements OnInit, OnDestroy {
  pageTitle: string = 'Products';
  monthCount: number;
  sub: Subscription;

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.sub = this.productService.selectedProductChanges$.subscribe({
      next: selectedProduct => {
        this.monthCount = 0;
        if (selectedProduct) {
          const startDate = new Date(selectedProduct.releaseDate);
          const now = new Date();
          const months = now.getMonth() - startDate.getMonth() + (12 * (now.getFullYear() - startDate.getFullYear()));
          this.monthCount = months;
        }
      }
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}
