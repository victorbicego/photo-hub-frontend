import { Component, EventEmitter, Output } from '@angular/core';
import { ItensPerRowHolderService } from '../../../../services/holders/itens-per-row-holder/itens-per-row-holder.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-event-gallery-toolbar',
  imports: [FormsModule],
  templateUrl: './admin-event-gallery-toolbar.component.html',
  styleUrl: './admin-event-gallery-toolbar.component.scss',
})
export class AdminEventGalleryToolbarComponent {
  @Output() toggleUploadModal = new EventEmitter<void>();
  @Output() toggleDownloadModal = new EventEmitter<void>();
  @Output() toggleDeleteModal = new EventEmitter<void>();

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
    this.toggleDownloadModal.emit();
  }

  public onDelete(): void {
    this.toggleDeleteModal.emit();
  }
}
