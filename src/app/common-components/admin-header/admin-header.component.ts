import { Component, Input } from '@angular/core';
import { HeaderNavComponent } from '../header-nav/header-nav.component';
import { EventDateComponent } from '../event-date/event-date.component';
import { CommonModule } from '@angular/common';
import { EventDto } from '../../interfaces/event-dto';

@Component({
  selector: 'app-admin-header',
  imports: [HeaderNavComponent, EventDateComponent, CommonModule],
  templateUrl: './admin-header.component.html',
  styleUrl: './admin-header.component.scss',
})
export class AdminHeaderComponent {
  @Input() event: EventDto | null = null;
}
