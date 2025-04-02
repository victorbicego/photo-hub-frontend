import { Component } from '@angular/core';
import { HeaderComponent } from '../../common-components/header/header.component';
import { CommonModule } from '@angular/common';
import { PhotoRecognitionDto } from '../../interfaces/photo-recognition-dto';
import { PhotoDto } from '../../interfaces/photo-dto';
import { EventDto } from '../../interfaces/event-dto';
import { EventService } from '../../services/event/event.service';
import { LoadingHolderService } from '../../services/holders/loading-holder/loading-holder.service';
import { MatchedFaceHolderService } from '../../services/holders/matched-face-holder/matched-face-holder.service';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { UploadPhotoModalComponent } from '../../common-components/upload-photo-modal/upload-photo-modal.component';
import { DownloadPhotosModalComponent } from '../../common-components/download-photos-modal/download-photos-modal.component';
import { MatchedFacesPhotoGalleryComponent } from './components/matched-faces-photo-gallery/matched-faces-photo-gallery.component';
import { LoadingComponent } from '../../common-components/loading/loading.component';

@Component({
  selector: 'app-matched-faces',
  imports: [
    CommonModule,
    UploadPhotoModalComponent,
    DownloadPhotosModalComponent,
    LoadingComponent,
    HeaderComponent,
    MatchedFacesPhotoGalleryComponent,
  ],
  templateUrl: './matched-faces.component.html',
  styleUrl: './matched-faces.component.scss',
})
export class MatchedFacesComponent {
  public matchedPhotos: PhotoRecognitionDto[] = [];
  public selectedPhotos: PhotoDto[] = [];
  public event: EventDto | null = null;

  public showUploadModal: boolean = false;
  public showDownloadModal: boolean = false;

  constructor(
    private eventService: EventService,
    public loadingHolderService: LoadingHolderService,
    private matchedFaceHolderService: MatchedFaceHolderService,
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
        if (this.matchedFaceHolderService.selectedFile != null) {
          this.onMatch(this.matchedFaceHolderService.selectedFile);
        } else {
          this.loadingHolderService.isLoading = false;
        }
      },
      error: (error) => {
        console.error('Error fetching event details', error);
        this.router.navigate(['']);
        this.loadingHolderService.isLoading = false;
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

  public onMatch(file: File): void {
    this.matchedFaceHolderService.selectedFile = file;
    this.loadingHolderService.isLoading = true;
    this.eventService
      .getMatchedPhotos(file)
      .pipe(
        finalize(() => {
          this.loadingHolderService.isLoading = false;
          this.selectedPhotos = [];
        })
      )
      .subscribe({
        next: (response) => {
          this.matchedPhotos = response.data;
        },
        error: (error) => {
          console.error('Error fetching photos', error);
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
