import { TestBed } from '@angular/core/testing';

import { GestionstocksService } from './gestionstocks.service';

describe('GestionstocksService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GestionstocksService = TestBed.get(GestionstocksService);
    expect(service).toBeTruthy();
  });
});
