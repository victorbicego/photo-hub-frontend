import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { HeaderNavComponent } from '../header-nav/header-nav.component';
import { EventDto } from '../../interfaces/event-dto';
import { EventDateComponent } from '../event-date/event-date.component';

@Component({
  selector: 'app-header',
  imports: [CommonModule, HeaderNavComponent, EventDateComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  @Input() showNav: boolean = true;
  @Input() event: EventDto | null = null;
}
