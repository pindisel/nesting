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
  let service: UserService;
  let userRepositories: jest.Mocked<UserRepositories>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: UserRepositories,
          useValue: {
            findAll: jest.fn(),
            findOne: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    userRepositories = module.get<UserRepositories>(
      UserRepositories,
    ) as jest.Mocked<UserRepositories>;
  });

  describe("getAllUsers", () => {
    it("should return an array of users", async () => {
      const query: GetAllDto = {
        page: 1,
        limit: 10,
        order: "ASC",
        sort: "id",
        search: "",
      };
      const mockUsers: User[] = [
        { id: 1, email: "test@example.com", password: "hashed" } as User,
      ];

      userRepositories.findAll.mockResolvedValue(mockUsers);

      const result = await service.getAllUsers(query);
      expect(result).toEqual(mockUsers);
      expect(userRepositories.findAll).toHaveBeenCalledWith(
        1,
        10,
        "ASC",
        "id",
        "",
      );
    });
  });

  describe("getUserById", () => {
    it("should return a user if found", async () => {
      const param: IdDto = { id: 1 };
      const mockUser: User = {
        id: 1,
        email: "test@example.com",
        password: "hashed",
      } as User;

      userRepositories.findOne.mockResolvedValue(mockUser);

      const result = await service.getUserById(param);
      expect(result).toEqual(mockUser);
      expect(userRepositories.findOne).toHaveBeenCalledWith({ id: 1 });
    });

    it("should throw an exception if user is not found", async () => {
      const param: IdDto = { id: 1 };

      userRepositories.findOne.mockResolvedValue(null);

      await expect(service.getUserById(param)).rejects.toThrowError(
        new HttpException(
          "findUserWithId: User not found",
          HttpStatus.NOT_FOUND,
        ),
      );
    });
  });

  describe("createUser", () => {
    it("should create a new user", async () => {
      const body: CreateUserDto = {
        email: "test@example.com",
        password: "password123",
      };
      const profile = { name: "Admin" };

      userRepositories.findOne.mockResolvedValue(null);
      (bcrypt.hash as jest.Mock).mockResolvedValue("hashedPassword");
      userRepositories.create.mockResolvedValue(body);

      const result = await service.createUser(body, profile);

      expect(result).toEqual(body);
      expect(userRepositories.findOne).toHaveBeenCalledWith({
        email: "test@example.com",
      });
      expect(userRepositories.create).toHaveBeenCalledWith(
        { ...body, password: "hashedPassword" },
        "Admin",
      );
    });

    it("should throw an exception if user already exists", async () => {
      const body: CreateUserDto = {
        email: "test@example.com",
        password: "password123",
      };
      const profile = { name: "Admin" };

      userRepositories.findOne.mockResolvedValue({ id: 1 } as User);

      await expect(service.createUser(body, profile)).rejects.toThrowError(
        new HttpException(
          "findUserWithEmail: User already exist",
          HttpStatus.BAD_REQUEST,
        ),
      );
    });
  });

  describe("updateUser", () => {
    it("should update an existing user", async () => {
      const param: IdDto = { id: 1 };
      const body: UpdateUserDto = { email: "new@example.com" };
      const profile = { name: "Admin" };

      userRepositories.findOne.mockResolvedValue({ id: 1 } as User);
      userRepositories.update.mockResolvedValue(body);

      const result = await service.updateUser(param, body, profile);

      expect(result).toEqual(body);
      expect(userRepositories.update).toHaveBeenCalledWith(1, body, "Admin");
    });

    it("should throw an exception if user is not found", async () => {
      const param: IdDto = { id: 1 };
      const body: UpdateUserDto = { email: "new@example.com" };
      const profile = { name: "Admin" };

      userRepositories.findOne.mockResolvedValue(null);

      await expect(
        service.updateUser(param, body, profile),
      ).rejects.toThrowError(
        new HttpException(
          "findUserWithId: Customer not found",
          HttpStatus.NOT_FOUND,
        ),
      );
    });
  });

  describe("deleteUser", () => {
    it("should delete a user", async () => {
      const param: IdDto = { id: 1 };
      const profile = { name: "Admin" };

      userRepositories.findOne.mockResolvedValue({ id: 1 } as User);
      userRepositories.delete.mockResolvedValue(null);

      const result = await service.deleteUser(param, profile);

      expect(result).toBeNull();
      expect(userRepositories.delete).toHaveBeenCalledWith(1, "Admin");
    });

    it("should throw an exception if user is not found", async () => {
      const param: IdDto = { id: 1 };
      const profile = { name: "Admin" };

      userRepositories.findOne.mockResolvedValue(null);

      await expect(service.deleteUser(param, profile)).rejects.toThrowError(
        new HttpException(
          "findUserWithId: Customer not found",
          HttpStatus.NOT_FOUND,
        ),
      );
    });
  });
});
