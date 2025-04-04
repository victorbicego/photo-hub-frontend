import {Component, OnInit} from '@angular/core';
import { HeaderComponent } from '../../common-components/header/header.component';
import { DownloadPhotosModalComponent } from '../../common-components/download-photos-modal/download-photos-modal.component';
import { PhotoDto } from '../../interfaces/photo-dto';
import { EventDto } from '../../interfaces/event-dto';
import { EventService } from '../../services/event/event.service';
import { LoadingHolderService } from '../../services/holders/loading-holder/loading-holder.service';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from '../../common-components/loading/loading.component';
import { UploadPhotoModalComponent } from '../../common-components/upload-photo-modal/upload-photo-modal.component';
import { EventPhotoGalleryComponent } from './components/event-photo-gallery/event-photo-gallery.component';
import {FileDownloadService} from '../../services/file-download/file-download.service';

@Component({
  selector: 'app-event',
  imports: [
    CommonModule,
    HeaderComponent,
    DownloadPhotosModalComponent,
    LoadingComponent,
    UploadPhotoModalComponent,
    EventPhotoGalleryComponent,
  ],
  templateUrl: './event.component.html',
  styleUrl: './event.component.scss',
})
export class EventComponent implements OnInit{
  public photos: PhotoDto[] = [];
  public selectedPhotos: PhotoDto[] = [];
  public event: EventDto | null = null;

  public showUploadModal: boolean = false;
  public showDownloadModal: boolean = false;

  constructor(
    private eventService: EventService,
    private fileDownloadService:FileDownloadService,
    public loadingHolderService: LoadingHolderService,
    private router: Router
  ) {}

  public ngOnInit(): void {
    this.getActiveEvent();
  }

  private getActiveEvent(): void {
    this.loadingHolderService.isLoading = true;
    this.eventService.getActiveEvent().subscribe({
      next: (response) => {
        this.event = response.data;
        this.loadPhotos();
      },
      error: (error) => {
        console.error('Error fetching event details', error);
        this.router.navigate(['']);
        this.loadingHolderService.isLoading = false;
      },
    });
  }

  private loadPhotos(): void {
    this.loadingHolderService.isLoading = true;
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

  public updateSelectedPhotosList(selectedPhotos: PhotoDto[]): void {
    this.selectedPhotos = selectedPhotos;
  }

  public uploadPhoto(file: File): void {
    this.loadingHolderService.isLoading = true;
    this.eventService
      .uploadPhoto(file)
      .pipe(
        finalize(() => {
          this.loadingHolderService.isLoading = false;
          this.selectedPhotos = [];
        })
      )
      .subscribe({
        next: () => {
          this.loadPhotos();
        },
        error: (error) => {
          console.error('Error uploading photo', error);
        },
      });
  }

  public downloadPhotos(downloadPhotosList: PhotoDto[]): void {
    this.loadingHolderService.isLoading = true;
    const photoIds = downloadPhotosList.map((photo) => photo.id);
    this.eventService
      .downloadSelectedPhotos({
        idList: photoIds,
      })
      .pipe(
        finalize(() => {
          this.loadingHolderService.isLoading = false;
          this.selectedPhotos = [];
        })
      )
      .subscribe({
        next: (response) => {
          this.fileDownloadService.downloadFile(response, 'photos.zip');
        },
        error: (error) => {
          console.error('Error downloading photos', error);
        },
      });
  }
}
