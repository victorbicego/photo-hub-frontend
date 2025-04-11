import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockUsersModalComponent } from './block-users-modal.component';

describe('BlockUsersModalComponent', () => {
  let component: BlockUsersModalComponent;
  let fixture: ComponentFixture<BlockUsersModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlockUsersModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BlockUsersModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
