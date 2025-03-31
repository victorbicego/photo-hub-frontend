import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { ApiResponse } from '../../interfaces/api-response';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { EmailDto } from '../../interfaces/email-dto';
import { ResetPasswordRequestDto } from '../../interfaces/reset-password-request-dto';

@Injectable({
  providedIn: 'root',
})
export class ResetPasswordRequestService {
  constructor(private http: HttpClient) {}

  public sendResetPasswordEmail(
    emailDto: EmailDto
  ): Observable<ApiResponse<void>> {
    return this.http.post<ApiResponse<void>>(
      `${environment.baseUrl}/password-reset/request`,
      emailDto,
      { withCredentials: true }
    );
  }

  public confirmNewPassword(
    resetPasswordRequestDto: ResetPasswordRequestDto
  ): Observable<ApiResponse<void>> {
    return this.http.post<ApiResponse<void>>(
      `${environment.baseUrl}/password-reset/confirm`,
      resetPasswordRequestDto,
      { withCredentials: true }
    );
  }
}
