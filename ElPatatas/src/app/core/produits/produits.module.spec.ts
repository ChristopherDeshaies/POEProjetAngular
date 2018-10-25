import { ProduitsModule } from './produits.module';

describe('ProduitsModule', () => {
  let produitsModule: ProduitsModule;

  beforeEach(() => {
    produitsModule = new ProduitsModule();
  });

  it('should create an instance', () => {
    expect(produitsModule).toBeTruthy();
  });
});
