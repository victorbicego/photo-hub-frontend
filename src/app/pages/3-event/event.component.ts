import { Component } from '@angular/core';
import { HeaderComponent } from '../../common-components/header/header.component';
import { DownloadPhotosModalComponent } from '../../common-components/download-photos-modal/download-photos-modal.component';
import { PhotoDto } from '../../interfaces/photo-dto';
import { EventDto } from '../../interfaces/event-dto';
import { EventService } from '../../services/event/event.service';
import { LoadingHolderService } from '../../services/holders/loading-holder/loading-holder.service';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from '../../common-components/loading/loading.component';
import { UploadPhotoModalComponent } from '../../common-components/upload-photo-modal/upload-photo-modal.component';
import { EventPhotoGalleryComponent } from './components/event-photo-gallery/event-photo-gallery.component';

@Component({
  selector: 'app-event',
  imports: [
    CommonModule,
    HeaderComponent,
    DownloadPhotosModalComponent,
    DownloadPhotosModalComponent,
    LoadingComponent,
    UploadPhotoModalComponent,
    EventPhotoGalleryComponent,
  ],
  templateUrl: './event.component.html',
  styleUrl: './event.component.scss',
})
export class EventComponent {
  public photos: PhotoDto[] = [];
  public selectedPhotos: PhotoDto[] = [];
  public event: EventDto | null = null;

  public showUploadModal: boolean = false;
  public showDownloadModal: boolean = false;

  constructor(
    private eventService: EventService,
    public loadingHolderService: LoadingHolderService,
    private router: Router
  ) {}

  public ngOnInit(): void {
    this.getActiveEvent();
  }

  private getActiveEvent(): void {
    this.eventService
      .getActiveEvent()
      .pipe(finalize(() => (this.loadingHolderService.isLoading = false)))
      .subscribe({
        next: (response) => {
          this.event = response.data;
          this.loadPhotos();
        },
        error: (error) => {
          console.error('Error fetching event details', error);
          this.router.navigate(['']);
        },
      });
  }

  private loadPhotos(): void {
    this.eventService
      .getEventPhotos()
      .pipe(finalize(() => (this.loadingHolderService.isLoading = false)))
      .subscribe({
        next: (response) => {
          this.photos = response.data;
        },
        error: (err) => {
          console.error('Error fetching photos', err);
        },
      });
  }

  public toggleUploadModal(): void {
    this.showUploadModal = true;
  }

  public closeUploadModal(): void {
    this.showUploadModal = false;
  }

  public toggleDownloadModal(): void {
    this.showDownloadModal = true;
  }

  public closeDownloadModal(): void {
    this.showDownloadModal = false;
  }

  public updateSelectedPhotosList(selectedPhotos: PhotoDto[]): void {
    this.selectedPhotos = selectedPhotos;
  }

  public uploadPhoto(file: File): void {
    this.eventService
      .uploadPhoto(file)
      .pipe(
        finalize(
          () => (
            (this.loadingHolderService.isLoading = false),
            (this.selectedPhotos = [])
          )
        )
      )
      .subscribe({
        next: (response) => {
          this.loadPhotos();
        },
        error: (error) => {
          console.error('Error uploading photo', error);
        },
      });
  }

  public downloadPhotos(downloadPhotosList: PhotoDto[]): void {
    this.loadingHolderService.isLoading = true;
    var photoIds = downloadPhotosList.map((photo) => photo.id);
    if (photoIds.length == 0) {
      photoIds = [];
    }
    this.eventService
      .downloadSelectedPhotos({
        idList: photoIds,
      })
      .pipe(
        finalize(
          () => (
            (this.loadingHolderService.isLoading = false),
            (this.selectedPhotos = [])
          )
        )
      )
      .subscribe({
        next: (response: HttpResponse<Blob>) => {
          const contentDisposition = response.headers.get(
            'content-disposition'
          );
          let filename = 'photos.zip';
          if (contentDisposition) {
            const matches = contentDisposition.match(/filename="(.+)"/);
            if (matches && matches[1]) {
              filename = matches[1];
            }
          }
          const blob = new Blob([response.body!], {
            type: 'application/octet-stream',
          });
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = filename;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          window.URL.revokeObjectURL(url);
        },
        error: (error) => {
          console.error('Error downloading photos', error);
        },
      });
  }
}
