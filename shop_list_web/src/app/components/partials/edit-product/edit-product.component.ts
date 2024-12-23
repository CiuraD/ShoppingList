import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { QuantityType } from '../../../services/product/quantity-type.enum';
import {MatCardModule} from '@angular/material/card';
import {FormBuilder, FormGroup, FormsModule, Validators, ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Product} from '../../../services/product/interfaces/product.interface';
import {MatSelectModule} from '@angular/material/select';

@Component({
    selector: 'edit-product',
    standalone: true,
    imports: [
        CommonModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        FormsModule,
        MatSelectModule,
        ReactiveFormsModule,
    ],
    templateUrl: './edit-product.component.html',
    styleUrl: './edit-product.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditProductComponent implements OnInit {
    constructor(
        private readonly formBuilder: FormBuilder,
        public dialogRef: MatDialogRef<EditProductComponent, Product | null>,
        @Inject(MAT_DIALOG_DATA) public data: any,
    ) {}

    protected productForm!: FormGroup;

    protected readonly QuantityType = QuantityType;

    private productId: string | null = null;

    ngOnInit() {
        this.createForm();

        if (this.data.item) {
            this.productId = this.data.item.id;
            this.productForm.patchValue(this.data.item);
        }
    }

    private createForm() {
        this.productForm = this.formBuilder.group({
            name: ['', Validators.required],
            quantity: ['', Validators.required],
            quantityType: ['', Validators.required],
            //TODO add img
        });
    }

    protected onSubmit() {
        if (this.productForm.valid) {

            let response = this.productForm.value

            if (this.productId) {
                response.id = this.productId;
            }

            response.imageId = 'placeholderFromEditProductComponent';
            this.dialogRef.close(response);
        }
    }
}
