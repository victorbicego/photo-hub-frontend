import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventsGalleryToolbarComponent } from './events-gallery-toolbar.component';

describe('EventsGalleryToolbarComponent', () => {
  let component: EventsGalleryToolbarComponent;
  let fixture: ComponentFixture<EventsGalleryToolbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventsGalleryToolbarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EventsGalleryToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
