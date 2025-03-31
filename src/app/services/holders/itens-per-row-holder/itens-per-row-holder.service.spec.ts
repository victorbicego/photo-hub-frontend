import { TestBed } from '@angular/core/testing';

import { ItensPerRowHolderService } from './itens-per-row-holder.service';

describe('ItensPerRowHolderService', () => {
  let service: ItensPerRowHolderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ItensPerRowHolderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
