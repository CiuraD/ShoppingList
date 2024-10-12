import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import {userGroup} from '../../../services/userGroup/interfaces/userGrup.interface';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatSelectModule} from '@angular/material/select';
import {EditProductComponent} from '../edit-product/edit-product.component';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';

@Component({
    selector: 'share-list',
    standalone: true,
    imports: [
        CommonModule,
        MatSelectModule,
        MatCardModule,
        MatButtonModule,
    ],
    templateUrl: './share-list.component.html',
    styleUrl: './share-list.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShareListComponent {
    constructor(
        public dialogRef: MatDialogRef<EditProductComponent, userGroup | null>,
        @Inject(MAT_DIALOG_DATA) public data: any,
    ) {}

    userGroupArray: userGroup[] = [];
    selectedGroup: userGroup | undefined = undefined;
    isInGroup = false;

    ngOnInit() {
        this.userGroupArray = this.data.userGroups;
        console.log(this.userGroupArray.length);
        if (this.userGroupArray.length > 0) {
            this.selectedGroup = this.userGroupArray[0];
            this.isInGroup = true;
            console.log(this.selectedGroup);
        }
    }

    onChange(event: any) {
        console.log(event);
        this.selectedGroup = this.userGroupArray.find((group) => group.id === event.value);
    }

    onShareListWithGroup() {
        this.dialogRef.close(this.selectedGroup);
    }

    onCancel() {
        this.dialogRef.close(null);
    }
}
