import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'create-group',
    standalone: true,
    imports: [
        CommonModule,
    ],
    templateUrl: './create-group.component.html',
    styleUrl: './create-group.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateGroupComponent {}
