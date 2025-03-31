import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../interfaces/api-response';
import { LoginResponseDto } from '../../interfaces/login-response-dto';
import { LoginRequestDto } from '../../interfaces/login-request-dto';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(private http: HttpClient) {}

  public authenticate(
    loginRequestDto: LoginRequestDto
  ): Observable<ApiResponse<LoginResponseDto>> {
    return this.http.post<ApiResponse<LoginResponseDto>>(
      `${environment.baseUrl}/authentication/login`,
      loginRequestDto,
      {
        withCredentials: true,
      }
    );
  }

  public logout(): Observable<ApiResponse<void>> {
    return this.http.post<ApiResponse<void>>(
      `${environment.baseUrl}/authentication/logout`,
      {},
      {
        withCredentials: true,
      }
    );
  }

  public authenticateQrCode(qrCode: string): Observable<ApiResponse<void>> {
    return this.http.post<ApiResponse<void>>(
      `${environment.baseUrl}/authentication/event/${qrCode}`,
      {},
      { withCredentials: true }
    );
  }
}
