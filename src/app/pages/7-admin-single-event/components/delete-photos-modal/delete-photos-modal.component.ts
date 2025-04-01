import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PhotoDto } from '../../../../interfaces/photo-dto';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-delete-photos-modal',
  imports: [CommonModule],
  templateUrl: './delete-photos-modal.component.html',
  styleUrl: './delete-photos-modal.component.scss',
})
export class DeletePhotosModalComponent {
  @Input() selectedPhotos: PhotoDto[] = [];

  @Output() emitClose = new EventEmitter<void>();
  @Output() emitDeletePhotos = new EventEmitter<PhotoDto[]>();

  public onDelete(): void {
    this.emitDeletePhotos.emit(this.selectedPhotos);
    this.emitClose.emit();
  }

  public onClose(): void {
    this.emitClose.emit();
  }
}
