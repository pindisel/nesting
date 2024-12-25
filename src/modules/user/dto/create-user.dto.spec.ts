import { validate } from "class-validator";
import { CreateUserDto } from "./create-user.dto";

describe("CreateUserDto", () => {
  let dto: CreateUserDto;

  beforeEach(() => {
    dto = new CreateUserDto();
  });

  it("should pass validation with valid data", async () => {
    dto.name = "Test User";
    dto.email = "user@test.com";
    dto.password = "password";
    dto.role = "user";

    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });

  it("should fail validation if name is empty", async () => {
    dto.name = "";
    dto.email = "user@test.com";
    dto.password = "password";

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].constraints?.isNotEmpty).toBeDefined();
  });

  it("should fail validation if email is invalid", async () => {
    dto.name = "Test User";
    dto.email = "not-an-email";
    dto.password = "password";
    dto.role = "user";

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].constraints?.isEmail).toBeDefined();
  });

  it("should fail validation if password is empty", async () => {
    dto.name = "Test User";
    dto.email = "user@test.com";
    dto.password = "";
    dto.role = "user";

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].constraints?.isNotEmpty).toBeDefined();
  });

  it("should fail validation if role is empty", async () => {
    dto.name = "Test User";
    dto.email = "user@test.com";
    dto.password = "password";
    dto.role = "";

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].constraints?.isNotEmpty).toBeDefined();
  });
});
