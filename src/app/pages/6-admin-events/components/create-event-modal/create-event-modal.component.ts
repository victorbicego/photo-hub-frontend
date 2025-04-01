import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateEventDto } from '../../../../interfaces/create-event-dto';

@Component({
  selector: 'app-create-event-modal',
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './create-event-modal.component.html',
  styleUrl: './create-event-modal.component.scss',
})
export class CreateEventModalComponent {
  @Output() emitClose = new EventEmitter<void>();
  @Output() emitCreateEvent = new EventEmitter<CreateEventDto>();

  public name: string = '';
  public startDate: Date | null = null;
  public endDate: Date | null = null;

  public onClose(): void {
    this.emitClose.emit();
  }

  public onSave(): void {
    if (this.name.trim() != '' && this.startDate && this.endDate)
      this.emitCreateEvent.emit({
        name: this.name,
        startDate: this.startDate,
        endDate: this.endDate,
      });
    this.emitClose.emit();
  }
}
