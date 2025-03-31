import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ResetPasswordRequestDto } from '../../../../interfaces/reset-password-request-dto';

@Component({
  selector: 'app-reset-password-modal',
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './reset-password-modal.component.html',
  styleUrl: './reset-password-modal.component.scss',
})
export class ResetPasswordModalComponent {
  @Output() emitClose = new EventEmitter<void>();
  @Output() emitSendEmail = new EventEmitter<string>();
  @Output() emitResetPassword = new EventEmitter<ResetPasswordRequestDto>();

  public isEmailSent: boolean = false;
  public isCodeSent: boolean = false;

  public email: string = '';
  public code: string = '';
  public password: string = '';
  public newPassword: string = '';
  public confirmNewPassword: string = '';

  public onClose(): void {
    this.emitClose.emit();
  }

  public onSendEmail(): void {
    if (this.email.trim() !== '') {
      this.emitSendEmail.emit(this.email);
      this.isEmailSent = true;
    }
  }

  public onSendCode(): void {
    if (this.code.trim() !== '') {
      this.isCodeSent = true;
    }
  }

  public onResetPassword(): void {
    if (
      this.email &&
      this.code &&
      this.confirmNewPassword &&
      this.newPassword === this.confirmNewPassword
    ) {
      this.emitResetPassword.emit({
        username: this.email,
        code: this.code,
        password: this.confirmNewPassword,
      });
      this.emitClose.emit();
    }
  }
}
