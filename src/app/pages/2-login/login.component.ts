import { Component } from '@angular/core';
import { HeaderComponent } from '../../common-components/header/header.component';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from '../../common-components/loading/loading.component';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import {ActivatedRoute, Router} from '@angular/router';
import { finalize } from 'rxjs';
import { LoginRequestDto } from '../../interfaces/login-request-dto';
import { ResetPasswordRequestDto } from '../../interfaces/reset-password-request-dto';
import { EventService } from '../../services/event/event.service';
import { LoadingHolderService } from '../../services/holders/loading-holder/loading-holder.service';
import { ResetPasswordRequestService } from '../../services/reset-password-request/reset-password-request.service';
import { HostService } from '../../services/host/host.service';
import { QrCodeModalComponent } from './components/qr-code-modal/qr-code-modal.component';
import { ResetPasswordModalComponent } from './components/reset-password-modal/reset-password-modal.component';
import { QrCodeLoginCardComponent } from './components/qr-code-login-card/qr-code-login-card.component';
import { CredentialsLoginCardComponent } from './components/credentials-login-card/credentials-login-card.component';

@Component({
  selector: 'app-login',
  imports: [
    CommonModule,
    HeaderComponent,
    LoadingComponent,
    QrCodeModalComponent,
    ResetPasswordModalComponent,
    QrCodeLoginCardComponent,
    CredentialsLoginCardComponent,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  public showQrCodeModal: boolean = false;
  public showResetPasswordModal: boolean = false;

  constructor(
    private activatedRoute:ActivatedRoute,
    private authenticationService: AuthenticationService,
    private eventService: EventService,
    private hostService: HostService,
    public loadingHolderService: LoadingHolderService,
    private resetPasswordRequestService: ResetPasswordRequestService,
    private router: Router
  ) {}

  public ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params) => {
      if (params['qrCode']) {
        this.loginWithQrCode((params['qrCode']));
      }
    });

    this.checkHost();
  }

  private checkHost(): void {
    this.loadingHolderService.isLoading = true;
    this.hostService
      .getHostInfo()
      .pipe(finalize(() => (this.loadingHolderService.isLoading = false)))
      .subscribe({
        next: (response) => {
          if (response.data.enabled) {
            this.router.navigate(['/admin/home']);
          } else {
            this.checkActiveEvent();
          }
        },
        error: (error) => {
          this.checkActiveEvent();
          console.error('Error fetching host details', error);
        },
      });
  }

  private checkActiveEvent(): void {
    this.loadingHolderService.isLoading = true;
    this.eventService
      .getActiveEvent()
      .pipe(finalize(() => (this.loadingHolderService.isLoading = false)))
      .subscribe({
        next: () => {
          this.router.navigate(['/event']);
        },
        error: (error) => {
          console.error('Error fetching event details', error);
        },
      });
  }

  public toggleQrCodeModal(): void {
    this.showQrCodeModal = true;
  }

  public closeQrCodeModal(): void {
    this.showQrCodeModal = false;
  }

  public toggleResetPasswordModal(): void {
    this.showResetPasswordModal = true;
  }

  public closeResetPasswordModal(): void {
    this.showResetPasswordModal = false;
  }

  public loginWithCredentials(loginRequestDto: LoginRequestDto): void {
    this.loadingHolderService.isLoading = true;
    this.authenticationService
      .authenticate(loginRequestDto)
      .pipe(finalize(() => (this.loadingHolderService.isLoading = false)))
      .subscribe({
        next: () => {
          this.router.navigate(['/admin/home']);
        },
        error: (error) => {
          this.loadingHolderService.isLoading = false;
          console.error('Login with credentials failed', error);
        },
      });
  }

  public loginWithQrCode(qrCode: string) {
    this.loadingHolderService.isLoading = true;
    this.authenticationService
      .authenticateQrCode(qrCode)
      .pipe(finalize(() => (this.loadingHolderService.isLoading = false)))
      .subscribe({
        next: () => {
          this.router.navigate(['/event']);
        },
        error: (error) => {
          this.router.navigate(['/login']);
          console.error('QR code authentication failed', error);
        },
      });
  }

  public sendEmail(email: string): void {
    this.loadingHolderService.isLoading = true;
    this.resetPasswordRequestService
      .sendResetPasswordEmail({
        username: email,
      })
      .pipe(finalize(() => (this.loadingHolderService.isLoading = false)))
      .subscribe({
        next: () => {},
        error: (error) => {
          console.error('Error sending email:', error);
        },
      });
  }

  public resetPassword(resetPasswordRequestDto: ResetPasswordRequestDto): void {
    this.loadingHolderService.isLoading = true;
    this.resetPasswordRequestService
      .confirmNewPassword(resetPasswordRequestDto)
      .pipe(finalize(() => (this.loadingHolderService.isLoading = false)))
      .subscribe({
        next: () => {},
        error: (error) => {
          console.error('Error resting password', error);
        },
      });
  }
}
