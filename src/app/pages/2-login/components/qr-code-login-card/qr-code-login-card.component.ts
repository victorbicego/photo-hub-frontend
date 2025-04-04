import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-qr-code-login-card',
  imports: [],
  templateUrl: './qr-code-login-card.component.html',
  styleUrl: './qr-code-login-card.component.scss',
})
export class QrCodeLoginCardComponent {
  @Output() emitOpenQrCodeModal = new EventEmitter<void>();

  public onOpenQrCodeModal(): void {
    this.emitOpenQrCodeModal.emit();
  }
}
