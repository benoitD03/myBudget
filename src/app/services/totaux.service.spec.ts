import { TestBed } from '@angular/core/testing';

import { TotauxService } from './totaux.service';

describe('TotauxService', () => {
  let service: TotauxService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TotauxService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
