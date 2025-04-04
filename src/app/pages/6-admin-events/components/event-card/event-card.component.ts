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

  @Output() openEventHostsModal = new EventEmitter<EventDto>();
  @Output() openEditEventModal = new EventEmitter<EventDto>();
  @Output() openDeleteEventModal = new EventEmitter<EventDto>();

  constructor(private router: Router) {}

  public convertBase64(qr: string): string {
    return qr.replace(/-/g, '+').replace(/_/g, '/');
  }

  public goToEvent(event: EventDto): void {
    this.router.navigate(['/admin/event', event.id]);
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
      this.openEventHostsModal.emit(this.event);
    }
  }

  public copyEventLink(event: EventDto) {
    const eventUrl = `localhost:4200/login?qrCode=${event.qrCodeData}`;
    navigator.clipboard
      .writeText(eventUrl)
      .then()
      .catch((error) => console.error('Error copying event link', error));
  }

  public onEditClick(): void {
    if (this.event) {
      this.openEditEventModal.emit(this.event);
    }
  }

  public onDeleteClick(): void {
    if (this.event) {
      this.openDeleteEventModal.emit(this.event);
    }
  }

  public isPastEvent(startDate: string | Date): boolean {
    const eventDate = new Date(startDate);
    const now = new Date();
    return eventDate <= now;
  }
}
