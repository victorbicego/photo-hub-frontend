import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../interfaces/api-response';
import { HostDto } from '../../interfaces/host-dto';
import { UpdateHostDto } from '../../interfaces/update-host-dto';
import { PasswordDto } from '../../interfaces/password-dto';

@Injectable({
  providedIn: 'root',
})
export class HostService {
  constructor(private http: HttpClient) {}

  public getHostInfo(): Observable<ApiResponse<HostDto>> {
    return this.http.get<ApiResponse<HostDto>>(`${environment.baseUrl}/host`, {
      withCredentials: true,
    });
  }

  public updateHostInfo(
    updateHostDto: UpdateHostDto,
  ): Observable<ApiResponse<HostDto>> {
    return this.http.put<ApiResponse<HostDto>>(
      `${environment.baseUrl}/host`,
      updateHostDto,
      { withCredentials: true },
    );
  }

  public updateHostPassword(
    passwordDto: PasswordDto,
  ): Observable<ApiResponse<HostDto>> {
    return this.http.put<ApiResponse<HostDto>>(
      `${environment.baseUrl}/host/password`,
      passwordDto,
      { withCredentials: true },
    );
  }

  public deleteHostAccount(): Observable<ApiResponse<void>> {
    return this.http.delete<ApiResponse<void>>(`${environment.baseUrl}/host`, {
      withCredentials: true,
    });
  }
}
