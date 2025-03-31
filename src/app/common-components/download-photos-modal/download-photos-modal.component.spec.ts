import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DownloadPhotosModalComponent } from './download-photos-modal.component';

describe('DownloadPhotosModalComponent', () => {
  let component: DownloadPhotosModalComponent;
  let fixture: ComponentFixture<DownloadPhotosModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DownloadPhotosModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DownloadPhotosModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
