import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchedFacesGalleryToolbarComponent } from './matched-faces-gallery-toolbar.component';

describe('MatchedFacesGalleryToolbarComponent', () => {
  let component: MatchedFacesGalleryToolbarComponent;
  let fixture: ComponentFixture<MatchedFacesGalleryToolbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatchedFacesGalleryToolbarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MatchedFacesGalleryToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
