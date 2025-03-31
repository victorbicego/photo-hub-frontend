import { TestBed } from '@angular/core/testing';

import { MatchedFaceHolderService } from './matched-face-holder.service';

describe('MatchedFaceHolderService', () => {
  let service: MatchedFaceHolderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MatchedFaceHolderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
