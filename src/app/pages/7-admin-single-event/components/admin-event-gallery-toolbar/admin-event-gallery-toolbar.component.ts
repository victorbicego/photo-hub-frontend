import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ItensPerRowHolderService } from '../../../../services/holders/itens-per-row-holder/itens-per-row-holder.service';
import { FormsModule } from '@angular/forms';
import { PhotoDto } from '../../../../interfaces/photo-dto';

@Component({
  selector: 'app-admin-event-gallery-toolbar',
  imports: [FormsModule],
  templateUrl: './admin-event-gallery-toolbar.component.html',
  styleUrl: './admin-event-gallery-toolbar.component.scss',
})
export class AdminEventGalleryToolbarComponent {
  @Input() selectedPhotos: PhotoDto[] = [];

  @Output() toggleUploadModal = new EventEmitter<void>();
  @Output() toggleDownloadModal = new EventEmitter<void>();
  @Output() toggleDeleteModal = new EventEmitter<void>();
  @Output() toggleBlockModal = new EventEmitter<void>();

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

  public onBlock(): void {
    this.toggleBlockModal.emit();
  }
}
