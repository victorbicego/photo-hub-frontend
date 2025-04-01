import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEventGalleryToolbarComponent } from './admin-event-gallery-toolbar.component';

describe('AdminEventGalleryToolbarComponent', () => {
  let component: AdminEventGalleryToolbarComponent;
  let fixture: ComponentFixture<AdminEventGalleryToolbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminEventGalleryToolbarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminEventGalleryToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
