import { LocalStorageService } from './../../services/local-storage/loacal-storage.service';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, signal} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import {ProductListLazy} from '../../services/product/interfaces/productListLazy.interface';
import {ProductService} from '../../services/product/product.service';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {Product} from '../../services/product/interfaces/product.interface';
import {MatButtonModule} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {Router} from '@angular/router';

@Component({
    selector: 'lists',
    standalone: true,
    imports: [
        CommonModule,
        MatCardModule,
        MatExpansionModule,
        MatProgressSpinnerModule,
        MatButtonModule,
        MatIcon,
    ],
    templateUrl: './lists.component.html',
    styleUrl: './lists.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListsComponent implements OnInit {
    constructor(
        private localStorageService: LocalStorageService,
        private productService: ProductService,
        private cdr: ChangeDetectorRef,
        private router: Router,
    ) {}

    step = signal(0);
    productLists: ProductListLazy[] = [];
    loading = false;
    products: Product[] = [];
    userName: string = '';

    setStep(index: number) {
        this.step.set(index);
    }

    nextStep() {
        this.step.update(i => i + 1);
    }

    prevStep() {
        this.step.update(i => i - 1);
    }

    ngOnInit() {
        this.userName = this.localStorageService.getString(LocalStorageService.USERNAME) || '';
        this.getProductLists();
    }

    getProductLists() {
        this.productService.getProductListsForUser(this.userName).subscribe({
            next: response => {
                this.productLists = response;
                this.cdr.markForCheck();
            },
            error: error => {
                console.error('Failed to get product lists', error);
            }
        });
    }

    getProducts(listId: string) {
        const loadingDelay = 300; // Delay in milliseconds (e.g., 300ms)
        let loadingTimeout: any;
        this.products = [];
        this.loading = false; // Initially, do not show the loading indicator
        this.cdr.markForCheck();
    
        // Set a timeout to show the loading indicator after the delay
        loadingTimeout = setTimeout(() => {
            this.loading = true;
            this.cdr.markForCheck();
        }, loadingDelay);
    
        this.productService.getProductsForList(listId).subscribe({
            next: response => {
                this.products = response;
            },
            error: error => {
                console.error('Failed to get products for list', error);
            }
        }).add(() => {
            // Clear the timeout if the request completes before the delay
            clearTimeout(loadingTimeout);
            this.loading = false;
            this.cdr.markForCheck();
        });
    }

    protected onEditList(listId: string) {
        this.router.navigate([`create/${listId}`]);
    }

    protected onDeleteList(listId: string) {
        this.productService.deleteList(listId).subscribe({
            error: error => {
                console.error('Failed to delete list', error);
            }
        }).add(() => {
            this.getProductLists();
        });
    }


}
