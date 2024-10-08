import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, Input, OnInit, ViewContainerRef } from '@angular/core';
import {FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatDialogModule, MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';

@Component({
    selector: 'create-group',
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
    templateUrl: './create-group.component.html',
    styleUrl: './create-group.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateGroupComponent implements OnInit {
    constructor(
        private readonly formBuilder: FormBuilder,
        private cdr: ChangeDetectorRef,
        public dialogRef: MatDialogRef<CreateGroupComponent, {groupName: string, status: string}>,
        @Inject(MAT_DIALOG_DATA) public data: any,
    ) {}

    protected groupForm!: FormGroup;
    protected groupId: string | undefined;
    protected title: string = 'Create group';

    ngOnInit() {
        this.createForm();

        if (this.data.item) {
            this.groupId = this.data.item.id;
            this.title = 'Edit group';
            this.cdr.markForCheck();
        }
    }

    createForm() {
        this.groupForm = this.formBuilder.group({
            name: ['', Validators.required],
        });
    }

    onSubmit() {
        if (this.groupForm.invalid) {
            return;
        } else {
            let response;
            if (this.groupId !== undefined) {
                response = {
                    groupName: this.groupForm.value,
                    status: 'edit',
                };
            } else {
                response = {
                    groupName: this.groupForm.value,
                    status: 'create',
                };
            }
            this.dialogRef.close(response);
        }
    }

    onCancel() {
        this.dialogRef.close({groupName: '', status: 'cancel'});
    }
}
