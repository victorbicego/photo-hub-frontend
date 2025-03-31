import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventPhotoGalleryComponent } from './event-photo-gallery.component';

describe('EventPhotoGalleryComponent', () => {
  let component: EventPhotoGalleryComponent;
  let fixture: ComponentFixture<EventPhotoGalleryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventPhotoGalleryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventPhotoGalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
