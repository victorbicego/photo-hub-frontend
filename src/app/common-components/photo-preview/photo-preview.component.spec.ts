import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotoPreviewComponent } from './photo-preview.component';

describe('PhotoPreviewComponent', () => {
  let component: PhotoPreviewComponent;
  let fixture: ComponentFixture<PhotoPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PhotoPreviewComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PhotoPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
