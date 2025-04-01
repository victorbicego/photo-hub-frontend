import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HostDto } from '../../../../interfaces/host-dto';
import { UpdateHostDto } from '../../../../interfaces/update-host-dto';

@Component({
  selector: 'app-update-user-modal',
  imports: [CommonModule, FormsModule],
  templateUrl: './update-user-modal.component.html',
  styleUrl: './update-user-modal.component.scss',
})
export class UpdateUserModalComponent {
  @Input() hostDto: HostDto | null = null;

  @Output() emitClose = new EventEmitter<void>();
  @Output() emitUpdateUser = new EventEmitter<UpdateHostDto>();

  public editFirstName: string = '';
  public editLastName: string = '';

  public ngOnInit(): void {
    if (this.hostDto) {
      this.editFirstName = this.hostDto.firstName;
      this.editLastName = this.hostDto.lastName;
    }
  }

  public onClose(): void {
    this.emitClose.emit();
  }

  public onSave(): void {
    if (this.editFirstName.trim() === '' || this.editLastName.trim() === '') {
      this.emitUpdateUser.emit({
        firstName: this.editFirstName,
        lastName: this.editLastName,
      });
      this.emitClose.emit();
    }
  }
}
