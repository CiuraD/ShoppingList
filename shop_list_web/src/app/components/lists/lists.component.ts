import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'lists',
    standalone: true,
    imports: [
        CommonModule,
    ],
    templateUrl: './lists.component.html',
    styleUrl: './lists.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListsComponent {}
