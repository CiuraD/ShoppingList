import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatDialogRef, MAT_DIALOG_DATA, MatDialogModule} from '@angular/material/dialog';
import {CreateGroupComponent} from '../create-group/create-group.component';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';

@Component({
    selector: 'group-join',
    standalone: true,
    imports: [
        CommonModule,
        MatCardModule,
        MatFormFieldModule,
        FormsModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        MatDialogModule,
        ReactiveFormsModule,
    ],
    templateUrl: './group-join.component.html',
    styleUrl: './group-join.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GroupJoinComponent {
    constructor(
        private readonly formBuilder: FormBuilder,
        public dialogRef: MatDialogRef<CreateGroupComponent, string | null>,
        @Inject(MAT_DIALOG_DATA) public data: any,
    ) {}

    protected joinForm!: FormGroup;

    ngOnInit() {
        this.createForm();
    }

    createForm() {
        this.joinForm = this.formBuilder.group({
            code: ['', Validators.required],
        });
    }

    onSubmit() {
        if (this.joinForm.invalid) {
            return;
        } else {
            
            this.dialogRef.close(this.joinForm.value.code);
        }
    }

    onCancel() {
        this.dialogRef.close(null);
    }
}
