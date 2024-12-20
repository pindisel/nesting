import { LoginDto } from "./auth.dto";

describe("CreateAuthDto", () => {
  it("should be defined", () => {
    expect(new LoginDto()).toBeDefined();
  });
});
