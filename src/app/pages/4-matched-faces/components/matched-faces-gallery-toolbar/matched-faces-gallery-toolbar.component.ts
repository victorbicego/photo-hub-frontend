import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ItensPerRowHolderService } from '../../../../services/holders/itens-per-row-holder/itens-per-row-holder.service';
import { MatchedFaceHolderService } from '../../../../services/holders/matched-face-holder/matched-face-holder.service';

@Component({
  selector: 'app-matched-faces-gallery-toolbar',
  imports: [FormsModule, CommonModule],
  templateUrl: './matched-faces-gallery-toolbar.component.html',
  styleUrl: './matched-faces-gallery-toolbar.component.scss',
})
export class MatchedFacesGalleryToolbarComponent {
  @Input() showBoundingBox: boolean = false;

  @Output() toggleUploadModal = new EventEmitter<void>();
  @Output() toggleDownloadPhotos = new EventEmitter<void>();
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
    public itensPerRowHolderService: ItensPerRowHolderService,
    public matchedFaceHolderService: MatchedFaceHolderService
  ) {}

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

  public onToggleBoundingBox(): void {
    this.toggleBoundingBox.emit();
  }
}
