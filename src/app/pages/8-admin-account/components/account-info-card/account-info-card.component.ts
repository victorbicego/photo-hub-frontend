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

  @Output() openEditNameModal = new EventEmitter<void>();
  @Output() openUpdatePasswordModal = new EventEmitter<void>();
  @Output() openDeleteAccountModal = new EventEmitter<void>();

  public onOpenEditNameModal(): void {
    this.openEditNameModal.emit();
  }

  public onOpenUpdatePasswordModal(): void {
    this.openUpdatePasswordModal.emit();
  }

  public onOpenDeleteAccountModal(): void {
    this.openDeleteAccountModal.emit();
  }
}
