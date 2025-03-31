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
  @Output() emitToggleResetPasswordModal = new EventEmitter<void>();
  @Output() emitLoginWithCredentials = new EventEmitter<LoginRequestDto>();

  public username = '';
  public password = '';

  public onLoginWithCredentials(): void {
    if (this.username != '' && this.password != '') {
      this.emitLoginWithCredentials.emit({
        username: this.username,
        password: this.password,
      });
    }
  }

  public onToggleResetPasswordModal(): void {
    this.emitToggleResetPasswordModal.emit();
  }
}
