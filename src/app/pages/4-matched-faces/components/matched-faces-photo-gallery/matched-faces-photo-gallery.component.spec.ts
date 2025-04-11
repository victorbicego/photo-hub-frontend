import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchedFacesPhotoGalleryComponent } from './matched-faces-photo-gallery.component';

describe('MatchedFacesPhotoGalleryComponent', () => {
  let component: MatchedFacesPhotoGalleryComponent;
  let fixture: ComponentFixture<MatchedFacesPhotoGalleryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatchedFacesPhotoGalleryComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MatchedFacesPhotoGalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
