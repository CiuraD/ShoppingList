import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatDialogModule, MatDialog} from '@angular/material/dialog';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatSnackBarModule, MatSnackBar} from '@angular/material/snack-bar';
import {LocalStorageService} from '../../services/local-storage/loacal-storage.service';
import {InvitationCode} from '../../services/userGroup/interfaces/invitationCode.interface';
import { userGroup } from './../../services/userGroup/interfaces/userGrup.interface';
import { UserGroupService } from './../../services/userGroup/user-group.service';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import {CreateGroupComponent} from '../partials/create-group/create-group.component';
import {CodeViewComponent} from '../partials/code-view/code-view.component';

@Component({
    selector: 'groups',
    standalone: true,
    imports: [
        CommonModule,
        MatCardModule,
        MatIconModule,
        MatListModule,
        MatButtonModule,
        MatDialogModule,
        MatSnackBarModule,
        CreateGroupComponent,
        CodeViewComponent,
    ],
    templateUrl: './groups.component.html',
    styleUrl: './groups.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GroupsComponent implements OnInit {
    constructor(
        private userGroupService: UserGroupService,
        private cdr: ChangeDetectorRef,
        private snackBar: MatSnackBar,
        private dialog: MatDialog,
        private localStorageService: LocalStorageService,
    ) {}

    protected userGroups: userGroup[] = [];
    protected invitationCodes: InvitationCode[] = [];
    protected userName: string = '';

    ngOnInit() {
        this.userName = this.localStorageService.getString(LocalStorageService.USERNAME) || '';
        this.userGroupService.getUserGroupsForUser(this.userName).subscribe(
            (data) => {
                this.userGroups = data;
            },
            (error) => {
                this.snackBar.open('Error while getting user groups', 'Close', {duration: 3000});
            }
        ).add(() => {
            this.cdr.markForCheck();
        });

        if (this.userGroups.length > 0) {

            this.userGroupService.getInvitationCodesForUser(this.userName).subscribe(
                (data) => {
                    console.log('Invitation codes: ', data);
                    this.invitationCodes = data;
                },
                (error) => {
                    this.snackBar.open('Error while getting invitation codes', 'Close', {duration: 3000});
                }
            ).add(() => {
                this.cdr.markForCheck();
            });
        }

    }

    onShowCode(groupId: string): void {

        console.log('User groups: ', this.userGroups);
        console.log('Invitation codes: ', this.invitationCodes);


        let code = this.invitationCodes.find((code) => code.userGroupId === groupId);
        

        if (code === undefined) {
            console.log('Creating code');
            this.userGroupService.createInvitationCode(this.userName, groupId).subscribe(
                (data) => {
                    console.log('Code created: ', data);
                    code = data;
                    this.invitationCodes.push(code);
                },
                (error) => {
                    this.snackBar.open('Error while creating invitation code', 'Close', {duration: 3000});
                }
            ).add(() => {
                this.cdr.markForCheck();
                if (code) {
                    this.showCodeDialog(code);
                }
            });
        } else {
            this.showCodeDialog(code);
        }

        //TODO Implement dialog with code
        
    }

    showCodeDialog(code: InvitationCode): void {
        console.log('Showing code: ', code);
        const dialogRef = this.dialog.open(
            CodeViewComponent,
            {
                data: code,
                panelClass: 'custom-dialog',
            }
        );

        dialogRef.afterClosed().subscribe(
            (error) => {
                this.snackBar.open('Error while showing code', 'Close', {duration: 3000});
            }
        ).add(() => {
            this.cdr.markForCheck();
        });
    }

    onCreateGroup(): void {
        const dialogRef = this.dialog.open(
            CreateGroupComponent,
            {
                data: {item: null},
                panelClass: 'custom-dialog',
            }
        );
        //TODO Implement dialog for creating group

        dialogRef.afterClosed().subscribe(
            (data) => {
                if (data.status === 'create') {
                    this.createGroup(data.groupName.name);
                } else {
                    this.snackBar.open('Group creation cancelled', 'Close', {duration: 3000});
                }
            },
            (error) => {
                this.snackBar.open('Error while creating group', 'Close', {duration: 3000});
            }
        ).add(() => {
            this.cdr.markForCheck();
        });
    }

    onDeleteGroup(index: number): void {
        const groupId = this.userGroups[index].id;
        this.userGroupService.deleteGroup(groupId);
        this.userGroups.splice(index, 1);
        this.cdr.markForCheck();
    }

    onLeaveGroup(index: number): void {
        const groupId = this.userGroups[index].id;
        console.log('Leaving group: ', groupId);
        //TODO Implement leaving group


        // this.userGroupService.leaveGroup(this.userName, groupId).subscribe(
        //     (data) => {
        //         this.userGroups.splice(index, 1);
        //     },
        //     (error) => {
        //         this.snackBar.open('Error while leaving group', 'Close', {duration: 3000});
        //     }
        // ).add(() => {
        //     this.cdr.markForCheck();
        // });
    }

    isCreator(creatorName: string): boolean {
        return creatorName === this.userName;
    }

    createGroup(groupName: string): void {
        this.userGroupService.createGroup(this.userName, groupName).subscribe(
            (data) => {
                this.userGroups.push(data);
            },
            (error) => {
                this.snackBar.open('Error while creating group', 'Close', {duration: 3000});
            }
        ).add(() => {
            this.cdr.markForCheck();
        });
    }
}
