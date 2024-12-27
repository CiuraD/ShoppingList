import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnChanges, SimpleChanges, ViewContainerRef } from '@angular/core';
import {FormsModule, Validators} from '@angular/forms';
import {FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {ProductService} from '../../services/product/product.service';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';
import {ProductListFull} from '../../services/product/interfaces/productListFull.interface';
import {LocalStorageService} from '../../services/local-storage/loacal-storage.service';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {Product} from '../../services/product/interfaces/product.interface';
import {filter, switchMap, iif, catchError, of} from 'rxjs';
import {EditProductComponent} from '../partials/edit-product/edit-product.component';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {ProductListLazy} from '../../services/product/interfaces/productListLazy.interface';
import {Router} from '@angular/router';

@Component({
    selector: 'edit-list',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatCardModule,
        MatFormFieldModule,
        MatSnackBarModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        MatDialogModule,
    ],
    templateUrl: './edit-list.component.html',
    styleUrl: './edit-list.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditListComponent implements OnChanges {
    constructor(
        private readonly productService: ProductService,
        private readonly formBuilder: FormBuilder,
        private readonly snackBar: MatSnackBar,
        private readonly localStorageService: LocalStorageService,
        private readonly dialog: MatDialog,
        private readonly viewContainerRef: ViewContainerRef,
        private cdr: ChangeDetectorRef,
        private router: Router,
    ) {}

    protected listId: string | null | undefined;
    protected listForm!: FormGroup;

    protected productList: ProductListLazy | undefined;
    protected products: Product[] = [];

    @Input()
    set id(listId: string | null) {
        this.listId = listId;
    }

    ngOnChanges(changes: SimpleChanges) {
        this.createForm();

        if (changes['id']?.currentValue) {
            this.listId = changes['id'].currentValue;
            this.getData();
        } else {
            this.listId = null;
        }
    }

    private createForm(): void {
        this.listForm = this.formBuilder.group({
            id: [null],
            name: ['', [Validators.required, Validators.maxLength(255)]],
            products: [[], Validators.required],
        });
    }

    private getData(): void {
        if (this.listId !== null) {
            this.productService.getProductListLazy(this.listId!).subscribe({
                next: (response) => {
                    this.productList = response;
                    this.listForm.patchValue({
                        id: this.productList?.id,
                        name: this.productList?.name,
                    });
                },
                error: (error) => {
                    console.error('Failed to get product list', error);
                }
            }).add(() => {
                this.cdr.markForCheck();
            });

            this.productService.getProductsForList(this.listId!).subscribe({
                next: (response) => {
                    this.products = response;
                    this.listForm.patchValue({ products: this.products });
                },
                error: (error) => {
                    console.error('Failed to get products for list', error);
                }
            }).add(() => {
                this.cdr.markForCheck();
            });
        }

    }

    protected onSubmit(): void {
        if (this.listForm.invalid) {
            this.snackBar.open('Form is invalid - please fill in all required fields', '', {duration: 2000});
            return;
        }

        const listFormData = this.listForm.value;
        if (this.listId && listFormData.id) {
            this.productService.updateList(listFormData).subscribe(
                (response) => {
                    this.snackBar.open('List updated', '', {duration: 2000});
                },
                (error) => {
                    if (error.status !== 200) {
                        this.snackBar.open('Error updating list', '', {duration: 2000});
                    }
                }
            ).add(() => {
                this.router.navigate(['/home']);
            });
        } else {
            const list: ProductListFull = {
                ...listFormData,
                userName: this.localStorageService.getString(LocalStorageService.USERNAME),
            };
            this.productService.createList(list).subscribe(
                (response) => {
                    this.snackBar.open('List saved', '', {duration: 2000});
                },
                (error) => {
                    this.snackBar.open('Error saving list', '', {duration: 2000});
                }
            ).add(() => {
                this.router.navigate(['/home']);
            });
        }
    }

    protected onEditProduct(index: number | null) {
        const dialogRef = this.dialog.open(EditProductComponent, {
            data: {
                item: index !== null ? (this.listForm.value.products?.[index]) : null,
            },
            panelClass: 'custom-dialog',
        });

        dialogRef.afterClosed().pipe(
            catchError(error => {
                console.error('Error closing dialog', error);
                return of(null);
            })
        ).subscribe(result => {
            if (result) {
                const products = this.listForm.value.products || [];
                if (index !== null) {
                    products[index] = result;
                } else {
                    products.push(result);
                }
                this.listForm.patchValue({ products });
                this.snackBar.open('Product updated', '', { duration: 2000 });
            }
        }).add(() => {
            this.cdr.markForCheck();
        });
    }

    protected onDeleteProduct(index: number) {
        if (this.listForm.value.products[index].id) {
            this.productService.deleteProduct(this.listForm.value.products[index].id).subscribe(
                (response) => {
                    this.snackBar.open('Product deleted', '', {duration: 2000});
                },
                (error) => {
                    this.snackBar.open('Error deleting product', '', {duration: 2000});
                }
            );
        } 
        this.listForm.value.products.splice(index, 1);
        this.cdr.markForCheck();
    }

    protected onClearForm(): void {
        this.router.navigate(['/create/:id']);
    }
}
