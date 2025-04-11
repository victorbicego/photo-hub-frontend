import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ItemsPerRowHolderService } from '../../../../services/holders/items-per-row-holder/items-per-row-holder.service';
import { FormsModule } from '@angular/forms';
import { PhotoDto } from '../../../../interfaces/photo-dto';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-event-gallery-toolbar',
  imports: [FormsModule, CommonModule],
  templateUrl: './admin-event-gallery-toolbar.component.html',
  styleUrl: './admin-event-gallery-toolbar.component.scss',
})
export class AdminEventGalleryToolbarComponent {
  @Input() photos: PhotoDto[] = [];
  @Input() selectedPhotos: PhotoDto[] = [];

  @Output() openUploadModal = new EventEmitter<void>();
  @Output() openDownloadModal = new EventEmitter<void>();
  @Output() openDeleteModal = new EventEmitter<void>();
  @Output() openBlockModal = new EventEmitter<void>();

  constructor(public itemsPerRowHolderService: ItemsPerRowHolderService) {}

  public increasePhotosPerRow(): void {
    if (this.itemsPerRowHolderService.photosPerRow < 16) {
      this.itemsPerRowHolderService.photosPerRow++;
    }
  }

  public decreasePhotosPerRow(): void {
    if (this.itemsPerRowHolderService.photosPerRow > 1) {
      this.itemsPerRowHolderService.photosPerRow--;
    }
  }

  public onUploadPhoto(): void {
    this.openUploadModal.emit();
  }

  public onDownload(): void {
    this.openDownloadModal.emit();
  }

  public onDelete(): void {
    this.openDeleteModal.emit();
  }

  public onBlock(): void {
    this.openBlockModal.emit();
  }
}
