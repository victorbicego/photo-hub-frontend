import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventGalleryToolbarComponent } from './event-gallery-toolbar.component';

describe('EventsGalleryToolbarComponent', () => {
  let component: EventGalleryToolbarComponent;
  let fixture: ComponentFixture<EventGalleryToolbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventGalleryToolbarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EventGalleryToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
