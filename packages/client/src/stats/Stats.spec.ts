import { mumbaiSandbox } from '../consts/environments';
import { Stats } from './Stats';

const testConfig = {
  environment: mumbaiSandbox,
};

describe(`Given the ${Stats.name} configured to work with sandbox`, () => {
  const stats = new Stats(testConfig);

  describe(`when a method ${Stats.prototype.fetch.name} is called`, () => {
    it(`should return result`, async () => {
      const result = await stats.fetch();

      expect(result).toMatchObject({
        totalCollects: expect.any(Number),
        totalComments: expect.any(Number),
      });
    });
  });
});
