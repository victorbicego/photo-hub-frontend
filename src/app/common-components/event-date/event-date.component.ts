import { Component, Input } from '@angular/core';
import { EventDto } from '../../interfaces/event-dto';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-event-date',
  imports: [CommonModule],
  templateUrl: './event-date.component.html',
  styleUrl: './event-date.component.scss',
})
export class EventDateComponent {
  @Input() event: EventDto | null = null;
}
