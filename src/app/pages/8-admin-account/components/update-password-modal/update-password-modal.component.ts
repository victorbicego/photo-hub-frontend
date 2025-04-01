import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HostDto } from '../../../../interfaces/host-dto';

@Component({
  selector: 'app-update-password-modal',
  imports: [FormsModule],
  templateUrl: './update-password-modal.component.html',
  styleUrl: './update-password-modal.component.scss',
})
export class UpdatePasswordModalComponent {
  @Input() hostDto: HostDto | null = null;

  @Output() emitClose = new EventEmitter<void>();
  @Output() emitUpdate = new EventEmitter<string>();

  public newPassword: string = '';
  public confirmNewPassword: string = '';

  public onClose(): void {
    this.emitClose.emit();
  }

  public updatePassword(): void {
    if (
      this.newPassword.trim() != '' &&
      this.newPassword === this.confirmNewPassword
    ) {
      this.emitUpdate.emit(this.newPassword);
      this.emitClose.emit();
    }
  }
}
