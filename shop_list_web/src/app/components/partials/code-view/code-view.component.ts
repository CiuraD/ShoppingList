import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'code-view',
    standalone: true,
    imports: [
        CommonModule,
    ],
    templateUrl: './code-view.component.html',
    styleUrl: './code-view.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CodeViewComponent {}
