import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEventPhotoGalleryComponent } from './admin-event-photo-gallery.component';

describe('AdminEventPhotoGalleryComponent', () => {
  let component: AdminEventPhotoGalleryComponent;
  let fixture: ComponentFixture<AdminEventPhotoGalleryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminEventPhotoGalleryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminEventPhotoGalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
