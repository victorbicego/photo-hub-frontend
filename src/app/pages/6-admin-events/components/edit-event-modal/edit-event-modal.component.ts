import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EventDto } from '../../../../interfaces/event-dto';
import { UpdateEventDto } from '../../../../interfaces/update-event-dto';

@Component({
  selector: 'app-edit-event-modal',
  imports: [FormsModule],
  templateUrl: './edit-event-modal.component.html',
  styleUrl: './edit-event-modal.component.scss',
})
export class EditEventModalComponent implements OnInit {
  @Input() eventDto: EventDto | null = null;

  @Output() emitClose = new EventEmitter<void>();
  @Output() emitEditEvent = new EventEmitter<Map<number, UpdateEventDto>>();

  public name: string = '';

  public ngOnInit(): void {
    if (this.eventDto) {
      this.name = this.eventDto.name;
    }
  }

  public onClose(): void {
    this.emitClose.emit();
  }

  public onEdit(): void {
    if (this.eventDto && this.name.trim() != '') {
      let map = new Map<number, UpdateEventDto>([
        [this.eventDto?.id, { name: this.name }],
      ]);
      this.emitEditEvent.emit(map);
      this.emitClose.emit();
    }
  }
}
