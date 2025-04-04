import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { ApiResponse } from '../../interfaces/api-response';
import { Observable } from 'rxjs';
import { EventDto } from '../../interfaces/event-dto';
import { CreateEventDto } from '../../interfaces/create-event-dto';
import { PhotoDto } from '../../interfaces/photo-dto';
import { PhotoListDto } from '../../interfaces/photo-list-dto';
import { UpdateEventDto } from '../../interfaces/update-event-dto';

@Injectable({
  providedIn: 'root',
})
export class HostEventService {
  constructor(private http: HttpClient) {}

  public getAllEvents(
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

  public createEvent(createEventDto: CreateEventDto): Observable<ApiResponse<EventDto>> {
    return this.http.post<ApiResponse<EventDto>>(
      `${environment.baseUrl}/host/event`,
      createEventDto,
      {
        withCredentials: true,
      }
    );
  }

  public updateEvent(
    id: number,
    editEventDto: UpdateEventDto
  ): Observable<ApiResponse<EventDto>> {
    return this.http.post<ApiResponse<EventDto>>(
      `${environment.baseUrl}/host/event/${id}`,
      editEventDto,
      {
        withCredentials: true,
      }
    );
  }

  public deleteEvent(
    id: number
  ): Observable<ApiResponse<EventDto>> {
    return this.http.delete<ApiResponse<EventDto>>(
      `${environment.baseUrl}/host/event/${id}`,
      {
        withCredentials: true,
      }
    );
  }

  public getPhotos(id: number): Observable<ApiResponse<PhotoDto[]>> {
    return this.http.get<ApiResponse<PhotoDto[]>>(
      `${environment.baseUrl}/host/event/${id}/photos`,
      {
        withCredentials: true,
      }
    );
  }

  public downloadPhotos(
    id: number,
    photoListDto: PhotoListDto
  ): Observable<HttpResponse<Blob>> {
    return this.http.post<Blob>(
      `${environment.baseUrl}/host/event/${id}/photos/download`,
      photoListDto,
      {
        withCredentials: true,
        observe: 'response',
        responseType: 'blob' as 'json',
      }
    );
  }

  public uploadPhoto(id: number, file: File): Observable<ApiResponse<any>> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    return this.http.post<ApiResponse<any>>(
      `${environment.baseUrl}/host/event/${id}/photos`,
      formData,
      {
        withCredentials: true,
      }
    );
  }

  public deletePhotos(
    id: number,
    photoListDto: PhotoListDto
  ): Observable<ApiResponse<void>> {
    return this.http.request<ApiResponse<void>>(
      'delete',
      `${environment.baseUrl}/host/event/${id}/photos`,
      {
        body: photoListDto,
        withCredentials: true,
      }
    );
  }

  public blockUser(
    id: number,
    photoListDto: PhotoListDto
  ): Observable<ApiResponse<void>> {
    return this.http.post<ApiResponse<void>>(
      `${environment.baseUrl}/host/event/${id}/block`,
      photoListDto,
      {
        withCredentials: true,
      }
    );
  }
}
