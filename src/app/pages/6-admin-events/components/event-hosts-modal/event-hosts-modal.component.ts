import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EventDto } from '../../../../interfaces/event-dto';

@Component({
  selector: 'app-event-hosts-modal',
  imports: [FormsModule],
  templateUrl: './event-hosts-modal.component.html',
  styleUrl: './event-hosts-modal.component.scss',
})
export class EventHostsModalComponent {
  @Input() event: EventDto | null = null;

  @Output() emitClose = new EventEmitter<void>();
  @Output() emitSaveCoHostsEvent = new EventEmitter<void>();

  onClose(): void {
    this.emitClose.emit();
  }

  onAddCoHosts(): void {
    this.emitSaveCoHostsEvent.emit();
  }
}
