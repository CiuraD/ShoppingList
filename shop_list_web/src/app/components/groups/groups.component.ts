import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'groups',
    standalone: true,
    imports: [
        CommonModule,
    ],
    templateUrl: './groups.component.html',
    styleUrl: './groups.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GroupsComponent {}
