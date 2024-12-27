import { Test, TestingModule } from "@nestjs/testing";
import { UserRepositories } from "./user.repositories";
import { QueryBuilder } from "src/database/query-builder";
import { QueryTypes } from "sequelize";
import * as dayjs from "dayjs";
import { CreateUserDto } from "../dto/create-user.dto";
import { UpdateUserDto } from "../dto/update-user.dto";
import { GetAllDto } from "src/common/dtos/common.dto";
import { User } from "src/models";

jest.mock("src/database/query-builder");

describe("UserRepositories", () => {
  let userRepositories: UserRepositories;

  const mockQueryBuilder = {
    select: jest.fn().mockReturnThis(),
    from: jest.fn().mockReturnThis(),
    where: jest.fn().mockReturnThis(),
    search: jest.fn().mockReturnThis(),
    orderBy: jest.fn().mockReturnThis(),
    limit: jest.fn().mockReturnThis(),
    offset: jest.fn().mockReturnThis(),
    insert: jest.fn().mockReturnThis(),
    update: jest.fn().mockReturnThis(),
    execute: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserRepositories,
        {
          provide: QueryBuilder,
          useValue: mockQueryBuilder,
        },
      ],
    }).compile();

    userRepositories = module.get<UserRepositories>(UserRepositories);
  });

  it("should be defined", () => {
    expect(userRepositories).toBeDefined();
  });

  describe("findAll", () => {
    it("should return a list of users", async () => {
      const query: GetAllDto = {
        page: 0,
        limit: 10,
        order: "id",
        sort: "ASC",
        search: "test",
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
      mockQueryBuilder.execute.mockResolvedValue(mockUsers);

      const result = await userRepositories.findAll(
        query.page,
        query.limit,
        query.order,
        query.sort,
        query.search,
      );

      expect(mockQueryBuilder.select).toHaveBeenCalledWith("*");
      expect(mockQueryBuilder.from).toHaveBeenCalledWith("user");
      expect(mockQueryBuilder.where).toHaveBeenCalledWith({});
      expect(mockQueryBuilder.search).toHaveBeenCalledWith(
        ["name", "email"],
        query.search,
      );
      expect(mockQueryBuilder.orderBy).toHaveBeenCalledWith(
        query.order,
        query.sort,
      );
      expect(mockQueryBuilder.limit).toHaveBeenCalledWith(query.limit);
      expect(mockQueryBuilder.offset).toHaveBeenCalledWith(query.page);
      expect(mockQueryBuilder.execute).toHaveBeenCalledWith(QueryTypes.SELECT);
      expect(result).toEqual(mockUsers);
    });
  });

  describe("findOne", () => {
    it("should return a single user", async () => {
      const where = { id: 1 };
      const mockUser: User = {
        id: 1,
        name: "Test User",
        email: "user@test.com",
        password: "password",
        role: "user",
      } as User;
      mockQueryBuilder.execute.mockResolvedValue([mockUser]);

      const result = await userRepositories.findOne(where);

      expect(mockQueryBuilder.select).toHaveBeenCalledWith("*");
      expect(mockQueryBuilder.from).toHaveBeenCalledWith("user");
      expect(mockQueryBuilder.where).toHaveBeenCalledWith(where);
      expect(mockQueryBuilder.limit).toHaveBeenCalledWith(1);
      expect(mockQueryBuilder.offset).toHaveBeenCalledWith(0);
      expect(mockQueryBuilder.execute).toHaveBeenCalledWith(QueryTypes.SELECT);
      expect(result).toEqual(mockUser);
    });
  });

  describe("create", () => {
    it("should insert a new user", async () => {
      const mockUser: CreateUserDto = {
        name: "Test User",
        email: "user@test.com",
        password: "password",
        role: "user",
      };
      const name = "admin";

      await userRepositories.create(mockUser, name);

      expect(mockQueryBuilder.insert).toHaveBeenCalledWith(
        "user",
        mockUser,
        name,
      );
      expect(mockQueryBuilder.execute).toHaveBeenCalledWith(QueryTypes.INSERT);
    });
  });

  describe("update", () => {
    it("should update a user", async () => {
      const mockUser: UpdateUserDto = {
        name: "Updated User",
        email: "",
        password: "",
        role: "",
      };
      const name = "admin";

      await userRepositories.update(1, mockUser, name);

      expect(mockQueryBuilder.update).toHaveBeenCalledWith(
        "user",
        mockUser,
        name,
      );
      expect(mockQueryBuilder.where).toHaveBeenCalledWith({ id: 1 });
      expect(mockQueryBuilder.execute).toHaveBeenCalledWith(QueryTypes.UPDATE);
    });
  });

  describe("delete", () => {
    it("should soft delete a user", async () => {
      const mockTimestamp = dayjs().format("YYYY-MM-DD HH:mm:ss ZZ");
      jest.spyOn(dayjs.prototype, "format").mockReturnValue(mockTimestamp);

      await userRepositories.delete(1, "admin");

      expect(mockQueryBuilder.update).toHaveBeenCalledWith("user", {
        deleted_at: mockTimestamp,
        deleted_by: "admin",
      });
      expect(mockQueryBuilder.where).toHaveBeenCalledWith({ id: 1 });
      expect(mockQueryBuilder.execute).toHaveBeenCalledWith(QueryTypes.UPDATE);
    });
  });
});
