import { Test, TestingModule } from '@nestjs/testing';
import { ModuleRoleService } from './module-role.service';

describe('ModuleRoleService', () => {
  let service: ModuleRoleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ModuleRoleService],
    }).compile();

    service = module.get<ModuleRoleService>(ModuleRoleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
