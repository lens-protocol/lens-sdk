import { useHook } from ".";

describe("react", () => {
  it("should return react & shared-kernel", () => {
    expect(useHook()).toEqual({
      message: "react & shared-kernel",
      success: true,
    });
  });
});
