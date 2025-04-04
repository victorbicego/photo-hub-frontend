import { TestBed } from '@angular/core/testing';

import { ItemsPerRowHolderService } from './items-per-row-holder.service';

describe('ItemsPerRowHolderService', () => {
  let service: ItemsPerRowHolderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ItemsPerRowHolderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
