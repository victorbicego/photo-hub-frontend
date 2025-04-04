import {Component, OnInit} from '@angular/core';
import { AdminHeaderComponent } from '../../common-components/admin-header/admin-header.component';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from '../../common-components/loading/loading.component';
import { CreateEventModalComponent } from './components/create-event-modal/create-event-modal.component';
import { EventHostsModalComponent } from './components/event-hosts-modal/event-hosts-modal.component';
import { EventCardComponent } from './components/event-card/event-card.component';
import { AddEventCardComponent } from './components/add-event-card/add-event-card.component';
import { CreateEventDto } from '../../interfaces/create-event-dto';
import { EventDto } from '../../interfaces/event-dto';
import { finalize } from 'rxjs';
import { LoadingHolderService } from '../../services/holders/loading-holder/loading-holder.service';
import { Router } from '@angular/router';
import { HostEventService } from '../../services/host-event/host-event.service';
import { EditEventModalComponent } from './components/edit-event-modal/edit-event-modal.component';
import { UpdateEventDto } from '../../interfaces/update-event-dto';
import {ConfirmationModalComponent} from '../../common-components/confirmation-modal/confirmation-modal.component';
import {DeleteEventModalComponent} from './components/delete-event-modal/delete-event-modal.component';
import {ErrorModalComponent} from '../../common-components/error-modal/error-modal.component';

@Component({
  selector: 'app-admin-events',
  imports: [
    CommonModule,
    AdminHeaderComponent,
    LoadingComponent,
    CreateEventModalComponent,
    EventHostsModalComponent,
    EventCardComponent,
    AddEventCardComponent,
    EditEventModalComponent,
    DeleteEventModalComponent,
    ErrorModalComponent
  ],
  templateUrl: './admin-events.component.html',
  styleUrl: './admin-events.component.scss',
})
export class AdminEventsComponent implements OnInit{
  public eventList: EventDto[] = [];
  public selectedEvent: EventDto | null = null;

  public showCreateEventModal = false;
  public showEventHostsModal = false;
  public showEditEventModal = false;
  public showDeleteEventModal = false;
  public showErrorModal = false;

  public errorTitle: string | null = null;
  public errorText: string | null = null;

  constructor(
    private hostEventService: HostEventService,
    public loadingHolderService: LoadingHolderService,
    private router: Router
  ) {}

  public ngOnInit(): void {
    this.getHostEvents();
  }

  private getHostEvents(): void {
    this.loadingHolderService.isLoading = true;
    this.hostEventService
      .getAllEvents()
      .pipe(finalize(() => (this.loadingHolderService.isLoading = false)))
      .subscribe({
        next: (response) => {
          this.eventList = response.data;
        },
        error: (error) => {
          console.error('Error fetching host events', error);
          this.router.navigate(['']);
        },
      });
  }

  public openCreateEventModal(): void {
    this.showCreateEventModal = true;
  }

  public closeCreateEventModal(): void {
    this.showCreateEventModal = false;
  }

  public openEventHostsModal(eventDto: EventDto): void {
    this.selectedEvent = eventDto;
    this.showEventHostsModal = true;
  }

  public closeEventHostsModal(): void {
    this.showEventHostsModal = false;
  }

  public openEditEventModal(eventDto: EventDto): void {
    this.selectedEvent = eventDto;
    this.showEditEventModal = true;
  }

  public closeEditEventModal(): void {
    this.showEditEventModal = false;
  }

  public openDeleteEventModal(eventDto: EventDto): void {
    this.selectedEvent = eventDto;
    this.showDeleteEventModal = true;
  }

  public closeDeleteEventModal(): void {
    this.showDeleteEventModal = false;
  }

  public closeErrorModal(): void {
    this.showErrorModal = false;
    this.errorTitle = null;
    this.errorText = null;
  }

  public createEvent(createEventDto: CreateEventDto): void {
    this.loadingHolderService.isLoading = true;
    this.hostEventService
      .createEvent(createEventDto)
      .pipe(finalize(() => (this.loadingHolderService.isLoading = false)))
      .subscribe({
        next: () => {
          this.getHostEvents();
        },
        error: (error) => {
          console.error('Error creating event', error);
        },
      });
  }

  public editEvent(map: Map<number, UpdateEventDto>): void {
    const firstEntry = map.entries().next();

    if (firstEntry.done) {
      console.error('Map is empty. No event to edit');
      return;
    }

    const [id, editEventDto] = firstEntry.value;

    this.loadingHolderService.isLoading = true;
    this.hostEventService
      .updateEvent(id, editEventDto)
      .pipe(finalize(() => (this.loadingHolderService.isLoading = false)))
      .subscribe({
        next: () => {
          this.getHostEvents();
        },
        error: (error) => {
          console.error('Error editing event', error);
        },
      });
  }

  public deleteEvent(eventDto: EventDto): void {
    this.loadingHolderService.isLoading = true;
    this.hostEventService.deleteEvent(eventDto.id)
      .pipe(finalize(() => (this.loadingHolderService.isLoading = false)))
      .subscribe({
        next: () => {
          this.getHostEvents();
        },
        error: (error) => {
          console.error('Error deleting event', error);
        },
      });
  }

  public saveCoHosts(): void {}
}
