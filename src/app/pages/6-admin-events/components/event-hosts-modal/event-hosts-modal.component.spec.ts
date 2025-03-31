import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventHostsModalComponent } from './event-hosts-modal.component';

describe('EventHostsModalComponent', () => {
  let component: EventHostsModalComponent;
  let fixture: ComponentFixture<EventHostsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventHostsModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventHostsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
