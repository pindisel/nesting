import { validate } from "class-validator";
import { UpdateUserDto } from "./update-user.dto";

describe("UpdateUserDto", () => {
  let dto: UpdateUserDto;

  beforeEach(() => {
    dto = new UpdateUserDto();
  });

  it("should pass validation with valid data", async () => {
    dto.name = "Test User";
    dto.email = "user@test.com";
    dto.password = "password";
    dto.role = "user";

    const errors = await validate(dto);
    expect(errors.length).toBe(0);
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
});
