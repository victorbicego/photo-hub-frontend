import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LoginRequestDto } from '../../../../interfaces/login-request-dto';

@Component({
  selector: 'app-credentials-login-card',
  imports: [FormsModule],
  templateUrl: './credentials-login-card.component.html',
  styleUrl: './credentials-login-card.component.scss',
})
export class CredentialsLoginCardComponent {
  @Output() emitOpenResetPasswordModal = new EventEmitter<void>();
  @Output() emitLoginWithCredentials = new EventEmitter<LoginRequestDto>();

  public username = '';
  public password = '';

  public onLoginWithCredentials(): void {
    if (this.username.trim() != '' && this.password.trim() != '') {
      this.emitLoginWithCredentials.emit({
        username: this.username,
        password: this.password,
      });
    }
  }

  public onOpenResetPasswordModal(): void {
    this.emitOpenResetPasswordModal.emit();
  }
}
