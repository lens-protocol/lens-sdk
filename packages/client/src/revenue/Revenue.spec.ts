import { mumbaiSandbox } from '../consts/environments';
import { Revenue } from './Revenue';

const testConfig = {
  environment: mumbaiSandbox,
};

describe(`Given the ${Revenue.name} configured to work with sandbox`, () => {
  const revenue = new Revenue(testConfig);

  describe(`when the method ${Revenue.prototype.publication.name} is called`, () => {
    it(`should run successfully`, async () => {
      await expect(revenue.publication({ publicationId: '0x15-0x028e' })).resolves.not.toThrow();
    });
  });

  describe(`when the method ${Revenue.prototype.profileFollow.name} is called`, () => {
    it(`should run successfully`, async () => {
      await expect(revenue.profileFollow({ profileId: '0x0185' })).resolves.not.toThrow();
    });
  });

  describe(`when the method ${Revenue.prototype.profilePublication.name} is called`, () => {
    it(`should run successfully`, async () => {
      await expect(revenue.profilePublication({ profileId: '0x0185' })).resolves.not.toThrow();
    });
  });
});
