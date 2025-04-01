import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { ApiResponse } from '../../interfaces/api-response';
import { Observable } from 'rxjs';
import { EventDto } from '../../interfaces/event-dto';
import { CreateEventDto } from '../../interfaces/create-event-dto';
import { PhotoDto } from '../../interfaces/photo-dto';
import { PhotoListDto } from '../../interfaces/photo-list-dto';
import { EditEventDto } from '../../interfaces/edit-event-dto';

@Injectable({
  providedIn: 'root',
})
export class HostEventService {
  constructor(private http: HttpClient) {}

  public getAllEventsForHost(
    search: string = '',
    sortBy: string = 'name',
    sortDirection: string = 'asc',
    page: number = 0,
    size: number = 10
  ): Observable<ApiResponse<EventDto[]>> {
    const params = new HttpParams()
      .set('search', search)
      .set('sortBy', sortBy)
      .set('sortDirection', sortDirection)
      .set('page', page.toString())
      .set('size', size.toString());

    return this.http.get<ApiResponse<EventDto[]>>(
      `${environment.baseUrl}/host/event`,
      {
        params,
        withCredentials: true,
      }
    );
  }

  public createEvent(event: CreateEventDto): Observable<ApiResponse<EventDto>> {
    return this.http.post<ApiResponse<EventDto>>(
      `${environment.baseUrl}/host/event`,
      event,
      {
        withCredentials: true,
      }
    );
  }

  public editEvent(
    id: number,
    event: EditEventDto
  ): Observable<ApiResponse<EventDto>> {
    return this.http.post<ApiResponse<EventDto>>(
      `${environment.baseUrl}/host/event/${id}`,
      event,
      {
        withCredentials: true,
      }
    );
  }

  public deletePhoto(photoId: number): Observable<ApiResponse<void>> {
    return this.http.delete<ApiResponse<void>>(
      `${environment.baseUrl}/host/event/photo/${photoId}`,
      {
        withCredentials: true,
      }
    );
  }

  public deleteSelectedPhotos(
    id: number,
    deletePhotoListDto: PhotoListDto
  ): Observable<ApiResponse<void>> {
    return this.http.request<ApiResponse<void>>(
      'delete',
      `${environment.baseUrl}/host/event/${id}/photos`,
      {
        body: deletePhotoListDto,
        withCredentials: true,
      }
    );
  }

  public downloadSelectedPhotos(
    id: number,
    downloadPhotoListDto: PhotoListDto
  ): Observable<HttpResponse<Blob>> {
    return this.http.post<Blob>(
      `${environment.baseUrl}/host/event/${id}/photos/download`,
      downloadPhotoListDto,
      {
        withCredentials: true,
        observe: 'response',
        responseType: 'blob' as 'json',
      }
    );
  }

  public getEventPhotos(id: number): Observable<ApiResponse<PhotoDto[]>> {
    return this.http.get<ApiResponse<PhotoDto[]>>(
      `${environment.baseUrl}/host/event/${id}/photos`,
      {
        withCredentials: true,
      }
    );
  }

  public uploadPhoto(id: number, file: File): Observable<ApiResponse<any>> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    return this.http.post<ApiResponse<any>>(
      `${environment.baseUrl}/host/event/${id}/photo`,
      formData,
      {
        withCredentials: true,
      }
    );
  }
}
