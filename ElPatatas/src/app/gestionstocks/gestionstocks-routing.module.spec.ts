import { GestionStocksRoutingModule } from './gestionstocks-routing.module';

describe('GestionStocksRoutingModule', () => {
  let gestionStocksRoutingModule: GestionStocksRoutingModule;

  beforeEach(() => {
    gestionStocksRoutingModule = new GestionStocksRoutingModule();
  });

  it('should create an instance', () => {
    expect(gestionStocksRoutingModule).toBeTruthy();
  });
});