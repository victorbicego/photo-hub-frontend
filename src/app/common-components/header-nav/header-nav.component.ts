import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationModalComponent } from '../confirmation-modal/confirmation-modal.component';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-header-nav',
  imports: [CommonModule, ConfirmationModalComponent],
  templateUrl: './header-nav.component.html',
  styleUrl: './header-nav.component.scss',
})
export class HeaderNavComponent {
  @Input() isAdmin: boolean = false;

  public showLogoutModal: boolean = false;

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) {}

  public navigateToPhotos(): void {
    this.router.navigate(['/event']);
  }

  public navigateToFaceMatch(): void {
    this.router.navigate(['/match']);
  }

  public navigateToEvents(): void {
    this.router.navigate(['/admin/events']);
  }

  public navigateToMyAccount(): void {
    this.router.navigate(['/admin/account']);
  }

  public openLogoutModal(): void {
    this.showLogoutModal = true;
  }

  public closeLogoutModal(): void {
    this.showLogoutModal = false;
  }

  public confirmLogout(): void {
    this.authenticationService
      .logout()
      .pipe(finalize(() => this.router.navigate([''])))
      .subscribe({
        next: () => {},
        error: (error) => {
          console.error('Logout fail', error);
        },
      });
  }
}
