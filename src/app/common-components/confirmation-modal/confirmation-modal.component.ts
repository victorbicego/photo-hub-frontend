import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-confirmation-modal',
  imports: [CommonModule],
  templateUrl: './confirmation-modal.component.html',
  styleUrl: './confirmation-modal.component.scss',
})
export class ConfirmationModalComponent {
  @Input() title: string | null = null;

  @Output() emitClose = new EventEmitter<void>();
  @Output() emitConfirm = new EventEmitter<void>();

  public onConfirm(): void {
    this.emitConfirm.emit();
    this.emitClose.emit();
  }

  public onClose(): void {
    this.emitClose.emit();
  }
}
