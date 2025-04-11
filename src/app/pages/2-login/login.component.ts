import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../common-components/header/header.component';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from '../../common-components/loading/loading.component';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { ActivatedRoute, Router } from '@angular/router';
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
import { ErrorModalComponent } from '../../common-components/error-modal/error-modal.component';

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
    ErrorModalComponent,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  public showQrCodeModal: boolean = false;
  public showResetPasswordModal: boolean = false;
  public showErrorModal: boolean = false;

  public errorTitle: string | null = null;
  public errorText: string | null = null;

  constructor(
    private activatedRoute: ActivatedRoute,
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
        this.loginWithQrCode(params['qrCode']);
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
            this.router.navigate(['/admin/events']);
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

  public openQrCodeModal(): void {
    this.showQrCodeModal = true;
  }

  public closeQrCodeModal(): void {
    this.showQrCodeModal = false;
  }

  public openResetPasswordModal(): void {
    this.showResetPasswordModal = true;
  }

  public closeResetPasswordModal(): void {
    this.showResetPasswordModal = false;
  }

  public closeErrorModal(): void {
    this.showErrorModal = false;
    this.errorTitle = null;
    this.errorText = null;
  }

  public loginWithCredentials(loginRequestDto: LoginRequestDto): void {
    this.loadingHolderService.isLoading = true;
    this.authenticationService
      .authenticate(loginRequestDto)
      .pipe(finalize(() => (this.loadingHolderService.isLoading = false)))
      .subscribe({
        next: () => {
          this.router.navigate(['/admin/events']);
        },
        error: (error) => {
          this.showErrorModal = true;

          if (error.status === 401) {
            this.errorTitle = 'Falha no login';
            this.errorText = 'Usuário ou senha inválidos';
          } else {
            this.errorTitle = 'Erro de autenticação';
            this.errorText =
              'Houve um erro ao tentar autenticar. Tente novamente.';
          }
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
          this.showErrorModal = true;

          if (error.status === 404) {
            this.errorTitle = 'Falha no login';
            this.errorText = 'Nenhum evento ativo encontrado';
          } else {
            this.errorTitle = 'Erro de autenticação';
            this.errorText =
              'Houve um erro ao tentar autenticar. Tente novamente.';
          }
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
          this.showErrorModal = true;

          this.errorTitle = 'Erro ao enviar email';
          this.errorText =
            'Houve um erro ao tentar enviar o email. Tente novamente.';
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
          this.showErrorModal = true;

          this.errorTitle = 'Erro ao redefinir senha';
          this.errorText =
            'Houve um erro ao tentar redefinir a senha. Tente novamente.';
          console.error('Error resting password', error);
        },
      });
  }
}
