import { sharedKernel } from ".";

describe("shared-kernel", () => {
  it("should return shared-kernel", () => {
    expect(sharedKernel()).toEqual("shared-kernel");
  });
});
