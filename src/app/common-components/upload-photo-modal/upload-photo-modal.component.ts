import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { catchError, concatMap, delay, from, Observable, of, tap } from 'rxjs';
import { EventDto } from '../../interfaces/event-dto';
import { HostEventService } from '../../services/host-event/host-event.service';

@Component({
  selector: 'app-upload-photo-modal',
  imports: [CommonModule],
  templateUrl: './upload-photo-modal.component.html',
  styleUrl: './upload-photo-modal.component.scss',
})
export class UploadPhotoModalComponent {
  @Input() eventDto: EventDto | null = null;

  @Output() emitClose = new EventEmitter<void>();
  @Output() emitGetPhotos = new EventEmitter<void>();

  public selectedFiles: File[] = [];
  public isUploading: boolean = false;
  public uploadProgress: number = 0;
  public failedFiles: string[] = [];

  constructor(private hostEventService: HostEventService) {}

  public onFileSelected(event: any): void {
    const files: FileList = event.target.files;
    if (files.length) {
      this.selectedFiles = this.selectedFiles.concat(Array.from(files));
    }
  }

  //public onUpload(): void {
  //  if (this.selectedFiles.length === 0) {
  //    return;
  //  }
  //  this.isUploading = true;
  //  this.uploadProgress = 0;
  //  this.failedFiles = [];
  //  const totalFiles = this.selectedFiles.length;
  //  let completedUploads = 0;
  //
  //  this.selectedFiles.forEach((file) => {
  //    this.uploadPhoto(file).subscribe({
  //      next: () => {},
  //      error: (err) => {
  //        console.error('Upload failed for file:', file.name, err);
  //        this.failedFiles.push(file.name);
  //      },
  //      complete: () => {
  //        completedUploads++;
  //        this.uploadProgress = completedUploads;
  //        if (completedUploads === totalFiles) {
  //          this.isUploading = false;
  //          if (this.failedFiles.length > 0) {
  //            this.showErrorModal(this.failedFiles);
  //          } else {
  //            this.emitGetPhotos.emit();
  //            this.emitClose.emit();
  //          }
  //        }
  //      },
  //    });
  //  });
  //}

  public onUpload(): void {
    if (this.selectedFiles.length === 0) {
      return;
    }
    this.isUploading = true;
    this.uploadProgress = 0;
    this.failedFiles = [];
    const totalFiles = this.selectedFiles.length;

    // Process each file sequentially with a 1 minute delay after each upload.
    from(this.selectedFiles)
      .pipe(
        concatMap((file) =>
          this.uploadPhoto(file).pipe(
            catchError((err) => {
              console.error('Upload failed for file:', file.name, err);
              this.failedFiles.push(file.name);
              return of(null);
            }),
            tap(() => {
              this.uploadProgress++;
            }),
            delay(80000) // 60,000 ms delay = 1 minute
          )
        )
      )
      .subscribe({
        complete: () => {
          this.isUploading = false;
          if (this.failedFiles.length > 0) {
            this.showErrorModal(this.failedFiles);
          } else {
            this.emitGetPhotos.emit();
            this.emitClose.emit();
          }
        },
      });
  }

  public onClearFiles(): void {
    this.selectedFiles = [];
  }

  private uploadPhoto(file: File): Observable<any> {
    if (this.eventDto) {
      return this.hostEventService.uploadPhoto(this.eventDto.id, file);
    }
    return of(null);
  }

  // Error modal displays the names of files that failed to upload.
  private showErrorModal(failedFiles: string[]): void {
    alert(
      'Os seguintes arquivos falharam ao enviar: ' + failedFiles.join(', ')
    );
  }

  public onClose(): void {
    if (!this.isUploading) {
      this.emitClose.emit();
    }
  }

  public onRemoveFile(index: number): void {
    if (!this.isUploading) {
      this.selectedFiles.splice(index, 1);
    }
  }
}
