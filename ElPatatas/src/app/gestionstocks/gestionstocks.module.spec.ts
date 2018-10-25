import { GestionstocksModule } from './gestionstocks.module';

describe('GestionstocksModule', () => {
  let gestionstocksModule: GestionstocksModule;

  beforeEach(() => {
    gestionstocksModule = new GestionstocksModule();
  });

  it('should create an instance', () => {
    expect(gestionstocksModule).toBeTruthy();
  });
});
