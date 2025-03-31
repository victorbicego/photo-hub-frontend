import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventDto } from '../../../../interfaces/event-dto';
import { Router } from '@angular/router';
import { EventDateComponent } from '../../../../common-components/event-date/event-date.component';

@Component({
  selector: 'app-event-card',
  imports: [CommonModule, EventDateComponent],
  templateUrl: './event-card.component.html',
  styleUrl: './event-card.component.scss',
})
export class EventCardComponent {
  @Input() event: EventDto | null = null;

  @Output() toggleEventHostsModal = new EventEmitter<EventDto>();

  constructor(private router: Router) {}

  public convertBase64(qr: string): string {
    return qr.replace(/-/g, '+').replace(/_/g, '/');
  }

  public goToEvent(event: EventDto): void {
    this.router.navigate(['/admin/event', event.id]);
  }

  public shareQrCodeByEmail(event: EventDto): void {
    const subject = encodeURIComponent(`QR code for event ${event.name}`);
    const body = encodeURIComponent(
      `Here is the QR code for event ${event.name} (ID: ${event.id}).`,
    );
    window.open(`mailto:?subject=${subject}&body=${body}`, '_blank');
  }

  public shareQrCodeByWhatsapp(event: EventDto): void {
    const message = encodeURIComponent(
      `Check out the QR code for event ${event.name} (ID: ${event.id}).`,
    );
    window.open(`https://wa.me/?text=${message}`, '_blank');
  }

  public downloadQrCode(event: EventDto): void {
    const base64Data = this.convertBase64(event.qrCode);
    const dataUrl = 'data:image/png;base64,' + base64Data;
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = `event_${event.id}_qr.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  public onCoHostsClick(): void {
    if (this.event) {
      this.toggleEventHostsModal.emit(this.event);
    }
  }
}
