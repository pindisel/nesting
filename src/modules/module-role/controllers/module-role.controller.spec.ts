import { Test, TestingModule } from '@nestjs/testing';
import { ModuleRoleController } from './module-role.controller';

describe('ModuleRoleController', () => {
  let controller: ModuleRoleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ModuleRoleController],
    }).compile();

    controller = module.get<ModuleRoleController>(ModuleRoleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
