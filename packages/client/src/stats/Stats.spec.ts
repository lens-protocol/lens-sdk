import { buildTestEnvironment } from '../__helpers__';
import { Stats } from './Stats';

const testConfig = {
  environment: buildTestEnvironment(),
};

describe(`Given the ${Stats.name} configured to work with the test environment`, () => {
  const stats = new Stats(testConfig);

  describe(`when the method ${Stats.prototype.fetch.name} is called`, () => {
    it(`should return result`, async () => {
      const result = await stats.fetch();

      expect(result).toMatchObject({
        totalCollects: expect.any(Number),
        totalComments: expect.any(Number),
      });
    });
  });
});
