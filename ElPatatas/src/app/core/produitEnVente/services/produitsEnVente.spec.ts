import { TestBed } from '@angular/core/testing';

import { ProduitsEnVenteService } from './produitsEnVente';

describe('ProduitsEnVenteService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProduitsEnVenteService = TestBed.get(ProduitsEnVenteService);
    expect(service).toBeTruthy();
  });
});
