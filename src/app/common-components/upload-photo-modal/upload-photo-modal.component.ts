import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-upload-photo-modal',
  imports: [CommonModule],
  templateUrl: './upload-photo-modal.component.html',
  styleUrl: './upload-photo-modal.component.scss',
})
export class UploadPhotoModalComponent {
  @Output() emitClose = new EventEmitter<void>();
  @Output() emitUploadPhoto = new EventEmitter<File>();

  public selectedFile: File | null = null;

  public onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  public onUpload(): void {
    if (this.selectedFile) {
      this.emitUploadPhoto.emit(this.selectedFile);
      this.emitClose.emit();
    }
  }

  public onClose(): void {
    this.emitClose.emit();
  }
}
