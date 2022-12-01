import { useHook } from ".";

describe("react", () => {
  it("should return react & shared-kernel", () => {
    expect(useHook()).toEqual("react & shared-kernel");
  });
});
