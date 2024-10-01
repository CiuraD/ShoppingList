
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import {Observable} from 'rxjs';
import {TestService} from '../../services/test/test.service';
import {Product} from '../../services/product/product.interface';
import {ProductService} from '../../services/product/product.service';

@Component({
    selector: 'test',
    standalone: true,
    imports: [
        CommonModule,
    ],
    templateUrl: './test.component.html',
    styleUrl: './test.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TestComponent {
    constructor(
        private cdr: ChangeDetectorRef,
        private apiService: TestService,
        private productService: ProductService,
      ) {}
    
      protected products: Product[] = [];

      title = 'shop_list_web';
      textFromApi = 'nie działa';
    
      ngOnInit(): void {
        this.hello().subscribe(data => {
          this.textFromApi = data.message;
          this.cdr.markForCheck();
        });

        this.productService.getProducts().subscribe(data => {
          this.products = data;
          this.cdr.markForCheck();
        });
      }
    
      hello(): Observable<any> {
        return this.apiService.hello();
      }
}
