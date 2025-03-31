import { Component } from '@angular/core';
import { AdminHeaderComponent } from '../../common-components/admin-header/admin-header.component';
import { PhotoDto } from '../../interfaces/photo-dto';
import { finalize } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { HostEventService } from '../../services/host-event/host-event.service';
import { LoadingHolderService } from '../../services/holders/loading-holder/loading-holder.service';
import { HttpResponse } from '@angular/common/http';
import { LoadingComponent } from '../../common-components/loading/loading.component';
import { UploadPhotoModalComponent } from '../../common-components/upload-photo-modal/upload-photo-modal.component';
import { DownloadPhotosModalComponent } from '../../common-components/download-photos-modal/download-photos-modal.component';
import { CommonModule } from '@angular/common';
import { DeletePhotosModalComponent } from './components/delete-photos-modal/delete-photos-modal.component';

@Component({
  selector: 'app-admin-single-event',
  imports: [
    CommonModule,
    AdminHeaderComponent,
    LoadingComponent,
    UploadPhotoModalComponent,
    DownloadPhotosModalComponent,
    DeletePhotosModalComponent,
  ],
  templateUrl: './admin-single-event.component.html',
  styleUrl: './admin-single-event.component.scss',
})
export class AdminSingleEventComponent {
  public photos: PhotoDto[] = [];
  public selectedPhotos: PhotoDto[] = [];
  private eventId: number | null = null;

  public showUploadModal: boolean = false;
  public showDeleteModal: boolean = false;
  public showDownloadModal: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private hostEventService: HostEventService,
    public loadingHolderService: LoadingHolderService,
    private router: Router
  ) {}

  public ngOnInit(): void {
    const activeId = this.activatedRoute.snapshot.paramMap.get('eventId');
    if (activeId) {
      this.eventId = parseInt(activeId);
    }
    this.getPhotosFromHost();
  }

  private getPhotosFromHost(): void {
    if (this.eventId) {
      this.loadingHolderService.isLoading = true;
      this.hostEventService
        .getEventPhotos(this.eventId)
        .pipe(
          finalize(() => {
            this.loadingHolderService.isLoading = false;
            this.selectedPhotos = [];
          })
        )
        .subscribe({
          next: (response) => {
            this.photos = response.data;
          },
          error: (error) => {
            console.error('Error fetching photos', error);
            this.router.navigate(['/home']);
          },
        });
    }
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

  public toggleDeleteModal(): void {
    this.showDeleteModal = true;
  }

  public closeDeleteModal(): void {
    this.showDeleteModal = false;
  }

  public updateSelectedPhotosList(selectedPhotos: PhotoDto[]): void {
    this.selectedPhotos = selectedPhotos;
  }

  public uploadPhoto(file: File): void {
    if (this.eventId) {
      this.loadingHolderService.isLoading = true;
      this.hostEventService
        .uploadPhoto(this.eventId, file)
        .pipe(
          finalize(() => {
            this.loadingHolderService.isLoading = false;
            this.selectedPhotos = [];
          })
        )
        .subscribe({
          next: () => {
            this.getPhotosFromHost();
          },
          error: (error) => {
            console.error('Error uploading photo', error);
          },
        });
    }
  }

  public downloadPhotos(downloadPhotosList: PhotoDto[]): void {
    if (this.eventId) {
      this.loadingHolderService.isLoading = true;
      const photoIds = downloadPhotosList.map((photo) => photo.id);
      this.hostEventService
        .downloadSelectedPhotos(this.eventId, {
          idList: photoIds,
        })
        .pipe(
          finalize(() => {
            this.loadingHolderService.isLoading = false;
            this.selectedPhotos = [];
          })
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

  public deletePhotos(deletePhotosList: PhotoDto[]): void {
    if (this.eventId) {
      this.loadingHolderService.isLoading = true;
      const photoIds = deletePhotosList.map((photo) => photo.id);
      this.hostEventService
        .deleteSelectedPhotos(this.eventId, {
          idList: photoIds,
        })
        .pipe(
          finalize(() => {
            this.loadingHolderService.isLoading = false;
            this.selectedPhotos = [];
          })
        )
        .subscribe({
          next: () => {
            this.getPhotosFromHost();
          },
          error: (error) => {
            console.error('Error deleting photos', error);
          },
        });
    }
  }
}
