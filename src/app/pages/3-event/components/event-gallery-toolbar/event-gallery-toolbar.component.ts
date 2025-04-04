import {Component, EventEmitter, Input, Output} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ItemsPerRowHolderService } from '../../../../services/holders/items-per-row-holder/items-per-row-holder.service';
import {PhotoDto} from '../../../../interfaces/photo-dto';
import {EventDto} from '../../../../interfaces/event-dto';

@Component({
  selector: 'app-event-gallery-toolbar',
  imports: [FormsModule, CommonModule],
  templateUrl: './event-gallery-toolbar.component.html',
  styleUrl: './event-gallery-toolbar.component.scss',
})
export class EventGalleryToolbarComponent {
  @Input() event: EventDto | null = null;
  @Input() photos: PhotoDto[] = [];

  @Output() openUploadModal = new EventEmitter<void>();
  @Output() openDownloadModal = new EventEmitter<void>();

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

  public isUploadEnabled(startDate: string | Date): boolean {
    const eventDate = new Date(startDate);
    const now = new Date();
    const diff = eventDate.getTime() - now.getTime();
    return diff >= 0 && diff <= 30 * 60 * 1000;
  }
}
