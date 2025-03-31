import { TestBed } from '@angular/core/testing';

import { LoadingHolderService } from './loading-holder.service';

describe('LoadingHolderService', () => {
  let service: LoadingHolderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoadingHolderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
