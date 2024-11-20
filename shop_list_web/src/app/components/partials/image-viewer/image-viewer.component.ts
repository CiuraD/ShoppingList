import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import {ImageService} from '../../../services/image/image.service';
import {ImageBigPreviewComponent} from '../image-big-preview/image-big-preview.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'image-viewer',
  standalone: true,
  imports: [],
  templateUrl: './image-viewer.component.html',
  styleUrl: './image-viewer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImageViewerComponent  implements OnInit {
  @ViewChild('fileInput') fileInputRef: ElementRef<HTMLInputElement> | undefined;

  @Input() productId: string | null = null;

  imagePreview: String | null = null;

  constructor(
    private imageService: ImageService,
    private dialog: MatDialog,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    if (this.productId) {
      this.imageService.getImageFromBackend(this.productId).subscribe(
        (base64Image) => {
          this.imagePreview = base64Image;
          this.cdr.markForCheck();
        },
        (error) => {
          console.error('Error loading image:', error);
        }
      );
    }
  }
  
  openFileSelector(): void {
    this.fileInputRef?.nativeElement.click();
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input?.files?.[0]) {
      const file = input.files[0];
      this.imageService.convertImageToBase64(file).then(
        (base64Image) => {
          if (this.productId) {
            this.imagePreview = base64Image;
            this.imageService.uploadImageToBackend(this.productId, base64Image).subscribe(
              () => {
                console.log('Image uploaded successfully.');
              },
              (error) => {
                console.error('Error uploading image:', error);
              }
            );
            this.cdr.markForCheck();
          }
        },
        (error) => {
          console.error('Error processing image:', error);
        }
      );
    }
  }
  
  deleteImage(): void {
    this.imagePreview = null;
    this.imageService.deleteImageFromBackend(this.productId);
  }

  openLargeView(): void {
    if (this.imagePreview) {
      const modal = document.createElement('div');
      modal.classList.add('image-modal');
      modal.innerHTML = `<div class="modal-backdrop"></div><img src="${this.imagePreview}" alt="Large View" class="modal-image" />`;

      // Close modal when clicking on the backdrop
      modal.querySelector('.modal-backdrop')?.addEventListener('click', () => {
        modal.remove();
      });

      document.body.appendChild(modal);

      const dialogRef = this.dialog.open(
          ImageBigPreviewComponent,
          {
              panelClass: 'custom-dialog',
              data: this.imagePreview,
          }
      );
    }
  }
}
