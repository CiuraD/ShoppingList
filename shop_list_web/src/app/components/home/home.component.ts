import { LocalStorageService } from './../../services/local-storage/loacal-storage.service';
import { UserService } from './../../services/user/user.service';
import {CommonModule} from '@angular/common';
import { ProductService } from './../../services/product/product.service';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {ProductListFull} from '../../services/product/interfaces/productListFull.interface';
import {Router} from '@angular/router';
import {ImageViewerComponent} from '../partials/image-viewer/image-viewer.component';
import {Product} from '../../services/product/interfaces/product.interface';

@Component({
  selector: 'home',
  standalone: true,
  imports: [
    MatCardModule,
    CommonModule,
    MatButtonModule,
    MatIconModule,
    ImageViewerComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  constructor(
    private productService: ProductService,
    private localStorageService: LocalStorageService,
    private router: Router,
    private cdr: ChangeDetectorRef,
    
  ) {
  }

  latestProductList: ProductListFull | null = null;
  products: Product[] = [];

  ngOnInit() {
    this.getLatestProductList();
  }

  getLatestProductList(): void {
    const username = this.localStorageService.getString(LocalStorageService.USERNAME);

    if (!username) {
      return;
    }
    this.productService.getLatestProductListForUser(username).subscribe((productList) => {
      this.latestProductList = productList;
      if (productList !== null) {
        this.productService.getProductsForList(productList.id).subscribe((products) => {
          this.products = products;
          this.cdr.markForCheck();
        });
      }
    });
  }

  navigateToListEdit(listId: string | null): void {
    if (listId) {
      this.router.navigate(['/create', listId]);
    } else {
      this.router.navigate(['/create', ':id']);
    }
  }
}
