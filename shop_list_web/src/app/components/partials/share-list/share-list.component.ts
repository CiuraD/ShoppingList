import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'share-list',
    standalone: true,
    imports: [
        CommonModule,
    ],
    templateUrl: './share-list.component.html',
    styleUrl: './share-list.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShareListComponent {}
