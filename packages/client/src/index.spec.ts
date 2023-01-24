import { hello } from './index';

describe(`Hello function`, () => {
  it(`return hello string`, async () => {
    expect(hello()).toBe('Hello Lens Client');
  });
});
