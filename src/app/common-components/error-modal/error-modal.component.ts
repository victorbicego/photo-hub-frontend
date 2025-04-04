import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-error-modal',
  imports: [CommonModule],
  templateUrl: './error-modal.component.html',
  styleUrl: './error-modal.component.scss',
})
export class ErrorModalComponent {
  @Input() title: string | null = null;
  @Input() text: string | null = null;

  @Output() emitClose = new EventEmitter<void>();

  public onClose(): void {
    this.emitClose.emit();
  }
}
