import { CommandesModule } from './commandes.module';

describe('CommandesModule', () => {
  let commandesModule: CommandesModule;

  beforeEach(() => {
    commandesModule = new CommandesModule();
  });

  it('should create an instance', () => {
    expect(commandesModule).toBeTruthy();
  });
});
