import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchedFacesComponent } from './matched-faces.component';

describe('MatchedFacesComponent', () => {
  let component: MatchedFacesComponent;
  let fixture: ComponentFixture<MatchedFacesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatchedFacesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MatchedFacesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
