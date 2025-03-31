import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhotoDto } from '../../interfaces/photo-dto';

@Component({
  selector: 'app-download-photos-modal',
  imports: [CommonModule],
  templateUrl: './download-photos-modal.component.html',
  styleUrl: './download-photos-modal.component.scss',
})
export class DownloadPhotosModalComponent {
  @Input() selectedPhotos: PhotoDto[] = [];

  @Output() emitClose = new EventEmitter<void>();
  @Output() emitDownloadPhotos = new EventEmitter<PhotoDto[]>();

  public onDownload(): void {
    this.emitDownloadPhotos.emit(this.selectedPhotos);
    this.emitClose.emit();
  }

  public onClose(): void {
    this.emitClose.emit();
  }
}
