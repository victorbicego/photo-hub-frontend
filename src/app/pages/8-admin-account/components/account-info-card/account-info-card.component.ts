import { Component, EventEmitter, Input, Output } from '@angular/core';
import { HostDto } from '../../../../interfaces/host-dto';

@Component({
  selector: 'app-account-info-card',
  imports: [],
  templateUrl: './account-info-card.component.html',
  styleUrl: './account-info-card.component.scss',
})
export class AccountInfoCardComponent {
  @Input() hostDto: HostDto | null = null;

  @Output() toggleEditNameModal = new EventEmitter<void>();
  @Output() toggleUpdatePasswordModal = new EventEmitter<void>();
  @Output() toggleDeleteAccountModal = new EventEmitter<void>();

  public openEditNameModal(): void {
    this.toggleEditNameModal.emit();
  }

  public openUpdatePasswordModal(): void {
    this.toggleUpdatePasswordModal.emit();
  }

  public openDeleteAccountModal(): void {
    this.toggleDeleteAccountModal.emit();
  }
}
