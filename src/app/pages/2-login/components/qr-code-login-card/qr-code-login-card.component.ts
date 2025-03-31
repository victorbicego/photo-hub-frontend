import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-qr-code-login-card',
  imports: [],
  templateUrl: './qr-code-login-card.component.html',
  styleUrl: './qr-code-login-card.component.scss',
})
export class QrCodeLoginCardComponent {
  @Output() emitToggleQrCodeModal = new EventEmitter<void>();

  public onToggleQrCodeModal(): void {
    this.emitToggleQrCodeModal.emit();
  }
}
