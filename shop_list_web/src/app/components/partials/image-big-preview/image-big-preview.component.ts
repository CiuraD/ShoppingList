import {CommonModule} from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatDialogRef, MAT_DIALOG_DATA, MatDialogModule} from '@angular/material/dialog';

@Component({
  selector: 'image-big-preview',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatDialogModule,
  ],
  templateUrl: './image-big-preview.component.html',
  styleUrl: './image-big-preview.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImageBigPreviewComponent {
  constructor(
    public dialogRef: MatDialogRef<ImageBigPreviewComponent, null>,
    @Inject(MAT_DIALOG_DATA) public data: string,
) {}
  
 }
