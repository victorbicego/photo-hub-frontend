import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PhotoUrlPipe } from '../../services/pipes/photo-url-pipe/photo-url.pipe';
import { PhotoDto } from '../../interfaces/photo-dto';
import { CommonModule } from '@angular/common';
import { HostPhotoUrlPipe } from '../../services/pipes/host-photo-url-pipe/host-photo-url.pipe';

@Component({
  selector: 'app-photo-preview',
  imports: [PhotoUrlPipe, CommonModule, HostPhotoUrlPipe],
  templateUrl: './photo-preview.component.html',
  styleUrl: './photo-preview.component.scss',
})
export class PhotoPreviewComponent {
  @Input() isAdmin: boolean = false;
  @Input() photos: PhotoDto[] = [];
  @Input() currentPhotoIndex: number = 0;
  @Output() emitClose = new EventEmitter<void>();

  public onBackgroundClick(): void {
    this.emitClose.emit();
  }

  public onPrevPhoto(): void {
    if (this.currentPhotoIndex > 0) {
      this.currentPhotoIndex--;
    } else {
      this.currentPhotoIndex = this.photos.length - 1;
    }
  }

  public onNextPhoto(): void {
    if (this.currentPhotoIndex < this.photos.length - 1) {
      this.currentPhotoIndex++;
    } else {
      this.currentPhotoIndex = 0;
    }
  }
}
