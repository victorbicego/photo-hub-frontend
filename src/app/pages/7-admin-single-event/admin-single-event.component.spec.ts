import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSingleEventComponent } from './admin-single-event.component';

describe('AdminSingleEventComponent', () => {
  let component: AdminSingleEventComponent;
  let fixture: ComponentFixture<AdminSingleEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminSingleEventComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminSingleEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
