import { Test, TestingModule } from "@nestjs/testing";
import { HttpException, HttpStatus } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserRepositories } from "../repositories/user.repositories";
import { CreateUserDto } from "../dto/create-user.dto";
import { UpdateUserDto } from "../dto/update-user.dto";
import { IdDto, GetAllDto } from "src/common/dtos/common.dto";
import { User } from "src/models";
import * as bcrypt from "bcryptjs";

jest.mock("bcryptjs");

describe("UserService", () => {
  let userService: UserService;

  const mockUserRepositories = {
    findAll: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: UserRepositories,
          useValue: mockUserRepositories,
        },
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
  });

  it("should be defined", () => {
    expect(userService).toBeDefined();
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
      const mockUsers: User[] = [
        {
          id: 1,
          name: "Test User",
          email: "user@test.com",
          password: "password",
          role: "user",
        } as User,
      ];

      mockUserRepositories.findAll.mockResolvedValue(mockUsers);

      const result = await userService.getAllUsers(query);
      expect(result).toEqual(mockUsers);
      expect(mockUserRepositories.findAll).toHaveBeenCalledWith(
        query.page,
        query.limit,
        query.order,
        query.sort,
        query.search,
      );
    });
  });

  describe("getUserById", () => {
    const param: IdDto = { id: 1 };
    it("should return a user if found", async () => {
      const mockUser: User = {
        id: 1,
        name: "Test User",
        email: "user@test.com",
        password: "password",
        role: "user",
      } as User;

      mockUserRepositories.findOne.mockResolvedValue(mockUser);

      const result = await userService.getUserById(param);
      expect(result).toEqual(mockUser);
      expect(mockUserRepositories.findOne).toHaveBeenCalledWith({
        id: param.id,
      });
    });

    it("should throw an exception if user is not found", async () => {
      mockUserRepositories.findOne.mockResolvedValue(null);

      const result = userService.getUserById(param);
      await expect(result).rejects.toThrow(
        new HttpException(
          "findUserWithId: User not found",
          HttpStatus.NOT_FOUND,
        ),
      );
    });
  });

  describe("createUser", () => {
    it("should create a new user", async () => {
      const mockUser: CreateUserDto = {
        name: "Test User",
        email: "user@test.com",
        password: "password",
        role: "user",
      };
      const profile = { name: "Admin" };

      mockUserRepositories.findOne.mockResolvedValue(null);
      (bcrypt.hash as jest.Mock).mockResolvedValue("hashedPassword");
      mockUserRepositories.create.mockResolvedValue(null);

      const result = await userService.createUser(mockUser, profile);

      expect(result).toBeNull();
      expect(mockUserRepositories.findOne).toHaveBeenCalledWith({
        email: "user@test.com",
      });
      expect(mockUserRepositories.create).toHaveBeenCalledWith(
        { ...mockUser, password: "hashedPassword" },
        "Admin",
      );
    });

    it("should throw an exception if user already exists", async () => {
      const mockUser: CreateUserDto = {
        name: "Test User",
        email: "user@test.com",
        password: "password",
        role: "user",
      };
      const profile = { name: "Admin" };

      mockUserRepositories.findOne.mockResolvedValue(mockUser);

      const result = userService.createUser(mockUser, profile);

      await expect(result).rejects.toThrow(
        new HttpException(
          "findUserWithEmail: User already exist",
          HttpStatus.BAD_REQUEST,
        ),
      );
    });
  });

  describe("updateUser", () => {
    const param: IdDto = { id: 1 };
    it("should update an existing user", async () => {
      const mockUser: UpdateUserDto = {
        name: "Updated User",
        email: "",
        password: "",
        role: "",
      };
      const profile = { name: "Admin" };

      mockUserRepositories.findOne.mockResolvedValue(mockUser);
      mockUserRepositories.update.mockResolvedValue(null);

      const result = await userService.updateUser(param, mockUser, profile);

      expect(result).toBeNull();
      expect(mockUserRepositories.update).toHaveBeenCalledWith(
        1,
        mockUser,
        "Admin",
      );
    });

    it("should throw an exception if user is not found", async () => {
      const mockUser: UpdateUserDto = {
        name: "Updated User",
        email: "",
        password: "",
        role: "",
      };
      const profile = { name: "Admin" };

      mockUserRepositories.findOne.mockResolvedValue(null);

      await expect(
        userService.updateUser(param, mockUser, profile),
      ).rejects.toThrow(
        new HttpException(
          "findUserWithId: User not found",
          HttpStatus.NOT_FOUND,
        ),
      );
    });
  });

  describe("deleteUser", () => {
    const param: IdDto = { id: 1 };
    it("should delete a user", async () => {
      const profile = { name: "Admin" };

      mockUserRepositories.findOne.mockResolvedValue({ id: 1 } as User);
      mockUserRepositories.delete.mockResolvedValue(null);

      const result = await userService.deleteUser(param, profile);

      expect(result).toBeNull();
      expect(mockUserRepositories.delete).toHaveBeenCalledWith(
        param.id,
        "Admin",
      );
    });

    it("should throw an exception if user is not found", async () => {
      const profile = { name: "Admin" };

      mockUserRepositories.findOne.mockResolvedValue(null);

      await expect(userService.deleteUser(param, profile)).rejects.toThrow(
        new HttpException(
          "findUserWithId: User not found",
          HttpStatus.NOT_FOUND,
        ),
      );
    });
  });
});
