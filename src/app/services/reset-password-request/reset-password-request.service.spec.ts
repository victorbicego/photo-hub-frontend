import { TestBed } from '@angular/core/testing';

import { ResetPasswordRequestService } from './reset-password-request.service';

describe('ResetPasswordRequestService', () => {
  let service: ResetPasswordRequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResetPasswordRequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
