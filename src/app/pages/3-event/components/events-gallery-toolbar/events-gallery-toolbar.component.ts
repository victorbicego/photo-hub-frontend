import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ItensPerRowHolderService } from '../../../../services/holders/itens-per-row-holder/itens-per-row-holder.service';

@Component({
  selector: 'app-events-gallery-toolbar',
  imports: [FormsModule, CommonModule],
  templateUrl: './events-gallery-toolbar.component.html',
  styleUrl: './events-gallery-toolbar.component.scss',
})
export class EventsGalleryToolbarComponent {
  @Output() toggleUploadModal = new EventEmitter<void>();
  @Output() toggleDownloadPhotos = new EventEmitter<void>();

  constructor(public itensPerRowHolderService: ItensPerRowHolderService) {}

  public increasePhotosPerRow(): void {
    if (this.itensPerRowHolderService.photosPerRow < 16) {
      this.itensPerRowHolderService.photosPerRow++;
    }
  }

  public decreasePhotosPerRow(): void {
    if (this.itensPerRowHolderService.photosPerRow > 1) {
      this.itensPerRowHolderService.photosPerRow--;
    }
  }

  public onUploadPhoto(): void {
    this.toggleUploadModal.emit();
  }

  public onDownload(): void {
    this.toggleDownloadPhotos.emit();
  }
}
