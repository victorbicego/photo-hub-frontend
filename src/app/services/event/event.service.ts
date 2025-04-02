import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse } from '../../interfaces/api-response';
import { Observable, Subject } from 'rxjs';
import { environment } from '../../../environments/environment';
import { EventDto } from '../../interfaces/event-dto';
import { PhotoDto } from '../../interfaces/photo-dto';
import { PhotoRecognitionDto } from '../../interfaces/photo-recognition-dto';
import { PhotoListDto } from '../../interfaces/photo-list-dto';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  constructor(private http: HttpClient) {}

  public getActiveEvent(): Observable<ApiResponse<EventDto>> {
    return this.http.get<ApiResponse<EventDto>>(
      `${environment.baseUrl}/event`,
      {
        withCredentials: true,
      }
    );
  }

  public getEventPhotos(): Observable<ApiResponse<PhotoDto[]>> {
    return this.http.get<ApiResponse<PhotoDto[]>>(
      `${environment.baseUrl}/event/photos`,
      {
        withCredentials: true,
      }
    );
  }

  public uploadPhoto(file: File): Observable<ApiResponse<any>> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    return this.http.post<ApiResponse<any>>(
      `${environment.baseUrl}/event/photos`,
      formData,
      {
        withCredentials: true,
      }
    );
  }

  public getMatchedPhotos(
    file: File
  ): Observable<ApiResponse<PhotoRecognitionDto[]>> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    return this.http.post<ApiResponse<PhotoRecognitionDto[]>>(
      `${environment.baseUrl}/event/photos/match`,
      formData,
      {
        withCredentials: true,
      }
    );
  }

  public downloadSelectedPhotos(
    downloadPhotoListDto: PhotoListDto
  ): Observable<HttpResponse<Blob>> {
    return this.http.post<Blob>(
      `${environment.baseUrl}/event/photos/download`,
      downloadPhotoListDto,
      {
        withCredentials: true,
        observe: 'response',
        responseType: 'blob' as 'json',
      }
    );
  }
}
