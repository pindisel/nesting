import { Test, TestingModule } from "@nestjs/testing";
import { UserController } from "./user.controller";
import { UserService } from "../services/user.service";
import { CreateUserDto } from "../dto/create-user.dto";
import { UpdateUserDto } from "../dto/update-user.dto";
import { GetAllDto, IdDto } from "src/common/dtos/common.dto";
import { JwtAuthGuard } from "src/shared/guards/jwt.guard";
import { RoleGuard } from "src/shared/guards/role.guard";
import { User } from "src/models";
import { ModuleName } from "src/common/decorators/auth-module.decorator";
import { ModuleRoleRepositories } from "src/modules/module-role/repositories/module-role.repositories";
import { ModuleRoleService } from "src/modules/module-role/services/module-role.service";
import { UserRepositories } from "src/modules/user/repositories/user.repositories";
import { MockJwtAuthGuard } from "src/shared/tests/jwt-auth-guard-mock";
import { MockRoleGuard } from "src/shared/tests/role-guard-mock";

describe("UserController", () => {
  let userController: UserController;

  const mockUserService = {
    getAllUsers: jest.fn(),
    createUser: jest.fn(),
    getUserById: jest.fn(),
    updateUser: jest.fn(),
    deleteUser: jest.fn(),
  };

  const mockUserRepositories = {
    findAll: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  };

  const mockModuleRoleService = {
    hasPermission: jest.fn(),
  };

  const mockModuleRoleRepositories = {
    findOne: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: mockUserService,
        },
        {
          provide: UserRepositories,
          useValue: mockUserRepositories,
        },
        {
          provide: ModuleRoleService,
          useValue: mockModuleRoleService,
        },
        {
          provide: ModuleRoleRepositories,
          useValue: mockModuleRoleRepositories,
        },
      ],
    })
      .overrideGuard(JwtAuthGuard)
      .useClass(MockJwtAuthGuard)
      .overrideGuard(RoleGuard)
      .useValue(
        new MockRoleGuard(
          (moduleName, role) => moduleName === "users" && role === "Admin",
        ),
      )
      .compile();

    userController = module.get<UserController>(UserController);
  });

  it("should be defined", () => {
    expect(userController).toBeDefined();
  });

  describe("getAllUsers", () => {
    it("should return an array of users", async () => {
      const result: User[] = [
        {
          id: 1,
          name: "Test User",
          email: "user@test.com",
          password: "password",
          role: "user",
        } as User,
      ];
      mockUserService.getAllUsers.mockResolvedValue(result);

      const query: GetAllDto = {
        page: 0,
        limit: 10,
        order: "id",
        sort: "ASC",
        search: "",
      };
      expect(await userController.getAllUsers(query)).toEqual(result);
      expect(mockUserService.getAllUsers).toHaveBeenCalledWith(query);
    });
  });

  describe("createUser", () => {
    it("should create a new user", async () => {
      const dto: CreateUserDto = {
        name: "Test User",
        email: "user@test.com",
        password: "password",
        role: "user",
      };
      mockUserService.createUser.mockResolvedValue(dto);
      const req = {
        user: {
          name: "Admin",
        },
      };

      expect(await userController.createUser(dto, req)).toEqual(dto);
      expect(mockUserService.createUser).toHaveBeenCalledWith(dto, req.user);
    });
  });

  describe("getUserById", () => {
    it("should return a user by ID", async () => {
      const result: User = {
        id: 1,
        name: "Test User",
        email: "user@test.com",
        password: "password",
        role: "user",
      } as User;
      mockUserService.getUserById.mockResolvedValue(result);

      const param: IdDto = { id: 1 };
      expect(await userController.getUserById(param)).toEqual(result);
      expect(mockUserService.getUserById).toHaveBeenCalledWith(param);
    });
  });

  describe("updateUser", () => {
    it("should update a user", async () => {
      const dto: UpdateUserDto = {
        name: "Updated User",
        email: "",
        password: "",
        role: "",
      };
      mockUserService.updateUser.mockResolvedValue(dto);
      const req = {
        user: {
          name: "Admin",
        },
      };

      const param: IdDto = { id: 1 };
      expect(await userController.updateUser(param, dto, req)).toEqual(dto);
      expect(mockUserService.updateUser).toHaveBeenCalledWith(
        param,
        dto,
        req.user,
      );
    });
  });

  describe("deleteUser", () => {
    it("should delete a user", async () => {
      const param: IdDto = { id: 1 };
      mockUserService.deleteUser.mockResolvedValue(undefined);
      const req = {
        user: {
          name: "Admin",
        },
      };

      expect(await userController.deleteUser(param, req)).toBeUndefined();
      expect(mockUserService.deleteUser).toHaveBeenCalledWith(param, req.user);
    });
  });
});
