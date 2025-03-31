import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QrCodeLoginCardComponent } from './qr-code-login-card.component';

describe('QrCodeLoginCardComponent', () => {
  let component: QrCodeLoginCardComponent;
  let fixture: ComponentFixture<QrCodeLoginCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QrCodeLoginCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(QrCodeLoginCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
