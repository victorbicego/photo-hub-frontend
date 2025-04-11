import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ItemsPerRowHolderService } from '../../../../services/holders/items-per-row-holder/items-per-row-holder.service';
import { MatchedFaceHolderService } from '../../../../services/holders/matched-face-holder/matched-face-holder.service';
import { PhotoRecognitionDto } from '../../../../interfaces/photo-recognition-dto';
import { PhotoDto } from '../../../../interfaces/photo-dto';

@Component({
  selector: 'app-matched-faces-gallery-toolbar',
  imports: [FormsModule, CommonModule],
  templateUrl: './matched-faces-gallery-toolbar.component.html',
  styleUrl: './matched-faces-gallery-toolbar.component.scss',
})
export class MatchedFacesGalleryToolbarComponent implements OnInit, OnDestroy {
  @Input() matchedPhotos: PhotoRecognitionDto[] = [];
  @Input() selectedPhotos: PhotoDto[] = [];
  @Input() showBoundingBox: boolean = false;

  @Output() openUploadModal = new EventEmitter<void>();
  @Output() openDownloadPhotos = new EventEmitter<void>();
  @Output() toggleBoundingBox = new EventEmitter<void>();

  public selectedFileUrl: string | null = null;

  public ngOnInit(): void {
    if (this.matchedFaceHolderService.selectedFile) {
      this.selectedFileUrl = URL.createObjectURL(
        this.matchedFaceHolderService.selectedFile
      );
    }
  }

  public ngOnDestroy(): void {
    if (this.selectedFileUrl) {
      URL.revokeObjectURL(this.selectedFileUrl);
    }
  }

  constructor(
    public itemsPerRowHolderService: ItemsPerRowHolderService,
    public matchedFaceHolderService: MatchedFaceHolderService
  ) {}

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
    this.openDownloadPhotos.emit();
  }

  public onToggleBoundingBox(): void {
    this.toggleBoundingBox.emit();
  }
}
