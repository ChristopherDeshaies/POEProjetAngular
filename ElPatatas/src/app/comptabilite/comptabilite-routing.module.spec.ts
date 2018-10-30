import { ComptabiliteRoutingModule } from './comptabilite-routing.module';

describe('ComptabiliteRoutingModule', () => {
  let comptabiliteRoutingModule: ComptabiliteRoutingModule;

  beforeEach(() => {
    comptabiliteRoutingModule = new ComptabiliteRoutingModule();
  });

  it('should create an instance', () => {
    expect(comptabiliteRoutingModule).toBeTruthy();
  });
});
