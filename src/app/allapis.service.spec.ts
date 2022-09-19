import { TestBed } from '@angular/core/testing';

import { AllapisService } from './allapis.service';

describe('AllapisService', () => {
  let service: AllapisService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AllapisService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
