import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EventDto } from '../../../../interfaces/event-dto';
import { CommonModule } from '@angular/common';
import { HostEventService } from '../../../../services/host-event/host-event.service';
import { LoadingHolderService } from '../../../../services/holders/loading-holder/loading-holder.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-event-hosts-modal',
  imports: [FormsModule, CommonModule],
  templateUrl: './event-hosts-modal.component.html',
  styleUrl: './event-hosts-modal.component.scss',
})
export class EventHostsModalComponent {
  @Input() event: EventDto | null = null;

  @Output() emitClose = new EventEmitter<void>();
  @Output() emitSaveCoHostsEvent = new EventEmitter<EventDto>();

  newCoHost: string = '';
  isInputError: boolean = false;

  constructor(
    private hostEventService: HostEventService,
    private loadingHolderService: LoadingHolderService
  ) {}

  public onClose(): void {
    this.emitClose.emit();
  }

  public onAddCoHosts(): void {
    if (this.event) {
      this.emitSaveCoHostsEvent.emit(this.event);
      this.emitClose.emit();
    }
  }

  public onDeleteCohost(cohost: any): void {
    if (this.event?.coHosts) {
      this.event.coHosts = this.event.coHosts.filter((c) => c !== cohost);
    }
  }

  public onAddCohostField(): void {
    if (this.newCoHost && this.event) {
      this.loadingHolderService.isLoading = true;
      this.hostEventService
        .getCoHosts(this.newCoHost)
        .pipe(finalize(() => (this.loadingHolderService.isLoading = false)))
        .subscribe({
          next: (response) => {
            this.event!.coHosts.push(response.data);
            this.newCoHost = '';
          },
          error: (error) => {
            console.error('Error saving co-hosts', error);
            if (error.status === 404) {
              this.isInputError = true;
            }
          },
        });
    }
  }

  public resetInputError(): void {
    if (this.isInputError) {
      this.isInputError = false;
    }
  }
}
