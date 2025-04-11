import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PhotoDto } from '../../../../interfaces/photo-dto';
import { ImageDimension } from '../../../../interfaces/image-dimension';
import { ItemsPerRowHolderService } from '../../../../services/holders/items-per-row-holder/items-per-row-holder.service';
import { EventGalleryToolbarComponent } from '../event-gallery-toolbar/event-gallery-toolbar.component';
import { PhotoPreviewComponent } from '../../../../common-components/photo-preview/photo-preview.component';
import { CommonModule } from '@angular/common';
import { PhotoUrlPipe } from '../../../../services/pipes/photo-url-pipe/photo-url.pipe';
import { EventDto } from '../../../../interfaces/event-dto';

@Component({
  selector: 'app-event-photo-gallery',
  imports: [
    CommonModule,
    EventGalleryToolbarComponent,
    PhotoPreviewComponent,
    PhotoUrlPipe,
  ],
  templateUrl: './event-photo-gallery.component.html',
  styleUrl: './event-photo-gallery.component.scss',
})
export class EventPhotoGalleryComponent implements OnInit {
  @Input() event: EventDto | null = null;
  @Input() photos: PhotoDto[] = [];
  @Input() selectedPhotos: PhotoDto[] = [];

  @Output() openUploadModal = new EventEmitter<void>();
  @Output() openDownloadModal = new EventEmitter<void>();
  @Output() emitSelectedPhotos = new EventEmitter<PhotoDto[]>();

  private imageDimensions: { [index: number]: ImageDimension } = {};
  private clickTimeout: any = null;
  public showPhotoPreview: boolean = false;
  public currentPhotoIndex: number = 0;

  get galleryGap(): string {
    const gapMap: { [key: number]: string } = {
      1: '60px',
      2: '60px',
      3: '52px',
      4: '46px',
      5: '42px',
      6: '40px',
      7: '34px',
      8: '30px',
      9: '26px',
      10: '22px',
      11: '20px',
      12: '18px',
      13: '16px',
      14: '15px',
      15: '14px',
      16: '14px',
    };
    return gapMap[this.itemsPerRowHolderService.photosPerRow] || '20px';
  }

  constructor(public itemsPerRowHolderService: ItemsPerRowHolderService) {}

  public ngOnInit(): void {
    if (window.innerWidth < 768) {
      this.itemsPerRowHolderService.photosPerRow = 1;
    }
  }

  public onImageLoad(event: Event, index: number): void {
    const img = event.target as HTMLImageElement;
    const clientWidth = img.clientWidth;
    const clientHeight = img.clientHeight;
    const naturalWidth = img.naturalWidth;
    const naturalHeight = img.naturalHeight;

    const scale = Math.max(
      clientWidth / naturalWidth,
      clientHeight / naturalHeight
    );

    const displayedWidth = naturalWidth * scale;
    const displayedHeight = naturalHeight * scale;
    const offsetX = (clientWidth - displayedWidth) / 2;
    const offsetY = (clientHeight - displayedHeight) / 2;

    this.imageDimensions[index] = {
      clientWidth,
      clientHeight,
      naturalWidth,
      naturalHeight,
      offsetX,
      offsetY,
    };
  }

  public onUpload(): void {
    this.openUploadModal.emit();
  }

  public onDownload(): void {
    this.openDownloadModal.emit();
  }

  private togglePhotoSelection(photo: PhotoDto): void {
    const index = this.selectedPhotos.findIndex((p) => p.id === photo.id);
    if (index === -1) {
      this.selectedPhotos.push(photo);
    } else {
      this.selectedPhotos.splice(index, 1);
    }
    this.emitSelectedPhotos.emit(this.selectedPhotos);
  }

  public isPhotoSelected(photo: PhotoDto): boolean {
    return this.selectedPhotos.some((p) => p.id === photo.id);
  }

  private togglePreview(index: number): void {
    this.currentPhotoIndex = index;
    this.showPhotoPreview = true;
  }

  public closePreview(): void {
    this.showPhotoPreview = false;
  }

  public onPhotoClick(index: number): void {
    this.togglePreview(index);
  }

  public onPhotoSelection(photo: any): void {
    this.togglePhotoSelection(photo);
  }

  public trackByPhotoId(index: number, photo: PhotoDto): number {
    return photo.id;
  }
}
