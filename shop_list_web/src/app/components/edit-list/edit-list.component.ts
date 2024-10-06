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
    ) {}

    protected listId: number | undefined | null;
    protected listForm!: FormGroup;

    @Input()
    set id(listId: number | undefined | null) {
        this.listId = listId;
    }

    ngOnChanges(changes: SimpleChanges) {
        this.createForm();
        if (changes['id']?.currentValue) {
            this.listId = changes['id'].currentValue;
            // this.getData();
        } else {
            this.listId = null;
        }
    }

    private createForm(): void {
        this.listForm = this.formBuilder.group({
            id: [null],
            name: ['', [Validators.required, Validators.maxLength(255)]],
            products: [[]],
        });
    }

    protected onSubmit(): void {
        if (this.listForm.invalid) {
            this.snackBar.open('Form is invalid - please fill in all required fields', '', {duration: 2000});
            return;
        }

        const listFormData = this.listForm.value;
        if (this.listId && listFormData.id !== null) {
            console.log('update');
            console.log(listFormData);
        } else {
            const list: ProductListFull = {
                ...listFormData,
                userName: this.localStorageService.getString(LocalStorageService.USERNAME),
            };
            this.productService.saveList(list).subscribe(
                (response) => {
                    this.snackBar.open('List saved', '', {duration: 2000});
                },
                (error) => {
                    this.snackBar.open('Error saving list', '', {duration: 2000});
                }
            );
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
}
