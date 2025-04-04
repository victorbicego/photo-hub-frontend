import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-add-event-card',
  imports: [],
  templateUrl: './add-event-card.component.html',
  styleUrl: './add-event-card.component.scss',
})
export class AddEventCardComponent {
  @Output() openCreateEventModal = new EventEmitter<void>();

  public onCreateEventClick(): void {
    this.openCreateEventModal.emit();
  }
}
