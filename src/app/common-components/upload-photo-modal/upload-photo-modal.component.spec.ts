import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadPhotoModalComponent } from './upload-photo-modal.component';

describe('UploadPhotoComponent', () => {
  let component: UploadPhotoModalComponent;
  let fixture: ComponentFixture<UploadPhotoModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UploadPhotoModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UploadPhotoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
