import { CoreRootingModule } from './core-rooting.module';

describe('CoreRootingModule', () => {
  let coreRootingModule: CoreRootingModule;

  beforeEach(() => {
    coreRootingModule = new CoreRootingModule();
  });

  it('should create an instance', () => {
    expect(coreRootingModule).toBeTruthy();
  });
});
