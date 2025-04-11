import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { EventDto } from '../../../../interfaces/event-dto';

@Component({
  selector: 'app-delete-event-modal',
  imports: [CommonModule],
  templateUrl: './delete-event-modal.component.html',
  styleUrl: './delete-event-modal.component.scss',
})
export class DeleteEventModalComponent {
  @Input() eventDto: EventDto | null = null;

  @Output() emitClose = new EventEmitter<void>();
  @Output() emitDeleteEvent = new EventEmitter<EventDto>();

  public onClose(): void {
    this.emitClose.emit();
  }

  public onDelete(): void {
    if (this.eventDto) {
      this.emitDeleteEvent.emit(this.eventDto);
      this.emitClose.emit();
    }
  }
}
