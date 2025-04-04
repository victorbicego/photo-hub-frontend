import {Component, OnInit} from '@angular/core';
import { AdminHeaderComponent } from '../../common-components/admin-header/admin-header.component';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HostService } from '../../services/host/host.service';
import { LoadingHolderService } from '../../services/holders/loading-holder/loading-holder.service';
import { HostDto } from '../../interfaces/host-dto';
import { finalize } from 'rxjs';
import { UpdateHostDto } from '../../interfaces/update-host-dto';
import { ConfirmationModalComponent } from '../../common-components/confirmation-modal/confirmation-modal.component';
import { LoadingComponent } from '../../common-components/loading/loading.component';
import { UpdatePasswordModalComponent } from './components/update-password-modal/update-password-modal.component';
import { UpdateUserModalComponent } from './components/update-user-modal/update-user-modal.component';
import { AccountInfoCardComponent } from './components/account-info-card/account-info-card.component';

@Component({
  selector: 'app-admin-account',
  imports: [
    AdminHeaderComponent,
    CommonModule,
    ConfirmationModalComponent,
    LoadingComponent,
    UpdatePasswordModalComponent,
    UpdateUserModalComponent,
    AccountInfoCardComponent,
  ],
  templateUrl: './admin-account.component.html',
  styleUrl: './admin-account.component.scss',
})
export class AdminAccountComponent implements OnInit{
  public hostDto: HostDto | null = null;
  public showUpdateUserModal: boolean = false;
  public showUpdatePasswordModal: boolean = false;
  public showDeleteAccountModal: boolean = false;

  constructor(
    private hostService: HostService,
    public loadingHolderService: LoadingHolderService,
    private router: Router
  ) {}

  public ngOnInit(): void {
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
            this.hostDto = response.data;
          } else {
            this.router.navigate(['']);
          }
        },
        error: (error) => {
          console.error('Error fetching host details', error);
          this.router.navigate(['']);
        },
      });
  }

  public openUploadUserModal(): void {
    this.showUpdateUserModal = true;
  }

  public closeUpdateUserModal(): void {
    this.showUpdateUserModal = false;
  }

  public openUpdatePasswordModal(): void {
    this.showUpdatePasswordModal = true;
  }

  public closeUpdatePasswordModal(): void {
    this.showUpdatePasswordModal = false;
  }

  public openDeleteAccountModal(): void {
    this.showDeleteAccountModal = true;
  }

  public closeDeleteAccountModal(): void {
    this.showDeleteAccountModal = false;
  }

  public deleteHost(): void {
    this.loadingHolderService.isLoading = true;
    this.hostService
      .deleteHostAccount()
      .pipe(finalize(() => (this.loadingHolderService.isLoading = false)))
      .subscribe({
        next: () => {
          this.router.navigate(['']);
        },
        error: (error) => {
          console.error('Error deleting host', error);
        },
      });
  }

  public updateHostPassword(newPassword: string): void {
    this.loadingHolderService.isLoading = true;
    this.hostService
      .updateHostPassword({
        password: newPassword,
      })
      .pipe(finalize(() => (this.loadingHolderService.isLoading = false)))
      .subscribe({
        next: () => {},
        error: (error) => {
          console.error('Error updating host password', error);
        },
      });
  }

  public updateHostInfo(updateHostDto: UpdateHostDto): void {
    this.loadingHolderService.isLoading = true;
    this.hostService
      .updateHostInfo(updateHostDto)
      .pipe(finalize(() => (this.loadingHolderService.isLoading = false)))
      .subscribe({
        next: () => {
          this.checkHost();
        },
        error: (error) => {
          console.error('Error updating host info', error);
        },
      });
  }
}
