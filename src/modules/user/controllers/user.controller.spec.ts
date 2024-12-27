import { Test, TestingModule } from "@nestjs/testing";

import { GetAllDto, IdDto } from "src/common/dtos/common.dto";
import { User } from "src/models";
import { ModuleRoleRepositories } from "src/modules/module-role/repositories/module-role.repositories";
import { ModuleRoleService } from "src/modules/module-role/services/module-role.service";
import { UserRepositories } from "src/modules/user/repositories/user.repositories";
import { UserService } from "../services/user.service";
import { CreateUserDto } from "../dto/create-user.dto";
import { UpdateUserDto } from "../dto/update-user.dto";
import { UserController } from "./user.controller";
import { JwtAuthGuard } from "src/shared/guards/jwt.guard";
import { RoleGuard } from "src/shared/guards/role.guard";
import { MockJwtAuthGuard } from "src/shared/tests/jwt-auth-guard-mock";
import { MockRoleGuard } from "src/shared/tests/role-guard-mock";

const hasPermission = (moduleName: string, role: string) =>
  moduleName === "users" && role === "Admin";

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
      .useValue(new MockRoleGuard(hasPermission))
      .compile();

    userController = module.get<UserController>(UserController);
  });

  it("should be defined", () => {
    expect(userController).toBeDefined();
  });

  describe("getAllUsers", () => {
    it("should return an array of users", async () => {
      const query: GetAllDto = {
        page: 0,
        limit: 10,
        order: "id",
        sort: "ASC",
        search: "",
      };
      const mockUser: User[] = [
        {
          id: 1,
          name: "Test User",
          email: "user@test.com",
          password: "password",
          role: "user",
        } as User,
      ];
      mockUserService.getAllUsers.mockResolvedValue(mockUser);

      const result = await userController.getAllUsers(query);
      expect(result).toEqual(mockUser);
      expect(mockUserService.getAllUsers).toHaveBeenCalledWith(query);
    });
  });

  describe("getUserById", () => {
    it("should return a user by ID", async () => {
      const param: IdDto = { id: 1 };
      const mockUser: User = {
        id: 1,
        name: "Test User",
        email: "user@test.com",
        password: "password",
        role: "user",
      } as User;

      mockUserService.getUserById.mockResolvedValue(mockUser);

      const result = await userController.getUserById(param);
      expect(result).toEqual(mockUser);
      expect(mockUserService.getUserById).toHaveBeenCalledWith(param);
    });
  });

  describe("createUser", () => {
    it("should create a new user", async () => {
      const req = {
        user: {
          name: "Admin",
        },
      };
      const mockUser: CreateUserDto = {
        name: "Test User",
        email: "user@test.com",
        password: "password",
        role: "user",
      };
      mockUserService.createUser.mockResolvedValue(mockUser);

      const result = await userController.createUser(mockUser, req);
      expect(result).toEqual(mockUser);
      expect(mockUserService.createUser).toHaveBeenCalledWith(
        mockUser,
        req.user,
      );
    });
  });

  describe("updateUser", () => {
    it("should update a user", async () => {
      const mockUser: UpdateUserDto = {
        name: "Updated User",
        email: "",
        password: "",
        role: "",
      };
      mockUserService.updateUser.mockResolvedValue(mockUser);
      const req = {
        user: {
          name: "Admin",
        },
      };

      const param: IdDto = { id: 1 };
      expect(await userController.updateUser(param, mockUser, req)).toEqual(
        mockUser,
      );
      expect(mockUserService.updateUser).toHaveBeenCalledWith(
        param,
        mockUser,
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

      await userController.deleteUser(param, req);
      expect(mockUserService.deleteUser).toHaveBeenCalledWith(param, req.user);
    });
  });
});
