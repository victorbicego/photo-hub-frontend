import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PhotoPreviewComponent } from '../../../../common-components/photo-preview/photo-preview.component';
import { MatchedFacesGalleryToolbarComponent } from '../matched-faces-gallery-toolbar/matched-faces-gallery-toolbar.component';
import { CommonModule } from '@angular/common';
import { PhotoDto } from '../../../../interfaces/photo-dto';
import { ImageDimension } from '../../../../interfaces/image-dimension';
import { ItensPerRowHolderService } from '../../../../services/holders/itens-per-row-holder/itens-per-row-holder.service';
import { PhotoRecognitionDto } from '../../../../interfaces/photo-recognition-dto';
import { PhotoUrlPipe } from '../../../../services/pipes/photo-url-pipe/photo-url.pipe';

@Component({
  selector: 'app-matched-faces-photo-gallery',
  imports: [
    CommonModule,
    PhotoPreviewComponent,
    MatchedFacesGalleryToolbarComponent,
    PhotoUrlPipe,
  ],
  templateUrl: './matched-faces-photo-gallery.component.html',
  styleUrl: './matched-faces-photo-gallery.component.scss',
})
export class MatchedFacesPhotoGalleryComponent {
  @Input() matchedPhotos: PhotoRecognitionDto[] = [];
  @Input() selectedPhotos: PhotoDto[] = [];

  @Output() toggleUploadModal = new EventEmitter<void>();
  @Output() toggleDownloadModal = new EventEmitter<void>();
  @Output() emitSelectedPhotos = new EventEmitter<PhotoDto[]>();

  private imageDimensions: { [index: number]: ImageDimension } = {};
  private clickTimeout: any = null;
  public showPhotoPreview: boolean = false;
  public showBoundingBox: boolean = false;
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
    return gapMap[this.itensPerRowHolderService.photosPerRow] || '20px';
  }

  constructor(public itensPerRowHolderService: ItensPerRowHolderService) {}

  public ngOnInit(): void {
    if (window.innerWidth < 768) {
      this.itensPerRowHolderService.photosPerRow = 1;
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
    this.toggleUploadModal.emit();
  }

  public onDownload(): void {
    this.toggleDownloadModal.emit();
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

  public onPhotoClick(photo: any, index: number): void {
    if (this.clickTimeout) {
      clearTimeout(this.clickTimeout);
    }
    this.clickTimeout = setTimeout(() => {
      this.togglePhotoSelection(photo);
      this.clickTimeout = null;
    }, 150);
  }

  public onPhotoDblClick(index: number): void {
    if (this.clickTimeout) {
      clearTimeout(this.clickTimeout);
      this.clickTimeout = null;
    }
    this.togglePreview(index);
  }

  public toggleBoundingBox(): void {
    this.showBoundingBox = !this.showBoundingBox;
  }

  public getBoundingBoxStyle(photo: PhotoRecognitionDto, index: number): any {
    const dims = this.imageDimensions[index];
    if (!dims) {
      return {
        top: `${photo.faceBoundingBox.top * 100}%`,
        left: `${photo.faceBoundingBox.left * 100}%`,
        width: `${photo.faceBoundingBox.width * 100}%`,
        height: `${photo.faceBoundingBox.height * 100}%`,
        position: 'absolute',
        border: '2px solid red',
        pointerEvents: 'none',
      };
    }
    const {
      clientWidth,
      clientHeight,
      naturalWidth,
      naturalHeight,
      offsetX,
      offsetY,
    } = dims;
    const scale = Math.max(
      clientWidth / naturalWidth,
      clientHeight / naturalHeight
    );

    const adjustedTop =
      (photo.faceBoundingBox.top * naturalHeight * scale + offsetY) /
      clientHeight;
    const adjustedLeft =
      (photo.faceBoundingBox.left * naturalWidth * scale + offsetX) /
      clientWidth;
    const adjustedWidth =
      (photo.faceBoundingBox.width * naturalWidth * scale) / clientWidth;
    const adjustedHeight =
      (photo.faceBoundingBox.height * naturalHeight * scale) / clientHeight;

    return {
      top: `${(adjustedTop * 100).toFixed(2)}%`,
      left: `${(adjustedLeft * 100).toFixed(2)}%`,
      width: `${(adjustedWidth * 100).toFixed(2)}%`,
      height: `${(adjustedHeight * 100).toFixed(2)}%`,
      position: 'absolute',
      border: '2px solid red',
      pointerEvents: 'none',
    };
  }
}
