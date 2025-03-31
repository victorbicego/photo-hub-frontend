import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletePhotosModalComponent } from './delete-photos-modal.component';

describe('DeletePhotosModalComponent', () => {
  let component: DeletePhotosModalComponent;
  let fixture: ComponentFixture<DeletePhotosModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeletePhotosModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeletePhotosModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
