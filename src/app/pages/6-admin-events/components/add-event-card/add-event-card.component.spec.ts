import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEventCardComponent } from './add-event-card.component';

describe('AddEventCardComponent', () => {
  let component: AddEventCardComponent;
  let fixture: ComponentFixture<AddEventCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEventCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AddEventCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
