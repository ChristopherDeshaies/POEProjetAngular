import { ComptabiliteModule } from './comptabilite.module';

describe('ComptabiliteModule', () => {
  let comptabiliteModule: ComptabiliteModule;

  beforeEach(() => {
    comptabiliteModule = new ComptabiliteModule();
  });

  it('should create an instance', () => {
    expect(comptabiliteModule).toBeTruthy();
  });
});
