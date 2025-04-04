import {Component, OnInit} from '@angular/core';
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
import { AdminEventPhotoGalleryComponent } from './components/admin-event-photo-gallery/admin-event-photo-gallery.component';
import {BlockUsersModalComponent} from './components/block-users-modal/block-users-modal.component';
import {FileDownloadService} from '../../services/file-download/file-download.service';

@Component({
  selector: 'app-admin-single-event',
  imports: [
    CommonModule,
    AdminHeaderComponent,
    LoadingComponent,
    UploadPhotoModalComponent,
    DownloadPhotosModalComponent,
    DeletePhotosModalComponent,
    AdminEventPhotoGalleryComponent,
    BlockUsersModalComponent
  ],
  templateUrl: './admin-single-event.component.html',
  styleUrl: './admin-single-event.component.scss',
})
export class AdminSingleEventComponent implements OnInit{
  public photos: PhotoDto[] = [];
  public selectedPhotos: PhotoDto[] = [];
  private eventId: number | null = null;

  public showUploadModal: boolean = false;
  public showDeleteModal: boolean = false;
  public showDownloadModal: boolean = false;
  public showBlockModal:boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private fileDownloadService:FileDownloadService,
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
        .getPhotos(this.eventId)
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

  public openUploadModal(): void {
    this.showUploadModal = true;
  }

  public closeUploadModal(): void {
    this.showUploadModal = false;
  }

  public openDownloadModal(): void {
    this.showDownloadModal = true;
  }

  public closeDownloadModal(): void {
    this.showDownloadModal = false;
  }

  public openDeleteModal(): void {
    this.showDeleteModal = true;
  }

  public closeDeleteModal(): void {
    this.showDeleteModal = false;
  }

  public openBlockModal():void{
    this.showBlockModal = true;
  }

  public closeBlockModal(): void {
    this.showBlockModal = false;
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
        .downloadPhotos(this.eventId, {
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
            this.fileDownloadService.downloadFile(response, 'photos.zip');
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
        .deletePhotos(this.eventId, {
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

  public blockUsers(photoDtos: PhotoDto[]): void {
    if (this.eventId) {
      this.loadingHolderService.isLoading = true;
      const photoIds = photoDtos.map((photo) => photo.id);
      this.hostEventService
        .blockUser(this.eventId, {
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
            console.error('Error blocking users', error);
          },
        });
    }
  }
}
