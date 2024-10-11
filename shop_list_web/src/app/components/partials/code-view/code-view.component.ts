import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import {InvitationCode} from '../../../services/userGroup/interfaces/invitationCode.interface';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';

@Component({
    selector: 'code-view',
    standalone: true,
    imports: [
        CommonModule,
        MatCardModule,
        MatButtonModule,
        MatIconModule,
        MatSnackBarModule,
    ],
    templateUrl: './code-view.component.html',
    styleUrl: './code-view.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CodeViewComponent implements OnInit {
    constructor(
        public dialogRef: MatDialogRef<CodeViewComponent, InvitationCode>,
        private cdr: ChangeDetectorRef,
        private readonly snackBar: MatSnackBar,
        @Inject(MAT_DIALOG_DATA) public data: any,
    ) {}

    protected code: InvitationCode = {
        id: '',
        code: '',
        userGroupId: '',
        creatorUserId: '',
    };

    ngOnInit() {
        console.log(this.data);
        this.code = this.data;
        this.cdr.markForCheck();
    }

    onCopy(code: string) {
        navigator.clipboard.writeText(code);
        this.snackBar.open('Copied to clipboard', 'Close', {});
    }
}
