import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PhotoDto } from '../../../../interfaces/photo-dto';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-block-users-modal',
  imports: [CommonModule],
  templateUrl: './block-users-modal.component.html',
  styleUrl: './block-users-modal.component.scss',
})
export class BlockUsersModalComponent {
  @Input() selectedPhotos: PhotoDto[] = [];

  @Output() emitClose = new EventEmitter<void>();
  @Output() emitBlockUsers = new EventEmitter<PhotoDto[]>();

  public onBlock(): void {
    this.emitBlockUsers.emit(this.selectedPhotos);
    this.emitClose.emit();
  }

  public onClose(): void {
    this.emitClose.emit();
  }
}
