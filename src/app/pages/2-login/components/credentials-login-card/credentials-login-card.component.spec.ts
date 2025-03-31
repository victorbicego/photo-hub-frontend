import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CredentialsLoginCardComponent } from './credentials-login-card.component';

describe('CredentialsLoginCardComponent', () => {
  let component: CredentialsLoginCardComponent;
  let fixture: ComponentFixture<CredentialsLoginCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CredentialsLoginCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CredentialsLoginCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
