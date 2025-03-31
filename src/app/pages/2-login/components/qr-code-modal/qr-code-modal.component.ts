import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ZXingScannerModule } from '@zxing/ngx-scanner';

@Component({
  selector: 'app-qr-code-modal',
  imports: [FormsModule, CommonModule, ZXingScannerModule],
  templateUrl: './qr-code-modal.component.html',
  styleUrl: './qr-code-modal.component.scss',
})
export class QrCodeModalComponent {
  @Output() emitClose = new EventEmitter<void>();
  @Output() emitLoginWithQrCode = new EventEmitter<string>();

  public onClose(): void {
    this.emitClose.emit();
  }

  public onSubmit(qrCode: string): void {
    this.emitLoginWithQrCode.emit(qrCode);
    this.emitClose.emit();
  }
}
